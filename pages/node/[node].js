import React, { useState, useEffect } from "react";
import farm from "../farm/[index]";
import { useRouter } from "next/router";
import Layout from "../../layout/layout";
import styles from "../../styles/node.module.scss";
import Image from "next/image";

async function fetchData() {
  const response = await fetch("http://localhost:3001/farms");
  const fetchedData = await response.json();

  return { fetchedData };
}

export default function node(props) {
  const router = useRouter();
  const Data = router.query;
  const [farmList, setFarmList] = useState(props.fetchedData);
  const [updateTime, setupdateTime] = useState(5000);

  async function reload() {
    const refreshedProps = await fetchData();
    setFarmList(refreshedProps.fetchedData);
  }
  function checkBox(chk, id) {
    var check = document.getElementById(chk).checked;
    if (check) {
      if (document.getElementById(id)) {
        document.getElementById(id).style.color = "black";
      }
    } else {
      if (document.getElementById(id)) {
        document.getElementById(id).style.color = "#969696";
      }
    }
  }
  var timeout = setTimeout(reload, updateTime);
  async function updateTimer(id) {
    if (document.getElementById(id)) {
      await clearTimeout(timeout);
      await console.log("time out clear");
      var milisec = document.getElementById(id).value * 60 * 1000;
      await setupdateTime(milisec);
    }
  }

  if (Data.node != undefined) {
    var FarmIndex = parseInt(Data.node[0] - 1);
    var nodeIndex = parseInt(Data.node[1]) - 1;
    var Farm = farmList[FarmIndex];
    var Node = Farm.nodelist[nodeIndex];
    return (
      <div className={styles.body}>
        <div className={styles.title}>
          <div className={styles.title_icon}>
            <Image src="/node.png" width="30" height="30" />
          </div>
          <div className={styles.title_text}>
            <label className={styles.titlehead}>
              {Farm.name} : Node{nodeIndex + 1}
            </label>
            <label className={styles.date}>Create : xxxx-xx-xx</label>
          </div>
        </div>
        <div className={styles.status}>
          <div className={styles.box_flex}>
            <Image src="/bar-chart.png" width="25" height="25" />
            <label> status : </label>
            <label className={styles.online}> {Node.status}</label>
          </div>

          <div className={styles.box_flex}>
            <Image src="/datetime.png" width="30" height="30" />
            <label>
              Update Every :{" "}
              <select
                id="updateEvery"
                onChange={() => updateTimer("updateEvery")}
              >
                <option value={1} selected={true} disabled>
                  select
                </option>
                <option value={0.05}>3s</option>
                <option value={1}>1min</option>
                <option value={5}>5min</option>
                <option value={10}>10min</option>
                <option value={20}>20min</option>
                <option value={30}>30min</option>
                <option value={60}>60min</option>
              </select>
              <button onClick={reload}>Refresh</button>
            </label>
            <label className={styles.right}>
              Update Time : {Node.updateTime}
            </label>
          </div>
        </div>

        <div className={styles.sensor}>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/temp.png" width="30" height="30" />
            </div>
            <label>Temp : {Node.temp}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/humid.png" width="30" height="30" />
            </div>
            <label>Humidity : {Node.humid}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/mois.png" width="30" height="30" />
            </div>
            <label>Moisture : {Node.mois}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/EC.png" width="30" height="30" />
            </div>
            <label>EC : {Node.ec}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/sun.png" width="30" height="30" />
            </div>
            <label>Light : {Node.Light}</label>
          </div>
          <div className={styles.sensor_box}></div>
        </div>
        <div className={styles.relay}>
          {Node.relay.map((relay) => {
            const [data1min, setdata1min] = useState(0);
            const [data1max, setdata1max] = useState(0);
            const [data2min, setdata2min] = useState(0);
            const [data2max, setdata2max] = useState(0);

            function sendData() {
              window.alert(
                "Relay" +
                  relay.id.toString() +
                  " : " +
                  data1min.toString() +
                  " , " +
                  data1max.toString() +
                  " , " +
                  data2min.toString() +
                  " , " +
                  data2max.toString()
              );
            }
            function rangeData(id, func) {
              var value = document.getElementById(id).value;
              func(value);
            }

            useEffect(() => {
              if (document.getElementById("status" + relay.id) !== null) {
                if (relay.status == "on") {
                  document.getElementById("status" + relay.id).checked = true;
                } else {
                  document.getElementById("status" + relay.id).checked = false;
                }
                if (document.getElementById("status" + relay.id).checked) {
                  document.getElementById("style" + relay.id).style.color =
                    "black";
                } else {
                  document.getElementById("style" + relay.id).style.color =
                    "#969696";
                }
              }
              if (document.getElementById("chkBa" + relay.id) !== null) {
                if (relay.OnOffTime === "on") {
                  document.getElementById("chkBa" + relay.id).checked = true;
                } else {
                  document.getElementById("chkBa" + relay.id).checked = false;
                }
              }
              if (document.getElementById("chkBb" + relay.id) !== null) {
                if (relay.OnOffData === "on") {
                  document.getElementById("chkBb" + relay.id).checked = true;
                } else {
                  document.getElementById("chkBb" + relay.id).checked = false;
                }
              }
            }, []);

            return (
              <div id={"style" + relay.id} className={styles.box}>
                <p>
                  <label>Relay 1</label>
                  <label className={styles.status}>
                    Status
                    <label className={styles.switch}>
                      <input
                        onClick={() =>
                          checkBox("status" + relay.id, "style" + relay.id)
                        }
                        id={"status" + relay.id}
                        type="checkbox"
                      />
                      <span className={styles.slider}></span>
                    </label>
                  </label>
                </p>
                <p>
                  <label>On/Off on Time : </label>
                  <label className={styles.switch}>
                    <input
                      onClick={() => checkBox("chkBa" + relay.id)}
                      id={"chkBa" + relay.id}
                      type="checkbox"
                    />
                    <span className={styles.slider}></span>
                  </label>
                </p>
                <p>
                  Time 1 : On: <input type="time" />
                  Off: <input type="time" />
                </p>
                <p>
                  Time 2 : On: <input type="time" />
                  Off: <input type="time" />
                </p>
                <p>
                  Time 3 : On: <input type="time" />
                  Off: <input type="time" />
                </p>
                <p>
                  <labe>On/Off on Data : </labe>
                  <label className={styles.switch}>
                    <input
                      onClick={() => checkBox("chkBb" + relay.id)}
                      id={"chkBb" + relay.id}
                      type="checkbox"
                    />
                    <span className={styles.slider}></span>
                  </label>
                </p>
                <p>Data 1 :</p>
                <p>
                  Min :
                  <input
                    id={relay.id + "data1min"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={data1min}
                    onChange={() =>
                      rangeData(relay.id + "data1min", setdata1min)
                    }
                  />
                  <label id={relay.id + "data1mintxt"}>{data1min}</label>
                </p>
                <p>
                  Max :
                  <input
                    id={relay.id + "data1max"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={data1max}
                    onChange={() =>
                      rangeData(relay.id + "data1max", setdata1max)
                    }
                  />
                  <label id={relay.id + "data1maxtxt"}>{data1max}</label>
                </p>
                <p>Data 2 :</p>
                <p>
                  Min :
                  <input
                    id={relay.id + "data2min"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={data2min}
                    onChange={() =>
                      rangeData(relay.id + "data2min", setdata2min)
                    }
                  />
                  <label id={relay.id + "data2mintxt"}>{data2min}</label>
                </p>
                <p>
                  Max :
                  <input
                    id={relay.id + "data2max"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={data2max}
                    onChange={() =>
                      rangeData(relay.id + "data2max", setdata2max)
                    }
                  />
                  <label id={relay.id + "data2maxtxt"}>{data2max}</label>
                </p>
                <p>
                  <button onClick={sendData}>Click</button>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Waiting...</p>
      </div>
    );
  }
}
node.Layout = Layout;

node.getInitialProps = fetchData;
