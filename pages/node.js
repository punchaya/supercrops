import { React, useState, useEffect } from "react";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../styles/node.module.scss";
import { Scatter, Bar } from "react-chartjs-2";
import axios from "axios";

export default function node(props) {
  const router = useRouter();
  const Data = router.query;
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
    color: "#5a5a5a",
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
  const [success, setsuccess] = useState(false);

  useEffect(async () => {
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
      orgId: "O21f42baf3ce842c292092197e17002cb",
      tsdbToken:
        "mheVFAOhXfaXI-cbT5vfIm4hqYPjcUafZNCxFpHZY2BVCYFdTXgevr1peNWf9EBN_h2qxKXQ9QmNcTprA3AGuQ==",
      zoneId: "Zf52e5380caf04c7ab0775811bfaab4c3",
      graphData: "weather_temperature",
      time1: 1627033952071,
      time2: 1627035181017,
    };
    console.log(testreqdata);
    const datapoint = await axios
      .post(
        `http://203.151.136.127:10002/api/tsdb/service/F4227b07670ec437a9a6bde39d2530d87/Nd88a6d3b6aa64f98a6ca6ab26b5f757f`,
        testreqdata
      )
      .catch((error) => {
        /*
      localStorage.clear();
      window.location.assign("/login");*/
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    console.log(datapoint);
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
      z_list.push(zoneres.data);
      z_cont.push(false);
    }
    setzoneContent(z_cont);
    setzoneList(z_list);
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
      r_list.push(relay.data);
    }
    setrelayList(r_list);
  }, []);

  async function reloadData() {
    const _orgID = localStorage.getItem("_orgID");
    const _farmID = localStorage.getItem("_farmID");
    const _nodeID = localStorage.getItem("_nodeID");
    const nodeInfo = await axios.post(
      `http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}`,
      {
        orgId: _orgID,
      }
    );
    const nodeInfores = nodeInfo.data;
    setnodeInfo(nodeInfores);
    setzoneIDlist(nodeInfores.zoneIDlist);
    setrelayIDlist(nodeInfores.relayIDlist);
    let z_list = [];
    let z_cont = [];
    for (let j = 0; j < nodeInfores.zoneIDlist.length; j++) {
      const zoneID = nodeInfores.zoneIDlist[j];
      const zoneres = await axios.post(
        `http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}/data`,
        {
          orgId: _orgID,
          zoneId: zoneID,
        }
      );
      z_list.push(zoneres.data);
      z_cont.push(false);
    }
    setzoneContent(z_cont);
    setzoneList(z_list);
    let r_list = [];
    for (let i = 0; i < nodeInfores.relayIDlist.length; i++) {
      const relayID = nodeInfores.relayIDlist[i];
      const relay = await axios.post(
        `http://203.151.136.127:10001/api/${_farmID}/n/${_nodeID}/relay`,
        {
          orgId: _orgID,
          relayId: relayID,
        }
      );
      r_list.push(relay.data);
    }
    setrelayList(r_list);
  }

  function putData(data, relayID, method) {
    const _farmID = localStorage.getItem("_farmID");
    const _nodeID = localStorage.getItem("_nodeID");
    if (method == "status") {
      axios
        .put(
          `http://203.151.136.127:10001/api/update/${_farmID}/${_nodeID}/${relayID}/status`,
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
          `http://203.151.136.127:10001/api/update/${_farmID}/${_nodeID}/${relayID}/time`,
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
          `http://203.151.136.127:10001/api/update/${_farmID}/${_nodeID}/${relayID}/data`,
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
  function rangeData(id, pos) {
    const value = document.getElementById(id).value;
    document.getElementById(id + "text").innerHTML = value;
    document.getElementById(id + "text").value = value;
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
    const _orgId = localStorage.getItem("_orgID");
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
    const _datamin = document.getElementById(
      "data" + dataIndex + "min" + relayIndex
    ).value;
    const _datamax = document.getElementById(
      "data" + dataIndex + "max" + relayIndex
    ).value;
    const putmethod = "data";
    if (dataIndex == 1) {
      const _putData = {
        orgId: _orgId,
        data1: {
          status: _dataStatus.toString(),
          data: _dataSelect,
          max: parseInt(_datamax),
          min: parseInt(_datamin),
        },
      };
      console.log(_putData);
      putData(_putData, relayID, putmethod);
    } else {
      console.log("put data error");
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
  function putminitime(relayIndex, relayID, timeIndex) {
    const _orgId = localStorage.getItem("_orgID");
    const time = [];
    const timecheck = document.getElementById(
      "t" + timeIndex + "Status" + relayIndex
    ).checked;

    if (timecheck) {
      time.push(1);
    } else {
      time.push(0);
    }
    const timeon = document.getElementById(
      "time" + timeIndex + "on" + relayIndex
    ).value;
    const timeoff = document.getElementById(
      "time" + timeIndex + "off" + relayIndex
    ).value;
    time.push(timeon);
    time.push(timeoff);
    for (let i = 3; i <= 9; i++) {
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
      const _putdata = {
        orgId: _orgId,
        time1: time,
      };
      const putmethod = "time";
      putData(_putdata, relayID, putmethod);
    } else if (timeIndex == 2) {
      const _putdata = {
        orgId: _orgId,
        time2: time,
      };
      const putmethod = "time";
      putData(_putdata, relayID, putmethod);
    } else if (timeIndex == 3) {
      const _putdata = {
        orgId: _orgId,
        time3: time,
      };
      const putmethod = "time";
      putData(_putdata, relayID, putmethod);
    } else {
      const _putdata = {
        orgId: _orgId,
      };
      const putmethod = "time";
      putData(_putdata, relayID, putmethod);
    }
    modalOff("modalstyleData" + relayIndex);
  }
  function changeStatus(id, relayID) {
    const _orgId = localStorage.getItem("_orgID");
    const check = document.getElementById(id).checked;
    if (check) {
      var status = true;
    } else {
      var status = false;
    }
    const _putdata = {
      orgId: _orgId,
      status: status,
    };
    putData(_putdata, relayID, "status");
  }
  return (
    <>
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
          <div className="color-green">Success</div>
          <button
            className="btn btn-success"
            onClick={() => setsuccess(!success)}
          >
            OK
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
                  <strong className="farmname">โหนดที่ {"nodeIndex"}</strong>
                </h2>
              </span>
              <div>
                <h2>
                  <span className="brief">
                    <i className="fa fa-rss"></i> รหัสโหนด
                  </span>{" "}
                  <label className="nodeid">{nodeInfo.nodeID}</label>
                </h2>
              </div>
            </div>
            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2 className={styles.online}>
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
                  <label className={styles.online}>ออนไลน์</label>
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
                <a className="collapse-link">
                  <i className="fa fa-chevron-up"></i>
                </a>
              </li>
            </ul>
            <div className="clearfix"></div>
          </div>
          <div
            className="x_content"
            style={{ display: "flex", justifyContent: "center" }}
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
            let dataList = [];
            const zoneData = zone[0];
            const zIndex = index + 1;
            for (var key in zoneData) {
              if (zoneData.hasOwnProperty(key)) {
                dataList.push([key, zoneData[key]]);
              }
            }
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
                    {dataList.map((data, index) => {
                      return (
                        <div
                          key={index}
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
                return (
                  <div key={index}>
                    <div
                      id={"modalstyleData" + relayIndex}
                      className={styles.modal}
                      style={{ display: "none" }}
                    >
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h2 className="modal-title" id="myModalLabel">
                              Data Setting
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

                              <h4> Data Setting {"relay " + relayIndex}</h4>
                              <label style={{ marginLeft: "auto" }}>
                                Status
                              </label>
                              <label className={styles.switch2}>
                                <input
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
                                <label>
                                  <h4>
                                    Data :
                                    <select
                                      id={"dataSelect1" + relayIndex}
                                      style={{
                                        color: "#73879C",
                                        height: "30px",
                                        marginLeft: "10px",
                                        borderColor: "#BEBEBE",
                                      }}
                                    >
                                      <option value={"weather_temperature"}>
                                        เลือกข้อมูล
                                      </option>
                                      <option value={"weather_temperature"}>
                                        1
                                      </option>
                                      <option value={"soil_moisture"}>2</option>
                                      <option value={"data3"}>3</option>
                                      <option value={"data4"}>4</option>
                                      <option value={"data5"}>5</option>
                                      <option value={"data6"}>6</option>
                                    </select>
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
                                      relay.data1.status ? true : false
                                    }
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              Min :{" "}
                              <label id={"data1min" + relayIndex + "text"}>
                                {relay.data1.min}
                              </label>
                              <input
                                id={"data1min" + relayIndex}
                                type="range"
                                min="0"
                                max="100"
                                defaultValue={relay.data1.min}
                                onChange={() =>
                                  rangeData("data1min" + relayIndex, "data1min")
                                }
                              />
                              Max :{" "}
                              <label id={"data1max" + relayIndex + "text"}>
                                {relay.data1.max}
                              </label>
                              <input
                                id={"data1max" + relayIndex}
                                type="range"
                                min="0"
                                max="100"
                                defaultValue={relay.data1.max}
                                onChange={() =>
                                  rangeData("data1max" + relayIndex, "data1max")
                                }
                              />{" "}
                              <button
                                type="button"
                                className="btn btn-primary"
                                style={{
                                  display: "flex",
                                  gap: "5px",
                                  alignItems: "center",
                                  fontSize: "12px",
                                  maxWidth: "80px",
                                }}
                                onClick={() =>
                                  putminiData(relayIndex, relay.relayID, 1)
                                }
                              >
                                <Image
                                  src="/save_white.png"
                                  width={16}
                                  height={16}
                                />{" "}
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
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                              }}
                              onClick={() =>
                                putDataSetting(relay, relayIndex, relay.relayID)
                              }
                            >
                              <Image
                                src="/save_white.png"
                                width={20}
                                height={20}
                              />{" "}
                              บันทึก
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
                        <div className="modal-content">
                          <div className="modal-header">
                            <h2 className="modal-title" id="myModalLabel">
                              Time Setting
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

                              <h4>Time Setting {relayIndex}</h4>
                              <label style={{ marginLeft: "auto" }}>
                                Status
                              </label>
                              <label className={styles.switch2}>
                                <input
                                  id={"tStatus" + relayIndex}
                                  type="checkbox"
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
                                <label>Time 1 Setting : On: </label>
                                <input
                                  id={"time1on" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time1[1]}
                                  style={{ margin: "10px" }}
                                />
                                <label> Off :</label>
                                <input
                                  id={"time1off" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time1[2]}
                                  style={{ margin: "10px" }}
                                />

                                <label
                                  className={styles.switch2}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <input
                                    id={"t1Status" + relayIndex}
                                    type="checkbox"
                                    defaultChecked={
                                      relay.time1[0] == 1 ? true : false
                                    }
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              <label>Day1 Setting : </label>
                              <div className={styles.weekday}>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day3" + relayIndex}
                                    defaultChecked={
                                      relay.time1[3] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t1day3" + relayIndex}>
                                    อาทิตย์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day4" + relayIndex}
                                    defaultChecked={
                                      relay.time1[4] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t1day4" + relayIndex}>
                                    จันทร์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day5" + relayIndex}
                                    defaultChecked={
                                      relay.time1[5] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t1day5" + relayIndex}>
                                    อังคาร
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day6" + relayIndex}
                                    defaultChecked={
                                      relay.time1[6] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t1day6" + relayIndex}>
                                    พุธ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day7" + relayIndex}
                                    defaultChecked={
                                      relay.time1[7] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t1day7" + relayIndex}>
                                    พฤหัส
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day8" + relayIndex}
                                    defaultChecked={
                                      relay.time1[8] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t1day8" + relayIndex}>
                                    ศุกร์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t1day9" + relayIndex}
                                    defaultChecked={
                                      relay.time1[9] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t1day9" + relayIndex}>
                                    เสาร์
                                  </label>
                                </label>
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  style={{ fontSize: "12px" }}
                                  onClick={() =>
                                    putminitime(relayIndex, relay.relayID, 1)
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
                                <label>Time 2 Setting : On: </label>
                                <input
                                  id={"time2on" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time2[1]}
                                  style={{ margin: "10px" }}
                                />
                                <label> Off :</label>
                                <input
                                  id={"time2off" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time2[2]}
                                  style={{ margin: "10px" }}
                                />
                                <label
                                  className={styles.switch2}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <input
                                    id={"t2Status" + relayIndex}
                                    type="checkbox"
                                    defaultChecked={
                                      relay.time1[0] == 1 ? true : false
                                    }
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              <label>Day2 Setting : </label>
                              <div className={styles.weekday}>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day3" + relayIndex}
                                    defaultChecked={
                                      relay.time2[3] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t2day3" + relayIndex}>
                                    อาทิตย์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day4" + relayIndex}
                                    defaultChecked={
                                      relay.time2[4] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t2day4" + relayIndex}>
                                    จันทร์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day5" + relayIndex}
                                    defaultChecked={
                                      relay.time2[5] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t2day5" + relayIndex}>
                                    อังคาร
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day6" + relayIndex}
                                    defaultChecked={
                                      relay.time2[6] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t2day6" + relayIndex}>
                                    พุธ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day7" + relayIndex}
                                    defaultChecked={
                                      relay.time2[7] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t2day7" + relayIndex}>
                                    พฤหัส
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day8" + relayIndex}
                                    defaultChecked={
                                      relay.time2[8] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t2day8" + relayIndex}>
                                    ศุกร์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t2day9" + relayIndex}
                                    defaultChecked={
                                      relay.time2[9] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t2day9" + relayIndex}>
                                    เสาร์
                                  </label>
                                </label>
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  style={{ fontSize: "12px" }}
                                  onClick={() =>
                                    putminitime(relayIndex, relay.relayID, 2)
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
                                <label>Time 3 Setting : On: </label>
                                <input
                                  id={"time3on" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time3[1]}
                                  style={{ margin: "10px" }}
                                />
                                <label> Off :</label>
                                <input
                                  id={"time3off" + relayIndex}
                                  type="time"
                                  defaultValue={relay.time3[2]}
                                  style={{ margin: "10px" }}
                                />
                                <label
                                  className={styles.switch2}
                                  style={{ marginLeft: "auto" }}
                                >
                                  <input
                                    id={"t3Status" + relayIndex}
                                    type="checkbox"
                                    defaultChecked={
                                      relay.time1[0] == 1 ? true : false
                                    }
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </div>
                              <label>Day3 Setting : </label>
                              <div className={styles.weekday}>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day3" + relayIndex}
                                    defaultChecked={
                                      relay.time3[3] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t3day3" + relayIndex}>
                                    อาทิตย์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day4" + relayIndex}
                                    defaultChecked={
                                      relay.time3[4] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t3day4" + relayIndex}>
                                    จันทร์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day5" + relayIndex}
                                    defaultChecked={
                                      relay.time3[5] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t3day5" + relayIndex}>
                                    อังคาร
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day6" + relayIndex}
                                    defaultChecked={
                                      relay.time3[6] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t3day6" + relayIndex}>
                                    พุธ
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day7" + relayIndex}
                                    defaultChecked={
                                      relay.time3[7] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t3day7" + relayIndex}>
                                    พฤหัส
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day8" + relayIndex}
                                    defaultChecked={
                                      relay.time3[8] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t3day8" + relayIndex}>
                                    ศุกร์
                                  </label>
                                </label>
                                <label>
                                  <input
                                    type="checkbox"
                                    id={"t3day9" + relayIndex}
                                    defaultChecked={
                                      relay.time3[9] == 1 ? true : false
                                    }
                                  />
                                  <label htmlFor={"t3day9" + relayIndex}>
                                    เสาร์
                                  </label>
                                </label>
                              </div>
                              <div>
                                <button
                                  className="btn btn-primary"
                                  style={{ fontSize: "12px" }}
                                  onClick={() =>
                                    putminitime(relayIndex, relay.relayID, 3)
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
                            <button
                              type="button"
                              className="btn btn-primary"
                              style={{
                                display: "flex",
                                gap: "5px",
                                alignItems: "center",
                              }}
                              onClick={() =>
                                putTimeSetting(relayIndex, relay.relayID)
                              }
                            >
                              <Image
                                src="/save_white.png"
                                width={20}
                                height={20}
                              />{" "}
                              บันทึก
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
                      <div className="x_panel">
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
                                onClick={() => relaysetting(relayIndex)}
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
                            รอบที่ 1 : {relay.time1[0] == 1 ? "เปิด" : "ปิด"}
                          </h2>
                          <h2 className="brief">
                            เปิด : <i className="fa fa-clock-o"></i>{" "}
                            {relay.time1[1]} | ปิด:{" "}
                            <i className="fa fa-clock-o"></i> {relay.time1[2]}
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label
                              style={
                                relay.time1[3] == 1 ? dayactive : dayunactive
                              }
                            >
                              อา
                            </label>{" "}
                            <label
                              style={
                                relay.time1[4] == 1 ? dayactive : dayunactive
                              }
                            >
                              จ
                            </label>{" "}
                            <label
                              style={
                                relay.time1[5] == 1 ? dayactive : dayunactive
                              }
                            >
                              อ
                            </label>{" "}
                            <label
                              style={
                                relay.time1[6] == 1 ? dayactive : dayunactive
                              }
                            >
                              พ
                            </label>{" "}
                            <label
                              style={
                                relay.time1[7] == 1 ? dayactive : dayunactive
                              }
                            >
                              พฤ
                            </label>{" "}
                            <label
                              style={
                                relay.time1[8] == 1 ? dayactive : dayunactive
                              }
                            >
                              ศ
                            </label>{" "}
                            <label
                              style={
                                relay.time1[9] == 1 ? dayactive : dayunactive
                              }
                            >
                              ส
                            </label>
                          </h2>
                          <h2>
                            รอบที่ 2 : {relay.time2[0] == 1 ? "เปิด" : "ปิด"}
                          </h2>
                          <h2 className="brief">
                            เปิด : <i className="fa fa-clock-o"></i>{" "}
                            {relay.time2[1]} | ปิด:{" "}
                            <i className="fa fa-clock-o"></i> {relay.time2[2]}
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label
                              style={
                                relay.time2[3] == 1 ? dayactive : dayunactive
                              }
                            >
                              อา
                            </label>{" "}
                            <label
                              style={
                                relay.time2[4] == 1 ? dayactive : dayunactive
                              }
                            >
                              จ
                            </label>{" "}
                            <label
                              style={
                                relay.time2[5] == 1 ? dayactive : dayunactive
                              }
                            >
                              อ
                            </label>{" "}
                            <label
                              style={
                                relay.time2[6] == 1 ? dayactive : dayunactive
                              }
                            >
                              พ
                            </label>{" "}
                            <label
                              style={
                                relay.time2[7] == 1 ? dayactive : dayunactive
                              }
                            >
                              พฤ
                            </label>{" "}
                            <label
                              style={
                                relay.time2[8] == 1 ? dayactive : dayunactive
                              }
                            >
                              ศ
                            </label>{" "}
                            <label
                              style={
                                relay.time2[9] == 1 ? dayactive : dayunactive
                              }
                            >
                              ส
                            </label>
                          </h2>
                          <h2>
                            รอบที่ 3 : {relay.time3[0] == 1 ? "เปิด" : "ปิด"}
                          </h2>
                          <h2 className="brief">
                            เปิด : <i className="fa fa-clock-o"></i>{" "}
                            {relay.time3[1]} | ปิด:{" "}
                            <i className="fa fa-clock-o"></i> {relay.time3[2]}
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label
                              style={
                                relay.time3[3] == 1 ? dayactive : dayunactive
                              }
                            >
                              อา
                            </label>{" "}
                            <label
                              style={
                                relay.time3[4] == 1 ? dayactive : dayunactive
                              }
                            >
                              จ
                            </label>{" "}
                            <label
                              style={
                                relay.time3[5] == 1 ? dayactive : dayunactive
                              }
                            >
                              อ
                            </label>{" "}
                            <label
                              style={
                                relay.time3[6] == 1 ? dayactive : dayunactive
                              }
                            >
                              พ
                            </label>{" "}
                            <label
                              style={
                                relay.time3[7] == 1 ? dayactive : dayunactive
                              }
                            >
                              พฤ
                            </label>{" "}
                            <label
                              style={
                                relay.time3[8] == 1 ? dayactive : dayunactive
                              }
                            >
                              ศ
                            </label>{" "}
                            <label
                              style={
                                relay.time3[9] == 1 ? dayactive : dayunactive
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
                          <h2 className="brief">
                            ค่าน้อยสุด:{" "}
                            <strong className="minvalue">
                              {relay.data1.min}{" "}
                              <i className="fa fa-long-arrow-down"></i>
                            </strong>{" "}
                            | ค่ามากสุด:{" "}
                            <strong className="maxvalue">
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
    </>
  );
}
node.Layout = Layout;
