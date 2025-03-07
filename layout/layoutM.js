import React, { useState, useEffect } from "react";
import stylesM from "../styles/layoutM.module.scss";
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

export default async function layout(props) {
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
  function farmlist(props) {
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
  function flexOn(id) {
    if (document.getElementById(id).style.display == "flex") {
      document.getElementById(id).style.display = "none";
    } else {
      document.getElementById(id).style.display = "flex";
    }
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
      <div className={stylesM.container}>
        <div className={stylesM.topbar}>
          <div className={stylesM.logo}>Super Crops</div>
          <div className={stylesM.menu}>
            <Image
              src="/menuW.png"
              height="32px"
              width="32px"
              onClick={() => flexOn("navbar")}
            />
          </div>
        </div>
        <div id="navbar" className={stylesM.navbar}>
          <div className={stylesM.navbtn}>Home</div>
          <div className={stylesM.navbtn}>Overview</div>
          <div className={stylesM.navbtn}>Organization</div>
        </div>
        <div className={stylesM.content}>{props.children}</div>
        <div className={stylesM.footer}>
          ©2021 KITFORWARD.CO.,LTD. All Rights Reserved.
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
