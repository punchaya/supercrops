import React from "react";
import { useState } from "react";
import styles from "../styles/node.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Datasetting(props) {
  const [data1min, setdata1min] = useState(0);
  const [data2min, setdata2min] = useState(0);
  const [data1max, setdata1max] = useState(0);
  const [data2max, setdata2max] = useState(0);
  function rangeData(id) {
    const value = document.getElementById(id).value;
    if (id == "data1min") {
      setdata1min(value);
    } else if (id == "data1max") {
      setdata1max(value);
    } else if (id == "data2min") {
      setdata2min(value);
    } else if (id == "data2max") {
      setdata2max(value);
    }
  }

  return (
    <div
      id={"modalstyleData"}
      className={styles.modal}
      style={props.dataSetting ? { display: "block" } : { display: "none" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="myModalLabel">
              Data Setting
            </h2>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              onClick={() => props.setdataSetting(false)}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            className="modal-body"
            style={{ display: "flex", gap: "20px", flexDirection: "column" }}
          >
            <div
              className="col"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "5px",
                border: "solid 1px #c4c4c4",
                borderRadius: "10px",
              }}
            >
              <label>
                <Image src="/dataSetting.png" width="30" height="30" />
              </label>

              <h4> Data Setting {props.relay}</h4>
              <label style={{ marginLeft: "auto" }}>Status</label>
              <label className={styles.switch2}>
                <input id={"chkBb"} type="checkbox" />
                <span className={styles.slider}></span>
              </label>
            </div>

            <div
              className="col"
              style={{
                display: "flex",
                gap: "10px",
                padding: "5px",
                border: "solid 1px #c4c4c4",
                borderRadius: "10px",
                flexDirection: "column",
              }}
            >
              <h4>Data 1 :</h4>
              Min : {data1min}
              <input
                id={"data1min"}
                type="range"
                min="0"
                max="100"
                value={data1min}
                onChange={() => rangeData("data1min")}
              />
              Max : {data1max}
              <input
                id={"data1max"}
                type="range"
                min="0"
                max="100"
                value={data1max}
                onChange={() => rangeData("data1max")}
              />
            </div>
            <div
              className="col"
              style={{
                display: "flex",
                gap: "10px",
                padding: "5px",
                border: "solid 1px #c4c4c4",
                borderRadius: "10px",
                flexDirection: "column",
              }}
            >
              <h4>Data 2 :</h4>
              Min : {data2min}
              <input
                id={"data2min"}
                type="range"
                min="0"
                max="100"
                value={data2min}
                onChange={() => rangeData("data2min")}
              />
              Max : {data2max}
              <input
                id={"data2max"}
                type="range"
                min="0"
                max="100"
                value={data2max}
                onChange={() => rangeData("data2max")}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => props.setdataSetting(false)}
            >
              ปิด
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <Image src="/save_white.png" width={20} height={20} /> บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
