import { auth } from "../../JS/firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitBtn = document.getElementById("btnSubmit")

submitBtn.onclick = async (e) => {
  e.preventDefault();
  if (emailInput.value.trim().length == 0 || passwordInput.value.trim().length == 0) {
    alert("Can not empty!");
  } else {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailInput.value,
        passwordInput.value);
      // console.log(firebase.auth().currentUser);
      alert("Login successful");
    } catch (err) {
      alert(err.message);
    }
  }
};