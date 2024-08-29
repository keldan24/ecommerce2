import Head from "next/head";
import Footer from "./footer";
import Header from "./header";

function Layout({ simpleHeader, hideAuth, children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="Best e-commerce app" />
        <link rel="icon" href="/favicon.ico" />
        <title>Keldan Mart</title>
      </Head>
      <div className="d-flex flex-column h-100">
        <Header simple={simpleHeader} hideAuth={hideAuth} />
        <main className="flex-shrink-0">{children}</main>
        <Footer hideAuth={hideAuth}/>
      </div>
    </>
  );
}

export default Layout;
