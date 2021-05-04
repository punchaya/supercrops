import React, { useState } from "react";
import styles from "../styles/layout.module.scss";
import Link from "next/link";
import Image from "next/image";
import HomeSvg from "../public/home.svg";
import OverviewSvg from "../public/overview.svg";
import OrganizSvg from "../public/organiz.svg";
import FarmSvg from "../public/farm.svg";
import NodeSvg from "../public/node.svg";
import UpSvg from "../public/up.svg";
import DownSvg from "../public/down.svg";

export default function layout({ children }) {
  var farm = [
    {
      name: "Green Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Red Farm",
      node: ["Node1", "Node2", "Node3"],
      numnode: "3",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Blue Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "yes",
      analytic: "yes",
      blockchain: "yes",
      created: "2021-04-29",
    },
    {
      name: "Pink Farm",
      node: ["Node1", "Node2"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "no",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
    {
      name: "Orange Farm",
      node: ["Node1"],
      numnode: "2",
      numparam: "xx",
      numdashb: "xx",
      gateway: "no",
      analytic: "no",
      blockchain: "no",
      created: "2021-04-29",
    },
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
      document.getElementById(farmname).style.borderLeft = "none";
      document.getElementById(farmname).style.color = "";
      document.getElementById(farmname).style.fontWeight = "400";
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
      for (let index = 0; index < farm.length; index++) {
        const element = farm[index];
        document.getElementById(element.name).style.display = "block";
      }
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

  function activebar_dd(id, func) {
    if (func == farmlist) {
      for (let i = 0; i < farm.length; i++) {
        const afarm = farm[i];
        var farmname = afarm.name;
        var nodeStyle = document.getElementById(farmname + "node");
        if (nodeStyle != null) {
          nodeStyle.style.display = "none";
        }
      }
      farmlist();
      activebar(id);
    } else if (func == nodelist) {
      nodelist(id + "node");
      activebar(id);
    }
  }
  function test() {
    alert("test");
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.user}></div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.side_icon}>
            <Image src="/supercrops.png" height="65px" width="65px" />
          </div>
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
              onClick={() => activebar_dd("over", farmlist)}
            >
              <Link href="/overview">
                <div>
                  <OverviewSvg />
                  <label>Overview</label>
                  <DownSvg />
                </div>
              </Link>
            </div>

            <div id="farmlist" className={styles.dpdwn_container}>
              {/*map farmname from farmlist json*/}
              {farm.map((val, index) => {
                return (
                  <>
                    <div
                      key={val.name}
                      id={val.name}
                      className={styles.dropdown_item_1rem}
                      onClick={() => activebar_dd(val.name, nodelist)}
                    >
                      <Link href={"/farm/" + (index + 1)}>
                        <div>
                          <FarmSvg />
                          <label>Farm{index + 1}</label>
                          <DownSvg />
                        </div>
                      </Link>
                    </div>

                    <div>
                      <div
                        id={val.name + "node"}
                        className={styles.dpdwn_container}
                      >
                        {val.node.map((nodes) => {
                          return (
                            <div
                              key={nodes}
                              id={val.name + nodes}
                              className={styles.dropdown_item_2rem}
                              onClick={() => activebar(val.name + nodes)}
                            >
                              <Link href="/node">
                                <div>
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
              <div /*className="test"*/>
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
          ©2021 KITFORWARD.CO.,LTD. All Rights Reserved.
        </div>
      </div>
    </div>
  );
}
