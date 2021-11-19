import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { AuthProvider } from "../auth";
import { APIProvider } from "../context/APIContext";
import "../styles/styles.css";

import { useEffect } from "react";
import Router from "next/router";
import { initGA, logPageView } from "../landing-page/analytics";
import "react-multi-carousel/lib/styles.css";
import "react-modal-video/css/modal-video.min.css";
import "rc-drawer/assets/index.css";
import "typeface-dm-sans";
import "typeface-dm-serif-display";
import "typeface-inter";
import { StripeProvider } from "../context/StripeContext";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initGA();
    logPageView();
    Router.events.on("routeChangeComplete", logPageView);
  }, []);
  return (
    <AuthProvider>
      <APIProvider>
        <StripeProvider>
          <Component {...pageProps} />
        </StripeProvider>
      </APIProvider>
    </AuthProvider>
  );
}

export default MyApp;
