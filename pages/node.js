import { React, useState, useEffect } from "react";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import styles from "../styles/node.module.scss";
import $ from "jquery";
import Timesetting from "../components/Timesetting";
import Datasetting from "../components/Datasetting";
import { Scatter, Bar } from "react-chartjs-2";
import axios from "axios";

export default function node(props) {
  const data = {
    labels: ["a", "b", "c", "d", "e", "a", "b", "c", "d", "e"],
    datasets: [
      {
        label: "A dataset",
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
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

  useEffect(async () => {
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
  }, []);

  if (typeof window === "object") {
    $(document).ready(function () {
      $(".collapse-link").on("click", function () {
        var $BOX_PANEL = $(this).closest(".x_panel"),
          $ICON = $(this).find("i"),
          $BOX_CONTENT = $BOX_PANEL.find(".x_content");

        if ($BOX_PANEL.attr("style")) {
          $BOX_CONTENT.slideToggle(200, function () {
            $BOX_PANEL.removeAttr("style");
          });
        } else {
          $BOX_CONTENT.slideToggle(200);
          $BOX_PANEL.css("height", "auto");
        }

        $ICON.toggleClass("fa-chevron-up fa-chevron-down");
      });
      $(".close-link").click(function () {
        var $BOX_PANEL = $(this).closest(".x_panel");

        $BOX_PANEL.remove();
      });
    });
  }

  const [setting, setsetting] = useState([]);
  const [timeSetting, settimeSetting] = useState([]);

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
  return (
    <>
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
                  <label>ND0415</label>
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
                    <option value="saab">ทุก 5 นาที</option>
                    <option value="fiat">ทุก 10 นาที</option>
                    <option value="audi">ทุก 15 นาที</option>
                    <option value="audi">ทุก 20 นาที</option>
                    <option value="audi">ทุก 25 นาที</option>
                    <option value="audi">ทุก 30 นาที</option>
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
            <Bar
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
                const timeSetting = false;
                const dataSetting = false;
                function relaysetting(index) {
                  const settingbox = document.getElementById(
                    "rlSetting" + index
                  );
                  if (settingbox.className == "dropdown-menu") {
                    settingbox.className = "dropdown-menu show";
                  } else {
                    settingbox.className = "dropdown-menu";
                  }
                }
                return (
                  <div key={index}>
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
                                    settimeSetting(!timeSetting);
                                    setsetting(!setsetting);
                                  }}
                                >
                                  <i className="fa fa-clock-o"></i> ตั้งค่าเวลา
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={() => {
                                    setdataSetting(!dataSetting);
                                    setsetting(!setsetting);
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
                                    id={"status"}
                                    type="checkbox"
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      display: "block",
                                    }}
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
                            <i className="fa fa-clock-o"></i> ตั้งค่าเวลา
                          </h2>
                          <h2>รอบที่ 1 : เปิด</h2>
                          <h2 className="brief">
                            เปิด : <i className="fa fa-clock-o"></i> เวลา | ปิด:{" "}
                            <i className="fa fa-clock-o"></i> เวลา
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label style={dayunactive}>อา</label>{" "}
                            <label style={dayactive}>จ</label>{" "}
                            <label style={dayunactive}>อ</label>{" "}
                            <label style={dayactive}>พ</label>{" "}
                            <label style={dayunactive}>พฤ</label>{" "}
                            <label style={dayunactive}>ศ</label>{" "}
                            <label style={dayactive}>ส</label>
                          </h2>
                          <h2>รอบที่ 2 : ปิด</h2>
                          <h2 className="brief">
                            เปิด : <i className="fa fa-clock-o"></i> เวลา | ปิด:{" "}
                            <i className="fa fa-clock-o"></i> เวลา
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label style={dayunactive}>อา</label>{" "}
                            <label style={dayactive}>จ</label>{" "}
                            <label style={dayunactive}>อ</label>{" "}
                            <label style={dayactive}>พ</label>{" "}
                            <label style={dayunactive}>พฤ</label>{" "}
                            <label style={dayunactive}>ศ</label>{" "}
                            <label style={dayactive}>ส</label>
                          </h2>
                          <h2>รอบที่ 3 : ปิด</h2>
                          <h2 className="brief">
                            เปิด : <i className="fa fa-clock-o"></i> เวลา | ปิด:{" "}
                            <i className="fa fa-clock-o"></i> เวลา
                          </h2>
                          <h2>
                            <label>วัน </label>{" "}
                            <label style={dayunactive}>อา</label>{" "}
                            <label style={dayactive}>จ</label>{" "}
                            <label style={dayunactive}>อ</label>{" "}
                            <label style={dayactive}>พ</label>{" "}
                            <label style={dayunactive}>พฤ</label>{" "}
                            <label style={dayunactive}>ศ</label>{" "}
                            <label style={dayactive}>ส</label>
                          </h2>
                          <div className="x_title"></div>

                          <h2>
                            <i className="fa fa-database"></i> ตั้งค่าข้อมูล
                          </h2>
                          <h2>
                            <i className="fa fa-sun-o"></i> แสง
                          </h2>
                          <h2 className="brief">
                            ค่าน้อยสุด:{" "}
                            <strong className="minvalue">
                              Min <i className="fa fa-long-arrow-down"></i>
                            </strong>{" "}
                            | ค่ามากสุด:{" "}
                            <strong className="maxvalue">
                              Max <i className="fa fa-long-arrow-up"></i>
                            </strong>
                          </h2>
                          <h2>
                            <i className="fa fa-fire"></i> อุณหภูมิ
                          </h2>
                          <h2 className="brief">
                            ค่าน้อยสุด:{" "}
                            <strong className="minvalue">
                              Min <i className="fa fa-long-arrow-down"></i>
                            </strong>{" "}
                            | ค่ามากสุด:{" "}
                            <strong className="maxvalue">
                              Max <i className="fa fa-long-arrow-up"></i>
                            </strong>
                          </h2>
                          <h2>
                            <i className="fa fa-tint"></i> ความชื้น
                          </h2>
                          <h2 className="brief">
                            ค่าน้อยสุด:{" "}
                            <strong className="minvalue">
                              Min <i className="fa fa-long-arrow-down"></i>
                            </strong>{" "}
                            | ค่ามากสุด:{" "}
                            <strong className="maxvalue">
                              Max <i className="fa fa-long-arrow-up"></i>
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
