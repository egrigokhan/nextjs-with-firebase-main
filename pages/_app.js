import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AuthProvider } from "../auth";
import { APIProvider } from "../context/APIContext";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <APIProvider>
        <Component {...pageProps} />
      </APIProvider>
    </AuthProvider>
  );
}

export default MyApp;
