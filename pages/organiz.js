import React, { useState } from "react";
import Layout from "../layout/layout";
import styles from "../styles/organiz.module.scss";
import Image from "next/image";

export default function organiz() {
  const [user, setUser] = useState([
    {
      id: "C7iXvxXl8yPFHABi",
      name: "Kridtin",
      role: "Admin",
      picSrc: "/user.png",
    },
    {
      id: "rA6Zo6BjLvhPe1FE",
      name: "Soontorn",
      role: "View",
      picSrc: "/user.png",
    },
    {
      id: "qcEaTL7rC4Klybv4",
      name: "Prasit",
      role: "Editor",
      picSrc: "/user.png",
    },
  ]);

  function genid(length) {
    var result = [];
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return result.join("");
  }

  var admin = [];
  var editor = [];
  var view = [];
  var norole = [];
  for (let i = 0; i < user.length; i++) {
    const element = user[i];
    if (element.role == "Admin") {
      admin.push(element.name);
    } else if (element.role == "Editor") {
      editor.push(element.name);
    } else if (element.role == "View") {
      view.push(element.name);
    } else {
      norole.push(element.name);
    }
  }
  function addUser(func) {
    var name = document.getElementById("newUsername").value;
    var role = document.getElementById("newUserrole").value;
    var genid = 1;
    while (genid) {
      var newid = func(16);
      for (let i = 0; i < user.length; i++) {
        if (user[i].id === newid) {
          genid = 1;
        }
      }
      genid = 0;
    }
    var newuser = { id: newid, name: name, role: role, picSrc: "/user.png" };

    if (name !== undefined && role !== undefined) {
      setUser((user) => [...user, newuser]);
      document.getElementById("newUsername").value = "";
      document.getElementById("newUserrole").value = "---";
      document.getElementById("pass").value = "";
      document.getElementById("createUser").style.display = "none";
      document.getElementById("hiden_value").value = "";
    }
  }

  function editUser() {
    let editArr = [...user];
    var new_name = document.getElementById("modal_edit_username").value;
    var new_role = document.getElementById("modal_edit_role").value;
    var id = document.getElementById("hiden_value").value;
    editArr.find((v) => v.id === id).role = new_role;
    editArr.find((v) => v.id === id).name = new_name;
    setUser(editArr);
    modalOff("editUser");
  }
  function removeUser(id) {
    setUser(user.filter((value) => value.id !== id));
  }

  function modalOn(id, attr) {
    if (attr == 0) {
      document.getElementById(id).style.display = "block";
    } else {
      document.getElementById("hiden_value").value = attr.id;
      document.getElementById("modal_edit_username").value = attr.name;
      document.getElementById(id).style.display = "block";
    }
  }
  function modalOff(id) {
    document.getElementById(id).style.display = "none";
    document.getElementById("pass").value = "";
    document.getElementById("newUserrole").value = "---";
    document.getElementById("newUsername").value = "";
    document.getElementById("modal_edit_username").value = "";
    document.getElementById("modal_edit_role").value = "---";
    document.getElementById("hiden_value").value = "";
  }
  return (
    <div className="row">
      <div className="x_panel">
        <div
          className="col-md-2 col-sm-4  tile_stats_count"
          style={{ minWidth: "300px", marginLeft: "-10px" }}
        >
          <span className="count_top">
            <h2>
              <i className="fa fa-users"></i> จำนวนสมาชิกกลุ่ม
            </h2>
          </span>
          <div className="count">
            <h3>{3}</h3>
          </div>
          <span className="count_bottom"></span>
        </div>
      </div>
      <div className="x_panel">
        <div className="x_content">
          <div>
            <h2>
              <i className="fa fa-users"></i> กลุ่มฟาร์มของฉัน
            </h2>
          </div>
          <div
            className="profile_details"
            style={{
              display: "flex",
              gap: "20px",
              maxWidth: "100%",
              flexFlow: "row wrap",
            }}
          >
            {user.map((val, index) => {
              return (
                <div
                  className="well profile_view"
                  style={{ minWidth: "300px", width: "350px" }}
                >
                  <div className="col-sm-12">
                    <h4 className="brief">สมาชิกคนที่ {index + 1}</h4>
                    <div className="left col-md-7 col-sm-7">
                      <h2>
                        <strong className="farmname">{val.name}</strong>
                      </h2>
                      <ul className="list-unstyled">
                        <li>
                          <i className="fa fa-user"></i>{" "}
                          <b> สิทธิ์ผู้ใช้งาน: </b> {val.role}
                        </li>
                      </ul>
                    </div>
                    <div className="right col-md-5 col-sm-5 text-center">
                      <Image src={val.picSrc} width={64} height={64} />
                    </div>
                  </div>
                  <div className=" bottom text-right">
                    <div className=" col">
                      <button
                        style={{ marginBottom: "20px" }}
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          modalOn("editUser", {
                            id: val.id,
                            name: val.name,
                            role: val.role,
                          })
                        }
                      >
                        <i className="fa fa-pencil"> </i> แก้ไขข้อมูล
                      </button>
                      <button
                        style={{ marginBottom: "20px" }}
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeUser(val.id)}
                      >
                        <i className="fa fa-remove"> </i> ลบ
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div
              className="well profile_view"
              style={{ minWidth: "300px", width: "350px" }}
            >
              <div className="col-sm-12">
                <h4 className="brief">เพิ่มสมาชิกใหม่</h4>
                <div className="left col-md-7 col-sm-7">
                  <h2>
                    <strong className="newusername">{"สมาชิกใหม่"}</strong>
                  </h2>
                  <ul className="list-unstyled">
                    <li>
                      <i className="fa fa-user"></i> <b> สิทธิ์ผู้ใช้งาน: </b>{" "}
                      {"ยังไม่กำหนด"}
                    </li>
                  </ul>
                </div>
                <div className="right col-md-5 col-sm-5 text-center">
                  <Image src="/user.png" width={64} height={64} />
                </div>
              </div>
              <div className=" bottom text-right">
                <div className=" col">
                  <button
                    style={{ marginBottom: "20px" }}
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => modalOn("createUser", 0)}
                  >
                    <i className="fa fa-plus"> </i> เพิ่มสมาชิกใหม่
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*===============================Modal=============================*/}
      <div id="createUser" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className="newuser-card">
            <h2>
              <strong className="newusername">{"สมาชิกใหม่"}</strong>
            </h2>
          </div>
          <Image
            className={styles.menu_pic_image}
            src="/user.png"
            width="80"
            height="80"
          />
          <p className={styles.pic_change}>
            <i className="fa fa-camera"> </i> เปลี่ยน
          </p>
          <div className={styles.modal_form}>
            <label class="newuser-label">ชื่อ</label>
            <input
              id="reg_Username"
              type="text"
              className="form-control"
              required=""
            />
            <label class="newuser-label">อีเมล</label>
            <input
              id="reg_email"
              type="email"
              className="form-control"
              required=""
            />
            <label class="newuser-label">รหัสผ่าน</label>
            <input
              id="reg_pass"
              type="password"
              className="form-control"
              required=""
            />
            <label class="newuser-label">สิทธิ์ผู้ใช้งาน</label>
            <select id="newUserrole">
              <option class="newuser-label">---</option>
              <option class="newuser-label">Admin</option>
              <option class="newuser-label">Editor</option>
              <option class="newuser-label">View</option>
            </select>
          </div>
          <div className={styles.modal_btn}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => addUser(genid)}
            >
              บันทึก
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => modalOff("createUser")}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
      <div id="editUser" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className="newuser-card">
            <h2>
              <strong className="newusername">{"แก้ไขข้อมูลสมาชิก"}</strong>
            </h2>
          </div>
          <Image
            className={styles.menu_pic_image}
            src="/user.png"
            width="80"
            height="80"
          />
          <p className={styles.pic_change}>
            <i className="fa fa-camera"> </i> เปลี่ยน
          </p>
          <input id="hiden_value" className={styles.hiden} />
          <div className={styles.modal_form}>
            <label class="newuser-label">ชื่อ</label>
            <input
              id="modal_edit_username"
              type="text"
              className="form-control"
              required=""
            />
            <label class="newuser-label">อีเมล</label>
            <input
              id="reg_email"
              type="email"
              className="form-control"
              required=""
            />
            <label class="newuser-label">รหัสผ่าน</label>
            <input
              id="modal_edit_role"
              type="password"
              className="form-control"
              required=""
            />
            <label class="newuser-label">สิทธิ์ผู้ใช้งาน</label>
            <select id="modal_edit_role">
              <option class="newuser-label">---</option>
              <option class="newuser-label">Admin</option>
              <option class="newuser-label">Editor</option>
              <option class="newuser-label">View</option>
            </select>
          </div>
          <div className={styles.modal_btn}>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={editUser}
            >
              บันทึก
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => modalOff("editUser")}
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
      {/*==========================_End_Of_Modal_=========================*/}
    </div>
  );
}
organiz.Layout = Layout;
