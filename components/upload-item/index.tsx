import React, {FC, useEffect, useState} from "react";
import {Counter, CustomIcon} from "@components/ui";
import Price from "@components/entities/price/price";
import {PreviewImageDTO, ProductCollectionDTO, ProductPriceDTO} from "@api/generated-api";
import {useMedia} from "@core/hooks/use-media";
import * as S from "./styled";
import {StatusEnum} from "../../constants";

interface IUploadProductListItem {
    quantity: number;
    max_quantity: number;
    min_quantity?: number;
    patchHandler(value: number, id: number, article: string): void;
    deleteHandler(id: number, article: string): void;
    id: number;
    selected?: boolean;
    checkboxChanger?(id: number): void;
    status: StatusEnum;
    images?: Array<PreviewImageDTO>;
    name: string;
    collection?: ProductCollectionDTO;
    article: string;
    price?: ProductPriceDTO;
    slug: string;
}

const UploadItem: FC<IUploadProductListItem> = ({
    quantity,
    max_quantity,
    patchHandler,
    deleteHandler,
    id,
    min_quantity,
    status,
    images,
    name,
    collection,
    article,
    price,
    }) => {
    const [count, setCount] = useState(quantity);
    const {isMobile, isTablet} = useMedia();

    useEffect(() => {
        setCount(quantity);
    }, [quantity]);

    const counterHandler = (newValue: number) => {
        setCount(newValue);
        patchHandler(newValue, id, article);
    };

    return (
        <>
            {status === StatusEnum.IN_STOCK || status === StatusEnum.NOT_IN_STOCK ? (
                <S.CartItem>
                    {isMobile && (
                        <S.StatusShield>
                            {status && status === StatusEnum.IN_STOCK ? (
                                <>
                                    <S.StatusIcon fileName="icon-instock"/>
                                    загружен
                                </>
                            ) : (
                                <>
                                    <CustomIcon fileName="icon-outofstock"/> нет в наличии
                                </>
                            )}
                        </S.StatusShield>
                    )}
                    <S.CartItemData>
                        {images && (
                            <S.ImageWrapper>
                                <img src={images[0]?.desktop.jpg_default || ""} alt=""/>
                            </S.ImageWrapper>
                        )}
                        <S.CartInfoWrapper>
                            <S.CartItemCollectionWrapper>
                                {collection && <S.CartItemSeries>{collection.name}</S.CartItemSeries>}
                                <S.CartItemSeries>{`Артикул: ${article}`}</S.CartItemSeries>
                            </S.CartItemCollectionWrapper>
                            <S.CartItemTitle>{name}</S.CartItemTitle>
                            {isTablet && (
                                <S.PriceInfoWrapper>
                                    {price && price.current && (
                                        <S.CartItemPrice>
                                            <Price price={price} multiplier={count} cartStyle/>
                                        </S.CartItemPrice>
                                    )}
                                    <Counter
                                        min={min_quantity !== undefined ? min_quantity : 0}
                                        max={max_quantity}
                                        current={count}
                                        onChange={(newValue) => counterHandler(newValue)}
                                    />
                                </S.PriceInfoWrapper>
                            )}
                        </S.CartInfoWrapper>
                    </S.CartItemData>
                    <S.UploadActionsWrapper>
                        {!isTablet && (
                            <S.PriceInfoWrapper>
                                {price && price.current && (
                                    <S.CartItemPrice>
                                        <Price price={price} multiplier={count} cartStyle/>
                                    </S.CartItemPrice>
                                )}
                                <Counter
                                    min={min_quantity !== undefined ? min_quantity : 0}
                                    max={max_quantity}
                                    current={count}
                                    onChange={(newValue) => counterHandler(newValue)}
                                />
                            </S.PriceInfoWrapper>
                        )}
                        {!isMobile && (
                            <S.StatusWrapper>
                                {status && status === "IN_STOCK" ? (
                                    <>
                                        <S.StatusIcon fileName="icon-instock"/>
                                        загружен
                                    </>
                                ) : status === "NOT_IN_STOCK" ? (
                                    <>
                                        <CustomIcon fileName="icon-error"/> не найден
                                    </>
                                ) : (
                                    <>
                                        <CustomIcon fileName="icon-outofstock"/> нет в наличии
                                    </>
                                )}
                            </S.StatusWrapper>
                        )}
                        <S.CartItemRemove onClick={() => deleteHandler(id, article)}>
                            <CustomIcon fileName="icon-close"/>
                        </S.CartItemRemove>
                    </S.UploadActionsWrapper>
                </S.CartItem>
            ) : (
                <S.CartItem>
                    <S.CartItemDataRed>{`Артикул: ${article}`}</S.CartItemDataRed>
                    <S.UploadActionsWrapper>
                        <S.StatusWrapper>
                            <CustomIcon fileName="icon-error"/> не найден
                        </S.StatusWrapper>
                        <S.CartItemRemove onClick={() => deleteHandler(id, article)}>
                            <CustomIcon fileName="icon-close"/>
                        </S.CartItemRemove>
                    </S.UploadActionsWrapper>
                </S.CartItem>
            )}
        </>
    );
};

export default UploadItem;
