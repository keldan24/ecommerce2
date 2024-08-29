// pages/_app.js
import "../styles/bootstrap-custom.css";
import "../styles/globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Layout from "../components/layout";
import { SessionProvider } from "next-auth/react";

config.autoAddCss = false;
library.add(fab, fas, far);

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  console.log("MyApp component:", { session });
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      <Layout hideAuth={!session}>
        {getLayout(<Component {...pageProps} />)}
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
