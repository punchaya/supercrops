import { React, useState, useEffect } from "react";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/node.module.scss";
import { Scatter, Bar } from "react-chartjs-2";
import axios from "axios";
import client from "./api/mqtt.js";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { connect } from "mqtt";

export default function node(props) {
  const router = useRouter();
  //const Data = router.query;
  const rand = () => Math.round(Math.random() * 20 - 10);
  const data = {
    datasets: [
      {
        label: "A dataset",
        data: [
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
        ],
        backgroundColor: "rgb(0, 219, 65)",
      },
      {
        label: "B dataset",
        data: [
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
          { x: rand(), y: rand() },
        ],
        backgroundColor: "rgba(255, 99, 12, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
          ticks: {
            major: {
              fontStyle: "bold",
              fontColor: "#FF0000",
            },
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "value",
          },
        },
      ],
    },
  };
  const dayactive = {
    backgroundColor: "#007bff",
    padding: "5px",
    borderRadius: "10%",
    color: "white",
  };
  const dayunactive = {
    backgroundColor: "#e4e4e4",
    padding: "5px",
    borderRadius: "10%",
    color: "#7B879C",
  };
  const nodeID = props.nodeID;
  const orgID = props.orgID;
  const farmID = props.farmID;
  /*
  const router = useRouter();
  const Data = router.query;
  const stationIndex = Data.station;
  const nodeIndex = Data.node;
  const relayIndex = 1;

  const farmName = Data.farm;
  if (farmName == undefined) {
    return <div>error</div>;
  }*/

  const [nodeInfo, setnodeInfo] = useState({});
  const [zoneIDlist, setzoneIDlist] = useState([]);
  const [relayIDlist, setrelayIDlist] = useState([]);
  const [relayList, setrelayList] = useState([]);
  const [zoneList, setzoneList] = useState([]);
  const [zoneContent, setzoneContent] = useState([]);
  const [dataList, setdataList] = useState([]);
  const [success, setsuccess] = useState(false);
  const [wait, setwait] = useState(false);
  const [fail, setfail] = useState(false);

  const [dataSelect, setdataSelect] = useState(null);

  const [mqttStat, setmqttStat] = useState(false);
  const [mqttsending, setmqttsending] = useState(false);
  const [msgSend, setmsgSend] = useState(null);
  const [mqttopic, setmqttopic] = useState(null);

  const [deviceTopic, setdeviceTopic] = useState(null);
  const [devicemsg, setdevicemsg] = useState(null);

  const [graph, setgraph] = useState(false);
  const [failTxt, setfailTxt] = useState("เกิดข้อผิดพลาดบางอย่าง");

  const [dataValue, setdataValue] = useState([]);
  const [dataRelay, setdataRelay] = useState("");

  const test_data = [
    {
      soil_ec: 23,
      soil_moisture: 12,
      weather_humidity: 32,
      weather_light_lux: 64,
      weather_temperature: 89,
    },
    {
      soil_ec: 12,
      soil_moisture: 23,
      soil_ph: 34,
      soil_temperature: 45,
      water_cl: 56,
      water_do: 67,
      water_ec: 78,
      water_nh3: 89,
      water_nitrite: 90,
      water_ph: 25,
      water_phosphate: 30,
      water_temperature: 40,
      water_turbidity: 60,
      weather_co2: 11,
      weather_humidity: 87,
      weather_light_lux: 54,
      weather_pm10: 12,
      weather_pm25: 9,
      weather_pressure: 15,
      weather_rain_gauge: 16,
      weather_temperature: 87,
      weather_wind_direc: 66,
      weather_wind_speed: 72,
    },
  ];

  function resetmqtt() {
    setmsgSend(null);
    setmqttopic(null);
  }

  async function getRelayID() {
    const _orgID = localStorage.getItem("_orgID");
    const _farmID = localStorage.getItem("_farmID");
    const _nodeID = localStorage.getItem("_nodeID");
    const nodeInfo = await axios
      .post(`http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`, {
        orgId: _orgID,
      })
      .catch((error) => {
        /*
      localStorage.clear();
      window.location.assign("/login");*/
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    const nodeInfores = nodeInfo.data;

    const testreqdata = {
      orgId: "Oea74a83915b2499987e62868c69f3d5c",
      tsdbToken:
        "MHXpIIeM0uQwLqubaADfYvXHdsDi4z2RtQ_QhLPpM76pVLuuzUg-oq0pU9eSAqTC7U6vX_EUHnR5Bt4gbCV4cw==",
      zoneId: "Ze006815b18d04414aeb598b5befc6450",
      graphData: "in_humid",
      time1: 1632762000000,
      time2: 1632841023498,
    };
    //console.log(testreqdata);
    const datapoint = await axios
      .post(
        `http://203.151.136.127:10002/api/tsdb/service/Ff4440d10ee0e49b299ec379f76fa5a84/Nfa7d193b520e46e187af39e8c15f8910`,
        testreqdata
      )
      .catch((error) => {
        //localStorage.clear();
        //window.location.assign("/login");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    //console.log(datapoint);

    return nodeInfores.relayIDlist;
  }

  useEffect(async () => {
    const _orgID = localStorage.getItem("_orgID");
    const _farmID = localStorage.getItem("_farmID");
    const _nodeID = localStorage.getItem("_nodeID");
    const relayidlist = await getRelayID();

    for (let index = 0; index < relayidlist.length; index++) {
      const relay = relayidlist[index];
      //console.log(relay);
      client.subscribe(`/front/control/${_farmID}/${relay}`, function () {
        client.publish(
          `/control/${_farmID}/${relay}`,
          "Supercrops subscribing"
        );
      });
      client.subscribe(`/front/time_fn/${_farmID}/${relay}`, function () {
        client.publish(
          `/time_fn/${_farmID}/${relay}`,
          "Supercrops subscribing"
        );
      });
      client.subscribe(`/front/set_time1/${_farmID}/${relay}`, function () {
        client.publish(
          `/set_time1/${_farmID}/${relay}`,
          "Supercrops subscribing"
        );
      });
      client.subscribe(`/front/set_time2/${_farmID}/${relay}`, function () {
        client.publish(
          `/set_time2/${_farmID}/${relay}`,
          "Supercrops subscribing"
        );
      });
      client.subscribe(`/front/set_time3/${_farmID}/${relay}`, function () {
        client.publish(
          `/set_time3/${_farmID}/${relay}`,
          "Supercrops subscribing"
        );
      });
      client.subscribe(`/front/data_fn/${_farmID}/${relay}`, function () {
        client.publish(
          `/data_fn/${_farmID}/${relay}`,
          "Supercrops subscribing"
        );
      });
      client.subscribe(`/front/set_data1/${_farmID}/${relay}`, function () {
        client.publish(
          `/set_data1/${_farmID}/${relay}`,
          "Supercrops subscribing"
        );
      });
    }

    client.on("message", function (topic, message) {
      const memtopic = mqttopic;
      setdeviceTopic(topic.toString());
      setdevicemsg(message.toString());
      setmqttStat(!mqttStat);
    });
    reloadData();
  }, [mqttsending]);

  useEffect(() => {
    if (mqttsending == true) {
      if (deviceTopic == mqttopic) {
        if (devicemsg == msgSend) {
          setwait(false);
          setsuccess(true);
          setmqttsending(false);
          reloadData();
        } else {
          setwait(false);
          setfail(true);
          setmqttsending(false);
          reloadData();
        }
      } else {
        console.log("fail");
        setmqttsending(false);
        setmqttsending(true);
      }
    }
  }, [mqttStat]);

  async function reloadData() {
    if (
      localStorage.getItem("_login") == false ||
      localStorage.getItem("_login") == null ||
      localStorage.getItem("_login") == "null" ||
      localStorage.getItem("_login") == "" ||
      localStorage.getItem("_orgID") == null ||
      localStorage.getItem("_orgID") == "null" ||
      localStorage.getItem("_orgID") == ""
    ) {
      window.location.assign("/login");
    }
    const _orgID = localStorage.getItem("_orgID");
    const _farmID = localStorage.getItem("_farmID");
    const _nodeID = localStorage.getItem("_nodeID");
    const nodeInfo = await axios
      .post(`http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`, {
        orgId: _orgID,
      })
      .catch((error) => {
        /*
        localStorage.clear();
        window.location.assign("/login");*/
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    const nodeInfores = nodeInfo.data;

    const testreqdata = {
      orgId: "Oea74a83915b2499987e62868c69f3d5c",
      tsdbToken:
        "MHXpIIeM0uQwLqubaADfYvXHdsDi4z2RtQ_QhLPpM76pVLuuzUg-oq0pU9eSAqTC7U6vX_EUHnR5Bt4gbCV4cw==",
      zoneId: "Ze006815b18d04414aeb598b5befc6450",
      graphData: "in_humid",
      time1: 1632762000000,
      time2: 1632841023498,
    };
    //console.log(testreqdata);
    const datapoint = await axios
      .post(
        `http://203.151.136.127:10002/api/tsdb/service/Ff4440d10ee0e49b299ec379f76fa5a84/Nfa7d193b520e46e187af39e8c15f8910`,
        testreqdata
      )
      .catch((error) => {
        //localStorage.clear();
        //window.location.assign("/login");
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    //console.log(datapoint);
    setnodeInfo(nodeInfores);
    setzoneIDlist(nodeInfores.zoneIDlist);
    setrelayIDlist(nodeInfores.relayIDlist);
    let z_list = [];
    let z_cont = [];
    for (let j = 0; j < nodeInfores.zoneIDlist.length; j++) {
      const zoneID = nodeInfores.zoneIDlist[j];
      const zoneres = await axios
        .post(`http://203.151.136.127:10001/api/${_farmID}/data`, {
          orgId: _orgID,
          zoneId: zoneID,
        })
        .catch((error) => {
          /*
          localStorage.clear();
          window.location.assign("/login");*/
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });
      const _zdata = [];
      for (var key in zoneres.data[0]) {
        if (zoneres.data[0].hasOwnProperty(key)) {
          _zdata.push([key, zoneres.data[0][key]]);
        }
      }
      z_list.push(_zdata);
      z_cont.push(false);
    }
    setzoneContent(z_cont);
    setzoneList(z_list);
    var datalist = z_list;

    setdataList(datalist);
    let r_list = [];
    for (let i = 0; i < nodeInfores.relayIDlist.length; i++) {
      const relayID = nodeInfores.relayIDlist[i];
      const relay = await axios.post(
        `http://203.151.136.127:10001/api/${_farmID}/relay`,
        {
          orgId: _orgID,
          relayId: relayID,
        }
      );
      // set ค่า timefunction และ datafunction ด้วยตัวเอง
      relay.data.dataFunction = true;
      relay.data.timeFunction = true;
      //=========================================
      r_list.push(relay.data);
    }
    setrelayList(r_list);
    setdataSelect(null);
    console.log(r_list);
  }

  function putData(data, relayID, method) {
    const _farmID = localStorage.getItem("_farmID");
    const _nodeID = localStorage.getItem("_nodeID");
    if (method == "status") {
      axios
        .put(
          `http://203.151.136.127:10001/api/update/${_farmID}/${relayID}/status`,
          data
        )
        .then((res) => {
          console.log(data);
          console.log(res.data);
          reloadData();
        });
    } else if (method == "time") {
      axios
        .put(
          `http://203.151.136.127:10001/api/update/${_farmID}/${relayID}/time`,
          data
        )
        .then((res) => {
          console.log(data);
          console.log(res.data);
          reloadData();
        });
    } else if (method == "data") {
      axios
        .put(
          `http://203.151.136.127:10001/api/update/${_farmID}/${relayID}/data`,
          data
        )
        .then((res) => {
          console.log(data);
          console.log(res.data);
          reloadData();
        });
    } else {
      console.log("Put Method incorrect");
      reloadData();
    }
  }

  function zoneToggle(index) {
    const content = document.getElementById("zidContent" + index);
    const icon = document.getElementById("zicon" + index);
    if (icon.className == "fa fa-chevron-up") {
      icon.className = "fa fa-chevron-down";
      content.style.display = "none";
    } else {
      icon.className = "fa fa-chevron-up";
      content.style.display = "block";
    }
  }
  function relaysetting(index) {
    const settingbox = document.getElementById("rlSetting" + index);
    if (settingbox.className == "dropdown-menu") {
      settingbox.className = "dropdown-menu show";
    } else {
      settingbox.className = "dropdown-menu";
    }
  }
  function dataChange(event, newValue) {
    setdataValue(newValue);
  }
  function rangeData(id, relayIndex) {
    const value = document.getElementById(id).value;
    //document.getElementById(id + "text").innerHTML = value;
    //document.getElementById(id + "text").value = value;
    document.getElementById("data1min" + relayIndex + "text").innerHTML =
      value[0];
    document.getElementById("data1max" + relayIndex + "text").innerHTML =
      value[1];
    document.getElementById("data1min" + relayIndex + "text").value = value[0];
    document.getElementById("data1max" + relayIndex + "text").value = value[1];
  }
  function modalOn(id) {
    const modal = document.getElementById(id);
    modal.style.display = "block";
  }
  function modalOff(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
  }
  function putDataSetting(relay, relayIndex, relayID) {
    const _orgId = localStorage.getItem("_orgID");
    const _dataFunction = document.getElementById(
      "dStatus" + relayIndex
    ).checked;
    const _data1Select = document.getElementById(
      "dataSelect1" + relayIndex
    ).value;
    const _dataCheck = document.getElementById("d1Status" + relayIndex).checked;
    if (_dataCheck) {
      var _data1Status = true;
    } else {
      var _data1Status = false;
    }
    const _data1min = document.getElementById("data1min" + relayIndex).value;
    const _data1max = document.getElementById("data1max" + relayIndex).value;

    if (_dataFunction) {
      var dataFunction = "true";
    } else {
      var dataFunction = "false";
    }
    if (_data1Status) {
      var data1Status = "true";
    } else {
      var data1Status = "false";
    }
    const _putdata = {
      orgId: _orgId,
      dataFunction: dataFunction,
      data1: {
        status: data1Status,
        data: _data1Select,
        min: parseInt(_data1min),
        max: parseInt(_data1max),
      },
    };
    const putmethod = "data";
    putData(_putdata, relayID, putmethod);
    modalOff("modalstyleData" + relayIndex);
  }
  function putminiData(relayIndex, relayID, dataIndex) {
    const _farmID = localStorage.getItem("_farmID");
    const _orgId = localStorage.getItem("_orgID");
    const zoneindex = document.getElementById("selectzone" + relayIndex).value;
    console.log("zone index " + zoneindex);
    if (zoneindex == -1) {
      setfail(true);
      setfailTxt("กรุณาเลือกโซน");
    } else {
      const zoneID = zoneIDlist[zoneindex];
      const _dataFunction = document.getElementById(
        "dStatus" + relayIndex
      ).checked;
      const _dataCheck = document.getElementById(
        "d" + dataIndex + "Status" + relayIndex
      ).checked;
      if (_dataCheck) {
        var _dataStatus = true;
      } else {
        var _dataStatus = false;
      }
      const _dataSelect = document.getElementById(
        "dataSelect" + dataIndex + relayIndex
      ).value;
      console.log("data index" + _dataSelect);
      if (_dataSelect == -1) {
        setfail(true);
        setfailTxt("กรุณาเลือกชนิดข้อมูล");
      } else {
        const _datamin = dataValue[0];
        const _datamax = dataValue[1];
        if (_datamin >= _datamax) {
          setfail(true);
          setfailTxt("ข้อมูลไม่ถูกต้อง");
        } else {
          const putmethod = "data";
          if (dataIndex == 1) {
            const _putdata = {
              data1: {
                status: _dataStatus.toString(),
                data: _dataSelect,
                max: parseInt(_datamax),
                min: parseInt(_datamin),
                zoneId: zoneID,
                conpare: "low",
              },
            };
            console.log(zoneIDlist);
            console.log(_putdata);
            client.publish(
              "/set_data1/farmId/relayId",
              JSON.stringify(_putdata),
              function (err) {
                if (!err) {
                  setwait(true);
                  setmqttopic("/front/set_data1/farmId/relayId");
                  setmsgSend(JSON.stringify(_putdata));
                  setmqttsending(true);
                } else {
                  console.log(err);
                }
              }
            );
            //console.log(_putData);
            //putData(_putdata, relayID, putmethod);
          } else {
            console.log("put data error");
          }
        }
      }
    }
  }
  function putTimeSetting(relayIndex, relayID) {
    const _orgId = localStorage.getItem("_orgID");
    const _timeFunction = document.getElementById(
      "tStatus" + relayIndex
    ).checked;
    const time1on = document.getElementById("time1on" + relayIndex).value;
    const time1off = document.getElementById("time1off" + relayIndex).value;
    const time2on = document.getElementById("time2on" + relayIndex).value;
    const time2off = document.getElementById("time2off" + relayIndex).value;
    const time3on = document.getElementById("time3on" + relayIndex).value;
    const time3off = document.getElementById("time3off" + relayIndex).value;

    const time1 = [];
    const time2 = [];
    const time3 = [];
    const time1check = document.getElementById("t1Status" + relayIndex).checked;
    const time2check = document.getElementById("t2Status" + relayIndex).checked;
    const time3check = document.getElementById("t3Status" + relayIndex).checked;

    if (time1check) {
      time1.push(1);
      time1.push(time1on);
      time1.push(time1off);
    } else {
      time1.push(0);
      time1.push(time1on);
      time1.push(time1off);
    }
    if (time2check) {
      time2.push(1);
      time2.push(time2on);
      time2.push(time2off);
    } else {
      time2.push(0);
      time2.push(time2on);
      time2.push(time2off);
    }
    if (time3check) {
      time3.push(1);
      time3.push(time3on);
      time3.push(time3off);
    } else {
      time3.push(0);
      time3.push(time3on);
      time3.push(time3off);
    }
    for (let i = 3; i <= 9; i++) {
      const check1 = document.getElementById("t1day" + i + relayIndex).checked;
      const check2 = document.getElementById("t2day" + i + relayIndex).checked;
      const check3 = document.getElementById("t3day" + i + relayIndex).checked;
      if (check1) {
        time1.push(1);
      } else {
        time1.push(0);
      }
      if (check2) {
        time2.push(1);
      } else {
        time2.push(0);
      }
      if (check3) {
        time3.push(1);
      } else {
        time3.push(0);
      }
    }
    const putmethod = "time";
    const _putdata = {
      orgId: _orgId,
      timeFunction: _timeFunction.toString(),
      time1: time1,
      time2: time2,
      time3: time3,
    };
    putData(_putdata, relayID, putmethod);
    modalOff("modalstyleTime" + relayIndex);
  }

  function timematch(relayid, timeindex, timeon, timeoff, date) {
    for (let i = 0; i < relayList.length; i++) {
      const relay = relayList[i];
      if (relayid == relay.relayID) {
        if (timeindex == 1) {
          var relay_time1 = relay.time2;
          for (let i = 0; i < relay_time1.date.length; i++) {
            const _date = relay_time1.date[i];
            const _timeon = relay_time1.time_on;
            const _timeoff = relay_time1.time_off;
            if (_date == date[i]) {
              if (timeon > _timeon && timeon < _timeoff) {
                return "false";
              } else if (timeon < _timeon && timeoff > _timeon) {
                return "false";
              } else if (timeon == _timeon && timeoff == timeoff) {
                return "false";
              } else {
                return "true";
              }
            }
          }
          var relay_time2 = relay.time3;
          for (let i = 0; i < relay_time2.date.length; i++) {
            const _date = relay_time2.date[i];
            const _timeon = relay_time2.time_on;
            const _timeoff = relay_time2.time_off;
            if (_date == date[i]) {
              if (timeon > _timeon && timeon < _timeoff) {
                return "false";
              } else if (timeon < _timeon && timeoff > _timeon) {
                return "false";
              } else if (timeon == _timeon && timeoff == timeoff) {
                return "false";
              } else {
                return "true";
              }
            }
          }
        } else if (timeindex == 2) {
          var relay_time1 = relay.time1;
          for (let i = 0; i < relay_time1.date.length; i++) {
            const _date = relay_time1.date[i];
            const _timeon = relay_time1.time_on;
            const _timeoff = relay_time1.time_off;
            if (_date == date[i]) {
              if (timeon > _timeon && timeon < _timeoff) {
                return "false";
              } else if (timeon < _timeon && timeoff > _timeon) {
                return "false";
              } else if (timeon == _timeon && timeoff == timeoff) {
                return "false";
              } else {
                return "true";
              }
            }
          }
          var relay_time2 = relay.time3;
          for (let i = 0; i < relay_time2.date.length; i++) {
            const _date = relay_time2.date[i];
            const _timeon = relay_time2.time_on;
            const _timeoff = relay_time2.time_off;
            if (_date == date[i]) {
              if (timeon > _timeon && timeon < _timeoff) {
                return "false";
              } else if (timeon < _timeon && timeoff > _timeon) {
                return "false";
              } else if (timeon == _timeon && timeoff == timeoff) {
                return "false";
              } else {
                return "true";
              }
            }
          }
        } else if (timeindex == 3) {
          var relay_time1 = relay.time2;
          for (let i = 0; i < relay_time1.date.length; i++) {
            const _date = relay_time1.date[i];
            const _timeon = relay_time1.time_on;
            const _timeoff = relay_time1.time_off;
            if (_date == date[i]) {
              if (timeon > _timeon && timeon < _timeoff) {
                return "false";
              } else if (timeon < _timeon && timeoff > _timeon) {
                return "false";
              } else if (timeon == _timeon && timeoff == timeoff) {
                return "false";
              } else {
                return "true";
              }
            }
          }
          var relay_time2 = relay.time1;
          for (let i = 0; i < relay_time2.date.length; i++) {
            const _date = relay_time2.date[i];
            const _timeon = relay_time2.time_on;
            const _timeoff = relay_time2.time_off;
            if (_date == date[i]) {
              if (timeon > _timeon && timeon < _timeoff) {
                return "false";
              } else if (timeon < _timeon && timeoff > _timeon) {
                return "false";
              } else if (timeon == _timeon && timeoff == timeoff) {
                return "false";
              } else {
                return "true";
              }
            }
          }
        }
      }
    }
  }

  async function putminitime(relayIndex, relayID, timeIndex) {
    const _farmID = localStorage.getItem("_farmID");
    const _orgId = localStorage.getItem("_orgID");
    const time = [];
    const timecheck = document.getElementById(
      "t" + timeIndex + "Status" + relayIndex
    ).checked;

    if (timecheck) {
      var _status = true;
    } else {
      var _status = false;
    }
    const timeon = document.getElementById(
      "time" + timeIndex + "on" + relayIndex
    ).value;
    const timeoff = document.getElementById(
      "time" + timeIndex + "off" + relayIndex
    ).value;

    if (timeon >= timeoff) {
      setfail(true);
      setfailTxt("ช่วงเวลาไม่ถูกต้อง");
    } else {
      for (let i = 0; i <= 6; i++) {
        const check = document.getElementById(
          "t" + timeIndex + "day" + i + relayIndex
        ).checked;
        if (check) {
          time.push(1);
        } else {
          time.push(0);
        }
      }
      if (timeIndex == 1) {
        const ismatch = await timematch(
          relayID,
          timeIndex,
          timeon,
          timeoff,
          time
        );
        if (ismatch == "false") {
          setfail(true);
          setfailTxt("ช่วงเวลาทับซ้อนกัน");
        } else {
          var _putdata = {
            time1: {
              status: _status,
              time_on: timeon,
              time_off: timeoff,
              date: time,
            },
          };
          client.publish(
            "/set_time1/farmId/relayId",
            JSON.stringify(_putdata),
            function (err) {
              if (!err) {
                setwait(true);
                setmqttopic(`/front/set_time1/${_farmID}/${relayID}`);
                setmsgSend(JSON.stringify(_putdata));
                setmqttsending(true);
              } else {
                console.log(err);
              }
            }
          );
        }
      } else if (timeIndex == 2) {
        const ismatch = await timematch(
          relayID,
          timeIndex,
          timeon,
          timeoff,
          time
        );
        if (ismatch == "false") {
          setfail(true);
          setfailTxt("ช่วงเวลาทับซ้อนกัน");
        } else {
          var _putdata = {
            time2: {
              status: _status,
              time_on: timeon,
              time_off: timeoff,
              date: time,
            },
          };
          client.publish(
            `/set_time2/${_farmID}/${relayID}`,
            JSON.stringify(_putdata),
            function (err) {
              if (!err) {
                setwait(true);
                setmsgSend(JSON.stringify(_putdata));
                setmqttopic("/front/set_time2/farmId/relayId");
                setmqttsending(true);
              } else {
                console.log(err);
              }
            }
          );
        }
      } else if (timeIndex == 3) {
        const ismatch = await timematch(
          relayID,
          timeIndex,
          timeon,
          timeoff,
          time
        );
        if (ismatch == "false") {
          setfail(true);
          setfailTxt("ช่วงเวลาทับซ้อนกัน");
        } else {
          var _putdata = {
            time3: {
              status: _status,
              time_on: timeon,
              time_off: timeoff,
              date: time,
            },
          };
          client.publish(
            `/set_time3/${_farmID}/${relayID}`,
            JSON.stringify(_putdata),
            function (err) {
              if (!err) {
                setwait(true);
                setmsgSend(JSON.stringify(_putdata));
                setmqttopic("/front/set_time3/farmId/relayId");
                setmqttsending(true);
              } else {
                console.log(err);
              }
            }
          );
        }
      } else {
        var _putdata = {
          orgId: _orgId,
        };
        const putmethod = "time";
      }
      modalOff("modalstyleData" + relayIndex);
    }
  }
  function setdataFunction(id, relayID) {
    const _farmID = localStorage.getItem("_farmID");
    const _orgId = localStorage.getItem("_orgID");
    const check = document.getElementById(id).checked;
    if (check) {
      var _putdata = { dataFunction: true };
    } else {
      var _putdata = { dataFunction: false };
    }
    client.publish(
      `/data_fn/${_farmID}/${relayID}`,
      JSON.stringify(_putdata),
      function (err) {
        if (!err) {
          setwait(true);
          setmqttopic(`/front/data_fn/${_farmID}/${relayID}`);
          setmsgSend(JSON.stringify(_putdata));
          setmqttsending(true);
        } else {
          console.log(err);
        }
      }
    );
  }
  function settimeFunction(id, relayID) {
    const _farmID = localStorage.getItem("_farmID");
    const _orgId = localStorage.getItem("_orgID");
    const check = document.getElementById(id).checked;
    if (check) {
      var _putdata = { timeFunction: true };
    } else {
      var _putdata = { timeFunction: false };
    }
    client.publish(
      `/time_fn/${_farmID}/${relayID}`,
      JSON.stringify(_putdata),
      function (err) {
        if (!err) {
          setwait(true);
          setmqttopic(`/front/time_fn/${_farmID}/${relayID}`);
          setmsgSend(JSON.stringify(_putdata));
          setmqttsending(true);
        } else {
          console.log(err);
        }
      }
    );
  }
  function changeStatus(id, relayID) {
    const _orgId = localStorage.getItem("_orgID");
    const check = document.getElementById(id).checked;
    if (check) {
      var status = "true";
    } else {
      var status = "false";
    }
    const _putdata = {
      orgId: _orgId,
      status: status,
    }; /*
    client.publish(
      "/control/farmId/relayId",
      JSON.stringify(_putdata),
      function (err) {
        if (!err) {
          setwait(true);
          setmsgSend(JSON.stringify(_putdata));
          setmqttopic("/front/control/farmId/relayId");
          setmqttsending(true);
        } else {
          console.log(err);
        }
      }
    );*/
    putData(_putdata, relayID, "status");
  }
  return (
    <>
      <div
        id={"Waiting"}
        className={styles.modal_wait}
        style={{ display: wait ? "block" : "none" }}
      >
        <div className={styles.waiting}>
          <div className={styles.lds_dual_ring}></div>
          <div></div>
          <div className="color-blue">กำลังดำเนินการ</div>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setwait(false)}
            // style={{ fontSize: "16px", height: "24px" }}
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
      <div
        id={"Success"}
        className={styles.modal_wait}
        style={{ display: success ? "block" : "none" }}
      >
        <div className={styles.waiting}>
          <div className="success-checkmark">
            <div className="check-icon">
              <span className="icon-line line-tip"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <div className="color-green">สำเร็จ</div>
          <button
            className="btn btn-success"
            onClick={() => {
              setsuccess(!success);
              resetmqtt();
            }}
          >
            ตกลง
          </button>
        </div>
      </div>
      <div
        id={"Fail"}
        className={styles.modal_wait}
        style={{ display: fail ? "block" : "none" }}
      >
        <div className={styles.waiting}>
          <div className="error-banmark">
            <div className="ban-icon">
              <span className="icon-line line-long-invert"></span>
              <span className="icon-line line-long"></span>
              <div className="icon-circle"></div>
              <div className="icon-fix"></div>
            </div>
          </div>
          <div className="color-red">ผิดพลาด</div>

          <div className="color-white" style={{ fontSize: "18px" }}>
            {failTxt}
          </div>

          <button
            className="btn btn-danger"
            onClick={() => {
              setfail(!fail);
              setfailTxt("เกิดข้อผิดพลาดบางอย่าง");
            }}
          >
            ปิด
          </button>
        </div>
      </div>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i> <Link href="/">หน้าหลัก</Link> /{" "}
            <i className="fa fa-sitemap"></i> <Link href={`/farm`}>ฟาร์ม</Link>{" "}
            / <i className="fa fa-cubes"></i>
            <Link href={`/station`}>โรงเรือน</Link> /{" "}
            <i className="fa fa-dot-circle-o"></i>{" "}
            <Link href={`/node`}>โหนด</Link>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="x_panel">
          <div className="tile_count">
            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2>
                  <strong className="farmname">
                    <i className="fa fa-dot-circle-o" /> โหนด
                  </strong>
                </h2>
              </span>
              <div>
                <h2>
                  <span className="brief">
                    {" "}
                    <i className="fa fa-rss"></i> รหัสโหนด
                  </span>{" "}
                  <label className="nodeid">{nodeInfo.nodeID}</label>
                </h2>
              </div>
            </div>
            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2
                  className={nodeInfo.status ? styles.online : styles.offline}
                >
                  <i className="fa fa-circle"></i>{" "}
                  <label style={{ color: "#73879C" }}>การทำงาน</label>
                </h2>
              </span>
              <div>
                <h2>
                  <span className="brief">
                    {" "}
                    <i className="fa fa-exchange"></i> สถานะ
                  </span>{" "}
                  <label
                    className={nodeInfo.status ? styles.online : styles.offline}
                  >
                    {nodeInfo.status ? "ออนไลน์" : "ออฟไลน์"}
                  </label>
                </h2>
              </div>
            </div>
            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2>
                  <i className="fa fa-calendar"></i>{" "}
                  <label style={{ color: "#73879C" }}>วันที่สร้าง</label>
                </h2>
              </span>
              <div>
                <h2>
                  <span className="brief">วันที่</span>{" "}
                  <label>04/11/2021</label>
                </h2>
              </div>
            </div>

            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2>
                  <i className="fa fa-clock-o"></i> อัพเดตข้อมูล
                </h2>
              </span>
              <div>
                <h2>
                  <select
                    id="refreshTime"
                    className="form-control"
                    style={{ color: "#73879C" }}
                  >
                    <option value="volvo">เลือกเวลาอัพเดตข้อมูล</option>
                    <option value={300}>ทุก 5 นาที</option>
                    <option value={600}>ทุก 10 นาที</option>
                    <option value={900}>ทุก 15 นาที</option>
                    <option value={1200}>ทุก 20 นาที</option>
                    <option value={1500}>ทุก 25 นาที</option>
                    <option value={1800}>ทุก 30 นาที</option>
                  </select>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="x_panel">
          <div className="x_title">
            <h2>
              <i className="fa fa-line-chart"></i> กราฟสถิติ
            </h2>
            <ul className="nav navbar-right panel_toolbox">
              <li>
                <a className="collapse-link" onClick={() => setgraph(!graph)}>
                  <i
                    className={
                      graph ? "fa fa-chevron-up" : "fa fa-chevron-down"
                    }
                  ></i>
                </a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div
            className="x_content"
            style={{
              display: graph ? "flex" : "none",
              justifyContent: "center",
            }}
          >
            <Scatter
              data={data}
              option={options}
              style={{ maxWidth: "650px", maxHeight: "350px" }}
            />
          </div>
        </div>
      </div>
      <div id="zonebox" className="row">
        <div className="x_panel">
          {zoneList.map((zone, index) => {
            const zIndex = index + 1;

            return (
              <div key={index} className="x_panel" style={{ height: "auto" }}>
                <div className="x_title">
                  <h2>
                    <i className="fa fa-map-marker"></i> โซนที่ {zIndex}
                  </h2>
                  <ul className="nav navbar-right panel_toolbox">
                    <li>
                      <a
                        onClick={() => {
                          zoneToggle(zIndex);
                        }}
                      >
                        <i
                          id={"zicon" + zIndex}
                          className={"fa fa-chevron-down"}
                        ></i>
                      </a>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <div
                  id={"zidContent" + zIndex}
                  className="x_content"
                  style={{ display: "none" }}
                >
                  <div
                    className="profile_details"
                    style={{
                      display: "flex",
                      gap: "40px",
                      maxWidth: "100%",
                      flexFlow: "row wrap",
                      userSelect: "none",
                    }}
                  >
                    {zone.map((data, _index) => {
                      return (
                        <div
                          key={_index}
                          className="well profile_view"
                          style={{ width: "350px", minWidth: "300px" }}
                        >
                          <div className="col">
                            <div
                              style={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "column",
                              }}
                            >
                              <h2 className="brief">
                                <i className="fa fa-sun-o"></i> {data[0]}{" "}
                              </h2>
                              <h4>{data[1]}</h4>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="relaybox" className="row">
        <div className="x_panel">
          <div className="x_content">
            <div>
              <h2>
                <i className="fa fa-random"></i> รีเลย์
              </h2>
            </div>
            <div
              className="profile_details"
              style={{
                display: "flex",
                gap: "40px",
                widows: "350px",
                minWidth: "300px",
                maxWidth: "100%",
                flexFlow: "row wrap",
                userSelect: "none",
              }}
            >
              {relayList.map((relay, index) => {
                const relayIndex = index + 1;
                const setting = false;
                //console.log(relay);
                return (
                  <div key={index}>
                    <div
                      id={"modalstyleData" + relayIndex}
                      className={styles.modal}
                      style={{ display: "none" }}
                    >
                      <div className="modal-dialog modal-lg">
                        <div
                          className="modal-content"
                          style={{
                            backgroundColor: !relay.dataFunction
                              ? "#eaeaea"
                              : "white",
                          }}
                        >
                          <div className="modal-header">
                            <h2 className="modal-title" id="myModalLabel">
                              ตั้งค่าข้อมูล
                            </h2>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              onClick={() =>
                                modalOff("modalstyleData" + relayIndex)
                              }
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="modal-body"
                            style={{
                              display: "flex",
                              gap: "20px",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className="col"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "5px",
                                border: "solid 1px #c4c4c4",
                                borderRadius: "10px",
                              }}
                            >
                              <label>
                                <Image
                                  src="/dataSetting.png"
                                  width="30"
                                  height="30"
                                />
                              </label>

                              <h4> ตั้งค่าข้อมูล {"relay " + relayIndex}</h4>
                              <label style={{ marginLeft: "auto" }}>
                                สถานะ
                              </label>
                              <label className={styles.switch2}>
                                <input
                                  onClick={() =>
                                    setdataFunction(
                                      "dStatus" + relayIndex,
                                      relay.relayID
                                    )
                                  }
                                  id={"dStatus" + relayIndex}
                                  type="checkbox"
                                  defaultChecked={
                                    relay.dataFunction ? true : false
                                  }
                                />
                                <span className={styles.slider}></span>
                              </label>
                            </div>

                            <div
                              className="col"
                              style={{
                                display: "flex",
                                gap: "10px",
                                padding: "5px",
                                border: "solid 1px #c4c4c4",
                                borderRadius: "10px",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <label >
                                  <h4 >
                                    เลือกโซน :{" "}
                                    <select
                                      id={"selectzone" + relayIndex}
                                      onChange={() =>
                                        setdataSelect(
                                          document.getElementById(
                                            "selectzone" + relayIndex
                                          ).value
                                        )
                                      }
                                      style={{
                                        color: "#73879C",
                                        height: "30px",
                                        marginLeft: "10px",
                                        borderColor: "#BEBEBE",
                                      }}
                                      disabled={
                                        relay.dataFunction ? false : true
                                      }
                                    >
                                      <option value={-1}>เลือกโซน</option>
                                      {zoneList.map((zone, index) => {
                                        return (
                                          <option key={index} value={index}>
                                            โซนที่ {index + 1}
                                          </option>
                                        );
                                      })}
                                    </select>{" "}
                                    ข้อมูล :
                                    {dataList.map((_data, index) => {
                                      return (
                                        <select
                                          key={index}
                                          id={"dataSelect1" + relayIndex}
                                          style={
                                            dataSelect == index
                                              ? {
                                                color: "#73879C",
                                                height: "30px",
                                                marginLeft: "10px",
                                                borderColor: "#BEBEBE",
                                              }
                                              : { display: "none" }
                                          }
                                        >
                                          <option value={0}>เลือกข้อมูล</option>
                                          {_data.map((data, index) => {
                                            return (
                                              <option key={index} value={data}>
                                                {data}
                                              </option>
                                            );
                                          })}
                                        </select>
                                      );
                                    })}
                                  </h4>
                                </label>
                                <label
                                  className={styles.switch2}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <input
                                    id={"d1Status" + relayIndex}
                                    type="checkbox"
                                    defaultChecked={
                                      relay.dataFunction
                                        ? relay.data1.status
                                          ? true
                                          : false
                                        : false
                                    }
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              <label id={"data1" + relayIndex + "text"}>
                                <h2 className={relay.status ? "brief2" : ""}>
                                  ค่าน้อยสุด:{" "}
                                  <strong className={relay.status ? "minvalue" : ""}>
                                    {dataValue[0]}{" "}
                                    <i className="fa fa-long-arrow-down"></i>
                                  </strong>{" "}
                                  | ค่ามากสุด:{" "}
                                  <strong className={relay.status ? "maxvalue" : ""}>
                                    {dataValue[1]}{" "}
                                    <i className="fa fa-long-arrow-up"></i>
                                  </strong>
                                </h2>
                                {/* ค่าน้อยสุด : {dataValue[0]} ค่ามากสุด :{" "}
                                {dataValue[1]} */}
                              </label>

                              <Slider
                                id="data1"
                                defaultValue={[
                                  relay.data1.min,
                                  relay.data1.max,
                                ]}
                                onChange={dataChange}
                                valueLabelDisplay="auto"
                                disableSwap
                                disabled={relay.dataFunction ? false : true}
                              />

                              <button
                                className="btn btn-primary"
                                style={
                                  relay.timeFunction
                                    ? { fontSize: "16px", width: "70px" }
                                    : {
                                      fontSize: "16px",
                                      backgroundColor: "#DDDDDD",
                                      borderColor: "#DDDDDD",
                                      color: "#73879C",
                                      width: "70px",
                                    }
                                }
                                onClick={
                                  relay.timeFunction
                                    ? () =>
                                      putminiData(
                                        relayIndex,
                                        relay.relayID,
                                        1
                                      )
                                    : () => { }
                                }
                              >
                                บันทึก
                              </button>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                              onClick={() =>
                                modalOff("modalstyleData" + relayIndex)
                              }
                            >
                              ปิด
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id={"modalstyleTime" + relayIndex}
                      className={styles.modal}
                      style={{ display: "none" }}
                    >
                      <div
                        className="modal-dialog modal-lg"
                        style={{ maxWidth: "600px" }}
                      >
                        <div
                          className="modal-content"
                          style={{
                            backgroundColor: !relay.timeFunction
                              ? "#eaeaea"
                              : "white",
                          }}
                        >
                          <div className="modal-header">
                            <h2 className="modal-title" id="myModalLabel">
                              ตั้งค่าเวลา
                            </h2>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              onClick={() =>
                                modalOff("modalstyleTime" + relayIndex)
                              }
                            >
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div
                            className="modal-body"
                            style={{
                              display: "flex",
                              gap: "20px",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "5px",
                                border: "solid 1px #c4c4c4",
                                borderRadius: "10px",
                              }}
                            >
                              <label>
                                <Image
                                  src="/datetime.png"
                                  width="30"
                                  height="30"
                                />
                              </label>

                              <h4 className="brief2">ตั้งค่าเวลา {relayIndex}</h4>
                              <label className="brief2" style={{ marginLeft: "auto" }}>
                                สถานะ
                              </label>
                              <label className={styles.switch2}>
                                <input
                                  id={"tStatus" + relayIndex}
                                  type="checkbox"
                                  onClick={() =>
                                    settimeFunction(
                                      "tStatus" + relayIndex,
                                      relay.relayID
                                    )
                                  }
                                  defaultChecked={
                                    relay.timeFunction ? true : false
                                  }
                                />
                                <span className={styles.slider}></span>
                              </label>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                padding: "5px",
                                border: "solid 1px #c4c4c4",
                                borderRadius: "10px",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <label className="brief2">ตั้งค่าเวลา 1 : เวลาเปิด: </label>
                                <input
                                  id={"time1on" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time1.time_on}
                                  style={{ margin: "10px" }}
                                  disabled={relay.timeFunction ? false : true}
                                />
                                <label className="brief2"> เวลาปิด :</label>
                                <input
                                  id={"time1off" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time1.time_off}
                                  style={{ margin: "10px" }}
                                  disabled={relay.timeFunction ? false : true}
                                />

                                <label
                                  className={styles.switch2}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <input
                                    id={"t1Status" + relayIndex}
                                    type="checkbox"
                                    defaultChecked={
                                      relay.timeFunction
                                        ? relay.time1.status
                                          ? true
                                          : false
                                        : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              <label className="brief2">ตั้งค่าวันที่ 1 : </label>
                              <div className={styles.weekday}>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day0" + relayIndex}
                                    defaultChecked={
                                      relay.time1.date[0] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label>
                                  htmlFor={"t1day1" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                    อา
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day1" + relayIndex}
                                    defaultChecked={
                                      relay.time1.date[1] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t1day1" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    จ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day2" + relayIndex}
                                    defaultChecked={
                                      relay.time1.date[2] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t1day2" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    อ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day3" + relayIndex}
                                    defaultChecked={
                                      relay.time1.date[3] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t1day3" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    พ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day4" + relayIndex}
                                    defaultChecked={
                                      relay.time1.date[4] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t1day4" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    พฤ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day5" + relayIndex}
                                    defaultChecked={
                                      relay.time1.date[5] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t1day5" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    ศ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day6" + relayIndex}
                                    defaultChecked={
                                      relay.time1.date[6] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t1day6" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    ส
                                  </label>
                                </label>
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  style={
                                    relay.timeFunction
                                      ? { fontSize: "16px" }
                                      : {
                                        fontSize: "16px",
                                        backgroundColor: "#DDDDDD",
                                        borderColor: "#DDDDDD",
                                        color: "#73879C",
                                      }
                                  }
                                  onClick={
                                    relay.timeFunction
                                      ? () =>
                                        putminitime(
                                          relayIndex,
                                          relay.relayID,
                                          1
                                        )
                                      : () => { }
                                  }
                                >
                                  บันทึก
                                </button>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                padding: "5px",
                                border: "solid 1px #c4c4c4",
                                borderRadius: "10px",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <label className="brief2">ตั้งค่าเวลา 2 : เวลาเปิด: </label>
                                <input
                                  id={"time2on" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time2.time_on}
                                  style={{ margin: "10px" }}
                                  disabled={relay.timeFunction ? false : true}
                                />
                                <label className="brief2"> เวลาปิด :</label>
                                <input
                                  id={"time2off" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time2.time_off}
                                  style={{ margin: "10px" }}
                                  disabled={relay.timeFunction ? false : true}
                                />
                                <label
                                  className={styles.switch2}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <input
                                    id={"t2Status" + relayIndex}
                                    type="checkbox"
                                    defaultChecked={
                                      relay.timeFunction
                                        ? relay.time1.status
                                          ? true
                                          : false
                                        : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              <label className="brief2">ตั้งค่าวันที่ 2 : </label>
                              <div className={styles.weekday}>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day0" + relayIndex}
                                    defaultChecked={
                                      relay.time2.date[0] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t2day0" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    อ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day1" + relayIndex}
                                    defaultChecked={
                                      relay.time2.date[1] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t2day1" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    จ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day2" + relayIndex}
                                    defaultChecked={
                                      relay.time2.date[2] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t2day2" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    อ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day3" + relayIndex}
                                    defaultChecked={
                                      relay.time2.date[3] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t2day3" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    พ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day4" + relayIndex}
                                    defaultChecked={
                                      relay.time2.date[4] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t2day4" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    พฤ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day5" + relayIndex}
                                    defaultChecked={
                                      relay.time2.date[5] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t2day5" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    ศ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day6" + relayIndex}
                                    defaultChecked={
                                      relay.time2.date[6] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t2day6" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    ส
                                  </label>
                                </label>
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  style={
                                    relay.timeFunction
                                      ? { fontSize: "16px" }
                                      : {
                                        fontSize: "16px",
                                        backgroundColor: "#DDDDDD",
                                        borderColor: "#DDDDDD",
                                        color: "#73879C",
                                      }
                                  }
                                  onClick={
                                    relay.timeFunction
                                      ? () =>
                                        putminitime(
                                          relayIndex,
                                          relay.relayID,
                                          2
                                        )
                                      : () => { }
                                  }
                                >
                                  บันทึก
                                </button>
                              </div>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                padding: "5px",
                                border: "solid 1px #c4c4c4",
                                borderRadius: "10px",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <label className="brief2">ตั้งค่าเวลา 3 : เวลาเปิด: </label>
                                <input
                                  id={"time3on" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time3.time_on}
                                  style={{ margin: "10px" }}
                                  disabled={relay.timeFunction ? false : true}
                                />
                                <label className="brief2"> เวลาปิด :</label>
                                <input
                                  id={"time3off" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time3.time_off}
                                  style={{ margin: "10px" }}
                                  disabled={relay.timeFunction ? false : true}
                                />
                                <label
                                  className={styles.switch2}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <input
                                    id={"t3Status" + relayIndex}
                                    type="checkbox"
                                    defaultChecked={
                                      relay.timeFunction
                                        ? relay.time1.status
                                          ? true
                                          : false
                                        : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              <label className="brief2">ตั้งค่าวันที่ 3 : </label>
                              <div className={styles.weekday}>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day0" + relayIndex}
                                    defaultChecked={
                                      relay.time3.date[0] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t3day0" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    อา
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day1" + relayIndex}
                                    defaultChecked={
                                      relay.time3.date[1] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t3day1" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    จ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day2" + relayIndex}
                                    defaultChecked={
                                      relay.time3.date[2] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t3day2" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    อ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day3" + relayIndex}
                                    defaultChecked={
                                      relay.time3.date[3] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t3day3" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    พ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day4" + relayIndex}
                                    defaultChecked={
                                      relay.time3.date[4] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t3day4" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    พฤ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day5" + relayIndex}
                                    defaultChecked={
                                      relay.time3.date[5] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t3day5" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    ศ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day6" + relayIndex}
                                    defaultChecked={
                                      relay.time3.date[6] == 1 ? true : false
                                    }
                                    disabled={relay.timeFunction ? false : true}
                                  />
                                  <label
                                    htmlFor={"t3day6" + relayIndex}
                                    style={
                                      !relay.timeFunction
                                        ? {
                                          backgroundColor: "#dddddd",
                                          color: "#73879C",
                                        }
                                        : {}
                                    }
                                  >
                                    ส
                                  </label>
                                </label>
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  style={
                                    relay.timeFunction
                                      ? { fontSize: "16px" }
                                      : {
                                        fontSize: "16px",
                                        backgroundColor: "#DDDDDD",
                                        borderColor: "#DDDDDD",
                                        color: "#73879C",
                                      } 
                                  }
                                  onClick={
                                    relay.timeFunction
                                      ? () =>
                                        putminitime(
                                          relayIndex,
                                          relay.relayID,
                                          3
                                        )
                                      : () => { }
                                  }
                                >
                                  บันทึก
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                              onClick={() =>
                                modalOff("modalstyleTime" + relayIndex)
                              }
                            >
                              ปิด
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id={"modalstyletime" + relayIndex}
                      className={styles.modal}
                      style={{ display: "none" }}
                    ></div>
                    <div key={index} className="">
                      <div
                        className="x_panel"
                        style={{
                          backgroundColor: !relay.status ? "#eaeaea" : "white",
                        }}
                      >
                        <div className="x_title">
                          <h2>รีเลย์ที่ {relayIndex}</h2>
                          <ul className="nav navbar-right panel_toolbox">
                            <li
                              className={setting ? "dropdown show" : "dropdown"}
                            >
                              <a
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                role="button"
                                aria-expanded={setting ? "true" : "false"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={
                                  relay.status
                                    ? () => relaysetting(relayIndex)
                                    : () => { }
                                }
                              >
                                <i className="fa fa-wrench"></i>
                              </a>
                              <div
                                id={"rlSetting" + relayIndex}
                                className={"dropdown-menu"}
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    modalOn("modalstyleTime" + relayIndex);
                                    relaysetting(relayIndex);
                                  }}
                                >
                                  <i className="fa fa-clock-o"></i> ตั้งค่าเวลา
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    modalOn("modalstyleData" + relayIndex);
                                    relaysetting(relayIndex);
                                    setdataValue([
                                      relay.data1.min,
                                      relay.data1.max,
                                    ]);
                                  }}
                                >
                                  <i className="fa fa-database"></i>{" "}
                                  ตั้งค่าข้อมูล
                                </a>
                              </div>
                            </li>
                            <li>
                              <a
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <label className={styles.switch2}>
                                  <input
                                    id={"status" + relayIndex}
                                    type="checkbox"
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      display: "block",
                                    }}
                                    defaultChecked={relay.status ? true : false}
                                    onChange={() =>
                                      changeStatus(
                                        "status" + relayIndex,
                                        relay.relayID
                                      )
                                    }
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </a>
                            </li>
                          </ul>

                          <div className="clearfix"></div>
                        </div>
                        <div
                          className="x_content"
                          style={{ display: " block" }}
                        >
                          <h2>
                            <i className="fa fa-clock-o"></i> ตั้งค่าเวลา :{" "}
                            {relay.timeFunction ? "เปิด" : "ปิด"}
                          </h2>
                          <h2>
                            รอบที่ 1 : {relay.time1.status ? "เปิด" : "ปิด"}
                          </h2>
                          <h2 className={relay.status ? "brief" : ""}>
                            เปิด : <i className="fa fa-clock-o"></i>{" "}
                            {relay.time1.time_on} | ปิด:{" "}
                            <i className="fa fa-clock-o"></i>{" "}
                            {relay.time1.time_off}
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time1.date[0] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              อา
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time1.date[1] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              จ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time1.date[2] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              อ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time1.date[3] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              พ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time1.date[4] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              พฤ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time1.date[5] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              ศ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time1.date[6] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              ส
                            </label>
                          </h2>
                          <h2>
                            รอบที่ 2 :{" "}
                            {relay.time2.status == 1 ? "เปิด" : "ปิด"}
                          </h2>
                          <h2 className={relay.status ? "brief" : ""}>
                            เปิด : <i className="fa fa-clock-o"></i>{" "}
                            {relay.time2.time_on} | ปิด:{" "}
                            <i className="fa fa-clock-o"></i>{" "}
                            {relay.time2.time_off}
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time2.date[0] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              อา
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time2.date[1] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              จ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time2.date[2] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              อ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time2.date[3] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              พ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time2.date[4] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              พฤ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time2.date[5] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              ศ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time2.date[6] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              ส
                            </label>
                          </h2>
                          <h2>
                            รอบที่ 3 :{" "}
                            {relay.time3.status == 1 ? "เปิด" : "ปิด"}
                          </h2>
                          <h2 className={relay.status ? "brief" : ""}>
                            เปิด : <i className="fa fa-clock-o"></i>{" "}
                            {relay.time3.time_on} | ปิด:{" "}
                            <i className="fa fa-clock-o"></i>{" "}
                            {relay.time3.time_off}
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time3.date[0] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              อา
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time3.date[1] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              จ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time3.date[2] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              อ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time3.date[3] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              พ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time3.date[4] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              พฤ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time3.date[5] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              ศ
                            </label>{" "}
                            <label
                              style={
                                relay.status
                                  ? relay.time3.date[6] == 1
                                    ? dayactive
                                    : dayunactive
                                  : dayunactive
                              }
                            >
                              ส
                            </label>
                          </h2>
                          <div className="x_title"></div>

                          <h2>
                            <i className="fa fa-database"></i> ตั้งค่าข้อมูล{" "}
                            {relay.dataFunction ? "เปิด" : "ปิด"}
                          </h2>
                          <h2>
                            <i className="fa fa-sun-o"></i> {relay.data1.data}{" "}
                            {relay.data1.status ? "เปิด" : "ปิด"}
                          </h2>
                          <h2 className={relay.status ? "brief" : ""}>
                            ค่าน้อยสุด:{" "}
                            <strong className={relay.status ? "minvalue" : ""}>
                              {relay.data1.min}{" "}
                              <i className="fa fa-long-arrow-down"></i>
                            </strong>{" "}
                            | ค่ามากสุด:{" "}
                            <strong className={relay.status ? "maxvalue" : ""}>
                              {relay.data1.max}{" "}
                              <i className="fa fa-long-arrow-up"></i>
                            </strong>
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p style={{ color: "red" }}>ปุ่มทดสอบ Modal success wating fail</p>
        <button onClick={() => setsuccess(true)}>SUCCESS</button>
        <button onClick={() => setwait(true)}>WAITING</button>
        <button onClick={() => setfail(true)}>ERROR</button>
      </div>
    </>
  );
}
node.Layout = Layout;
