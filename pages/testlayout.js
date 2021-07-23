import React from "react";
import Head from "next/head";

export default function testlayout() {
  return (
    <>
      <Head>
        <script src="../styles/gentelella/build/js/custom.js"></script>
      </Head>
      <body className="nav-md">
        <div className="container body">
          <div className="main_container">
            <div className="col-md-3 left_col">
              <div className="left_col scroll-view">
                <div className="navbar nav_title" style={{ border: 0 }}>
                  <a href="/" className="site_title">
                    <i className="fa fa-tree"></i> <span>Super Crops</span>
                  </a>
                </div>

                <div className="clearfix"></div>

                <br />
                <div
                  id="sidebar-menu"
                  className="main_menu_side hidden-print main_menu"
                >
                  <div className="menu_section">
                    <h3></h3>
                    <ul className="nav side-menu">
                      <li>
                        <a>
                          <i className="fa fa-home"></i> Home{" "}
                        </a>
                        <ul className="nav child_menu">
                          <li>
                            <a href="index.html">Dashboard</a>
                          </li>
                          <li>
                            <a href="index2.html">Dashboard2</a>
                          </li>
                          <li>
                            <a href="index3.html">Dashboard3</a>
                          </li>
                        </ul>
                      </li>
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
                    title="FullScreen"
                  >
                    <span
                      className="glyphicon glyphicon-fullscreen"
                      aria-hidden="true"
                    ></span>
                  </a>
                  <a data-toggle="tooltip" data-placement="top" title="Lock">
                    <span
                      className="glyphicon glyphicon-eye-close"
                      aria-hidden="true"
                    ></span>
                  </a>
                  <a
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Logout"
                    href="login.html"
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
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <div className="nav toggle">
                  <a id="menu_toggle">
                    <i
                      className="fa fa-bars"
                      style={{ marginTop: "-50px" }}
                    ></i>
                  </a>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: "30px",
                  }}
                >
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    style={{
                      marginBottom: "0px",
                      border: "none",
                      fontSize: "26px",
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    style={{
                      marginBottom: "0px",
                      border: "none",
                      fontSize: "26px",
                    }}
                  >
                    Line OA
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    style={{
                      marginBottom: "0px",
                      border: "none",
                      fontSize: "26px",
                    }}
                  >
                    Line Notify
                  </button>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    style={{
                      marginBottom: "0px",
                      border: "none",
                      fontSize: "26px",
                    }}
                  >
                    Landing
                  </button>
                </div>

                <nav className="nav navbar-nav" style={{ marginLeft: "auto" }}>
                  <ul className=" navbar-right">
                    <li
                      className="nav-item dropdown open"
                      style={{ paddingLeft: "15px" }}
                    >
                      <a
                        href="javascript:;"
                        className="user-profile dropdown-toggle"
                        aria-haspopup="true"
                        id="navbarDropdown"
                        data-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img src="images/img.jpg" alt="" />
                        John Doe
                      </a>
                      <div
                        className="dropdown-menu dropdown-usermenu pull-right"
                        aria-labelledby="navbarDropdown"
                      >
                        <a className="dropdown-item" href="javascript:;">
                          {" "}
                          Profile
                        </a>
                        <a className="dropdown-item" href="javascript:;">
                          <span className="badge bg-red pull-right">50%</span>
                          <span>Settings</span>
                        </a>
                        <a className="dropdown-item" href="javascript:;">
                          Help
                        </a>
                        <a className="dropdown-item" href="login.html">
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
                            <span className="image">
                              <img src="images/img.jpg" alt="Profile Image" />
                            </span>
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
                            <span className="image">
                              <img src="images/img.jpg" alt="Profile Image" />
                            </span>
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
                            <span className="image">
                              <img src="images/img.jpg" alt="Profile Image" />
                            </span>
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
                            <span className="image">
                              <img src="images/img.jpg" alt="Profile Image" />
                            </span>
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
            <div className="right_col" role="main" style={{ height: "100vh" }}>
              <div className="row" style={{ display: "inline-block" }}></div>

              <div className="tile_count">
                <div className="col-md-2 col-sm-4  tile_stats_count">
                  <span className="count_top">
                    <i className="fa fa-user"></i> Total Users
                  </span>
                  <div className="count">2500</div>
                  <span className="count_bottom">
                    <i className="green">4% </i> From last Week
                  </span>
                </div>
                <div className="col-md-2 col-sm-4  tile_stats_count">
                  <span className="count_top">
                    <i className="fa fa-clock-o"></i> Average Time
                  </span>
                  <div className="count">123.50</div>
                  <span className="count_bottom">
                    <i className="green">
                      <i className="fa fa-sort-asc"></i>3%{" "}
                    </i>{" "}
                    From last Week
                  </span>
                </div>
                <div className="col-md-2 col-sm-4  tile_stats_count">
                  <span className="count_top">
                    <i className="fa fa-user"></i> Total Males
                  </span>
                  <div className="count green">2,500</div>
                  <span className="count_bottom">
                    <i className="green">
                      <i className="fa fa-sort-asc"></i>34%{" "}
                    </i>{" "}
                    From last Week
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <footer>
            <div className="pull-right">
              Gentelella - Bootstrap Admin Template by{" "}
              <a href="https://colorlib.com">Colorlib</a>
            </div>
            <div className="clearfix"></div>
          </footer>
        </div>
      </body>
    </>
  );
}
