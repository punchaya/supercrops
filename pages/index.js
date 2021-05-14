import React from "react";
import styles from "../styles/home.module.scss";
import Layout from "../layout/layout";
import Image from "next/image";
export default function Home() {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.Head}>
          <div className={styles.Head_logo}>
            <Image
              className={styles.Head_logo_image}
              src="/logo.jpg"
              width="80"
              height="80"
            />
          </div>
          <div className={styles.Head_name}>Farm Name: </div>
        </div>
        <div className={styles.box}>
          <p>
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
