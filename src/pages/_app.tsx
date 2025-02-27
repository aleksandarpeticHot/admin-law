import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HeroUIProvider, } from "@heroui/react";
import { ThemeProvider, createGlobalStyle, DefaultTheme } from "styled-components";
import { ToastProvider } from "@heroui/toast";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const theme: DefaultTheme = {
  colors: {
    white: '#FFFFFF'
  },
  breakpoint: {
    mobileS: '320px',
    mobileM: '640px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1280px'
  }
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <ToastProvider
        placement={'top-right'}
        toastProps={{
          radius: "full",
          color: "primary",
          variant: "flat",
          timeout: 2000,
          hideIcon: true,
          classNames: {
            closeButton: "opacity-100 absolute right-4 top-1/2 -translate-y-1/2",
          },
        }}
      />
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </HeroUIProvider>
  );
}
