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
              <div className="left_col scroll-view">
                <div className="navbar nav_title" style={{ border: 0 }}>
                  <a
                    href="/"
                    className="site_title"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <Image
                      src="/supercropsico.png"
                      height="40px"
                      width="40px"
                    />

                    <span> Super Crops</span>
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
                            <i className="glyphicon glyphicon-home"></i>{" "}
                            หน้าหลัก{" "}
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
                            <i className="glyphicon glyphicon-th-large"></i>
                            {"  "}
                            กลุ่มฟาร์ม
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </div>
                </div>

                <div className="sidebar-footer hidden-small">
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Settings"
                  >
                    <span
                      className="glyphicon glyphicon-cog"
                      aria-hidden="true"
                    ></span>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Organization"
                  >
                    <span
                      className="glyphicon glyphicon-th-large"
                      aria-hidden="true"
                    ></span>
                  </a>
                  <a data-toggle="tooltip" data-placement="top" title="Help">
                    <span
                      className="glyphicon glyphicon-question-sign"
                      aria-hidden="true"
                    ></span>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Logout"
                    onClick={() => alert("logout")}
                  >
                    <span
                      className="glyphicon glyphicon-off"
                      aria-hidden="true"
                    ></span>
                  </a>
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
                <div className="nav toggle">
                  <a id="menu_toggle" onClick={toggleSidebar}>
                    <i
                      className="fa fa-bars"
                      style={{ marginTop: "-50px" }}
                    ></i>
                  </a>
                </div>
                <div
                  id="link_btn"
                  style={{
                    display: "flex",
                    minWidth: "20px",
                    overflow: "hidden",
                    gap: "10px",
                  }}
                >
                  <a
                    href="http://dashboard.supercrops.io
                "
                    target="_blank"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{
                        marginBottom: "0px",
                        border: "none",
                        fontSize: "20px",
                        minWidth: "20px",
                        overflow: "hiden",
                      }}
                    >
                      Dashboard
                    </button>
                  </a>
                  <a>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{
                        marginBottom: "0px",
                        border: "none",
                        fontSize: "20px",
                      }}
                    >
                      Line OA
                    </button>
                  </a>
                  <a>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{
                        marginBottom: "0px",
                        border: "none",
                        fontSize: "20px",
                      }}
                    >
                      Line Notify
                    </button>
                  </a>
                  <a>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      style={{
                        marginBottom: "0px",
                        border: "none",
                        fontSize: "20px",
                      }}
                    >
                      Landing
                    </button>
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
                        <Image src="/no-pic.png" width={30} height={30} />
                        John Doe
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
                          <a className="dropdown-item"> Profile</a>
                        </Link>
                        <a className="dropdown-item">
                          <span className="badge bg-red pull-right">50%</span>
                          <span>Settings</span>
                        </a>
                        <a className="dropdown-item">Help</a>
                        <a className="dropdown-item" href="login">
                          <i className="fa fa-sign-out pull-right"></i> Log Out
                        </a>
                      </div>
                    </li>

                    <li role="presentation" className="nav-item dropdown open">
                      <ul
                        className="dropdown-menu list-unstyled msg_list"
                        role="menu"
                        aria-labelledby="navbarDropdown1"
                      >
                        <li className="nav-item">
                          <a className="dropdown-item">
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for
                              movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="dropdown-item">
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for
                              movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="dropdown-item">
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for
                              movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="dropdown-item">
                            <span>
                              <span>John Smith</span>
                              <span className="time">3 mins ago</span>
                            </span>
                            <span className="message">
                              Film festivals used to be do-or-die moments for
                              movie makers. They were where...
                            </span>
                          </a>
                        </li>
                        <li className="nav-item">
                          <div className="text-center">
                            <a className="dropdown-item">
                              <strong>See All Alerts</strong>
                              <i className="fa fa-angle-right"></i>
                            </a>
                          </div>
                        </li>
                      </ul>
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
              <div className="row" style={{ display: "inline-block" }}></div>

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
            <div className="clearfix"></div>
          </footer>
        </div>
      </div>
    </>
  );
}
