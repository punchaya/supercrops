import React, { useEffect } from "react";
import firebase from "./firebase";

export default function firebasepage() {
  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    recaptchaVerifier.render();
  });
  function phoneAuth() {
    var receptcha = window.recaptchaVerifier;
    var phoneNumber = document.getElementById("phone").value;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, receptcha)
      .then(function (confResult) {
        window.confResult = confResult;
        var coderesult = confResult;
        console.log(coderesult);
        alert("Message sent");
      })
      .catch(function (err) {
        alert(err.message);
      });
  }
  function codeVerfier() {
    var code = document.getElementById("verifier").value;
    window.confResult
      .confirm(code)
      .then(function (result) {
        alert("success");
        var user = result.user;
        console.log(user);
      })
      .catch(function (err) {
        alert(err.message);
      });
  }
  function test() {
    let receptcha = window.recaptchaVerifier;
    let phone = "+66823964636";
    firebase
      .auth()
      .signInWithPhoneNumber(phone, receptcha)
      .then(function (e) {
        let code = prompt("enter the otp", "");
        if (code == null) return;
        e.confirm(code)
          .then(function (result) {
            console.log(result);
            document.querySelector("label").textContent =
              result.user.phoneNumber + "Verified";
          })
          .catch(function (err) {
            alert(err.message);
          });
      });
  }
  return (
    <div>
      <p>Phone Number</p>
      <input type="text" id="phone"></input>
      <div id="recaptcha-container"></div>
      <button onClick={phoneAuth}>sendCode</button>
      <p>Verification Code</p>
      <input type="text" id="verifier"></input>
      <button onClick={codeVerfier}>Verfier</button>

      <p>Test</p>
      <label></label>
      <button onClick={test}>Test</button>
    </div>
  );
}
