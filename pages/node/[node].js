import React from "react";
import farm from "../farm/[index]";
import { useRouter } from "next/router";
import Layout from "../../layout/layout";
import styles from "../../styles/node.module.scss";
import Image from "next/image";

export default function node() {
  const router = useRouter();
  const Data = router.query;

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
      node: ["Node1", "Node2", "Node3"],
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
      gateway: "yes",
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
      gateway: "yes",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
  ];
  if (Data.node) {
    var FarmIndex = parseInt(Data.node[0] - 1);
    var nodeIndex = parseInt(Data.node[1]) - 1;
    var farmname = farmList[FarmIndex].name;
    var node = farmList[FarmIndex].node[nodeIndex];

    return (
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.title_icon}>
            <Image src="/node.png" width="30" height="30" />
          </div>
          <div className={styles.title_text}>
            <label className={styles.titlehead}> Node{nodeIndex + 1}</label>
            <label className={styles.date}>Create : xxxx-xx-xx</label>
          </div>
        </div>
        <div className={styles.status}>
          <div className={styles.box_flex}>
            <Image src="/bar-chart.png" width="25" height="25" />
            <label> status : </label>
            <label className={styles.offline}> online</label>
          </div>

          <div className={styles.box_flex}>
            <Image src="/datetime.png" width="30" height="30" />
            <label>Update Time</label>
          </div>
        </div>

        <div className={styles.sensor}>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/temp.png" width="30" height="30" />
            </div>
            <label>Temp : </label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/humid.png" width="30" height="30" />
            </div>
            <label>Humidity :</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/mois.png" width="30" height="30" />
            </div>
            <label>Moisture :</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/EC.png" width="30" height="30" />
            </div>
            <label>EC :</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/sun.png" width="30" height="30" />
            </div>
            <label>Light :</label>
          </div>
          <div className={styles.sensor_box}></div>
        </div>
        <div className={styles.relay}>
          <div className={styles.box}>
            <p>
              <label>Relay 1</label>
              <label>Status(on)</label>
            </p>
            <p>On/Off on Time : On or Off</p>
            <p>Time 1 :</p>
            <p>Time 2 :</p>
            <p>Time 3 :</p>
            <p>On/Off on Data : On or Off</p>
            <p>Data 1 :</p>
            <p>Min : </p>
            <p>Max : </p>
            <p>Data 2 :</p>
            <p>Min : </p>
            <p>Max : </p>
          </div>
          <div className={styles.box}>
            <p>
              <label>Relay 1</label>
              <label>Status(on)</label>
            </p>
            <p>On/Off on Time : On or Off</p>
            <p>Time 1 :</p>
            <p>Time 2 :</p>
            <p>Time 3 :</p>
            <p>On/Off on Data : On or Off</p>
            <p>Data 1 :</p>
            <p>Min : </p>
            <p>Max : </p>
            <p>Data 2 :</p>
            <p>Min : </p>
            <p>Max : </p>
          </div>
          <div className={styles.box}>
            <p>
              <label>Relay 1</label>
              <label>Status(on)</label>
            </p>
            <p>On/Off on Time : On or Off</p>
            <p>Time 1 :</p>
            <p>Time 2 :</p>
            <p>Time 3 :</p>
            <p>On/Off on Data : On or Off</p>
            <p>Data 1 :</p>
            <p>Min : </p>
            <p>Max : </p>
            <p>Data 2 :</p>
            <p>Min : </p>
            <p>Max : </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}
node.Layout = Layout;
