import React from "react";
import styles from "../styles/comp.module.scss";
import Link from "next/link";
import HomeSvg from "../public/home.svg";
import OverviewSvg from "../public/overview.svg";
import OrganizSvg from "../public/organiz.svg";
import FarmSvg from "../public/farm.svg";
import NodeSvg from "../public/node.svg";
import UpSvg from "../public/up.svg";
import DownSvg from "../public/down.svg";

export default function layout({ children }) {
  var farm = [
    { name: "Farm1", node: ["Node1", "Node2"] },
    { name: "Farm2", node: ["Node1", "Node2", "Node3"] },
  ];
  function activebar(id) {
    if (id == "home" || id == "organiz") {
      document.getElementById("farmlist").style.display = "none";
      for (let l = 0; l < farm.length; l++) {
        const element = farm[l];
        document.getElementById(element.name).style.display = "none";
      }
    }
    for (let index = 0; index < farm.length; index++) {
      const farms = farm[index];
      const farmname = farms.name;
      for (let j = 0; j < farms.node.length; j++) {
        const nodename = farms.node[j];
        document.getElementById(farmname + nodename).style.borderLeft = "none";
        document.getElementById(farmname + nodename).style.color = "";
        document.getElementById(farmname + nodename).style.fontWeight = "400";
      }
    }
    document.getElementById("home").style.borderLeft = "none";
    document.getElementById("home").style.color = "";
    document.getElementById("home").style.fontWeight = "400";
    document.getElementById("organiz").style.borderLeft = "none";
    document.getElementById("organiz").style.color = "";
    document.getElementById("organiz").style.fontWeight = "400";
    document.getElementById("over").style.borderLeft = "none";
    document.getElementById("over").style.color = "";
    document.getElementById("over").style.fontWeight = "400";
    document.getElementById(id).style.borderLeft = "#fb4f14 solid 5px";
    document.getElementById(id).style.color = "#fb4f14";
    document.getElementById(id).style.fontWeight = "600";
  }
  function farmlist() {
    var dropdown = document.getElementById("farmlist");
    if (dropdown.style.display == "block") {
      dropdown.style.display = "none";
      for (let index = 0; index < farm.length; index++) {
        const element = farm[index];
        document.getElementById(element.name).style.display = "none";
      }
    } else {
      dropdown.style.display = "block";
    }
  }
  function nodelist(parm) {
    var dropdown = document.getElementById(parm);
    if (dropdown.style.display == "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
  }

  function overview(id) {
    farmlist();
    activebar(id);
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.user}></div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.side_icon}>icon</div>
          <div className={styles.sidenav}>
            <div
              id="home"
              onClick={() => activebar("home")}
              className={styles.menu_item}
            >
              <Link href="/">
                <div>
                  <HomeSvg />
                  <label>Home</label>
                </div>
              </Link>
            </div>
            <div
              id="over"
              className={styles.menu_item}
              onClick={() => overview("over")}
            >
              <div>
                <OverviewSvg />
                <label>Overview</label>
                <DownSvg />
              </div>
            </div>

            <div id="farmlist" className={styles.dpdwn_container}>
              {/*map farmname from farmlist json*/}
              {farm.map((val) => {
                return (
                  <>
                    <div>
                      <div
                        className={styles.dropdown_item_1rem}
                        onClick={() => nodelist(val.name)}
                      >
                        <FarmSvg />
                        <label>{val.name}</label>
                        <DownSvg />
                      </div>
                    </div>
                    <div>
                      <div id={val.name} className={styles.dpdwn_container}>
                        {val.node.map((nodes) => {
                          return (
                            <div
                              id={val.name + nodes}
                              className={styles.dropdown_item_2rem}
                              onClick={() => activebar(val.name + nodes)}
                            >
                              <Link href="/node">
                                <div className={styles.dropdown_item_2rem}>
                                  <NodeSvg />
                                  <label>{nodes}</label>
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div
              id="organiz"
              className={styles.menu_item}
              onClick={() => activebar("organiz")}
            >
              <div>
                <Link href="/organiz">
                  <div>
                    <OrganizSvg />
                    <label>Organization</label>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>
          Copyright © 2021-2025 Create by KITFORWARD
        </div>
      </div>
    </div>
  );
}
