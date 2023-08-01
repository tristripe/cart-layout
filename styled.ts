import styled, {css} from "styled-components";
import {Button} from "@components/ui";

export const MainSection = styled.section`
  ${({theme: {breakpoints, unit, colors}}) => css`
    width: 100%;
    min-height: calc(100vh + 230px);

    background-color: ${colors.white};
    padding: ${unit * 6.25}px 0;

    @media (max-width: ${breakpoints.smDesktopWidth}) {
      min-height: 150vh;
    }

    @media (max-width: ${breakpoints.maxTableWidth}) {
      min-height: 130vh;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      padding: ${unit * 5}px 0;
    }
  `}
`;

export const MainWrap = styled.div`
  ${({theme: {breakpoints, unit}}) => css`
    width: 100%;
    max-width: ${unit * 116.25}px;
    height: max-content;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0 ${unit * 1.875}px;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      max-width: 100%;
      padding: 0 ${unit * 8}px;
    }

    @media (max-width: ${breakpoints.maxTableWidth}) {
      padding: 0 ${unit * 2.5}px;
    }
  `}
`;

export const Title = styled.h2`
  ${({theme: {unit, breakpoints}}) => css`
    font-size: 24px;
    line-height: 1.3;
    text-align: center;
    margin-bottom: ${unit * 4}px;
    font-weight: 400;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      font-size: 18px;
      line-height: 1.5;
      text-align: left;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      margin-bottom: ${unit * 3}px;
    }
  `}
`;

export const OptionList = styled.div`
  ${({theme: {unit, breakpoints}}) => css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    column-gap: ${unit}px;
    margin-bottom: ${unit * 10}px;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      margin-bottom: ${unit * 16.75}px;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      flex-direction: column;
      justify-content: flex-start;
      row-gap: 8px;
    }
  `}
`;

export const OptionItem = styled.button<{ isActive: boolean }>`
  ${({theme: {colors, unit, radius, breakpoints}, isActive}) => css`
    flex-basis: 50%;
    border: 1px solid ${colors.lineGray};
    border-radius: ${radius.large};
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: ${unit * 2}px;
    max-width: ${unit * 49.5}px;
    padding: ${unit * 5.625}px 0;
    cursor: pointer;
    transition: 300ms ease-in-out;
    border: 1px solid ${isActive ? colors.black : colors.lineGray};
    background-color: ${colors.white};

    input {
      display: none;
    }

    svg {
      width: ${unit * 5}px;
      height: ${unit * 5}px;
    }

    @media (max-width: ${breakpoints.maxTableWidth}) {
      padding: ${unit * 2.9}px ${unit * 4.25}px;

      svg {
        width: ${unit * 2}px;
        height: ${unit * 2}px;
      }
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      max-width: 100%;
      width: 100%;
      padding: ${unit * 1.875}px ${unit * 4.25}px;
    }
  `}
`;

export const LabelText = styled.div`
  max-width: 220px;
  font-size: 13px;
  line-height: 1.3;
`;

export const RulesWrap = styled.div`
  ${({theme: {unit, breakpoints}}) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${unit * 4}px;
    margin-bottom: ${unit * 4}px;

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      flex-direction: column-reverse;
      justify-content: flex-start;
      align-items: flex-start;
    }
  `}
`;

export const RulesImage = styled.img``;

export const RulesTextWrap = styled.div`
  font-size: 14px;
`;

export const Paragraph = styled.p`
  ${({theme: {unit}}) => css`
    margin: 0 0 ${unit}px;
  `}
`;

export const List = styled.ul`
  ${({theme: {unit}}) => css`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: ${unit}px;
  `}
`;

export const Item = styled.li`
  ${({theme: {unit}}) => css`
    list-style: initial;
    margin-left: ${unit * 2.5}px;
  `}
`;

export const RadioButton = styled.div`
  ${({theme: {}}) => css`
    display: none;
  `}
`;

export const DownloadWrapper = styled.div`
  ${({theme: {unit, colors}}) => css`
    width: 100%;
    max-width: ${unit * 100}px;
    margin: 0 auto ${unit * 14}px;
    position: relative;

    span {
      div {
        .ant-upload-list-text-container {
          .ant-upload-list-item {
            color: ${colors.darkGray};
          }

          .ant-upload-list-item-error, .ant-upload-list-item-error .ant-upload-text-icon > .anticon, .ant-upload-list-item-error .ant-upload-list-item-name {
            color: ${colors.darkGray};
          }
        }
      }
    }
  `}
`;

export const DownloadText = styled.p<{ color?: string }>`
  ${({theme: {colors, unit}}) => css`
    text-align: center;
    margin: 0;
    color: ${colors.black};
    max-width: ${unit * 31}px;
    font-size: 14px;
    line-height: 1.5;

    span {
      font-size: 12px;
    }
  `}
`;

export const SubmitButton = styled(Button)`
  ${({theme: {unit, colors}}) => css`
    max-width: ${unit * 20.25}px;
    width: 100%;
    height: ${unit * 5.5}px;
    background-color: ${colors.black};
    color: ${colors.white};
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 1.35px;
    margin: 0 auto;
    border: 1px solid ${colors.black};

    &:disabled {
      opacity: 0.7;
    }
  `}
`;

export const DownloadInnerContent = styled.div`
  ${({theme: {unit}}) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: ${unit * 2}px;
  `}
`;

export const CloseButton = styled.button`
  ${({theme: {unit}}) => css`
    background-color: transparent;
    border: none;
    margin-left: auto;

    svg {
      width: ${unit * 2.25}px;
      height: ${unit * 2.25}px;
    }
  `}
`;

export const InvalidDataWarning = styled.span`
  ${({theme: {colors}}) => css`
    color: ${colors.red};
  `}
`;
