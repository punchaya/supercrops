import React from "react";
import styles from "../styles/comp.module.scss";
import Link from "next/link";

export default function layout(props) {
  var farm = [
    { name: "Farm1", node: ["Node1", "Node2"] },
    { name: "Farm2", node: ["Node1", "Node2", "Node3"] },
  ];
  function navactive(parms) {
    var varlue = document.getElementById(parms);
    varlue.style.borderLeft = "red solid 6px";
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
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.nav}>
          <div className={styles.user}></div>
        </div>
        <div className={styles.sidebar}>
          <div className={styles.side_icon}>icon</div>
          <div className={styles.sidenav}>
            <div id="home" className={styles.menu_item}>
              <Link href="/">
                <div>Home</div>
              </Link>
            </div>
            <div className={styles.menu_item}>
              <div className="dropdownbtn" onClick={farmlist}>
                Overview
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
                        {val.name}
                      </div>
                      <></>
                    </div>
                    <div>
                      <div id={val.name} className={styles.dpdwn_container}>
                        {val.node.map((nodes) => {
                          return (
                            <div
                              id={val.name + nodes}
                              className={styles.dropdown_item_2rem}
                            >
                              <Link href="/">
                                <a>{nodes}</a>
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
            <div className={styles.menu_item}>
              <div href="/">
                <a>Organization</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>{props.children}</div>
        <div className={styles.footer}>
          Copyright © 2021-2025 Create by KITFORWARD
        </div>
      </div>
    </div>
  );
}
