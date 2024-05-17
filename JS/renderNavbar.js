const navbarElement = document.getElementById("myNavbar");

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
            <div class="nav-box">
              <a href="../CreateGUI/create.html">
                <h2>Create</h2>
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
        <div class="nav-item">
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
        </div>
      </div>
`;
