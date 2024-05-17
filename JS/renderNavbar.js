import { auth } from "./firebase.js";

import { showErrorToast, showSuccessToast } from "./createGUI/toast.js";

const navbarElement = document.getElementById("myNavbar");

// Hiển thị thông tin navbar tránh lặp lại code
const renderNavbar = () => {
  const currentUser =
    localStorage.getItem("currentUser") === "null"
      ? null
      : localStorage.getItem("currentUser");

  navbarElement.innerHTML = ` 
<div class="left">
        <img class="nav-img" src="/Image/chatbot.png" alt="" />
      </div>
      <div class="middle-box">
        <div class="middle">
          <div class="nav-item">
            <div class="nav-box">
              <a href="#">
                <h2>Home</h2>
              </a>
            </div>
            <div class="nav-box" >
              <a href="#">
                <h2 id="create-btn">Create</h2>
              </a>
            </div>
            <div class="nav-box">
              <a href="">
                <h2>Play</h2>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="right">
        ${
          currentUser
            ? `
                <div class="nav-item"> 
                    <a href="/AuthGUI/Register/register.html" style="text-decoration:none; color: #ffffff">
                        <h2>${currentUser.split("@")[0]}</h2>
                    </a> 
                    <button class="btn btn-danger" id="logout-btn" style="margin-top: -5px; margin-left: 12px">Đăng xuất</button>   
                </div>
            `
            : `<div class="nav-item">
                    <div class="nav-box">
                    <a href="/AuthGUI/Register/register.html">
                        <h2>Register</h2>
                    </a>
                    </div>
                    <div class="nav-box">
                    <a href="/AuthGUI/Login/login.html">
                        <h2>Login</h2>
                    </a>
                    </div>
                </div>`
        }
      </div>
`;
};

renderNavbar();

const logoutBtn = document.querySelector("#logout-btn");
const createBtn = document.querySelector("#create-btn");

createBtn.onclick = () => {
  console.log("click");
  const currentUser =
    localStorage.getItem("currentUser") === "null"
      ? null
      : localStorage.getItem("currentUser");

  if (currentUser) {
    window.location.href = "/CreateGUI/create.html";
  } else {
    showErrorToast("Login permission!");
  }
};

logoutBtn.onclick = async () => {
  await auth.signOut();
  localStorage.setItem("currentUser", null);

  showSuccessToast("Log out sucessfully!");

  //   Render lại navbar sau khi đã đăng xuất
  renderNavbar();
};
