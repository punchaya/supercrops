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
    <div className={styles.body}>
      <div className={styles.title}>
        <div className={styles.title_logo}></div>
        <div className={styles.title_name}>Farm Name: </div>
      </div>
      <div className={styles.detail}>
        <p>Admin User: {admin.length}</p>
        <p>Editor User: {editor.length}</p>
        <p>View User: {view.length}</p>
        <p>Total User: {user.length}</p>
      </div>
      <div className={styles.menu}>
        {user.map((val) => {
          return (
            <div className={styles.card}>
              <div className={styles.menu_pic}>
                <Image
                  className={styles.menu_pic_image}
                  src={val.picSrc}
                  width="80"
                  height="80"
                />
              </div>
              <div className={styles.menu_detail}>
                <p className={styles.head}>{val.name}</p>
                <p>Role: {val.role}</p>
              </div>
              <div className={styles.menu_btn}>
                <button
                  onClick={() =>
                    modalOn("editUser", {
                      id: val.id,
                      name: val.name,
                      role: val.role,
                    })
                  }
                >
                  Edit
                </button>
                <button onClick={() => removeUser(val.id)}>Remove</button>
              </div>
            </div>
          );
        })}

        <div className={styles.add_card}>
          <div className={styles.add_btn}>
            <Image
              className={styles.menu_pic_image}
              src="/plus.png"
              width="100"
              height="100"
              onClick={() => modalOn("createUser", 0)}
            />
          </div>
          <p className={styles.head}>New Users</p>
        </div>
      </div>
      {/*===============================Modal=============================*/}
      <div id="createUser" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_head}>Create/Edit Users</div>
          <Image
            className={styles.menu_pic_image}
            src="/user.png"
            width="80"
            height="80"
          />
          <p className={styles.pic_change}>Change</p>
          <div className={styles.modal_form}>
            <label>Username</label>
            <input id="newUsername" />
            <label>Password</label>
            <input id="pass" />
            <label>role</label>
            <select id="newUserrole">
              <option>---</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>View</option>
            </select>
          </div>
          <div className={styles.modal_btn}>
            <button onClick={() => addUser(genid)}>Save</button>
            <button onClick={() => modalOff("createUser")}>Cancel</button>
          </div>
        </div>
      </div>
      <div id="editUser" className={styles.modal}>
        <div className={styles.modal_content}>
          <div className={styles.modal_head}>Create/Edit Users</div>
          <Image
            className={styles.menu_pic_image}
            src="/user.png"
            width="80"
            height="80"
          />
          <p className={styles.pic_change}>Change</p>
          <input id="hiden_value" className={styles.hiden} />
          <div className={styles.modal_form}>
            <label>Username</label>
            <input id="modal_edit_username" />
            <label>role</label>
            <select id="modal_edit_role">
              <option>---</option>
              <option>Admin</option>
              <option>Editor</option>
              <option>View</option>
            </select>
          </div>
          <div className={styles.modal_btn}>
            <button onClick={editUser}>Save</button>
            <button onClick={() => modalOff("editUser")}>Cancel</button>
          </div>
        </div>
      </div>
      {/*==========================End_Of_Modal=========================*/}
    </div>
  );
}
organiz.Layout = Layout;
