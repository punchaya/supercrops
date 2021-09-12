import React, { useEffect, useState, GetStaticPaths } from "react";
import Layout from "../layout/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/farm.module.scss";
import Link from "next/link";
import axios from "axios";

export default function farm(props) {
  const router = useRouter();
  const Data = router.query;
  const farmName = Data.farm;
  const [stationID, setstationID] = useState([]);
  const [stationList, setstationList] = useState([]);
  const [farmList, setFarmList] = useState([1, 2, 3, 4, 5]);
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
    const resStation = await axios
      .post(`http://203.151.136.127:10001/api/stationMember/${farmID}`, {
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
    setstationID(resStation.data.stationIDlist);
    const stationIDlist = resStation.data.stationIDlist;
    for (let i = 0; i < stationIDlist.length; i++) {
      const stationID = stationIDlist[i];
      const resstationdata = await axios.post(
        `http://203.151.136.127:10001/api/detail/${farmID}`,
        {
          orgId: orgID,
          stationId: stationID,
        }
      );
      const stationdata = resstationdata.data;
      setstationList([]);
      setstationList((stationList) => [...stationList, stationdata]);
    }
  }, []);

  //

  return (
    <>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i>
            <Link href="/"> หน้าหลัก</Link> / <i className="fa fa-sitemap"></i>{" "}
            <Link href={`/farm?farm=${farmName}`}>ฟาร์ม</Link>
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
                <strong className="farmname">{farmName}</strong>
              </h2>
              <h2>
                <i className="fa fa-cubes"></i> จำนวนโรงเรือน
              </h2>
            </span>
            <div className="count">
              <h3>{stationID.length}</h3>
            </div>
            <span className="count_bottom"></span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="x_panel">
          <div className="x_content">
            <div>
              <h2>
                <i className="fa fa-cubes"></i> โรงเรือน
              </h2>
            </div>
            <div
              className="profile_details"
              style={{
                display: "flex",
                gap: "40px",
                maxWidth: "100%",
                flexFlow: "row wrap",
              }}
            >
              {stationList.map((station, index) => {
                return (
                  <div
                    key={index}
                    className="well profile_view"
                    style={{ minWidth: "320px", width: "400px" }}
                  >
                    <div className="col-sm-12">
                      <h4 className="brief">โรงเรือนที่ {index + 1}</h4>
                      <div className="left">
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-tag"></i> ชื่อ :{" "}
                              </strong>
                              {station.name}
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-rss"></i> รหัส :
                              </strong>{" "}
                              {station.stationID}
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-cube"></i> แพคเกจ :
                              </strong>{" "}
                              {station.package}
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-calendar"></i> วันที่สร้าง :
                              </strong>{" "}
                              {station.createDate}
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-calendar-o"></i> วันหมดอายุ
                                :
                              </strong>{" "}
                              {station.expireDate}
                            </h4>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className=" bottom text-right">
                      <div className=" col">
                        <button
                          style={{ marginBottom: "20px" }}
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            router.push(
                              `/station?station=${index + 1}&farm=${farmName}`
                            );
                            props.setstationID(station.stationID);
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

farm.Layout = Layout;
