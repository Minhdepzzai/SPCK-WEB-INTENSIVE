import { auth } from "../../JS/firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { showToast } from "../../JS/createGUI/toast.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("btnSubmit")

submitBtn.onclick = async (e) => {
  e.preventDefault();
  if (emailInput.value.trim().length == 0 || passwordInput.value.trim().length == 0) {
    showToast("Can not empty!");
  } else {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value);
      // console.log(firebase.auth().currentUser);
      showToast("Login successful");
    } catch (err) {
      showToast(err.message);
    }
  }
};