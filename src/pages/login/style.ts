import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => css`
    position: relative;
    overflow: hidden;
    background-color: ${theme.colors.white};

    &:after {
      content: "";
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      margin-top: -20%;
      margin-bottom: -12%;
      margin-left: -13%;
      width: 57%;
      border-radius: 100%;
      transform: translate(0, 0) rotate(-4deg) skewX(0) skewY(0) scaleX(1) scaleY(1);
      background: url('/login-cover.png') no-repeat center #eee;
      background-size: 125%;
      background-position: -50% 65%;  
    }

    &:before {
      content: "";
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 0px;
      margin-top: -28%;
      margin-bottom: -15%;
      margin-left: -13%;
      width: 57%;
      transform: translate(0, 0) rotate(-4deg) skewX(0) skewY(0) scaleX(1) scaleY(1);
      border-radius: 100%;
      background: #d2d8e8;
    }

    .ui.form .field, .ui.form .error {
      margin-bottom: 0;
      position: relative;

      .prompt.label {
        position: absolute;
        left: 0;
        bottom: -0.75rem;
      }
    }
  `}
`
const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding: 0 2.5rem;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoint.mobileM}) {
      max-width: 640px;
    }

    @media (min-width: ${theme.breakpoint.tablet}) {
      max-width: 768px;
    }

    @media (min-width: ${theme.breakpoint.laptop}) {
      max-width: 1024px;
    }

    @media (min-width: ${theme.breakpoint.laptopL}) {
      max-width: 1280px;
    }
  `}
`
const RightSide = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: auto;
  margin-left: 5rem;
  border-radius: .375rem;
  width: auto;
  background-color: transparent;
  padding: 0px;
`
const LeftSide = styled.div`
  min-height: 100vh;
  flex-direction: column;
  display: flex;
`
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
`
const Title = styled.h1`
  font-size: 2.25rem;
  line-height: 2.25rem;
  color: hsl(var(--heroui-default-600));
  font-weight: 600;
`

export const FormHeading = styled.h1`
  font-weight: 700;
  color: hsl(var(--heroui-default-600));
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`
const LogoContainer = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 70px;
  margin-bottom: 1rem;
`;

export const LoginEl = {
  Wrapper,
  Grid,
  Title,
  LeftSide,
  RightSide,
  Container,
  FormHeading,
  LogoContainer
}