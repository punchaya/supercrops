import React, { useEffect, useState, GetStaticPaths } from "react";
import Layout from "../../layout/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/farm.module.scss";

export default function farm(props) {
  const router = useRouter();

  var farmList = [
    {
      name: "Green Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Red Farm",
      node: ["Node1", "Node2", "Node3", "Node4", "Node5"],
      numnode: "3",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Blue Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "yes",
      created: "2021-04-29",
    },
    {
      name: "Pink Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "no",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Orange Farm",
      node: ["Node1"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "no",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
  ];
  const Data = router.query;
  var Index = parseInt(Data.index) - 1;

  //
  function nodeModal(id) {
    if (document.getElementById(id).style.display) {
      if (document.getElementById(id).style.display == "none") {
        document.getElementById(id).style.display = "block";
      } else {
        document.getElementById(id).style.display = "none";
      }
    } else {
      document.getElementById(id).style.display = "block";
    }
  }
  if (Index >= 0) {
    farmList.map((farm) => {
      farm.node.map((node, i) => {
        if (document.getElementById(farm.name + "_node" + (i + 1))) {
          document.getElementById(farm.name + "_node" + (i + 1)).style.display =
            "none";
        }
      });
    });
    var Farm = farmList[Index];
    if (Farm.gateway == "yes") {
      var stylesGateway = styles.gatewayon;
    } else {
      var stylesGateway = styles.gatewayoff;
    }
    return (
      <div className={styles.body}>
        <div className={styles.box}>
          <label className={styles.head}>
            Farm {Index + 1}: {Farm.name}
          </label>
        </div>
        <div className={styles.box}>
          <label className={styles.head}>Dashboard</label>
        </div>
        <div className={styles.box}>
          <button id="gateway" className={stylesGateway}>
            GateWay
          </button>
          <Image src="/farm.png" width="800px" height="500px" />

          {Farm.node.map((val, index) => {
            var i = index + 1;
            var nodeStyle = "node_" + i; //ใช้ styles จาก global.css
            return (
              <div className={nodeStyle}>
                <button onClick={() => nodeModal(Farm.name + "_node" + i)}>
                  {val}
                </button>
                <div id={Farm.name + "_node" + i} className={styles.nodebox}>
                  <button>Edit</button>
                  <button
                    className={styles.close}
                    onClick={() => nodeModal(Farm.name + "_node" + i)}
                  >
                    X
                  </button>
                  <p>Node :{i}</p>
                  <p>Updatte Time : xx-xx-xxxx</p>
                  <p>Create : xx-xx-xxxx</p>
                  <p>Status : Online</p>
                  <p>Temp : xx</p>
                  <p>Humi : xx</p>
                  <p>Light : xx</p>
                  <p>Mois : xx</p>
                  <p>EC: xx</p>
                  <p>Relay 1 :On</p>
                  <p>Relay 2 :On</p>
                  <p>Relay 3 :On</p>
                  <p>On/Off on Time : On</p>
                  <p>On/Off on Date : On</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.box}>
          <p>
            <label className={styles.title}>Detail Farm</label>
          </p>
          <p>ประเภทพืช:</p>
          <p>ปลูกเมื่อ:</p>
          <p>วันที่จะต้องเก็บเกี่ยว:</p>
          <p>ประเภทปุ๋ย:</p>
          <p>จำนวน:</p>
          <p>ยอดเก็บเกี่ยว:</p>
          <p>ราคาขาย:</p>
          <p>ราคาตลาด:</p>
        </div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
}
farm.Layout = Layout;
