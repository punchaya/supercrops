import { React, useState, useEffect } from "react";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import styles from "../styles/node.module.scss";
import axios from "axios";

export default function station(props) {
  const router = useRouter();
  //const Data = router.query;
  const [stapopup, setstapopup] = useState(false);

  const [nodeIDlist, setnodeIDlist] = useState([]);
  const [nodeList, setnodeList] = useState([]);
  const [station, setstation] = useState({});

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
    const orgID = localStorage.getItem("_orgID");
    const farmID = localStorage.getItem("_farmID");
    const stationID = localStorage.getItem("_stationID");
    const stations = await axios
      .post(`http://203.151.136.127:10001/api/${farmID}/s/${stationID}`, {
        orgId: orgID,
      })
      .catch((error) => {
        /*
          localStorage.clear();
          window.location.assign("/login");*/
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
    setstation(stations.data);
    console.log(stations.data);
    //const _nodeIDlist = ["Nd88a6d3b6aa64f98a6ca6ab26b5f757f"];  รอแก้ api แล้ว
    const _nodeIDlist = stations.data.nodeIDlist;
    console.log(stations.data);
    for (let i = 0; i < _nodeIDlist.length; i++) {
      const nodeid = _nodeIDlist[i];
      const nodeidstatus = await axios
        .post(`http://203.151.136.127:10001/api/${farmID}/n/${nodeid}/status`, {
          orgId: orgID,
        })
        .catch((error) => {
          /*
            localStorage.clear();
            window.location.assign("/login");*/
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        });

      console.log(nodeidstatus);
    }
    for (let i = 0; i < _nodeIDlist.length; i++) {
      const nodeid = _nodeIDlist[i];
      axios
        .post(`http://203.151.136.127:10001/api/${farmID}/n/${nodeid}`, {
          orgId: orgID,
        })
        .catch((error) => {
          /*
            localStorage.clear();
            window.location.assign("/login");*/
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        })
        .then((res) => {
          setnodeList([]);
          setnodeList((nodeList) => [...nodeList, res.data]);
        });
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i> <Link href="/">หน้าหลัก</Link> /{" "}
            <i className="fa fa-sitemap"></i> <Link href={`/farm`}>ฟาร์ม</Link>{" "}
            / <i className="fa fa-cubes"></i>
            <Link href={`/station`}>โรงเรือน</Link>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="x_panel">
          <div
            className="col-md-2 col-sm-4  tile_stats_count"
            style={{ minWidth: "300px", marginLeft: "-10px" }}
          >
            <span className="count_top">
              <h2>
                <strong className="farmname">โรงเรือน</strong>
              </h2>
              <h2>
                <i className="fa fa-dot-circle-o"></i> จำนวนโหนด
              </h2>
            </span>
            <div className="count">
              <h3>{nodeList.length}</h3>
            </div>
            <span className="count_bottom"></span>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{
          overflow: "hidden",
        }}
      >
        <div
          className="x_panel"
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              className="embed-responsive embed-responsive-16by9"
              src="/station-demo.png"
              style={{ maxWidth: "1200px", borderRadius: "2px" }}
            />
            <div
              style={{
                position: "absolute",
                right: "0px",
                bottom: "0px",
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setstapopup(!stapopup)}
              >
                <i className="fa fa-info-circle"></i> รายละเอียด
              </button>
            </div>
            <div
              id="stationID"
              className="x_panel"
              style={
                stapopup
                  ? {
                      minWidth: "200px",
                      width: "250px",
                      position: "absolute",
                      right: "5px",
                      bottom: "35px",
                      borderRadius: "4px",
                    }
                  : { display: "none" }
              }
            >
              <ul className="list-unstyled">
                <li>
                  <strong>
                    <i className="fa fa-tag"></i> ชื่อ :
                  </strong>{" "}
                  {station.name}{" "}
                </li>
                <li>
                  <strong>
                    <i className="fa fa-rss"></i> รหัส :{" "}
                  </strong>{" "}
                  {station.stationID}
                </li>
                <li>
                  <strong>
                    <i className="fa fa-cloud"></i> เกทเวย์ :{" "}
                  </strong>{" "}
                  {station.gateway ? "เปิด" : "ปิด"}
                </li>
                <li>
                  <strong>
                    <i className="fa fa-line-chart"></i> การวิเคราะห์ :{" "}
                  </strong>{" "}
                  {station.analytic ? "เปิด" : "ปิด"}
                </li>
                <li>
                  <strong>
                    <i className="fa fa-code-fork"></i> บล็อกเชนต์ :{" "}
                  </strong>{" "}
                  {station.blockchain ? "เปิด" : "ปิด"}
                </li>
                <li>
                  <strong>
                    <i className="fa fa-cube"></i> แพคเกจ :{" "}
                  </strong>{" "}
                  {station.package}
                </li>
                <li>
                  <strong>
                    <i className="fa fa-calendar"></i> วันที่สร้าง :{" "}
                  </strong>{" "}
                  {station.createDate}
                </li>
                <li>
                  <strong>
                    <i className="fa fa-calendar-o"></i> วันหมดอายุ :{" "}
                  </strong>{" "}
                  {station.expireDate}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="x_panel">
          <div className="x_content">
            <div>
              <h2>
                <i className="fa fa-dot-circle-o"></i> รายการโหนด
              </h2>
            </div>
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
              {nodeList.map((node, index) => {
                return (
                  <div
                    key={index}
                    className="well profile_view"
                    style={{ width: "350px", minWidth: "300px" }}
                  >
                    <div className="col-sm-12">
                      <label
                        className={styles.switch2}
                        style={{
                          position: "absolute",
                          top: "0",
                          right: "20px",
                        }}
                      >
                        <input
                          id={"status"}
                          type="checkbox"
                          onClick={() => props.settest("test")}
                          defaultChecked={node.status ? true : false}
                          style={{
                            width: "30px",
                            height: "30px",
                            display: "block",
                          }}
                        />
                        <span className={styles.slider}></span>
                      </label>
                      <div className="col-sm-12">
                        <h4 className="brief">โหนดที่ {index + 1}</h4>
                        <div className="left">
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <strong>
                                  <i className="fa fa-rss"></i> รหัส :{" "}
                                </strong>{" "}
                                {node.nodeID}
                              </h4>
                            </li>
                          </ul>
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <i className="fa fa-exchange"></i>{" "}
                                <strong>สถานะ : </strong>{" "}
                                {node.status ? "ออนไลน์" : "ออฟไลน์"}
                              </h4>
                            </li>
                          </ul>
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <i className="fa fa-calendar"></i>{" "}
                                <strong>วันที่สร้าง : </strong>{" "}
                                {node.createDate}
                              </h4>
                            </li>
                          </ul>
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <i className="fa fa-clock-o"></i>{" "}
                                <strong>อัพเดตข้อมูล : </strong> ทุก{" "}
                                {node.refreshTime}
                              </h4>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className=" bottom text-right">
                      <div className=" col">
                        <button
                          style={{ marginBottom: "20px" }}
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            router.push(`/node`);
                            props.setnodeID(node.nodeID);
                          }}
                        >
                          <i className="fa fa-eye"> </i> ดูข้อมูล
                        </button>
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

station.Layout = Layout;
