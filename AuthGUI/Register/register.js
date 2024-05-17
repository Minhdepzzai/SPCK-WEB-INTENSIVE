import { showToast } from "../../JS/createGUI/toast.js";
import { auth } from "../../JS/firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passwordConfirmInput = document.getElementById("confirmPassword");

document.getElementById("btnSubmit").addEventListener("click", async function (e) {
  e.preventDefault();
  let chuThuong = /[a-z]/g;
  let chuHoa = /[A-Z]/g;
  let chuSo = /[0-9]/g;
  let checkEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    emailInput.value.trim().length == 0 ||
    passwordInput.value.trim().length == 0 ||
    passwordConfirmInput.value.trim().length == 0
  ) {
    showToast("Can not empty!");
  } else if (passwordInput.value.trim().length < 8) {
    showToast("Password must have a minimum length of 8 characters.");
  } else if (!passwordInput.value.trim().match(chuThuong)) {
    showToast("Password must have at least one lowercase character.");
  } else if (!passwordInput.value.trim().match(chuHoa)) {
    showToast("Password must have at least one capital letter.");
  } else if (!passwordInput.value.trim().match(chuSo)) {
    showToast("Password must have at least one number.");
  } else if (!emailInput.value.trim().match(checkEmail)) {
    showToast("Inappropriate email.");
  } else if (passwordInput.value.trim() != passwordConfirmInput.value.trim()) {
    showToast("password does not match");
  } else {
    try {
      const userCreate = await createUserWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value);

      console.log(userCreate)

      window.location.href = "/AuthGUI/Login/login.html"

      // await userCreate.user.sendEmailVerification();
      // showToast("Đã gửi Email xác thực.Vui lòng vào email của bạn để xác nhận")

    } catch (err) {
      showToast(err.message);
    } 
  }
});
