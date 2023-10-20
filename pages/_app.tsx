import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { mainTheme } from "components/ThemeProvider/theme";
import { ThemeProvider } from "@mui/material";
import store from "store";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
