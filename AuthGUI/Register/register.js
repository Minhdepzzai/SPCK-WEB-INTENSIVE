var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPassword = document.getElementById("confirmPassword");
var listUsers = JSON.parse(localStorage.getItem("user")) || [];

document.getElementById("btnSubmit").addEventListener("click", function (e) {
  e.preventDefault();
  let chuThuong = /[a-z]/g;
  let chuHoa = /[A-Z]/g;
  let chuSo = /[0-9]/g;
  let checkEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (
    username.value.trim().length == 0 ||
    email.value.trim().length == 0 ||
    password.value.trim().length == 0 ||
    confirmPassword.value.trim().length == 0
  ) {
    alert("Can not empty!");
  } else if (password.value.trim().length < 8) {
    alert("Password must have a minimum length of 8 characters.");
  } else if (!password.value.trim().match(chuThuong)) {
    alert("Password must have at least one lowercase character.");
  } else if (!password.value.trim().match(chuHoa)) {
    alert("Password must have at least one capital letter.");
  } else if (!password.value.trim().match(chuSo)) {
    alert("Password must have at least one number.");
  } else if (!email.value.trim().match(checkEmail)) {
    alert("Inappropriate email.");
  } else if (password.value.trim() != confirmPassword.value.trim()) {
    alert("password does not match");
  } else {
    let user = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };
    listUsers.push(user);
    localStorage.setItem("user", JSON.stringify(listUsers));
    window.location.pathname = "login.html";
  }
});
