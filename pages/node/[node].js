import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../layout/layout";
import styles from "../../styles/node.module.scss";
import Image from "next/image";
import axios from "axios";
import client from "../api/mqtt.js";
async function fetchData() {
  const response = await fetch("http://localhost:3001/farms");
  const noderes = await fetch(
    "http://203.151.136.201:10005/api/prototype/alpha/node1"
  );
  const nodeData = await noderes.json();
  const fetchedData = await response.json();

  return { fetchedData, nodeData };
}
export default function node(props) {
  const router = useRouter();
  const Data = router.query;
  const [farmList, setFarmList] = useState(props.fetchedData);
  const [tnode, settNode] = useState(props.nodeData);
  const [updateTime, setupdateTime] = useState(
    props.nodeData.refresh_time * 1000
  );
  const [mqttStat, setmqttStat] = useState(null);
  const [msgSend, setmsgSend] = useState(null);
  const [mqcontID, setmqcontID] = useState(null);

  client.on("connect", function () {
    client.subscribe("device/prototype/alpha/node1/relay", function (err) {
      if (!err) {
        client.publish("test", "testStart");
      }
    });
  });
  client.on("message", function (topic, message) {
    console.log(msgSend);
    if (message == "error") {
      if (typeof window !== "undefined") {
        document.getElementById("Waiting").style.display = "none";
        document.getElementById("err").style.display = "block";
      }
    } else {
      if (msgSend != null) {
        var jsonMassage = JSON.parse(msgSend);
        console.log("Recive massage => " + message);
        var preObj = jsonMassage;
        for (var keyTopic in jsonMassage) {
          var obj = jsonMassage[keyTopic];
          for (var key in obj) {
            if (
              key == "status" ||
              key == "time_function" ||
              key == "data_function"
            ) {
              console.log(obj[key]);
              if (obj[key]) {
                preObj[keyTopic][key] = "true";
                console.log("PreObject_true = " + JSON.stringify(preObj));
                putAxios(
                  "http://203.151.136.201:10005/api/update/prototype/alpha/node1/relay",
                  preObj
                );
                setmsgSend(null);
              } else {
                preObj[keyTopic][key] = "false";
                console.log("PreObject_false = " + JSON.stringify(preObj));
                putAxios(
                  "http://203.151.136.201:10005/api/update/prototype/alpha/node1/relay",
                  preObj
                );
                setmsgSend(null);
              }
            } else {
              console.log("PreObject = " + JSON.stringify(preObj));
              putAxios(
                "http://203.151.136.201:10005/api/update/prototype/alpha/node1/relay",
                preObj
              );
              setmsgSend(null);
            }
          }
        }
      } else {
        if (IsJsonString(message)) {
          var jsonMassage = JSON.parse(message);
          console.log("Recive massage => " + message);
          var preObj = jsonMassage;
          for (var keyTopic in jsonMassage) {
            var obj = jsonMassage[keyTopic];
            for (var key in obj) {
              if (
                key == "status" ||
                key == "time_function" ||
                key == "data_function"
              ) {
                console.log(obj[key]);
                if (obj[key]) {
                  preObj[keyTopic][key] = "true";
                  console.log("PreObject_true = " + JSON.stringify(preObj));
                  putAxios(
                    "http://203.151.136.201:10005/api/update/prototype/alpha/node1/relay",
                    preObj
                  );
                } else {
                  preObj[keyTopic][key] = "false";
                  console.log("PreObject_false = " + JSON.stringify(preObj));
                  putAxios(
                    "http://203.151.136.201:10005/api/update/prototype/alpha/node1/relay",
                    preObj
                  );
                }
              } else {
                console.log("PreObject = " + JSON.stringify(preObj));
                putAxios(
                  "http://203.151.136.201:10005/api/update/prototype/alpha/node1/relay",
                  preObj
                );
              }
            }
          }
        } else {
          console.log("Recive massage => " + message);
        }
      }
      if (typeof window !== "undefined") {
        document.getElementById("Waiting").style.display = "none";
        console.log("1 msgSend = " + msgSend);
        if (msgSend != null) {
          document.getElementById("Success").style.display = "block";
          setmsgSend(null);
          console.log("2 msgSend = " + msgSend);
        }
      }
    }
  });
  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  async function putTime(relay, timeonid, timeoffid, index) {
    var weekday = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    var time = [];
    var timeon = document.getElementById(timeonid).value;
    var timeoff = document.getElementById(timeoffid).value;
    time.push(timeon, timeoff);
    for (let i = 0; i < weekday.length; i++) {
      const day = weekday[i];
      const daycheck = document.getElementById(relay + day + index).checked;
      if (daycheck) {
        time.push(1);
      } else {
        time.push(0);
      }
    }
    if (index == 1) {
      if (relay == "Relay1") {
        var reqData = { relay1: { time1: time } };
      } else if (relay == "Relay2") {
        var reqData = { relay2: { time1: time } };
      } else if (relay == "Relay3") {
        var reqData = { relay3: { time1: time } };
      }
    } else if (index == 2) {
      if (relay == "Relay1") {
        var reqData = { relay1: { time2: time } };
      } else if (relay == "Relay2") {
        var reqData = { relay2: { time2: time } };
      } else if (relay == "Relay3") {
        var reqData = { relay3: { time2: time } };
      }
    } else if (index == 3) {
      if (relay == "Relay1") {
        var reqData = { relay1: { time3: time } };
      } else if (relay == "Relay2") {
        var reqData = { relay2: { time3: time } };
      } else if (relay == "Relay3") {
        var reqData = { relay3: { time3: time } };
      }
    }
    client.publish(
      "update/prototype/alpha/node1/relay",
      JSON.stringify(reqData),
      function (err) {
        if (!err) {
          document.getElementById("Waiting").style.display = "block";
          setmsgSend(JSON.stringify(reqData));
        } else {
          console.log(err);
        }
      }
    );
  }
  async function putDataMn(relay, minid, maxid, dataindex) {
    var mindata = document.getElementById(minid).value;
    var maxdata = document.getElementById(maxid).value;
    if (dataindex == 1) {
      if (relay == "Relay1") {
        var reqData = { relay1: { data1: { max: maxdata, min: mindata } } };
      } else if (relay == "Relay2") {
        var reqData = { relay2: { data1: { max: maxdata, min: mindata } } };
      } else if (relay == "Relay3") {
        var reqData = { relay3: { data1: { max: maxdata, min: mindata } } };
      }
    } else if (dataindex == 2) {
      if (relay == "Relay1") {
        var reqData = { relay1: { data2: { max: maxdata, min: mindata } } };
      } else if (relay == "Relay2") {
        var reqData = { relay2: { data2: { max: maxdata, min: mindata } } };
      } else if (relay == "Relay3") {
        var reqData = { relay3: { data2: { max: maxdata, min: mindata } } };
      }
    }
    client.publish(
      "update/prototype/alpha/node1/relay",
      JSON.stringify(reqData),
      function (err) {
        if (!err) {
          document.getElementById("Waiting").style.display = "block";
          setmsgSend(JSON.stringify(reqData));
        } else {
          console.log(err);
        }
      }
    );
  }

  async function reload() {
    const refreshedProps = await fetchData();
    setFarmList(refreshedProps.fetchedData);
    settNode(refreshedProps.nodeData);
  }
  async function putAxios(url, data) {
    console.log(data);
    await axios
      .put(url, data)
      .then((response) => {
        console.log(`sent data => ${JSON.stringify(data)}`);
      })
      .catch((err) => {
        console.error(err);
      });
    reload();
  }
  async function checkBox(chk, relay, type) {
    var check = document.getElementById(chk).checked;
    if (relay == "Relay1") {
      if (type == "status") {
        var publishTrue = `{ "relay1": { "status": true } }`;
        var publishFalse = `{ "relay1": { "status": false } }`;
      } else if (type == "time") {
        var publishTrue = `{ "relay1": { "time_function": true } }`;
        var publishFalse = `{ "relay1": { "time_function": false } }`;
      } else if (type == "data") {
        var publishTrue = `{ "relay1": { "data_function": true } }`;
        var publishFalse = `{ "relay1": { "data_function": false } }`;
      }
    } else if (relay == "Relay2") {
      if (type == "status") {
        var publishTrue = `{ "relay2": { "status": true } }`;
        var publishFalse = `{ "relay2": { "status": false } }`;
      } else if (type == "time") {
        var publishTrue = `{ "relay2": { "time_function": true } }`;
        var publishFalse = `{ "relay2": { "time_function": false } }`;
      } else if (type == "data") {
        var publishTrue = `{ "relay2": { "data_function": true } }`;
        var publishFalse = `{ "relay2": { "data_function": false } }`;
      }
    } else if (relay == "Relay3") {
      if (type == "status") {
        var publishTrue = `{ "relay3": { "status": true } }`;
        var publishFalse = `{ "relay3": { "status": false } }`;
      } else if (type == "time") {
        var publishTrue = `{ "relay3": { "time_function": true } }`;
        var publishFalse = `{ "relay3": { "time_function": false } }`;
      } else if (type == "data") {
        var publishTrue = `{ "relay3": { "data_function": true } }`;
        var publishFalse = `{ "relay3": { "data_function": false } }`;
      }
    }
    if (check) {
      client.publish(
        "update/prototype/alpha/node1/relay",
        publishTrue,
        function (err) {
          if (!err) {
            document.getElementById("Waiting").style.display = "block";
            setmsgSend(publishTrue);
          } else {
            console.log(err);
          }
        }
      );
    } else {
      client.publish(
        "update/prototype/alpha/node1/relay",
        publishFalse,
        function (err) {
          if (!err) {
            document.getElementById("Waiting").style.display = "block";
            setmsgSend(publishFalse);
          } else {
            console.log(err);
          }
        }
      );
    }
  }

  //var timeout = setTimeout(reload, updateTime);
  function updateTimer(id) {
    if (document.getElementById(id)) {
      //clearTimeout(timeout);
      var milisec = document.getElementById(id).value * 60 * 1000;
      setupdateTime(milisec);
    }
  }

  function getstatus() {
    var relays = ["Relay1", "Relay2", "Relay3"];

    if (typeof window !== "undefined") {
      for (let i = 0; i < relays.length; i++) {
        var relay = relays[i];
        if (relay == "Relay1") {
          var nodeRelay = tnode.relay1;
        } else if (relay == "Relay2") {
          var nodeRelay = tnode.relay2;
        } else if (relay == "Relay3") {
          var nodeRelay = tnode.relay3;
        }
        if (document.getElementById(relay + "data1min") !== null) {
          document.getElementById(relay + "data1min").value =
            nodeRelay.data1.min;
          document.getElementById(relay + "data1mintxt").innerHTML =
            nodeRelay.data1.min;
          document.getElementById(relay + "data1max").value =
            nodeRelay.data1.max;
          document.getElementById(relay + "data1maxtxt").innerHTML =
            nodeRelay.data1.max;
          document.getElementById(relay + "data2min").value =
            nodeRelay.data2.min;
          document.getElementById(relay + "data2mintxt").innerHTML =
            nodeRelay.data2.min;
          document.getElementById(relay + "data2max").value =
            nodeRelay.data2.max;
          document.getElementById(relay + "data2maxtxt").innerHTML =
            nodeRelay.data2.max;
        }
        if (document.getElementById("status" + relay) !== null) {
          if (nodeRelay.status == true) {
            document.getElementById("status" + relay).checked = true;
          } else {
            document.getElementById("status" + relay).checked = false;
          }
        }
        if (document.getElementById("chkBa" + relay) !== null) {
          if (nodeRelay.time_function == true) {
            document.getElementById("chkBa" + relay).checked = true;
          } else {
            document.getElementById("chkBa" + relay).checked = false;
          }
        }
        if (document.getElementById("chkBb" + relay) !== null) {
          if (nodeRelay.data_function == true) {
            document.getElementById("chkBb" + relay).checked = true;
          } else {
            document.getElementById("chkBb" + relay).checked = false;
          }
        }
        if (document.getElementById(relay + "sun1")) {
          var day = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
          for (let t = 1; t <= 3; t++) {
            for (let index = 2; index < nodeRelay.time1.length; index++) {
              if (document.getElementById(relay + day[index - 2] + t)) {
                if ((t = 1)) {
                  if (nodeRelay.time1[index] == 1) {
                    document.getElementById(
                      relay + day[index - 2] + t
                    ).checked = true;
                    document.getElementById(
                      "shw" + relay + day[index - 2] + t
                    ).className = styles.dayOn;
                  } else {
                    document.getElementById(
                      relay + day[index - 2] + t
                    ).checked = false;
                    document.getElementById(
                      "shw" + relay + day[index - 2] + t
                    ).className = styles.dayOff;
                  }
                }
                if ((t = 2)) {
                  if (nodeRelay.time2[index] == 1) {
                    document.getElementById(
                      relay + day[index - 2] + t
                    ).checked = true;
                    document.getElementById(
                      "shw" + relay + day[index - 2] + t
                    ).className = styles.dayOn;
                  } else {
                    document.getElementById(
                      relay + day[index - 2] + t
                    ).checked = false;
                    document.getElementById(
                      "shw" + relay + day[index - 2] + t
                    ).className = styles.dayOff;
                  }
                }
                if ((t = 3)) {
                  if (nodeRelay.time3[index] == 1) {
                    document.getElementById(
                      relay + day[index - 2] + t
                    ).checked = true;
                    document.getElementById(
                      "shw" + relay + day[index - 2] + t
                    ).className = styles.dayOn;
                  } else {
                    document.getElementById(
                      relay + day[index - 2] + t
                    ).checked = false;
                    document.getElementById(
                      "shw" + relay + day[index - 2] + t
                    ).className = styles.dayOff;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  getstatus();
  if (Data.node != undefined) {
    var FarmIndex = parseInt(Data.node[4]) - 1;
    var nodeIndex = parseInt(Data.node[9]) - 1;
    var Farm = farmList[FarmIndex];
    var Node = Farm.nodelist[nodeIndex];
    useEffect(() => {
      sessionStorage.title = "Farm " + (FarmIndex + 1) + " : " + Farm.name;
      reload();
    }, []);
    if (tnode.status == true) {
      var statusStyle = styles.online;
      var statusTxt = "Online";
    } else if (tnode.status == false) {
      var statusStyle = styles.offline;
      var statusTxt = "Offline";
    } else {
      var statusStyle = styles.problem;
      var statusTxt = "Error";
    }

    var RelayList = ["Relay1", "Relay2", "Relay3"];

    useEffect(() => {
      var relays = ["Relay1", "Relay2", "Relay3"];
      for (let i = 0; i < relays.length; i++) {
        var relay = relays[i];
        if (relay == "Relay1") {
          var nodeRelay = tnode.relay1;
        } else if (relay == "Relay2") {
          var nodeRelay = tnode.relay2;
        } else if (relay == "Relay3") {
          var nodeRelay = tnode.relay3;
        }
        document.getElementById(relay + "data1min").value = nodeRelay.data1.min;
        document.getElementById(relay + "data1mintxt").innerHTML =
          nodeRelay.data1.min;
        document.getElementById(relay + "data1max").value = nodeRelay.data1.max;
        document.getElementById(relay + "data1maxtxt").innerHTML =
          nodeRelay.data1.max;
        document.getElementById(relay + "data2min").value = nodeRelay.data2.min;
        document.getElementById(relay + "data2mintxt").innerHTML =
          nodeRelay.data2.min;
        document.getElementById(relay + "data2max").value = nodeRelay.data2.max;
        document.getElementById(relay + "data2maxtxt").innerHTML =
          nodeRelay.data2.max;
      }
    }, []);

    function modalOn(id) {
      document.getElementById(id).style.display = "block";
    }
    function modalOff(id) {
      document.getElementById(id).style.display = "none";
    }

    return (
      <div className={styles.body}>
        <div id={"Waiting"} className={styles.modal_wait}>
          <div className={styles.waiting}>
            <div className={styles.lds_dual_ring}></div>
            <div></div>
            <div>Waiting</div>
          </div>
        </div>
        <div id={"Success"} className={styles.modal_wait}>
          <div className={styles.waiting}>
            <div className="success-checkmark">
              <div className="check-icon">
                <span className="icon-line line-tip"></span>
                <span className="icon-line line-long"></span>
                <div className="icon-circle"></div>
                <div className="icon-fix"></div>
              </div>
            </div>
            <div className="color-green">Success</div>
            <button
              className={styles.Success_button}
              onClick={() => modalOff("Success")}
            >
              OK
            </button>
          </div>
        </div>
        <div id={"err"} className={styles.modal_wait}>
          <div className={styles.waiting}>
            <div class="error-banmark">
              <div class="ban-icon">
                <span class="icon-line line-long-invert"></span>
                <span class="icon-line line-long"></span>
                <div class="icon-circle"></div>
                <div class="icon-fix"></div>
              </div>
            </div>
            <div className="color-red">Error</div>
            <button
              className={styles.error_button}
              onClick={() => modalOff("err")}
            >
              Close
            </button>
          </div>
        </div>
        <div className={styles.title}>
          <div className={styles.title_icon}>
            <Image src="/node.png" width="30" height="30" />
          </div>
          <div className={styles.title_text}>
            <label className={styles.titlehead}>
              {Farm.name} : {tnode._id}
            </label>
            <label className={styles.date}>Create : {tnode.create_date}</label>
          </div>
        </div>
        <div className={styles.status}>
          <div className={styles.box_flex}>
            <Image src="/bar-chart.png" width="25" height="25" />
            <label> status : </label>
            <label className={statusStyle}> {statusTxt}</label>
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
            <label>Temp : {tnode.data.temperature}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/humid.png" width="30" height="30" />
            </div>
            <label>Humidity : {tnode.data.humidity}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/mois.png" width="30" height="30" />
            </div>
            <label>Moisture : {tnode.data.moisture}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/EC.png" width="30" height="30" />
            </div>
            <label>EC : {tnode.data.ec.toFixed(2)}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/sun.png" width="30" height="30" />
            </div>
            <label>Light : {tnode.data.light}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/RainV.png" width="30" height="30" />
            </div>
            <label>Rain Volume : {tnode.data.rain_volume}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/windS.png" width="30" height="30" />
            </div>
            <label>Wind Speed : {tnode.data.wind_speed}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/windD.png" width="30" height="30" />
            </div>
            <label>Wind Direct : {tnode.data.wind_direction}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/pm25.png" width="30" height="30" />
            </div>
            <label>PM2.5 : {tnode.data.pm2_5}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/pm10.png" width="30" height="30" />
            </div>
            <label>PM10 : {tnode.data.pm10}</label>
          </div>
          <div className={styles.sensor_box}>
            <div>
              <Image src="/co2.png" width="30" height="30" />
            </div>
            <label>Co2 : {tnode.data.co2}</label>
          </div>
        </div>

        <div className={styles.relay}>
          {RelayList.map((relay, index) => {
            if (relay == "Relay1") {
              var nodeRelay = tnode.relay1;
            } else if (relay == "Relay2") {
              var nodeRelay = tnode.relay2;
            } else if (relay == "Relay3") {
              var nodeRelay = tnode.relay3;
            }
            function rangeData(id, ot, relays_data) {
              var value = document.getElementById(id).value;
              var output = document.getElementById(ot);
              if (relays_data == "data1min") {
                nodeRelay.data1.min = value;
                output.innerHTML = nodeRelay.data1.min;
              } else if (relays_data == "data1max") {
                nodeRelay.data1.max = value;
                output.innerHTML = nodeRelay.data1.max;
              } else if (relays_data == "data2min") {
                nodeRelay.data2.min = value;
                output.innerHTML = nodeRelay.data2.min;
              } else if (relays_data == "data2max") {
                nodeRelay.data2.max = value;
                output.innerHTML = nodeRelay.data2.max;
              }
            }
            if (nodeRelay.status) {
              var status = "Online";
              var shwstatStyle = styles.online;
              var datafunction = "";
              useEffect(() => {
                document.getElementById("status" + relay).checked = true;
              }, []);
            } else {
              var status = "Offline";
              var shwstatStyle = styles.offline;
              useEffect(() => {
                document.getElementById("status" + relay).checked = false;
              }, []);
            }
            if (nodeRelay.time_function) {
              var shwtimefunction = "On";
              var shwtimeShwStyle = styles.online;
            } else {
              var shwtimefunction = "Off";
              var shwtimeShwStyle = styles.offline;
            }
            if (nodeRelay.data_function) {
              var shwdatafunction = "On";
              var shwdataStyle = styles.online;
            } else {
              var shwdatafunction = "Off";
              var shwdataStyle = styles.offline;
            }

            return (
              <div>
                {/*Relay editor Timer */}
                <div id={"modalstyleTime" + relay} className={styles.modal}>
                  <div id={"style" + relay} className={styles.box_hide}>
                    <div className={styles.relaypart_flex}>
                      <label>
                        <Image src="/datetime.png" width="30" height="30" />
                      </label>

                      <label className={styles.editorHead}>
                        {relay} Time Setting
                      </label>
                      <label className={styles.fright}>Status</label>
                      <label className={styles.switch2}>
                        <input
                          onClick={() =>
                            checkBox("chkBa" + relay, relay, "time")
                          }
                          id={"chkBa" + relay}
                          type="checkbox"
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                    <div className={styles.relaypart}>
                      <div className={styles.line_flex_time}>
                        <label>Time 1 Setting : On: </label>
                        <input
                          id={relay + "time1on"}
                          type="time"
                          defaultValue={nodeRelay.time1[0]}
                        />
                        <label> Off: </label>
                        <input
                          id={relay + "time1off"}
                          type="time"
                          defaultValue={nodeRelay.time1[1]}
                        />

                        <button
                          className={styles.apply}
                          onClick={() =>
                            putTime(
                              relay,
                              relay + "time1on",
                              relay + "time1off",
                              1
                            )
                          }
                        >
                          <Image src="/save_white.png" width={20} height={20} />
                          Save
                        </button>
                      </div>
                      <p>
                        <label>Day1 Setting : </label>
                      </p>
                      <p>
                        <div className={styles.weekday}>
                          <label>
                            <input type="checkbox" id={relay + "sun1"} />
                            <label for={relay + "sun1"}>Sunday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "mon1"} />
                            <label for={relay + "mon1"}>Monday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "tue1"} />
                            <label for={relay + "tue1"}>Tuesday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "wed1"} />
                            <label for={relay + "wed1"}>Wednesday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "thu1"} />
                            <label for={relay + "thu1"}>Thursday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "fri1"} />
                            <label for={relay + "fri1"}>Friday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "sat1"} />
                            <label for={relay + "sat1"}>Saturday</label>
                          </label>
                        </div>
                      </p>
                    </div>
                    <div className={styles.relaypart}>
                      <div className={styles.line_flex_time}>
                        <label>Time 2 Setting : On: </label>
                        <input
                          id={relay + "time2on"}
                          type="time"
                          defaultValue={nodeRelay.time2[0]}
                        />
                        <label> Off: </label>
                        <input
                          id={relay + "time2off"}
                          type="time"
                          defaultValue={nodeRelay.time2[1]}
                        />

                        <button
                          className={styles.apply}
                          onClick={() =>
                            putTime(
                              relay,
                              relay + "time2on",
                              relay + "time2off",
                              2
                            )
                          }
                        >
                          <Image src="/save_white.png" width={20} height={20} />
                          Save
                        </button>
                      </div>
                      <p>
                        <label>Day2 Setting : </label>
                      </p>
                      <p>
                        <div className={styles.weekday}>
                          <label>
                            <input type="checkbox" id={relay + "sun2"} />
                            <label for={relay + "sun2"}>Sunday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "mon2"} />
                            <label for={relay + "mon2"}>Monday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "tue2"} />
                            <label for={relay + "tue2"}>Tuesday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "wed2"} />
                            <label for={relay + "wed2"}>Wednesday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "thu2"} />
                            <label for={relay + "thu2"}>Thursday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "fri2"} />
                            <label for={relay + "fri2"}>Friday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "sat2"} />
                            <label for={relay + "sat2"}>Saturday</label>
                          </label>
                        </div>
                      </p>
                    </div>
                    <div className={styles.relaypart}>
                      <div className={styles.line_flex_time}>
                        <label>Time 3 Setting : On:</label>
                        <input
                          id={relay + "time3on"}
                          type="time"
                          defaultValue={nodeRelay.time3[0]}
                        />
                        <label>Off: </label>
                        <input
                          id={relay + "time3off"}
                          type="time"
                          defaultValue={nodeRelay.time3[1]}
                        />

                        <button
                          className={styles.apply}
                          onClick={() =>
                            putTime(
                              relay,
                              relay + "time3on",
                              relay + "time3off",
                              3
                            )
                          }
                        >
                          <Image src="/save_white.png" width={20} height={20} />
                          Save
                        </button>
                      </div>
                      <p>
                        <label>Day3 Setting: </label>
                      </p>
                      <p>
                        <div className={styles.weekday}>
                          <label>
                            <input type="checkbox" id={relay + "sun3"} />
                            <label for={relay + "sun3"}>Sunday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "mon3"} />
                            <label for={relay + "mon3"}>Monday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "tue3"} />
                            <label for={relay + "tue3"}>Tuesday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "wed3"} />
                            <label for={relay + "wed3"}>Wednesday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "thu3"} />
                            <label for={relay + "thu3"}>Thursday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "fri3"} />
                            <label for={relay + "fri3"}>Friday</label>
                          </label>
                          <label>
                            <input type="checkbox" id={relay + "sat3"} />
                            <label for={relay + "sat3"}>Saturday</label>
                          </label>
                        </div>
                      </p>
                    </div>

                    <button
                      className={styles.close}
                      onClick={() => modalOff("modalstyleTime" + relay)}
                    >
                      Close
                    </button>
                  </div>
                </div>
                {/*Relay editor Data */}
                <div id={"modalstyleData" + relay} className={styles.modal}>
                  <div id={"style" + relay} className={styles.box_hide}>
                    <div className={styles.relaypart_flex}>
                      <label>
                        <Image src="/dataSetting.png" width="30" height="30" />
                      </label>

                      <label className={styles.editorHead}>
                        {relay} Data Setting
                      </label>
                      <label className={styles.fright}>Status</label>
                      <label className={styles.switch2}>
                        <input
                          onClick={() =>
                            checkBox("chkBb" + relay, relay, "data")
                          }
                          id={"chkBb" + relay}
                          type="checkbox"
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                    <div className={styles.relaypart}>
                      <div className={styles.line_flex}>
                        <label className={styles.left2}>Data 1 :</label>

                        <button
                          className={styles.apply}
                          onClick={() =>
                            putDataMn(
                              relay,
                              relay + "data1min",
                              relay + "data1max",
                              1
                            )
                          }
                        >
                          <Image src="/save_white.png" width={20} height={20} />
                          Save
                        </button>
                      </div>
                      <p>
                        Min :
                        <input
                          id={relay + "data1min"}
                          type="range"
                          min="0"
                          max="100"
                          onChange={() =>
                            rangeData(
                              relay + "data1min",
                              relay + "data1mintxt",
                              "data1min"
                            )
                          }
                        />
                        <label id={relay + "data1mintxt"}>
                          {nodeRelay.data1.min}
                        </label>
                      </p>
                      <p>
                        Max :
                        <input
                          id={relay + "data1max"}
                          type="range"
                          min="0"
                          max="100"
                          onChange={() =>
                            rangeData(
                              relay + "data1max",
                              relay + "data1maxtxt",
                              "data1max"
                            )
                          }
                        />
                        <label id={relay + "data1maxtxt"}>
                          {nodeRelay.data1.max}
                        </label>
                      </p>
                    </div>
                    <div className={styles.relaypart}>
                      <div className={styles.line_flex}>
                        <label className={styles.left2}>Data 2 :</label>
                        <button
                          className={styles.apply}
                          onClick={() =>
                            putDataMn(
                              relay,
                              relay + "data2min",
                              relay + "data2max",
                              2
                            )
                          }
                        >
                          <Image src="/save_white.png" width={20} height={20} />
                          Save
                        </button>
                      </div>
                      <p>
                        Min :
                        <input
                          id={relay + "data2min"}
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          onChange={() =>
                            rangeData(
                              relay + "data2min",
                              relay + "data2mintxt",
                              "data2min"
                            )
                          }
                        />
                        <label id={relay + "data2mintxt"}>
                          {nodeRelay.data2.min}
                        </label>
                      </p>
                      <p>
                        Max :
                        <input
                          id={relay + "data2max"}
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          onChange={() =>
                            rangeData(
                              relay + "data2max",
                              relay + "data2maxtxt",
                              "data2max"
                            )
                          }
                        />
                        <label id={relay + "data2maxtxt"}>
                          {nodeRelay.data2.max}
                        </label>
                      </p>
                    </div>

                    <button
                      className={styles.close}
                      onClick={() => modalOff("modalstyleData" + relay)}
                    >
                      Close
                    </button>
                  </div>
                </div>
                {/*Relay Show */}
                <div id={"modalconfStatus" + relay} className={styles.modal}>
                  <div className={styles.box_hidemini}>
                    <button
                      onClick={() =>
                        checkBox("status" + relay, relay, "status")
                      }
                    >
                      yes
                    </button>
                    <button onClick={() => modalOff("modalconfStatus" + relay)}>
                      no
                    </button>
                  </div>
                </div>
                <div id={"ShowStyle" + relay} className={styles.box_show}>
                  <div className={styles.relaypart}>
                    <p>
                      <div className={styles.line_flex}>
                        <label className={styles.marginleft}>
                          Relay {index + 1}
                        </label>
                        <label>
                          Status
                          <label className={styles.switch}>
                            <input
                              onClick={() =>
                                checkBox("status" + relay, relay, "status")
                              }
                              id={"status" + relay}
                              type="checkbox"
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </label>
                      </div>
                    </p>
                  </div>

                  <div className={styles.relaypart}>
                    <div className={styles.line_flex}>
                      <Image src="/datetime.png" width="30" height="30" />
                      <label className={styles.marginleft}>Timer Setting</label>
                      <Image
                        className={styles.imgsetting}
                        src="/settings.png"
                        width="30"
                        height="30"
                        onClick={() => modalOn("modalstyleTime" + relay)}
                      />
                    </div>
                    <p>
                      <label>On/Off on Time : </label>
                      <label className={shwtimeShwStyle}>
                        {shwtimefunction}
                      </label>
                    </p>
                    <p>
                      <label>Time 1 : On: </label>
                      <label className={styles.datatxt}>
                        {nodeRelay.time1[0]}
                      </label>
                      <label> Off: </label>
                      <label className={styles.datatxt}>
                        {nodeRelay.time1[1]}
                      </label>
                    </p>
                    <p>
                      <label>
                        <label>Day1 : </label>
                        <label id={"shw" + relay + "sun1"}>Sun</label>
                        <label id={"shw" + relay + "mon1"}>Mon</label>
                        <label id={"shw" + relay + "tue1"}>Tue</label>
                        <label id={"shw" + relay + "wed1"}>Wed</label>
                        <label id={"shw" + relay + "thu1"}>Thu</label>
                        <label id={"shw" + relay + "fri1"}>Fri</label>
                        <label id={"shw" + relay + "sat1"}>Sat</label>
                      </label>
                    </p>
                    <p>
                      <label>Time 2 : On: </label>
                      <label className={styles.datatxt}>
                        {nodeRelay.time2[0]}
                      </label>
                      <label> Off: </label>
                      <label className={styles.datatxt}>
                        {nodeRelay.time2[1]}
                      </label>
                    </p>
                    <p>
                      <label>
                        <label>Day2 : </label>
                        <label id={"shw" + relay + "sun2"}>Sun</label>
                        <label id={"shw" + relay + "mon2"}>Mon</label>
                        <label id={"shw" + relay + "tue2"}>Tue</label>
                        <label id={"shw" + relay + "wed2"}>Wed</label>
                        <label id={"shw" + relay + "thu2"}>Thu</label>
                        <label id={"shw" + relay + "fri2"}>Fri</label>
                        <label id={"shw" + relay + "sat2"}>Sat</label>
                      </label>
                    </p>
                    <p>
                      <label>Time 3 : On:</label>{" "}
                      <label className={styles.datatxt}>
                        {nodeRelay.time3[0]}
                      </label>
                      <label> Off: </label>
                      <label className={styles.datatxt}>
                        {nodeRelay.time3[1]}
                      </label>
                    </p>
                    <p>
                      <label>
                        <label>Day3 : </label>
                        <label id={"shw" + relay + "sun3"}>Sun</label>
                        <label id={"shw" + relay + "mon3"}>Mon</label>
                        <label id={"shw" + relay + "tue3"}>Tue</label>
                        <label id={"shw" + relay + "wed3"}>Wed</label>
                        <label id={"shw" + relay + "thu3"}>Thu</label>
                        <label id={"shw" + relay + "fri3"}>Fri</label>
                        <label id={"shw" + relay + "sat3"}>Sat</label>
                      </label>
                    </p>
                  </div>
                  <div className={styles.relaypart}>
                    <div className={styles.line_flex}>
                      <Image src="/dataSetting.png" width="30" height="30" />
                      <label className={styles.marginleft}>Data Setting</label>
                      <Image
                        className={styles.imgsetting}
                        src="/settings.png"
                        width="30"
                        height="30"
                        onClick={() => modalOn("modalstyleData" + relay)}
                      />
                    </div>
                    <p>
                      <labe>On/Off on Data : </labe>
                      <label className={shwdataStyle}>{shwdatafunction}</label>
                    </p>
                    <p>
                      <label>Data 1 :</label>
                    </p>
                    <p>
                      <label>Min : </label>
                      <label
                        id={"show" + relay + "data1mintxt"}
                        className={styles.datatxt}
                      >
                        {nodeRelay.data1.min}
                      </label>
                      <label> Max : </label>
                      <label
                        id={"show" + relay + "data1maxtxt"}
                        className={styles.datatxt}
                      >
                        {nodeRelay.data1.max}
                      </label>
                    </p>
                    <p>
                      <label>Data 2 : </label>
                    </p>
                    <p>
                      <label>Min :</label>

                      <label
                        id={"show" + relay + "data2mintxt"}
                        className={styles.datatxt}
                      >
                        {nodeRelay.data2.min}
                      </label>
                      <label> Max : </label>
                      <label
                        id={"show" + relay + "data2maxtxt"}
                        className={styles.datatxt}
                      >
                        {nodeRelay.data2.max}
                      </label>
                    </p>
                  </div>
                </div>
                {/*---------------------------*/}
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
