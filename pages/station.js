import { React, useState } from "react";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import styles from "../styles/node.module.scss";

export default function station(props) {
  const router = useRouter();
  const Data = router.query;
  const stationIndex = Data.station;
  const farmName = Data.farm;
  if (farmName == undefined) {
    return <div>error</div>;
  }
  const [stapopup, setstapopup] = useState(false);
  const farmList = [
    { name: "ฟาร์มภูมิใจ", location: "อุตรดิตถ์", type: "ทุเรียน" },
    { name: "เพิ่มพูลฟาร์ม", location: "สุโขทัย", type: "ลองกอง" },
    { name: "ไร่ตันตระกูล", location: "สุโขทัย", type: "มะม่วง" },
    { name: "ทุ่งสุขสวัสดิ์", location: "น่าน", type: "ข้าวโพด" },
    { name: "สวนสตรอเบอรี่", location: "เพชรบูรณ์", type: "สตรอเบอรี่" },
  ];
  const nodeList = [{ name: "โหนด 1" }, { name: "โหนด 2" }, { name: "โหนด 3" }];
  return (
    <>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i> <Link href="/">หน้าหลัก</Link> /{" "}
            <i className="fa fa-sitemap"></i> <Link href={`/farm/1?farm=${farmName}`}>ฟาร์ม</Link> /{" "}
            <i className="fa fa-cubes"></i><Link href={`/station?station=${stationIndex}&farm=${farmName}`}>
              โรงเรือน
            </Link>
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
                <strong class="farmname">โรงเรือนที่{" "}
                  {stationIndex}</strong>
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
              src="/16_9test.jpg"
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
                    borderRadius: "4px"
                    
                  }
                  : { display: "none" }
              }
            >              
              <ul className="list-unstyled">
                <li><strong><i className="fa fa-tag"></i> ชื่อ :</strong> โรงเรือน 1 </li>
                <li><strong><i className="fa fa-rss"></i> รหัส : </strong> st048</li>
                <li><strong><i className="fa fa-cloud"></i> เกทเวย์ : </strong> 203.168.16.1</li>
                <li><strong><i className="fa fa-line-chart"></i> การวิเคราะห์ : </strong> ปิด</li>
                <li><strong><i className="fa fa-code-fork"></i> บล็อกเชนต์ : </strong> ปิด</li>
                <li><strong><i className="fa fa-cube"></i> แพคเกจ : </strong> Crops </li>
                <li><strong><i className="fa fa-calendar"></i> วันที่สร้าง : </strong> 04/11/2021 </li>
                <li><strong><i className="fa fa-calendar-o"></i> วันหมดอายุ : </strong> 04/11/2022</li>
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
                        style={{ position: "absolute", top: "0", right: "20px" }}
                      >
                        <input
                          id={"status"}
                          type="checkbox"
                          onClick={() => props.settest("test")}
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
                              <i className="fa fa-rss"></i> รหัส : </strong> ND0415
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                            <i className="fa fa-exchange"></i> <strong>สถานะ : </strong> ออนไลน์
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                            <i className="fa fa-calendar"></i> <strong>วันที่สร้าง : </strong> 04/11/2021
                            </h4>
                          </li>
                        </ul>
                        <ul className="list-unstyled">
                          <li>
                            <h4>
                            <i className="fa fa-clock-o"></i> <strong>อัพเดตข้อมูล : </strong> ทุก 5 นาที
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
                          onClick={() =>
                            router.push(
                              `/node?node=${index + 1
                              }&station=${stationIndex}&farm=${farmName}`
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

station.Layout = Layout;
