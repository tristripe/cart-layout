import styled, {css} from "styled-components";

export const CartDescription = styled.div`
  ${({theme: {unit}}) => css`
    margin-bottom: 13px;
    flex-basis: 100%;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
    max-width: 1012px;
    padding-right: ${unit * 10}px;

    div {
      text-transform: uppercase;
      font-size: 13px;
      line-height: 1;
      letter-spacing: 1.2px;
      white-space: nowrap;
    }
  `}
`;

export const CartDescriptionName = styled.div`
  margin: 0 0 0 160px;
  width: 355px;
  text-align: start;
`;

export const CartDescriptionQuantityWrapper = styled.div`
  width: max-content;
  display: flex;
  flex-wrap: nowrap;
  column-gap: 80px;
`;

export const CartDescriptionQuantity = styled.div`
`;

export const CardListSection = styled.section`
  ${({theme: {breakpoints}}) => css`
    width: 100%;
    margin-right: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      width: 100%;
      margin-right: 0;
    }
  `}
`;

export const SectionWrapper = styled.section`
  ${({theme: {breakpoints}}) => css`
    margin-bottom: 32px;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      width: 100%;
      margin-right: 0;
  `}
`;

export const ListItem = styled.li<{ isIncluded: boolean }>`
  ${({isIncluded}) => css`
    transition: 300ms ease-in-out;
    opacity: 1;
    ${isIncluded && `display: none;`};
    ${isIncluded && `opacity: 0;`};
  `}
`;

export const CartList = styled.ul`
`;
