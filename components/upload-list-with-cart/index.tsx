import React, {FC, useEffect, useMemo, useState} from "react";
import CartItem from "@components/entities/cart-item";
import Skeleton from "react-loading-skeleton";
import {useMedia} from "@core/hooks/use-media";
import {useAppDispatch, useAppSelector} from "@store";
import {debounce} from "@core/utils/core-functions";
import {
    patchCart, setExcelArticlesWithUnvalide,
    setExcelData,
} from "@features/cart/redux/slice";
import {
    selectCart, selectExcelArticles,
    selectExcelData,
    selectItemsToDelete,
    selectItemsToDeleteSession,
    selectItemsToPatch
} from "@features/cart/redux/selectors";
import {CartItemDTO} from "@api/generated-api";
import {UploadItem} from "@features/cart/components/cart-layout/components";
import Tabs from "@features/motivation/entities/tabs";
import {UploadsTabsLabel} from "@features/cart/components/cart-layout/constants";
import {hasData} from "@libs/remote";
import {IExcelData, MAX_QUANTITY} from "@features/cart/redux/mocks";
import {IUploadProductCard} from "@features/cart/types";
import * as S from "./styled";
import {StatusEnum} from "../../constants";

interface ICartProductList {
    products: IUploadProductCard[];
    loading?: boolean;
    cartItems?: CartItemDTO[];
    setCartItems(elements: CartItemDTO[]): void;
    cartItemsToDelete: number[];
    setCartItemsToDelete(elements: number[]): void;
}

const UploadListWithCart: FC<ICartProductList> = (props) => {
    const {
        products,
        loading,
        cartItems,
        setCartItems,
        cartItemsToDelete,
        setCartItemsToDelete
    } = props;

    const {isDesktop} = useMedia();
    const dispatch = useAppDispatch();
    const itemsToPatch = useAppSelector(selectItemsToPatch);
    const itemsToDelete = useAppSelector(selectItemsToDelete);
    const itemsToDeleteSession = useAppSelector(selectItemsToDeleteSession);
    const cart = useAppSelector(selectCart);
    const excelData = useAppSelector(selectExcelData);
    const allArticles = useAppSelector(selectExcelArticles);
    const [currentTab, setCurrentTab] = useState<number>(UploadsTabsLabel[0].key);

    useEffect(() => {
        if (hasData(cart)) {
            setCartItems(cart.data.data)
        }
    }, [cart])

    const debouncedCall = useMemo(() => {
        return debounce(() => dispatch(patchCart()), 300);
    }, []);

    useEffect(() => {
        if ((itemsToPatch && itemsToPatch.length) || (itemsToDelete && itemsToDelete.length)) {
            debouncedCall();
        }
    }, [itemsToPatch, itemsToDelete]);

    const cartPatchHandler = (value: number, id: number) => {
        if (value === 0) {
            cartDeleteHandler(id);
        } else {
            if (cartItems) {
                setCartItems(cartItems.map(item => {
                    return {...item, quantity: item.id === id ? value : item.quantity}
                }))
            }
        }
    };

    const patchHandler = (value: number, id: number) => {
        let currData = Object.assign([], excelData).map((item: IExcelData) =>
            item.product_id === id ? {...item, quantity: value} : item,
        );
        dispatch(setExcelData(currData));
    };

    const deleteHandler = (id: number, article: string) => {
        let currData = excelData.filter((product: IExcelData) => product.product_id !== id);
        const currArticles = allArticles.filter(art => art !== article)
        dispatch(setExcelArticlesWithUnvalide(currArticles));
        dispatch(setExcelData(currData));
    };

    const cartDeleteHandler = (id: number) => {
        if (cartItems) {
            setCartItemsToDelete([...cartItemsToDelete, id]);
            setCartItems(cartItems?.filter(item => item.id !== id));
        }
    };

    const handleTabClick = (tabValue: number) => {
        if (tabValue !== currentTab) {
            setCurrentTab(UploadsTabsLabel.find((tab) => tab.key === tabValue)!.key);
        }
    };

    const renderCard = (article: string, idx: number) => {
        let i = products.find(item => item.article === article);
        if (i) {
            return (
                <S.ListItem
                    isIncluded={itemsToDeleteSession.includes(i.id)}
                    key={i.id}
                >
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
                </S.ListItem>
            )
        } else {
            return (
                <S.ListItem
                    isIncluded={itemsToDeleteSession.includes(i.id)}
                    key={i.id}
                >
                    <UploadItem
                        id={idx}
                        quantity={idx}
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
            <S.TabsWrap>
                <Tabs tabs={UploadsTabsLabel} currentTab={currentTab} onClick={handleTabClick}/>
            </S.TabsWrap>
            {(currentTab === UploadsTabsLabel[0].key || currentTab === UploadsTabsLabel[1].key) && (
                <S.ContainerWrap>
                    {!loading ? (
                        <>
                            <S.Subtitle>Загруженные товары</S.Subtitle>
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
                        </>
                    ) : (
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
                                    {products.map((i) => (
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
                    )}
                </S.ContainerWrap>
            )}
            {(currentTab === UploadsTabsLabel[0].key || currentTab === UploadsTabsLabel[2].key) && (
                <S.ContainerWrap>
                    {!loading ? (
                        <>
                            <S.Subtitle>Добавленные товары</S.Subtitle>
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
                                        {cartItems?.length &&
                                            cartItems.map((i: CartItemDTO) => i.quantity > 0 && (
                                                <S.ListItem
                                                    isIncluded={itemsToDeleteSession.includes(i.id)}
                                                    key={i.id}
                                                >
                                                    <UploadItem
                                                        id={i.id}
                                                        quantity={i.quantity}
                                                        patchHandler={cartPatchHandler}
                                                        deleteHandler={cartDeleteHandler}
                                                        max_quantity={i.max_quantity}
                                                        status={StatusEnum.IN_STOCK}
                                                        article={i.product.article}
                                                        name={i.product.name}
                                                        images={i.product.images}
                                                        price={i.product.price}
                                                        collection={i.product.collection}
                                                        slug={i.product.slug}
                                                    />
                                                </S.ListItem>
                                            ))}
                                    </S.CartList>
                                </S.SectionWrapper>
                            </S.CardListSection>
                        </>
                    ) : (
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
                                    {cartItems?.length &&
                                        cartItems.map((i: CartItemDTO) => i.quantity > 0 && (
                                            <li key={i.id}>
                                                <CartItem
                                                    id={i.id}
                                                    product={i.product}
                                                    quantity={i.quantity}
                                                    in_stock={i.in_stock}
                                                    patchHandler={cartPatchHandler}
                                                    deleteHandler={cartDeleteHandler}
                                                    max_quantity={i.max_quantity}
                                                    bonus_amount={i.product_bonus_amount}
                                                />
                                            </li>
                                        ))}
                                </S.CartList>
                            </S.SectionWrapper>
                        </S.CardListSection>
                    )}
                </S.ContainerWrap>
            )}
        </>
    );
};

export default React.memo(UploadListWithCart);
