import React, {FC, useEffect, useMemo} from "react";
import Skeleton from "react-loading-skeleton";
import {useMedia} from "@core/hooks/use-media";
import {useAppDispatch, useAppSelector} from "@store";
import {debounce} from "@core/utils/core-functions";
import {
    patchCart,
    setExcelArticlesWithUnvalide,
    setExcelData,
} from "@features/cart/redux/slice";
import {
    selectExcelArticles,
    selectExcelData,
    selectItemsToDelete,
    selectItemsToDeleteSession,
    selectItemsToPatch
} from "@features/cart/redux/selectors";
import {UploadItem} from "@features/cart/components/cart-layout/components";
import {IExcelData, MAX_QUANTITY} from "@features/cart/redux/mocks";
import {IUploadProductCard} from "@features/cart/types";
import * as S from "./styled";
import {StatusEnum} from "../../constants";

interface ICartProductList {
    products: IUploadProductCard[];
    loading?: boolean;
}

const UploadProductList: FC<ICartProductList> = ({products, loading}) => {
    const {isDesktop} = useMedia();
    const dispatch = useAppDispatch();
    const itemsToPatch = useAppSelector(selectItemsToPatch);
    const itemsToDelete = useAppSelector(selectItemsToDelete);
    const itemsToDeleteSession = useAppSelector(selectItemsToDeleteSession);
    const allArticles = useAppSelector(selectExcelArticles);
    const excelData = useAppSelector(selectExcelData);

    const debouncedCall = useMemo(() => {
        return debounce(() => dispatch(patchCart()), 300);
    }, []);

    useEffect(() => {
        if ((itemsToPatch && itemsToPatch.length) || (itemsToDelete && itemsToDelete.length)) {
            debouncedCall();
        }
    }, [itemsToPatch, itemsToDelete]);

    const patchHandler = (value: number, id: number) => {
        let currData = Object.assign([], excelData).map((item: IExcelData) =>
            item.product_id === id ? {...item, quantity: value} : item,
        );
        dispatch(setExcelData(currData));
    };

    const deleteHandler = (id: number, article: string) => {
        let currData = excelData.filter((product: IExcelData) => product.product_id !== id);
        const currArticles = allArticles.filter(art => art !== article)
        dispatch(setExcelData(currData));
        dispatch(setExcelArticlesWithUnvalide(currArticles));
    };

    const renderCard = (article: string, idx: number) => {
        let product = products.find(item => item.article === article);
        if (product) {
            return (
                <li
                    key={product.id}
                >
                    <UploadItem
                        id={product.id}
                        quantity={product.quantity ?? 1}
                        patchHandler={patchHandler}
                        deleteHandler={deleteHandler}
                        max_quantity={MAX_QUANTITY}
                        status={StatusEnum.IN_STOCK}
                        article={product.article}
                        name={product.name}
                        images={product.images}
                        price={product.price}
                        collection={product.collection}
                        slug={product.slug}
                    />
                </li>
            )
        } else {
            return (
                <S.ListItem
                    isIncluded={itemsToDeleteSession.includes(product.id)}
                    key={product.id}
                >
                    <UploadItem
                        id={product.id}
                        quantity={product.quantity}
                        patchHandler={patchHandler}
                        deleteHandler={deleteHandler}
                        max_quantity={MAX_QUANTITY}
                        status={StatusEnum.NOT_FOUND}
                        article={article}
                        name={article}
                        slug={article}
                    />
                </S.ListItem>
            )
        }
    }

    return (
        <>
            {loading ? (
                <S.CardListSection>
                    {isDesktop && (
                        <S.CartDescription>
                            <S.CartDescriptionName>
                                <Skeleton width={184} height={13}/>
                            </S.CartDescriptionName>
                            <S.CartDescriptionQuantityWrapper>
                                <S.CartDescriptionQuantity>
                                    <Skeleton width={98} height={13}/>
                                </S.CartDescriptionQuantity>
                                <Skeleton width={53} height={13}/>
                            </S.CartDescriptionQuantityWrapper>
                        </S.CartDescription>
                    )}
                    <S.SectionWrapper>
                        <S.CartList>
                            {products
                                .map((i) => (
                                    <li key={i.id}>
                                        <UploadItem
                                            id={i.id}
                                            quantity={i.quantity ?? 1}
                                            patchHandler={patchHandler}
                                            deleteHandler={deleteHandler}
                                            max_quantity={MAX_QUANTITY}
                                            status={StatusEnum.IN_STOCK}
                                            article={i.article}
                                            name={i.name}
                                            images={i.images}
                                            price={i.price}
                                            collection={i.collection}
                                            slug={i.slug}
                                        />
                                    </li>
                                ))}
                        </S.CartList>
                    </S.SectionWrapper>
                </S.CardListSection>
            ) : (
                <S.CardListSection>
                    {isDesktop && (
                        <S.CartDescription>
                            <S.CartDescriptionName>Наименование товара</S.CartDescriptionName>
                            <S.CartDescriptionQuantityWrapper>
                                <S.CartDescriptionQuantity>Количество</S.CartDescriptionQuantity>
                                <div>Сумма</div>
                                <div>Статус</div>
                            </S.CartDescriptionQuantityWrapper>
                        </S.CartDescription>
                    )}
                    <S.SectionWrapper>
                        <S.CartList>
                            {products && allArticles.map((article, idx) => renderCard(article, idx))}
                        </S.CartList>
                    </S.SectionWrapper>
                </S.CardListSection>
            )}
        </>
    );
};

export default UploadProductList;
