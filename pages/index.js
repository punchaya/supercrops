import React from "react";
import styles from "../styles/home.module.scss";
import Layout from "../layout/layout";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <>
      <div className={styles.body2}>
        <div className={styles.Head}>
          <div className={styles.Head_logo}>
            <Image
              className={styles.Head_logo_image}
              src="/logo.jpg"
              width="80"
              height="80"
            />
          </div>
          <div className={styles.Head_name}>Farm Name: NewWorld Farm</div>
        </div>
        <div className={styles.box}>
          <p>
            <Image src="/info.png" width="30" height="30" />
            <label className={styles.title}>Custommer Detail</label>
            <label className={styles.create_date}>Create: xxxx-xx-xx</label>
          </p>
          <p>Customer Name:</p>
          <p>Package:</p>
          <p>Q'ty Users:</p>
          <p className={styles.highlight}>GateWay:</p>
          <p className={styles.highlight}>Analytics:</p>
          <p className={styles.highlight}>Block Chain:</p>
          <p>Expired Date: xxxx-xx-xx</p>
        </div>
        <div className={styles.box}>
          <p>
            <Image
              className={styles.Head_logo_image}
              src="/layout/farm.png"
              width="30"
              height="30"
            />
            <label className={styles.title}>FarmDetail</label>
          </p>
          <p>Number Farm:</p>
          <p>Number Node:</p>
          <p>Number Parameter:</p>
          <p>Number Dashboard:</p>
        </div>
      </div>
    </>
  );
}
Home.Layout = Layout;
