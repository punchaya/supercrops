import React from "react";
import "../styles/globals.scss";
import Head from "next/head";
import Layout from "../layout/layout";
import firebase from "../assets/firebase";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;

  return (
    <>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Super Crops</title>​
        </Head>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
