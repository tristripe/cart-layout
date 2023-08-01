import styled, { css } from "styled-components";
import { Button } from "@components/ui";

export const MainTitle = styled.h2`
  ${({ theme: { unit, breakpoints } }) => css`
    font-size: 40px;
    line-height: 1.3;
    font-weight: 400;
    margin-bottom: ${unit * 2}px;

    @media (max-width: ${breakpoints.maxTableWidth}) {
      font-size: 24px;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      font-size: 18px;
    }
  `};
`;

export const Backward = styled.article`
  ${({ theme: { unit } }) => css`
    height: ${unit * 6}px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    margin-bottom: ${unit * 2}px;
  `}
`;

export const LinkTo = styled(Button)`
  ${({ theme: { breakpoints, colors, radius, unit } }) => css`
    background-image: none;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 1.3;
    letter-spacing: 1.2px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${colors.lineGray};
    height: ${unit * 5.5}px;
    width: ${unit * 22.5}px;
    border-radius: ${radius.large};

    svg {
      width: ${unit * 2}px;
      height: ${unit * 2}px;
      transform: rotate(180deg);
      margin-right: ${unit * 1.75}px;
    }

    @media (max-width: ${breakpoints.maxMobileWidth}) {
      margin-top: -2px;

      svg {
        width: ${unit * 2}px;
        height: ${unit * 2}px;
        margin-right: ${unit * 2}px;
      }
    }
  `}
`;

export const SubmitButton = styled(Button)`
  ${({ theme: { unit, colors } }) => css`
    height: ${unit * 5.5}px;
    background-color: ${colors.black};
    color: ${colors.white};
    text-transform: uppercase;
    font-size: 13px;
    letter-spacing: 1.35px;
    margin: 0 auto;
    border: 1px solid ${colors.black};
    padding: 0 ${unit * 5}px;

    &:disabled {
      opacity: 0.7;
    }
  `}
`;
