import React, { useEffect, useState, GetStaticPaths } from "react";
import Layout from "../../layout/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/farm.module.scss";
import Link from "next/link";

export default function farm(props) {
  const router = useRouter();
  const Data = router.query;
  const farmName = Data.farm;
  const [farmList, setFarmList] = useState([1, 2, 3, 4, 5]);
  var Index = parseInt(Data.index) - 1;

  //

  return (
    <>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i>
            <Link href="/"> หน้าหลัก</Link> /{" "}
            <i className="fa fa-sitemap"></i> <Link href={`/farm/${Index + 1}?farm=${farmName}`}>ฟาร์ม</Link>
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
                <strong class="farmname">{farmName}</strong>
              </h2>
              <h2>
                <i className="fa fa-cubes"></i> จำนวนโรงเรือน
              </h2>
            </span>
            <div className="count">
              <h3>{farmList.length}</h3>
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
              {farmList.map((farm, index) => {
                return (
                  <div
                    key={index}
                    className="well profile_view"
                    style={{ minWidth: "300px", width: "350px" }}
                  >
                    <div className="col-sm-12">
                      <h4 className="brief">โรงเรือนที่ {index + 1}</h4>
                      <div className="left">
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                            <strong>
                              <i className="fa fa-tag"></i> ชื่อ :
                              {" "}
                              </strong>
                              โรง 1                              
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-rss"></i> รหัส :
                              </strong>{" "}
                              st048
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-cube"></i> แพคเกจ :
                              </strong>{" "}
                              Crops
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                              <strong>
                                <i className="fa fa-calendar"></i> วันที่สร้าง :
                              </strong>{" "}
                              04/11/2020
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
                              04/11/2021
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
                          onClick={() =>
                            router.push(
                              `/station?station=${index + 1}&farm=${farmName}`
                            )
                          }
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
