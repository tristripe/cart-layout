import React, {useState} from "react";
import {CustomIcon} from "@components/ui";
import {UploadProductList} from "@features/cart/components/cart-layout/components";
import UploadListWithCart from "@features/cart/components/cart-layout/components/upload-list-with-cart";
import {hasData, RemoteDataStatus} from "@libs/remote";
import {postUploadCart, refreshCart, updateCart} from "@features/cart/redux/slice";
import {useAppDispatch, useAppSelector} from "@store";
import {selectCart, selectExcelData} from "@features/cart/redux/selectors";
import {CartItemDTO} from "@api/generated-api";
import {IUploadProductCard} from "@features/cart/types";
import * as S from "./styled";
import {ButtonSettingsEnum} from "../../constants";

interface IUploadScreen {
    setScreen: (value: boolean) => void;
    screenStatus: string;
    setLayoutHidden: () => void;
    products: IUploadProductCard[];
}

const UploadScreen: React.FC<IUploadScreen> = ({setScreen, screenStatus, products, setLayoutHidden}) => {
    const cart = useAppSelector(selectCart);
    const dispatch = useAppDispatch();
    const excelData = useAppSelector(selectExcelData);
    const [cartItems, setCartItems] = useState<CartItemDTO[]>();
    const [cartItemsToDelete, setCartItemsToDelete] = useState<number[]>([]);

    const submitHandler = () => {
        if (cart?.status === RemoteDataStatus.Success) {
            if (screenStatus === ButtonSettingsEnum.CLEAR ) {
                if (hasData(cart) && cart.data.data.length > 0) {
                    dispatch(refreshCart(excelData
                        .filter(item => !!item.quantity)
                        .map(item => ({product_id: item.product_id, quantity: item.quantity ?? 1}))
                    ));
                } else {
                    dispatch(postUploadCart(excelData
                        .filter(item => !!item.quantity)
                        .map(item => ({product_id: item.product_id, quantity: item.quantity ?? 1}))
                    ))
                }
            } else if (cartItems?.length) {
                const itemsToPatch = cartItems.filter(
                    item => excelData.find(excelItem => excelItem.product_id === item.product.id && !!excelItem.quantity)
                );
                const itemsToPost = excelData.filter(
                    item => !cart.data.data.find(cartItem => cartItem.product.id === item.product_id) && !!item.quantity
                );

                dispatch(updateCart({
                        postIds: itemsToPost.map(item => ({product_id: item.product_id, quantity: item.quantity ?? 1})),
                        patchIds: itemsToPatch.map(item => ({
                            id: item.id,
                            quantity: item.quantity + excelData.find(excelItem => excelItem.product_id === item.product.id)!.quantity! ?? 1
                        })),
                        deleteIds: cartItemsToDelete
                    }
                ))
            }
        }
        setLayoutHidden();
    };

    return (
        <>
            <S.MainTitle>Товары к загрузке</S.MainTitle>
            <S.Backward>
                <S.LinkTo onClick={() => setScreen(false)}>
                    <CustomIcon fileName="icon-carousel-arrow"/>
                    <span>Назад</span>
                </S.LinkTo>
            </S.Backward>
            {screenStatus === ButtonSettingsEnum.CLEAR ? (
                <UploadProductList products={products}/>
            ) : (
                <UploadListWithCart
                    products={products}
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    cartItemsToDelete={cartItemsToDelete}
                    setCartItemsToDelete={setCartItemsToDelete}
                />
            )}
            <S.SubmitButton onClick={submitHandler}>Подтвердить список</S.SubmitButton>
        </>
    );
};

export default UploadScreen;
