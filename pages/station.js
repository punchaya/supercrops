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
            <Link href={`/farm/1?farm=${farmName}`}>ฟาร์ม</Link> /{" "}
            <Link href={`/station?station=${stationIndex}&farm=${farmName}`}>
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
              <h5>
                <i className="fa fa-home"></i> {farmName} / โรงเรือนที่{" "}
                {stationIndex}
              </h5>
              <h2>จำนวนโหนด</h2>
            </span>
            <div className="count">
              <h3>{farmList.length}</h3>
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
          <img
            className="embed-responsive embed-responsive-16by9"
            src="/16_9test.jpg"
            style={{ maxWidth: "1200px", borderRadius: "2px" }}
          />
        </div>
      </div>

      <div className="row">
        <div className="x_panel">
          <div className="x_content">
            <div>
              <h2>รายการโหนด</h2>
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
                    <div className="col">
                      <label
                        className={styles.switch2}
                        style={{ position: "absolute", top: "0", right: "5px" }}
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
                      <div style={{ display: "flex", width: "100%" }}>
                        <h4 className="brief">โหนดที่ {index + 1}</h4>
                      </div>

                      <div className="text-left">
                        <h2>{node.name}</h2>
                      </div>
                    </div>
                    <div className=" bottom text-left">
                      <div className=" col">
                        <button
                          style={{ marginBottom: "20px" }}
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => router.push(`/farm/${index + 1}`)}
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
