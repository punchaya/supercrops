import { React, useState } from "react";
import Layout from "../layout/layout";
import Link from "next/link";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/router";
import styles from "../styles/node.module.scss";
import $ from "jquery";

export default function node(props) {
  const router = useRouter();
  const Data = router.query;
  const stationIndex = Data.station;
  const nodeIndex = Data.node;
  const farmName = Data.farm;
  if (farmName == undefined) {
    return <div>error</div>;
  }
  const farmList = [
    { name: "ฟาร์มภูมิใจ", location: "อุตรดิตถ์", type: "ทุเรียน" },
    { name: "เพิ่มพูลฟาร์ม", location: "สุโขทัย", type: "ลองกอง" },
    { name: "ไร่ตันตระกูล", location: "สุโขทัย", type: "มะม่วง" },
    { name: "ทุ่งสุขสวัสดิ์", location: "น่าน", type: "ข้าวโพด" },
    { name: "สวนสตรอเบอรี่", location: "เพชรบูรณ์", type: "สตรอเบอรี่" },
  ];
  const nodeList = [{ name: "โหนด 1" }, { name: "โหนด 2" }, { name: "โหนด 3" }];
  const relayList = ["1", "2", "3", "4"];

  $(document).ready(function () {
    $(".collapse-link").on("click", function () {
      var $BOX_PANEL = $(this).closest(".x_panel"),
        $ICON = $(this).find("i"),
        $BOX_CONTENT = $BOX_PANEL.find(".x_content");

      // fix for some div with hardcoded fix class
      if ($BOX_PANEL.attr("style")) {
        $BOX_CONTENT.slideToggle(200, function () {
          $BOX_PANEL.removeAttr("style");
        });
      } else {
        $BOX_CONTENT.slideToggle(200);
        $BOX_PANEL.css("height", "auto");
      }

      $ICON.toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(".close-link").click(function () {
      var $BOX_PANEL = $(this).closest(".x_panel");

      $BOX_PANEL.remove();
    });
  });

  return (
    <>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i> <Link href="/">หน้าหลัก</Link> /{" "}
            <Link href={`/farm/1?farm=${farmName}`}>ฟาร์ม</Link> /{" "}
            <Link href={`/station?station=${stationIndex}&farm=${farmName}`}>
              โรงเรือน
            </Link>{" "}
            /{" "}
            <Link
              href={`/node?node=${nodeIndex}&station=${stationIndex}&farm=${farmName}`}
            >
              โหนด
            </Link>
          </h2>
        </div>
      </div>

      <div className="row">
        <div className="x_panel">
          <div className="tile_count">
            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2>
                  <i className="fa fa-home"></i>{" "}
                  <label style={{ color: "#73879C" }}>Node ID</label>
                </h2>
              </span>
              <div>
                <h2>
                  <span className="count_bottom">รหัสโหนด</span>{" "}
                  <label>ND0415</label>
                </h2>
              </div>
            </div>
            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2 className={styles.online}>
                  <i className="fa fa-circle"></i>{" "}
                  <label style={{ color: "#73879C" }}>Indicator Light</label>
                </h2>
              </span>
              <div>
                <h2>
                  <span className="count_bottom">ไฟแสดงสถานะ</span>{" "}
                  <label className={styles.online}>ออนไลน์</label>
                </h2>
              </div>
            </div>
            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2>
                  <i className="fa fa-calendar"></i>{" "}
                  <label style={{ color: "#73879C" }}>Create Date</label>
                </h2>
              </span>
              <div>
                <h2>
                  <span className="count_bottom">วันที่สร้าง</span>{" "}
                  <label>20/7/2564</label>
                </h2>
              </div>
            </div>

            <div className="col-md-3 col-sm-6  tile_stats_count">
              <span className="count_top">
                <h2>
                  <i className="fa fa-clock-o"></i> Refresh Time
                </h2>
              </span>
              <div>
                <h2>
                  <select
                    id="refreshTime"
                    className="form-control"
                    style={{ color: "#73879C" }}
                  >
                    <option value="volvo">เวลารีเฟรช</option>
                    <option value="saab">test</option>
                    <option value="fiat">test</option>
                    <option value="audi">test </option>
                  </select>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="x_panel"></div>
      </div>
      <div id="zonebox" className="row">
        <div className="x_panel">
          {nodeList.map((node, index) => {
            const zIndex = index + 1;
            return (
              <div key={index} className="x_panel" style={{ height: "auto" }}>
                <div className="x_title">
                  <h2>Zone ID {zIndex}</h2>
                  <ul className="nav navbar-right panel_toolbox">
                    <li>
                      <a className="collapse-link">
                        <i className="fa fa-chevron-up"></i>
                      </a>
                    </li>
                  </ul>
                  <div className="clearfix"></div>
                </div>
                <div
                  id={"zidContent" + { zIndex }}
                  className="x_content"
                  style={{ display: " none" }}
                >
                  <div
                    className="profile_details"
                    style={{
                      display: "flex",
                      gap: "40px",
                      maxWidth: "100%",
                      flexFlow: "row wrap",
                      userSelect: "none",
                    }}
                  >
                    {farmList.map((node, index) => {
                      return (
                        <div
                          key={index}
                          className="well profile_view"
                          style={{ width: "350px", minWidth: "300px" }}
                        >
                          <div className="col">
                            <div style={{ display: "flex", width: "100%" }}>
                              <h4 className="brief">Data Card </h4>
                            </div>
                            <div>
                              <p>testtest2</p>
                              <p>testtest2</p>
                              <p>testtest2</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div id="relaybox" className="row">
        <div className="x_panel">
          <div className="x_content">
            <div>
              <h2>Relay</h2>
            </div>
            <div
              className="profile_details"
              style={{
                display: "flex",
                gap: "10px",
                maxWidth: "100%",
                flexFlow: "row wrap",
                userSelect: "none",
              }}
            >
              {relayList.map((relay, index) => {
                const [setting, setsetting] = useState(false);
                return (
                  <div key={index}>
                    <div
                      id={"modalstyleTime" + relay}
                      className={styles.modal}
                      style={{ display: "none" }}
                    >
                      <div id={"style" + relay} className={styles.box_hide}>
                        <div className={styles.relaypart_flex}>
                          <label>
                            <Image src="/datetime.png" width="30" height="30" />
                          </label>

                          <label className={styles.editorHead}>
                            {relay} Time Setting {relay}
                          </label>
                          <label className={styles.fright}>Status</label>
                          <label className={styles.switch2}>
                            <input
                              onClick={() =>
                                checkBox("chkBa" + relay, relay, "time")
                              }
                              id={"chkBa" + relay}
                              type="checkbox"
                            />
                            <span className={styles.slider}></span>
                          </label>
                        </div>
                        <div className={styles.relaypart}>
                          <div className={styles.line_flex_time}>
                            <label>Time 1 Setting : On: </label>
                            <input
                              id={relay + "time1on"}
                              type="time"
                              defaultValue={0}
                            />
                            <label> Off: </label>
                            <input
                              id={relay + "time1off"}
                              type="time"
                              defaultValue={0}
                            />

                            <button
                              className={styles.apply}
                              onClick={() =>
                                putTime(
                                  relay,
                                  relay + "time1on",
                                  relay + "time1off",
                                  1
                                )
                              }
                            >
                              <Image
                                src="/save_white.png"
                                width={20}
                                height={20}
                              />
                              Save
                            </button>
                          </div>
                          <p>
                            <label>Day1 Setting : </label>
                          </p>
                          <div className={styles.weekday}>
                            <label>
                              <input type="checkbox" id={relay + "sun1"} />
                              <label htmlFor={relay + "sun1"}>Sunday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "mon1"} />
                              <label htmlFor={relay + "mon1"}>Monday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "tue1"} />
                              <label htmlFor={relay + "tue1"}>Tuesday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "wed1"} />
                              <label htmlFor={relay + "wed1"}>Wednesday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "thu1"} />
                              <label htmlFor={relay + "thu1"}>Thursday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "fri1"} />
                              <label htmlFor={relay + "fri1"}>Friday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "sat1"} />
                              <label htmlFor={relay + "sat1"}>Saturday</label>
                            </label>
                          </div>
                        </div>
                        <div className={styles.relaypart}>
                          <div className={styles.line_flex_time}>
                            <label>Time 2 Setting : On: </label>
                            <input
                              id={relay + "time2on"}
                              type="time"
                              defaultValue={0}
                            />
                            <label> Off: </label>
                            <input
                              id={relay + "time2off"}
                              type="time"
                              defaultValue={0}
                            />

                            <button
                              className={styles.apply}
                              onClick={() =>
                                putTime(
                                  relay,
                                  relay + "time2on",
                                  relay + "time2off",
                                  2
                                )
                              }
                            >
                              <Image
                                src="/save_white.png"
                                width={20}
                                height={20}
                              />
                              Save
                            </button>
                          </div>
                          <p>
                            <label>Day2 Setting : </label>
                          </p>
                          <div className={styles.weekday}>
                            <label>
                              <input type="checkbox" id={relay + "sun2"} />
                              <label htmlFor={relay + "sun2"}>Sunday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "mon2"} />
                              <label htmlFor={relay + "mon2"}>Monday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "tue2"} />
                              <label htmlFor={relay + "tue2"}>Tuesday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "wed2"} />
                              <label htmlFor={relay + "wed2"}>Wednesday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "thu2"} />
                              <label htmlFor={relay + "thu2"}>Thursday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "fri2"} />
                              <label htmlFor={relay + "fri2"}>Friday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "sat2"} />
                              <label htmlFor={relay + "sat2"}>Saturday</label>
                            </label>
                          </div>
                        </div>
                        <div className={styles.relaypart}>
                          <div className={styles.line_flex_time}>
                            <label>Time 3 Setting : On:</label>
                            <input
                              id={relay + "time3on"}
                              type="time"
                              defaultValue={0}
                            />
                            <label>Off: </label>
                            <input
                              id={relay + "time3off"}
                              type="time"
                              defaultValue={0}
                            />

                            <button
                              className={styles.apply}
                              onClick={() =>
                                putTime(
                                  relay,
                                  relay + "time3on",
                                  relay + "time3off",
                                  3
                                )
                              }
                            >
                              <Image
                                src="/save_white.png"
                                width={20}
                                height={20}
                              />
                              Save
                            </button>
                          </div>
                          <p>
                            <label>Day3 Setting: </label>
                          </p>
                          <div className={styles.weekday}>
                            <label>
                              <input type="checkbox" id={relay + "sun3"} />
                              <label htmlFor={relay + "sun3"}>Sunday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "mon3"} />
                              <label htmlFor={relay + "mon3"}>Monday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "tue3"} />
                              <label htmlFor={relay + "tue3"}>Tuesday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "wed3"} />
                              <label htmlFor={relay + "wed3"}>Wednesday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "thu3"} />
                              <label htmlFor={relay + "thu3"}>Thursday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "fri3"} />
                              <label htmlFor={relay + "fri3"}>Friday</label>
                            </label>
                            <label>
                              <input type="checkbox" id={relay + "sat3"} />
                              <label htmlFor={relay + "sat3"}>Saturday</label>
                            </label>
                          </div>
                        </div>

                        <button
                          className={styles.close}
                          onClick={() => modalOff("modalstyleTime" + relay)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                    <div
                      key={index}
                      className=""
                      style={{ width: "390px", minWidth: "300px" }}
                    >
                      <div className="x_panel" style={{ height: "auto" }}>
                        <div className="x_title">
                          <h2>Relay ID</h2>
                          <ul className="nav navbar-right panel_toolbox">
                            <li
                              className={setting ? "dropdown show" : "dropdown"}
                            >
                              <a
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                role="button"
                                aria-expanded={setting ? "true" : "false"}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => setsetting(!setting)}
                              >
                                <i className="fa fa-wrench"></i>
                              </a>
                              <div
                                className={
                                  setting
                                    ? "dropdown-menu show"
                                    : "dropdown-menu"
                                }
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="#">
                                  Time Setting
                                </a>
                                <a className="dropdown-item" href="#">
                                  Data Setting
                                </a>
                              </div>
                            </li>
                            <li>
                              <a
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <label className={styles.switch2}>
                                  <input
                                    id={"status"}
                                    type="checkbox"
                                    onClick={() => props.settest("test")}
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      display: "block",
                                    }}
                                  />
                                  <span className={styles.slider}></span>
                                </label>
                              </a>
                            </li>
                          </ul>

                          <div className="clearfix"></div>
                        </div>
                        <div
                          className="x_content"
                          style={{ display: " block" }}
                        >
                          <h4>On / Off on Time : On</h4>
                          <h4>Time 1 : On</h4>
                          <li>On : time | Off: time</li>
                          <h4>
                            <label>Day 1 :</label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Sun
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Mon
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Tue
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Wed
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Thu
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Fri
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Sat
                            </label>
                          </h4>
                          <h4>Time 2 : On</h4>
                          <li>On : time | Off: time</li>
                          <h4>
                            <label>Day 2 :</label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Sun
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Mon
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Tue
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Wed
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Thu
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Fri
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Sat
                            </label>
                          </h4>
                          <h4>Time 3 : On</h4>
                          <li>On : time | Off: time</li>
                          <h4>
                            <label>Day 3 :</label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Sun
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Mon
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Tue
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Wed
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Thu
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#007bff",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Fri
                            </label>{" "}
                            <label
                              style={{
                                backgroundColor: "#6c757d",
                                padding: "5px",
                                borderRadius: "10%",
                                color: "white",
                              }}
                            >
                              Sat
                            </label>
                          </h4>

                          <h4>On / Off on Data : On</h4>

                          <h4>Data 1 :</h4>

                          <h4>Min: value | Max: value</h4>

                          <h4>Data 2 :</h4>

                          <h4>Min: value | Max: value</h4>
                        </div>
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
}

node.Layout = Layout;
