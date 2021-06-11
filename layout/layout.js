import React, { useState, useEffect } from "react";
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
import { useRouter } from "next/router";

async function fetchData() {
  const response = await fetch("http://localhost:3001/farms");
  const fetchedData = await response.json();
  return { fetchedData };
}

export default function layout(props) {
  const router = useRouter();
  const [farm, setFarm] = useState([
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
  ]);
  const [txtTitle, settxtTitle] = useState("");

  async function reload() {
    const refreshedProps = await fetchData();
    setFarm(refreshedProps.fetchedData);
  }
  useEffect(() => {
    if (sessionStorage.title != undefined) {
      settxtTitle(sessionStorage.title);
      reload();
    }
  }, []);

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
  function setTitle(text) {
    settxtTitle(text);
  }

  function activebar_dd(id, func, title) {
    if (func == farmlist) {
      for (let i = 0; i < farm.length; i++) {
        const afarm = farm[i];
        var farmname = afarm.name;
        var nodeStyle = document.getElementById(farmname + "node");
        if (nodeStyle != null) {
          nodeStyle.style.display = "none";
        }
      }
      settxtTitle(title);
      sessionStorage.title = title;
      farmlist();
      activebar(id);
    } else if (func == nodelist) {
      nodelist(id + "node");
      activebar(id);
      settxtTitle(title);
      sessionStorage.title = title;
    }
  }
  function titleSet(title) {
    settxtTitle("");
    settxtTitle(title);
    sessionStorage.title = title;
  }
  if (farm != undefined) {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.nav}>
            <div className={styles.title}>{txtTitle}</div>
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
                  <div onClick={() => setTitle("")}>
                    <HomeSvg />
                    <label>Home</label>
                  </div>
                </Link>
              </div>
              <div
                id="over"
                className={styles.menu_item}
                onClick={() => activebar_dd("over", farmlist, "")}
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
                        onClick={() =>
                          activebar_dd(
                            val.name,
                            nodelist,
                            "Farm " + (index + 1) + " : " + val.name
                          )
                        }
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
                          {val.node.map((nodes, ni) => {
                            return (
                              <div
                                key={nodes}
                                id={val.name + nodes}
                                className={styles.dropdown_item_2rem}
                                onClick={() => activebar(val.name + nodes)}
                              >
                                <a
                                  href={
                                    "/node/farm" +
                                    (index + 1) +
                                    "node" +
                                    (ni + 1)
                                  }
                                >
                                  <div
                                    onClick={() =>
                                      titleSet(
                                        "Farm " + (index + 1) + " : " + val.name
                                      )
                                    }
                                  >
                                    <NodeSvg />
                                    <label>{nodes}</label>
                                  </div>
                                </a>
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
                    <div onClick={() => setTitle("")}>
                      <OrganizSvg />
                      <label>Organization</label>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.content}>{props.children}</div>
          <div className={styles.footer}>
            ©2021 KITFORWARD.CO.,LTD. All Rights Reserved.
          </div>
        </div>
      </div>
    );
  } else if (farm == undefined) {
    reload();
    return <div>Loading...</div>;
  } else {
    return <div>Err</div>;
  }
}
