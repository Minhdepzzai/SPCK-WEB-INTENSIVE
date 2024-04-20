var email = document.getElementById("email");
var password = document.getElementById("password");
var listUsers = JSON.parse(localStorage.getItem("user")) || [];

document.getElementById("btnSubmit").addEventListener("click", function (e) {
  e.preventDefault();
  if (email.value.trim().length == 0 || password.value.trim().length == 0) {
    alert("Can not empty!");
  } else {
    let checkUser = false;
    for (i in listUsers) {
      if (
        listUsers[i].email == email.value.trim() &&
        listUsers[i].password == password.value.trim()
      ) {
        checkUser = true;
        break;
      }
    }
    if (checkUser == true) {
      window.location.pathname = "/index.html";
    } else {
      alert("Email or password is wrong.");
    }
  }
});
