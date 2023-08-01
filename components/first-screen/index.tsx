import React, {useState} from "react";
import {Button, CustomIcon} from "@components/ui";
import * as XLSX from "xlsx";
import DragAndDrop from "@components/ui/drag-and-drop";
import {message, UploadProps} from "antd";
import {useAppDispatch, useAppSelector} from "@store";
import {fetchValidatedIds, setExcelArticlesWithUnvalide, setExcelData} from "@features/cart/redux/slice";
import {IExcelData} from "@features/cart/redux/mocks";
import {selectCart} from "@features/cart/redux/selectors";
import {hasData} from "@libs/remote";
import Example from "@resources/images/cart-export-example.png";
import * as S from "./styled";
import {ButtonSettingsEnum} from "../../constants";

interface IFirstScreen {
    radio: string;
    setMethod: (value: string) => void;
    setScreen: (value: boolean) => void;
}


const FirstScreen: React.FC<IFirstScreen> = ({radio, setMethod, setScreen}) => {
    const dispatch = useAppDispatch();
    const [excelArticles, setExcelArticles] = useState([]);
    const [fileType, setFileType] = useState("");
    const [invalidData, setInvalidData] = useState(false);
    const cart = useAppSelector(selectCart);

    const SubmitHandler = () => {
        dispatch(fetchValidatedIds(excelArticles));
        setScreen(true);
    };

    const fileParser = async (file) => {
        setInvalidData(false);
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetNames = Object.keys(workbook.Sheets);
        let mySheetData = {};

        for (let i = 0; i < workbook.SheetNames.length; i++) {
            let sheetName = workbook.SheetNames[i];
            const currSheet = workbook.Sheets[sheetName];
            mySheetData[sheetName] = XLSX.utils.sheet_to_json(currSheet);


            const excelArray: { article: string, quantity: string }[] =
                mySheetData[sheetNames[0]]
                    .map(({Артикул: article, Количество: quantity, ...rest}) =>
                        ({
                            article,
                            quantity,
                            ...rest,
                        }));

            excelArray.forEach(item => {
                if (!item.article ||
                    !+item.quantity ||
                    !Number.isInteger(item.quantity) ||
                    item.quantity?.length > 999) {
                    setInvalidData(true);
                    return;
                }
            })

            let filteredArray: IExcelData[] = Object.values(
                excelArray.reduce((accu: any, {article, ...item}) => {

                    if (!accu[article]) accu[article] =
                        {
                            quantity: 0
                        }

                    accu[article] = {
                        article,
                        ...accu[article],
                        ...item,
                        quantity: accu[article].quantity + item.quantity
                    }

                    return accu;
                }, {}),
            );

            dispatch(setExcelData(filteredArray));
            dispatch(setExcelArticlesWithUnvalide(filteredArray.map(item => item.article)));

            let articlesList = filteredArray.map((item: IExcelData) => item.article);
            setExcelArticles(articlesList);
        }
    };

    const allowedXls = "application/vnd.ms-excel";
    const allowedXlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    const props: UploadProps = {
        beforeUpload: (file) => {
            setFileType(file.type);
            const isXLS = file.type === allowedXls || file.type === allowedXlsx;
            if (!isXLS) {
                message.error(`${file.name} Имеет формат, отличный от XLSX/XLS/CSV/`);
            }
            return isXLS || "";
        },
    };

    return (
        <>
            <S.Title>Загрузить список товаров</S.Title>
            {hasData(cart) && cart.data.data.length > 0 && (
                <S.OptionList>
                    <S.OptionItem isActive={radio === ButtonSettingsEnum.CLEAR} onClick={() => setMethod(ButtonSettingsEnum.CLEAR)}>
                        <CustomIcon fileName="icon-trash-40px"/>
                        <S.LabelText>Очистить корзину и загрузить товары из файла</S.LabelText>
                    </S.OptionItem>
                    <S.OptionItem isActive={radio === ButtonSettingsEnum.ADD} onClick={() => setMethod(ButtonSettingsEnum.ADD)}>
                        <CustomIcon fileName="icon-add-40px"/>
                        <S.LabelText>Загрузить товары из файла дополнительно к уже добавленным</S.LabelText>
                    </S.OptionItem>
                </S.OptionList>
            )}
            <S.RulesWrap>
                <S.RulesImage src={Example}/>
                <S.RulesTextWrap>
                    <S.Paragraph>Вы можете добавить товары в корзину через загрузку файлов csv или xlsx</S.Paragraph>
                    <S.List>
                        <S.Item>файл должен содержать столбцы «Артикул» и «Количество»,</S.Item>
                        <S.Item>на одной строке размещаются данные одного товара,</S.Item>
                        <S.Item>формат артикула соответствует артикулу Акваарт.</S.Item>
                    </S.List>
                </S.RulesTextWrap>
            </S.RulesWrap>
            <S.DownloadWrapper>
                <DragAndDrop onChange={(e) => fileParser(e)} maxCount={1} props={props}>
                    <S.DownloadInnerContent>
                        <S.DownloadText>Выберите файл с вашего компьютера или перетащите его в это поле</S.DownloadText>
                        <Button>Выбрать файл</Button>
                    </S.DownloadInnerContent>
                </DragAndDrop>
                {invalidData && (
                    <S.InvalidDataWarning>
                        Данные в файле некорректны. Проверь правильность данных в файле.
                    </S.InvalidDataWarning>
                )}
            </S.DownloadWrapper>
            <S.SubmitButton
                disabled={excelArticles.length === 0 || (fileType !== allowedXlsx && fileType !== allowedXls) || invalidData}
                onClick={SubmitHandler}
            >
                Далее
            </S.SubmitButton>
        </>
    );
};

export default FirstScreen;
