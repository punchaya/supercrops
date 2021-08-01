import React, { useEffect } from "react";
import Link from "next/link";
import Layout from "../layout/layout";
import Image from "next/image";
import { useState } from "react";

export default function profile() {
  const [info, setinfo] = useState({
    uid: "User ID",
    emil: "Email",
    username: "User Name",
    phone: "0999999999",
    password: "123456",
  });
  useEffect(() => {
    setinfo((prevState) => ({
      ...prevState,
      ["email"]: "kanekoko",
    }));
  }, []);

  return (
    <div>
      <div className="row">
        <div className="x_panel">
          <h2>
            <i className="fa fa-home"></i> <Link href="/">หน้าหลัก</Link> /{" "}
            <Link href="/profile">ข้อมูลส่วนตัว</Link>
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="x_panel">
          <div className="x_content">
            <div>
              <h2>ข้อมูลผู้ใช้</h2>
            </div>
            <div className="profile_details">
              <div
                className="well profile_view"
                style={{
                  display: "flex",
                  gap: "40px",
                  maxWidth: "700px",
                  flexFlow: "row wrap",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    paddingRight: "0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ minWidth: "100px" }}>
                      <h2>รหัสผู้ใช้ :</h2>
                    </div>
                    <div>
                      <input
                        id="uid"
                        type="text"
                        className="form-control"
                        defaultValue={info.uid}
                        readOnly
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ minWidth: "100px" }}>
                      <h2>อีเมล :</h2>
                    </div>
                    <div>
                      <input
                        id="email"
                        type="text"
                        className="form-control"
                        defaultValue={info.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ minWidth: "100px" }}>
                      <h2>ชื่อผู้ใช้ :</h2>
                    </div>
                    <div>
                      <input
                        id="username"
                        type="text"
                        defaultValue={info.username}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ minWidth: "100px" }}>
                      <h2>โทรศัพท์ :</h2>
                    </div>
                    <div>
                      <input
                        id="phone"
                        type="text"
                        className="form-control"
                        defaultValue={info.phone}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ minWidth: "100px" }}>
                      <h2>รหัสผ่าน :</h2>
                    </div>
                    <div>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        defaultValue={info.password}
                        readOnly
                      />
                    </div>
                    <div style={{ marginTop: "5px", marginLeft: "5px" }}>
                      <button className="btn btn-primary">เปลี่ยนรหัส</button>
                    </div>
                  </div>
                </div>

                <div
                  className="center"
                  style={{ margin: "auto", paddingBottom: "20px" }}
                >
                  <Image src="/no-pic.png" width={128} height={128}></Image>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

profile.Layout = Layout;
