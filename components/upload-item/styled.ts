import styled, { css } from "styled-components";
import { CustomIcon } from "@components/ui";
import { Button } from "antd";

export const StatusWrapper = styled.div`
  ${({ theme: { breakpoints, unit } }) => css`
    margin-right: ${unit * 3}px;
    font-size: 13px;
    line-height: 1;
    white-space: nowrap;
    display: flex;
    justify-content: flex-start;
    column-gap: ${unit}px;
    align-items: center;
    min-width: ${unit * 13}px;

    svg {
      width: ${unit * 1.5}px;
      height: ${unit * 1.5}px;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      position: absolute;
      top: ${unit * 2.5}px;
      right: ${unit * 2}px;
    }
  `}
`;

export const StatusIcon = styled(CustomIcon)``;

export const UploadActionsWrapper = styled.div`
  ${({ theme: { breakpoints, unit } }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    column-gap: ${unit * 3.75}px;
    width: 100%;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      justify-content: flex-start;
      width: auto;
      margin-left: auto;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      width: 100%;
    }
  `}
`;

export const CartItem = styled.article`
  ${({ theme: { colors, breakpoints, unit } }) => css`
    display: flex;
    justify-content: flex-start;
    padding: ${unit * 2}px;
    border-radius: ${unit * 1.5}px;
    border: 1px solid ${colors.lineGray};
    margin-bottom: ${unit * 0.5}px;
    max-width: ${unit * 126.5}px;
    width: 100%;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      flex-wrap: wrap;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      position: relative;
      margin-bottom: ${unit * 2.5}px;
    }
  `}
`;

export const CartInfoWrapper = styled.div`
  ${({ theme: { breakpoints, unit } }) => css`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-width: ${unit * 37.5}px;
    min-width: ${unit * 37.5}px;
    margin-right: ${unit * 2.625}px;
    height: 100%;
    justify-content: center;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      max-width: ${unit * 28.75}px;
      min-width: ${unit * 28.75}px;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      max-width: ${unit * 50}px;
      min-width: auto;
      width: 100%;
      margin-top: ${unit * 0.875}px;
      justify-content: flex-start;
    }
  `}
`;

export const StatusShield = styled.span`
  ${({ theme: { colors, radius, unit } }) => css`
    background-color: ${colors.backgroundGray};
    border-radius: ${radius.large};
    padding: ${unit * 0.5}px ${unit * 0.5}px ${unit * 0.625}px;
    white-space: nowrap;
    position: absolute;
    top: -11px;
    right: ${unit * 2}px;
    font-size: 13px;
    line-height: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: ${unit * 1.5}px;
      height: ${unit * 1.5}px;
      margin-right: ${unit}px;
    }
  `}
`;

export const ImageWrapper = styled.div`
  ${({ theme: { radius, unit } }) => css`
    margin-right: ${unit * 3}px;
    width: ${unit * 7}px;
    height: ${unit * 7}px;

    img,
    picture img {
      width: ${unit * 7}px;
      height: ${unit * 7}px;
      border-radius: ${radius.extraMedium};
    }
  `}
`;

export const CartItemTitle = styled.span`
  ${({ theme: { unit } }) => css`
    font-size: 14px;
    line-height: 1.3;
    margin-top: ${unit}px;
    word-wrap: normal;
    width: 100%;
  `}
`;

export const CartItemData = styled.div`
  ${({ theme: { breakpoints, unit } }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      margin-bottom: ${unit * 1.5}px;
      align-items: center;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      align-items: flex-start;
    }
  `}
`;

export const PriceInfoWrapper = styled.div`
  ${({ theme: { breakpoints, unit } }) => css`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    min-width: ${unit * 36.25}px;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      min-width: auto;
      flex-wrap: nowrap;
      margin-top: ${unit * 2}px;
      align-items: center;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      min-width: 100%;
      margin-top: 0;
      justify-content: space-between;
    }
  `}
`;

export const CartItemCollectionWrapper = styled.div`
  ${({ theme: { breakpoints } }) => css`
    display: flex;
    align-items: flex-start;

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      flex-direction: column;
    }
  `}
`;

export const CartItemSeries = styled.span`
  ${({ theme: { unit } }) => css`
    font-size: 11px;
    line-height: 11px;
    text-transform: uppercase;
    margin-right: ${unit}px;
    letter-spacing: 1.2px;
  `}
`;

export const CartItemPrice = styled.span`
  ${({ theme: { unit, breakpoints } }) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    white-space: nowrap;
    max-height: ${unit * 10.25}px;
    max-width: ${unit * 15}px;
    min-width: ${unit * 15}px;
    width: 100%;
    padding-right: ${unit * 4}px;

    svg {
      width: ${unit * 1.375}px;
      height: ${unit * 1.375}px;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      max-width: max-content;
      min-width: max-content;
      padding-right: 0;
      margin-right: 0;
      margin-bottom: 0;
      order: 0;
    }
  `}
`;

export const CartItemRemove = styled(Button)`
  ${({ theme: { unit, colors, breakpoints } }) => css`
    background-color: transparent;
    border: none;
    padding: 0;
    opacity: 0.5;
    height: ${unit * 2.25}px;
    width: ${unit * 2.25}px;
    border-radius: 50%;

    &:hover {
      background: ${colors.black} radial-gradient(circle, transparent 1%, #1d1d1d 1%) center/15000%;
      border-color: ${colors.black};
      color: ${colors.white};
    }

    svg {
      width: ${unit * 2}px;
      height: ${unit * 2}px;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      position: absolute;
      top: ${unit * 2.25}px;
      right: ${unit * 2.25}px;
    }
  `}
`;

export const CartItemDataRed = styled.div`
  ${({ theme: { colors } }) => css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: ${colors.red};
    font-size: 12px;
    white-space: nowrap;
  `}
`;

export const CartList = styled.ul`
`;
