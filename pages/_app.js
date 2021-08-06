import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery";
import "../styles/globals.scss";
import "../styles/gentelella/vendors/bootstrap/dist/css/bootstrap.min.css";
import "../styles/gentelella/vendors/font-awesome/css/font-awesome.min.css";
import "../styles/gentelella/vendors/nprogress/nprogress.css";
import "../styles/gentelella/vendors/animate.css/animate.min.css";
import "../styles/gentelella/build/css/custom.min.css";
import "../styles/gentelella/vendors/iCheck/skins/flat/green.css";
import "../styles/gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css";
import "../styles/gentelella/vendors/jqvmap/dist/jqvmap.min.css";
import "../styles/gentelella/vendors/bootstrap-daterangepicker/daterangepicker.css";
import "../styles/bootstrap-toggle.min.css";

import Head from "next/head";
import Layout from "../layout/layout";
import firebase from "../assets/firebase";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const [test, settest] = useState("");
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  return (
    <>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Super Crops</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          ​
        </Head>
        <Component {...pageProps} test={test} settest={settest} />
      </Layout>
    </>
  );
}

export default MyApp;
