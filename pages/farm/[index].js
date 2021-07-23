import React, { useEffect, useState, GetStaticPaths } from "react";
import Layout from "../../layout/layout";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/farm.module.scss";
import Link from "next/link";

async function fetchData() {
  const response = await fetch("http://localhost:3001/farms");
  const fetchedData = await response.json();

  return { fetchedData };
}

export default function farm(props) {
  const router = useRouter();
  const Data = router.query;
  const farmName = Data.farm;
  const [farmList, setFarmList] = useState(props.fetchedData);
  var Index = parseInt(Data.index) - 1;

  //
  async function reload() {
    const refreshedProps = await fetchData();
    setFarmList(refreshedProps.fetchedData);
  }

  if (Data.index != undefined) {
    useEffect(() => {
      farmList.map((farm) => {
        farm.node.map((node, i) => {
          if (document.getElementById(farm.name + "_node" + (i + 1))) {
            document.getElementById(
              farm.name + "_node" + (i + 1)
            ).style.display = "none";
          }
        });
      });
    }, []);

    var Farm = farmList[Index];
    useEffect(() => {
      sessionStorage.title = "Farm " + (Index + 1) + " : " + Farm.name;
    }, []);

    return (
      <>
        <div className="row">
          <div className="x_panel">
            <h2>
              <i className="fa fa-home"></i>
              <Link href="/"> หน้าหลัก</Link> /{" "}
              <Link href={`/farm/${Index + 1}?farm=${farmName}`}>ฟาร์ม</Link>
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
                  <i className="fa fa-home"></i> {farmName}
                </h5>
                <h2>จำนวนโรงเรือน</h2>
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
                <h2>โรงเรือน</h2>
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
                        <h2 className="brief">โรงเรือนที่ {index + 1}</h2>
                        <div className="left">
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <strong>
                                  <i className="fa fa-tag"></i> ชื่อ :
                                </strong>{" "}
                                โรง 1
                              </h4>
                            </li>
                          </ul>
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <strong>
                                  <i className="fa fa-home"></i> ไอดี :
                                </strong>{" "}
                                st048
                              </h4>
                            </li>
                          </ul>
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <strong>
                                  <i className="fa fa-book"></i> แพคเกจ :
                                </strong>{" "}
                                test
                              </h4>
                            </li>
                          </ul>
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <strong>
                                  <i className="fa fa-calendar"></i> วันที่สร้าง
                                  :
                                </strong>{" "}
                                04/11/2020
                              </h4>
                            </li>
                          </ul>
                          <ul className="list-unstyled">
                            <li>
                              <h4>
                                <strong>
                                  <i className="fa fa-calendar-o"></i>{" "}
                                  วันหมดอายุ :
                                </strong>{" "}
                                04/11/2021
                              </h4>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className=" bottom text-center">
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
  } else {
    return <div>Loading..</div>;
  }
}
farm.Layout = Layout;
farm.getInitialProps = fetchData;
