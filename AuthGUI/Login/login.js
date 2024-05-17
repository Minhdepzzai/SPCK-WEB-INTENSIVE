import { auth } from "../../JS/firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { showSuccessToast, showErrorToast } from "../../JS/createGUI/toast.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("btnSubmit");

submitBtn.onclick = async (e) => {
  e.preventDefault();
  if (
    emailInput.value.trim().length == 0 ||
    passwordInput.value.trim().length == 0
  ) {
    showErrorToast("Can not empty!");
  } else {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value
      );
      localStorage.setItem("currentUser", auth.currentUser.email);
      showSuccessToast("Login successful");

      setTimeout(() => {
        window.location.href = "/HomeGUI/home.html";
      }, 1000);
    } catch (err) {
      showErrorToast(err.message);
    }
  }
};
