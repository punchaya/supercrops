import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import router from "next/router";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import axios from "axios";

Home.getInitialProps = async function postFarm() {
  try {
    const response = await axios.post(
      "http://203.151.136.127:10001/api/getFarmID/69d3a3a1-8448-4a02-9f32-0bcab693d351",
      {
        orgId: "O21f42baf3ce842c292092197e17002cb",
      }
    );
    const res = response.data;
    console.log(res);
    const farm = await axios.post(
      "http://203.151.136.127:10001/api/farmDetail/",
      {
        orgId: "O21f42baf3ce842c292092197e17002cb",
        farmId: "F4227b07670ec437a9a6bde39d2530d87",
      }
    );
    const farmres = farm.data;
    console.log(farmres);
    return { res, farmres };
  } catch (error) {
    return { error };
  }
};

export default function Home(props) {
  const farmList = [
    { name: "ฟาร์มภูมิใจ", location: "อุตรดิตถ์", type: "ทุเรียน" },
    { name: "เพิ่มพูลฟาร์ม", location: "สุโขทัย", type: "ลองกอง" },
    { name: "ไร่ตันตระกูล", location: "สุโขทัย", type: "มะม่วง" },
    { name: "ทุ่งสุขสวัสดิ์", location: "น่าน", type: "ข้าวโพด" },
    { name: "สวนสตรอเบอรี่", location: "เพชรบูรณ์", type: "สตรอเบอรี่" },
  ];
  function link(url) {
    router.push(url);
  }
  return (
    <div>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i> <Link href="/">หน้าหลัก</Link> /
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
                <i className="fa fa-sitemap"></i> จำนวนฟาร์ม
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
                <i className="fa fa-sitemap"></i> ฟาร์มของฉัน
              </h2>
            </div>
            <div
              className="profile_details"
              style={{
                display: "flex",
                gap: "20px",
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
                      <h4 className="brief">ฟาร์มที่ {index + 1}</h4>
                      <div className="left col-md-7 col-sm-7">
                        <h2>
                        <strong class="farmname">{farm.name}</strong>
                        </h2>
                        <ul className="list-unstyled">
                          <li>
                            <i className="fa fa-location-arrow"></i> <b> จังหวัด: </b> {farm.location}
                          </li>
                          <li>
                            <i className="fa fa-leaf"></i><b> ผลผลิต: </b> {farm.type}
                          </li>
                        </ul>
                      </div>
                      <div className="right col-md-5 col-sm-5 text-center">
                        <Image src="/farm.png" width={64} height={64} />
                      </div>
                    </div>
                    <div className=" bottom text-right">
                      <div className=" col">
                        <button
                          style={{ marginBottom: "20px" }}
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            router.push(`/farm/${index + 1}?farm=${farm.name}`)
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
    </div>
  );
}
Home.Layout = Layout;
