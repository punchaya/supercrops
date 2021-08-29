import React from "react";
import { useState, useEffect } from "react";
import styles from "../styles/node.module.scss";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function Datasetting(props) {
  const [data1min, setdata1min] = useState(props.data1min);
  const [data2min, setdata2min] = useState(props.data2min);
  const [data1max, setdata1max] = useState(props.data1max);
  const [data2max, setdata2max] = useState(props.data2max);
  const [dataStatus, setdataStatus] = useState(true);
  function rangeData(id, pos) {
    const value = document.getElementById(id).value;
    document.getElementById(id + "text").innerHTML = value;
    document.getElementById(id + "text").value = value;
  }
  function modalOff(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
  }

  function putData() {
    axios
      .put(
        `http://203.151.136.127:10001/api/update/F4227b07670ec437a9a6bde39d2530d87/e34363dd-9c18-4843-941e-2a8f787662fc/6ad65625-19b3-4381-bdd1-3922ae93e244`,
        {
          orgId: "O21f42baf3ce842c292092197e17002cb",
          data1: {
            status: dataStatus,
            data: "soil_moisturesss",
            min: data1min,
            max: data1max,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
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
            onClick={() => modalOff(props.id)}
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
              <input
                id={"chkBb"}
                type="checkbox"
                defaultChecked={dataStatus ? true : false}
                onChange={() => setdataStatus(!dataStatus)}
              />
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
            Min :{" "}
            <label
              id={"data1min" + props.index + "text"}
              defaultValue={props.data1min}
            ></label>
            <input
              id={"data1min" + props.index}
              type="range"
              min="0"
              max="100"
              defaultValue={data1min}
              onChange={() => rangeData("data1min" + props.index, "data1min")}
            />
            Max :{" "}
            <label
              id={"data1max" + props.index + "text"}
              defaultValue={props.data1min}
            ></label>
            <input
              id={"data1max" + props.index}
              type="range"
              min="0"
              max="100"
              defaultValue={data1max}
              onChange={() => rangeData("data1max" + props.index, "data1max")}
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
            Min :{" "}
            <label
              id={"data2min" + props.index + "text"}
              defaultValue={props.data1min}
            ></label>
            <input
              id={"data2min" + props.index}
              type="range"
              min="0"
              max="100"
              defaultValue={data2min}
              onChange={() => rangeData("data2min" + props.index, "data2min")}
            />
            Max :{" "}
            <label
              id={"data2max" + props.index + "text"}
              defaultValue={props.data1min}
            ></label>
            <input
              id={"data2max" + props.index}
              type="range"
              min="0"
              max="100"
              defaultValue={data2max}
              onChange={() => rangeData("data2max" + props.index, "data2max")}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => modalOff(props.id)}
          >
            ปิด
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ display: "flex", gap: "5px", alignItems: "center" }}
            onClick={putData}
          >
            <Image src="/save_white.png" width={20} height={20} /> บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
