import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function layout(props) {
  const [bodyClass, setbodyClass] = useState(false);
  const [profileDrop, setProfileDrop] = useState(false);
  const [sideMenu, setsideMenu] = useState({ home: "", organize: "" });
  const [sidehome, setsidehome] = useState("");

  function toggleprofile() {
    setProfileDrop(!profileDrop);
  }
  function toggleSidebar() {
    setbodyClass(!bodyClass);
  }
  function toggleSideMenu(key) {
    setsideMenu({ home: "", organize: "" });
    if (key == "home") {
      setsideMenu({ home: "active", organize: "" });
    } else if (key == "organize") {
      setsideMenu({ home: "", organize: "active" });
    }
  }

  function logout() {
    localStorage.clear();
    window.location.assign("/login");
  }

  return (
    <>
      <div id="body" className={bodyClass ? "nav-sm" : "nav-md"}>
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "10",
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            style={{ borderRadius: "50%", fontSize: "20px" }}
          >
            <i className="glyphicon glyphicon-comment"></i>
          </button>
        </div>
        <div className="container body">
          <div className="main_container">
            <div className="col-md-3 left_col">
              <div className="left_col scroll-view" style={{ height: "100%" }}>
                <div className="navbar nav_title" style={{ border: 0 }}>
                  <a
                    href="/"
                    className="site_title"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <Image
                      src="/supercropsico.png"
                      height="50px"
                      width="50px"
                    />

                    <span>Super Crops</span>
                  </a>
                </div>

                <div className="clearfix"></div>

                <br />
                <div
                  id="sidebar-menu"
                  className="main_menu_side hidden-print main_menu"
                  style={{ height: "100%" }}
                >
                  <div className="menu_section" style={{ height: "100%" }}>
                    <h3></h3>
                    <ul
                      className="nav side-menu"
                      style={{
                        fontSize: "18px",
                        height: "100%",
                      }}
                    >
                      <Link href="/">
                        <li
                          className={sideMenu.home}
                          style={{ width: "100%" }}
                          onClick={() => toggleSideMenu("home")}
                        >
                          <a>
                            {/* <i className="glyphicon glyphicon-home"></i>{" "} */}
                            <i className="fa fa-home"></i> หน้าหลัก{" "}
                          </a>
                        </li>
                      </Link>

                      <Link href="/organiz">
                        <li
                          className={sideMenu.organize}
                          onClick={() => toggleSideMenu("organize")}
                          style={{
                            width: "100%",
                          }}
                        >
                          <a>
                            {/* <i className="glyphicon glyphicon-th-large"></i> */}
                            <i className="fa fa-users"></i>
                            {"  "}
                            กลุ่มฟาร์ม
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="top_nav">
              <div
                className="nav_menu"
                style={{
                  display: "flex",
                  flexDirection: "colum",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                <div className="nav toggle" style={{ minWidth: "50px" }}>
                  <a id="menu_toggle" onClick={toggleSidebar}>
                    <i
                      className="fa fa-bars"
                      style={{ marginTop: "-50px" }}
                    ></i>
                  </a>
                </div>
                <nav className="nav navbar-nav" style={{ marginLeft: "auto" }}>
                  <ul className=" navbar-right">
                    <li
                      className="nav-item dropdown open"
                      style={{ paddingLeft: "15px", userSelect: "none" }}
                      onClick={toggleprofile}
                    >
                      <a
                        className="user-profile dropdown-toggle"
                        aria-haspopup="true"
                        id="navbarDropdown"
                        data-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          minWidth: "120px",
                          gap: "5px",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Image src="/user.png" width={30} height={30} />
                        ผู้ใช้1 ทดสอบ{props.test}
                      </a>
                      <div
                        className="dropdown-menu dropdown-usermenu pull-right"
                        aria-labelledby="navbarDropdown"
                        style={
                          profileDrop
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <Link href="/profile">
                          <a className="dropdown-item">
                            <i className="fa fa-smile-o pull-right"></i>{" "}
                            ข้อมูลส่วนตัว
                          </a>
                        </Link>
                        <Link href="/profile">
                          <a className="dropdown-item">
                            <i className="fa fa-desktop pull-right"></i> ไปยัง
                            Dashboard
                          </a>
                        </Link>
                        <Link href="/profile">
                          <a className="dropdown-item">
                            <i className="fa fa-warning pull-right"></i>{" "}
                            การใช้งาน Line Notify
                          </a>
                        </Link>
                        <Link href="/profile">
                          <a className="dropdown-item">
                            <i className="fa fa-comments-o pull-right"></i>{" "}
                            การใช้งาน Line OA
                          </a>
                        </Link>
                        <Link href="/profile">
                          <a className="dropdown-item">
                            <i className="fa fa-globe pull-right"></i> การใช้งาน
                            SuperCrops
                          </a>
                        </Link>
                        <a className="dropdown-item">
                          <i className="fa fa-question pull-right"></i> Help
                          Center
                        </a>
                        <a className="dropdown-item" onClick={logout}>
                          <i className="fa fa-sign-out pull-right"></i>{" "}
                          ออกจากระบบ
                        </a>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div
              className="right_col"
              role="main"
              style={{ minHeight: "100vh" }}
            >
              <div id="content">{props.children}</div>
            </div>
          </div>
          <footer>
            <div className="">
              © 2021{" "}
              <a
                href="http://kitforward.co.th/
"
                target="_blank"
              >
                KITFORWARD.CO.TH
              </a>{" "}
              . All rights reserved
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
