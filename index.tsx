import React, {useEffect, useState} from "react";
import {FirstScreen, UploadScreen} from "./components";
import {useAppDispatch, useAppSelector} from "@store";
import {selectProducts} from "@features/catalog/redux/selectors";
import {selectExcelData, selectValidatedIds} from "@features/cart/redux/selectors";
import {hasData, RemoteData, RemoteDataStatus} from "@libs/remote";
import {fetchProductsWithoutQuery} from "@features/catalog/redux/slice";
import {CustomIcon} from "@components/ui";
import {setExcelData} from "@features/cart/redux/slice";
import {IExcelData} from "@features/cart/redux/mocks";
import {IUploadProductCard} from "@features/cart/types";
import * as S from "./styled";
import {ButtonSettingsEnum} from "./constants";

interface ICartLayout {
    setLayoutHidden: (event) => void;
}

const CartLayout: React.FC<ICartLayout> = ({setLayoutHidden}) => {
    const [radio, setRadio] = useState(ButtonSettingsEnum.CLEAR);
    const [screen, setScreen] = useState(true);
    const products = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();
    const validatedArticles = useAppSelector<RemoteData<IExcelData[]>>(selectValidatedIds);
    const excelData = useAppSelector(selectExcelData);
    const [data, setData] = useState<IUploadProductCard[]>();

    useEffect(() => {
        if (hasData(validatedArticles)) {
            dispatch(
                fetchProductsWithoutQuery({
                    product_ids:
                        validatedArticles
                            .data
                            .map((item: IExcelData) => item.product_id)
                }),
            );
        }
    }, [dispatch, validatedArticles]);

    useEffect(() => {
        if (hasData(validatedArticles)) {
            const newArr = validatedArticles
                .data
                .map((item: IExcelData) => ({
                    ...item,
                    quantity: excelData.find((excelItem) => excelItem.article === item.article)?.quantity || 0,
                }));
            dispatch(setExcelData(newArr));
            //Итоговый массив с объектами для корзины, содержит Артикул, id и количество.

            if (products.status === RemoteDataStatus.Success) {
                let newProducts: IUploadProductCard[] = products.data.products.map((item) => ({
                    ...item,
                    quantity: newArr.find((arrItem: IExcelData) => arrItem.product_id === item.id)?.quantity,
                }));
                setData(newProducts);
            }
        }
    }, [dispatch, validatedArticles, products]);

    const setMethod = (value: string) => {
        setRadio(value);
    };

    const setScreenHandler = (value: boolean) => {
        setScreen(!value);
    };

    return (
        <S.MainSection>
            <S.MainWrap>
                <S.CloseButton onClick={setLayoutHidden}>
                    <CustomIcon fileName="icon-close"/>
                </S.CloseButton>
                {screen && <FirstScreen radio={radio} setMethod={setMethod} setScreen={setScreenHandler}/>}
                {!screen && hasData(products) && (
                    <UploadScreen
                        products={data}
                        setScreen={setScreenHandler}
                        screenStatus={radio}
                        setLayoutHidden={setLayoutHidden}
                    />
                )}
            </S.MainWrap>
        </S.MainSection>
    );
};

export default CartLayout;
