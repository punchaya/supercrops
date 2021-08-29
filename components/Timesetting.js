import React from "react";
import { useState } from "react";
import styles from "../styles/node.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Timesetting(props) {
  function modalOff(id) {
    const modal = document.getElementById(id);
    modal.style.display = "none";
  }
  return (
    <div className="modal-dialog modal-lg" style={{ maxWidth: "600px" }}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="myModalLabel">
            Time Setting
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
              <Image src="/datetime.png" width="30" height="30" />
            </label>

            <h4>Time Setting {props.relay}</h4>
            <label style={{ marginLeft: "auto" }}>Status</label>
            <label className={styles.switch2}>
              <input
                onClick={() => checkBox("chkBa", relay, "time")}
                id={"chkBa"}
                type="checkbox"
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "5px",
              border: "solid 1px #c4c4c4",
              borderRadius: "10px",
              flexDirection: "column",
            }}
          >
            <div>
              <label>Time 1 Setting : On: </label>
              <input id={"time1on"} type="time" defaultValue={0} />
              <label> Off :</label>
              <input id={"time1off"} type="time" defaultValue={0} />
            </div>
            <label>Day1 Setting : </label>
            <div className={styles.weekday}>
              <label>
                <input type="checkbox" id={"sun1"} />
                <label htmlFor={"sun1"}>อาทิตย์</label>
              </label>
              <label>
                <input type="checkbox" id={"mon1"} />
                <label htmlFor={"mon1"}>จันทร์</label>
              </label>
              <label>
                <input type="checkbox" id={"tue1"} />
                <label htmlFor={"tue1"}>อังคาร</label>
              </label>
              <label>
                <input type="checkbox" id={"wed1"} />
                <label htmlFor={"wed1"}>พุธ</label>
              </label>
              <label>
                <input type="checkbox" id={"thu1"} />
                <label htmlFor={"thu1"}>พฤหัส</label>
              </label>
              <label>
                <input type="checkbox" id={"fri1"} />
                <label htmlFor={"fri1"}>ศุกร์</label>
              </label>
              <label>
                <input type="checkbox" id={"sat1"} />
                <label htmlFor={"sat1"}>เสาร์</label>
              </label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "5px",
              border: "solid 1px #c4c4c4",
              borderRadius: "10px",
              flexDirection: "column",
            }}
          >
            <div>
              <label>Time 2 Setting : On: </label>
              <input id={"time1on"} type="time" defaultValue={0} />
              <label> Off :</label>
              <input id={"time1off"} type="time" defaultValue={0} />
            </div>
            <label>Day1 Setting : </label>
            <div className={styles.weekday}>
              <label>
                <input type="checkbox" id={"sun1"} />
                <label htmlFor={"sun1"}>อาทิตย์</label>
              </label>
              <label>
                <input type="checkbox" id={"mon1"} />
                <label htmlFor={"mon1"}>จันทร์</label>
              </label>
              <label>
                <input type="checkbox" id={"tue1"} />
                <label htmlFor={"tue1"}>อังคาร</label>
              </label>
              <label>
                <input type="checkbox" id={"wed1"} />
                <label htmlFor={"wed1"}>พุธ</label>
              </label>
              <label>
                <input type="checkbox" id={"thu1"} />
                <label htmlFor={"thu1"}>พฤหัส</label>
              </label>
              <label>
                <input type="checkbox" id={"fri1"} />
                <label htmlFor={"fri1"}>ศุกร์</label>
              </label>
              <label>
                <input type="checkbox" id={"sat1"} />
                <label htmlFor={"sat1"}>เสาร์</label>
              </label>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "5px",
              border: "solid 1px #c4c4c4",
              borderRadius: "10px",
              flexDirection: "column",
            }}
          >
            <div>
              <label>Time 3 Setting : On: </label>
              <input id={"time1on"} type="time" defaultValue={0} />
              <label> Off :</label>
              <input id={"time1off"} type="time" defaultValue={0} />
            </div>
            <label>Day1 Setting : </label>
            <div className={styles.weekday}>
              <label>
                <input type="checkbox" id={"sun1"} />
                <label htmlFor={"sun1"}>อาทิตย์</label>
              </label>
              <label>
                <input type="checkbox" id={"mon1"} />
                <label htmlFor={"mon1"}>จันทร์</label>
              </label>
              <label>
                <input type="checkbox" id={"tue1"} />
                <label htmlFor={"tue1"}>อังคาร</label>
              </label>
              <label>
                <input type="checkbox" id={"wed1"} />
                <label htmlFor={"wed1"}>พุธ</label>
              </label>
              <label>
                <input type="checkbox" id={"thu1"} />
                <label htmlFor={"thu1"}>พฤหัส</label>
              </label>
              <label>
                <input type="checkbox" id={"fri1"} />
                <label htmlFor={"fri1"}>ศุกร์</label>
              </label>
              <label>
                <input type="checkbox" id={"sat1"} />
                <label htmlFor={"sat1"}>เสาร์</label>
              </label>
            </div>
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
          >
            <Image src="/save_white.png" width={20} height={20} /> บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}
