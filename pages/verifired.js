import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
export default function verifired() {
  const router = useRouter();
  return (
    <body className="login">
      <div>
        <a className="hiddenanchor" id="signup"></a>
        <a className="hiddenanchor" id="signin"></a>
        <a className="hiddenanchor" id="repassword"></a>

        <div className="login_wrapper">
          <div className="animate form login_form">
            <section className="login_content">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <p>
                  <Image src="/supercrops.png" height="80px" width="80px" />
                </p>
                <div
                  className="alert alert-success"
                  role="alert"
                  style={{
                    color: "#155724",
                    backgroundColor: "#d4edda",
                    borderColor: "#c3e6cb",
                    fontSize: "16px",
                  }}
                >
                  <p>
                    <h4 className="alert-heading">การดำเนินการสำเร็จ</h4>
                  </p>
                  <p>บัญชีของท่านได้รับการอนุมัติเรียบร้อยแล้ว</p>
                  <hr />
                  <p className="mb-0">
                    คลิกเพื่อ <Link href="/login">เข้าสู่ระบบ</Link>
                  </p>
                </div>

                <div>
                  <button
                    className="btn btn-primary"
                    onClick={() => router.push("/login")}
                    style={{ color: "white" }}
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>

                <div className="clearfix"></div>

                <div className="separator">
                  <div className="clearfix"></div>
                  <br />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <a
                      href="http://kitforward.co.th/
"
                      target="_blank"
                    >
                      <h1>
                        <i className="fa fa-home"></i> kitforward.co.th
                      </h1>
                    </a>
                  </div>
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
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </body>
  );
}
