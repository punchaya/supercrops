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
  function updateTimer(id) {
    if (document.getElementById(id)) {
      clearTimeout(timeout);
      var milisec = document.getElementById(id).value * 60 * 1000;
      setupdateTime(milisec);
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
          {Node.RelayList.map((relays) => {
            const [data1min, setdata1min] = useState(relays.data1[1]);
            const [data1max, setdata1max] = useState(relays.data1[0]);
            const [data2min, setdata2min] = useState(relays.data2[1]);
            const [data2max, setdata2max] = useState(relays.data2[0]);
            function sendData() {
              window.alert(
                "Relay" +
                  relays.id.toString() +
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
              relays.data1[1] = value;
            }

            function getstatus() {
              if (typeof window !== "undefined") {
                if (document.getElementById("status" + relays.id) !== null) {
                  if (relays.status == true) {
                    document.getElementById(
                      "status" + relays.id
                    ).checked = true;
                  } else {
                    document.getElementById(
                      "status" + relays.id
                    ).checked = false;
                  }
                  if (document.getElementById("status" + relays.id).checked) {
                    document.getElementById("style" + relays.id).style.color =
                      "black";
                  } else {
                    document.getElementById("style" + relays.id).style.color =
                      "#969696";
                  }
                }
                if (document.getElementById("chkBa" + relays.id) !== null) {
                  if (relays.function_time == true) {
                    document.getElementById("chkBa" + relays.id).checked = true;
                  } else {
                    document.getElementById(
                      "chkBa" + relays.id
                    ).checked = false;
                  }
                }
                if (document.getElementById("chkBb" + relays.id) !== null) {
                  if (relays.function_data == true) {
                    document.getElementById("chkBb" + relays.id).checked = true;
                  } else {
                    document.getElementById(
                      "chkBb" + relays.id
                    ).checked = false;
                  }
                }
                if (document.getElementById(relays.id + "sun1")) {
                  if (relays.time1[2] == 1) {
                    document.getElementById(relays.id + "sun1").checked = true;
                  } else {
                    document.getElementById(relays.id + "sun1").checked = false;
                  }
                  var day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
                  for (let t = 1; t <= 3; t++) {
                    for (let index = 2; index < relays.time1.length; index++) {
                      if (
                        document.getElementById(relays.id + day[index - 2] + t)
                      ) {
                        if (relays.time1[index] == 1) {
                          document.getElementById(
                            relays.id + day[index - 2] + t
                          ).checked = true;
                        } else {
                          document.getElementById(
                            relays.id + day[index - 2] + t
                          ).checked = false;
                        }
                      }
                    }
                  }
                }
              }
            }
            getstatus();

            return (
              <div id={"style" + relays.id} className={styles.box}>
                <p>
                  <label>Relay 1</label>
                  <label className={styles.status}>
                    Status
                    <label className={styles.switch}>
                      <input
                        onClick={() =>
                          checkBox("status" + relays.id, "style" + relays.id)
                        }
                        id={"status" + relays.id}
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
                      onClick={() => checkBox("chkBa" + relays.id)}
                      id={"chkBa" + relays.id}
                      type="checkbox"
                    />
                    <span className={styles.slider}></span>
                  </label>
                </p>
                <p>
                  <label>Time 1 : On: </label>
                  <input id={relays.id + "time1on"} type="time" />
                  <label> Off: </label>
                  <input id={relays.id + "time1off"} type="time" />
                </p>
                <p>
                  <label>
                    <label>Day1 : </label>
                    <input type="checkbox" id={relays.id + "sun1"} />
                    <label for={relays.id + "sun1"}>Mon</label>
                    <input type="checkbox" id={relays.id + "mon1"} />
                    <label for={relays.id + "mon1"}>Tue</label>
                    <input type="checkbox" id={relays.id + "tue1"} />
                    <label for={relays.id + "tue1"}>Wed</label>
                    <input type="checkbox" id={relays.id + "wed1"} />
                    <label for={relays.id + "wed1"}>Thu</label>
                    <input type="checkbox" id={relays.id + "thu1"} />
                    <label for={relays.id + "thu1"}>Fri</label>
                    <input type="checkbox" id={relays.id + "fri1"} />
                    <label for={relays.id + "fri1"}>Sat</label>
                    <input type="checkbox" id={relays.id + "sat1"} />
                    <label for={relays.id + "sat1"}>Sun</label>
                  </label>
                </p>
                <p>
                  <label>Time 2 : On: </label>
                  <input id={relays.id + "time2on"} type="time" />
                  <label> Off: </label>
                  <input id={relays.id + "time2off"} type="time" />
                </p>
                <p>
                  <label>
                    <label>Day1 : </label>
                    <input type="checkbox" id={relays.id + "sun2"} />
                    <label for={relays.id + "sun2"}>Mon</label>
                    <input type="checkbox" id={relays.id + "mon2"} />
                    <label for={relays.id + "mon2"}>Tue</label>
                    <input type="checkbox" id={relays.id + "tue2"} />
                    <label for={relays.id + "tue2"}>Wed</label>
                    <input type="checkbox" id={relays.id + "wed2"} />
                    <label for={relays.id + "wed2"}>Thu</label>
                    <input type="checkbox" id={relays.id + "thu2"} />
                    <label for={relays.id + "thu2"}>Fri</label>
                    <input type="checkbox" id={relays.id + "fri2"} />
                    <label for={relays.id + "fri2"}>Sat</label>
                    <input type="checkbox" id={relays.id + "sat2"} />
                    <label for={relays.id + "sat2"}>Sun</label>
                  </label>
                </p>
                <p>
                  Time 3 : On: <input type="time" />
                  Off: <input type="time" />
                </p>
                <p>
                  <label>
                    <label>Day1 : </label>
                    <input type="checkbox" id={relays.id + "sun3"} />
                    <label for={relays.id + "sun3"}>Mon</label>
                    <input type="checkbox" id={relays.id + "mon3"} />
                    <label for={relays.id + "mon3"}>Tue</label>
                    <input type="checkbox" id={relays.id + "tue3"} />
                    <label for={relays.id + "tue3"}>Wed</label>
                    <input type="checkbox" id={relays.id + "wed3"} />
                    <label for={relays.id + "wed3"}>Thu</label>
                    <input type="checkbox" id={relays.id + "thu3"} />
                    <label for={relays.id + "thu3"}>Fri</label>
                    <input type="checkbox" id={relays.id + "fri3"} />
                    <label for={relays.id + "fri3"}>Sat</label>
                    <input type="checkbox" id={relays.id + "sat3"} />
                    <label for={relays.id + "sat3"}>Sun</label>
                  </label>
                </p>
                <p>
                  <labe>On/Off on Data : </labe>
                  <label className={styles.switch}>
                    <input
                      onClick={() => checkBox("chkBb" + relays.id)}
                      id={"chkBb" + relays.id}
                      type="checkbox"
                    />
                    <span className={styles.slider}></span>
                  </label>
                </p>
                <p>Data 1 :</p>
                <p>
                  Min :
                  <input
                    id={relays.id + "data1min"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={relays.data1[1]}
                    onChange={() =>
                      rangeData(relays.id + "data1min", setdata1min)
                    }
                  />
                  <label id={relays.id + "data1mintxt"}>
                    {relays.data1[1]}
                  </label>
                </p>
                <p>
                  Max :
                  <input
                    id={relays.id + "data1max"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={relays.data1[0]}
                    onChange={() =>
                      rangeData(relays.id + "data1max", setdata1max)
                    }
                  />
                  <label id={relays.id + "data1maxtxt"}>{data1max}</label>
                </p>
                <p>Data 2 :</p>
                <p>
                  Min :
                  <input
                    id={relays.id + "data2min"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={relays.data2[1]}
                    onChange={() =>
                      rangeData(relays.id + "data2min", setdata2min)
                    }
                  />
                  <label id={relays.id + "data2mintxt"}>{data2min}</label>
                </p>
                <p>
                  Max :
                  <input
                    id={relays.id + "data2max"}
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={relays.data2[0]}
                    onChange={() =>
                      rangeData(relays.id + "data2max", setdata2max)
                    }
                  />
                  <label id={relays.id + "data2maxtxt"}>{data2max}</label>
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
