import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AuthProvider } from "../auth";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
