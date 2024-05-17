// const changeQuesType = () =>{
//     let quesT = document.querySelectorAll("#dropdownbox-quesT .dropdown-item");
//     let boxquesT = document.getElementsByClassName("box-quesType");
//     let prevItemQuesT = null;
//     let btnQuiz = document.getElementById("btn-quiz")
//     btnQuiz.classList.add("dropdown-item-active")
//     prevItemQuesT = btnQuiz
//     quesT.forEach((item) => {
//         item.onclick = () => {
//             boxquesT[0].textContent = item.textContent;
//             item.classList.add("dropdown-item-active");
//             if (prevItemQuesT  != item) {
//                 prevItemQuesT.classList.remove("dropdown-item-active");
//             }
//             prevItemQuesT = item;
//             console.log(prevItemQuesT);
//         };
//     });
// }

import { clearFillBlank } from "./create.js";
import { showErrorToast, showSuccessToast } from "./toast.js";
const changeQuesType = () => {
  let quesT = document.querySelectorAll("#dropdownbox-quesT .dropdown-item");
  let boxquesT = document.querySelector(".box-quesType");
  let prevItemQuesT = null;
  let btnQuiz = document.getElementById("btn-quiz");
  btnQuiz.classList.add("dropdown-item-active");
  const handleItemClick = (item) => {
    boxquesT.textContent = item.textContent;
    item.classList.add("dropdown-item-active");
    if (prevItemQuesT && prevItemQuesT !== item) {
      prevItemQuesT.classList.remove("dropdown-item-active");
    }
    prevItemQuesT = item;
  };
  quesT.forEach((item) => {
    item.addEventListener("click", () => {
      handleItemClick(item);
    });
  });
};
const changeTime = () => {
  let timeItems = document.querySelectorAll("#dropdownbox-time .dropdown-item");
  let boxtime = document.getElementsByClassName("time");
  let prevItemTime = null;
  let timeFi = document.getElementById("timeFirst");

  timeFi.classList.add("dropdown-item-active");
  prevItemTime = timeFi;

  timeItems.forEach((item) => {
    item.onclick = (e) => {
      prevItemTime.classList.remove("dropdown-item-active");
      boxtime[0].textContent = item.textContent;
      item.classList.add("dropdown-item-active");
      if (prevItemTime && prevItemTime !== item) {
        prevItemTime.classList.remove("dropdown-item-active");
      }
      prevItemTime = item;
    };
  });
};
localStorage.setItem("pointType", "Standard");
const changePoint = () => {
  let pointItems = document.querySelectorAll("#dropdown-point .dropdown-item");
  let boxpoint = document.getElementsByClassName("point");
  let prevItemPoint = null;
  let pointFi = document.getElementById("pointFi");
  pointFi.classList.add("dropdown-item-active");
  prevItemPoint = pointFi;
  pointItems.forEach((item) => {
    item.onclick = () => {
      boxpoint[0].textContent = item.textContent;
      item.classList.add("dropdown-item-active");
      if (prevItemPoint && prevItemPoint !== item) {
        prevItemPoint.classList.remove("dropdown-item-active");
      }
      prevItemPoint = item;
      localStorage.setItem("pointType", item.textContent);
    };
  });
};

function checkQuesTick(quesTick, cntTick) {
  if (!cntTick) {
    quesTick.forEach((item) => {
      item.classList.remove("fa-check-square");
      item.classList.add("fa-square");
      cntQuesTick = 0;
    });
  } else {
    quesTick.forEach((item) => {
      item.classList.remove("fa-square");
      item.classList.add("fa-check-square");
      cntQuesTick = 1;
    });
  }
}

const changeTickQues = () => {
  let quesTick = document.querySelectorAll(".quesTick");
  let tickIcon = document.getElementById("tickIconAll");
  let cntTick = 0;
  let cntQuesTick = 0;

  if (tickIcon) {
    tickIcon.addEventListener("mouseover", function () {
      tickIcon.classList.remove("fa-square");
      tickIcon.classList.add("fa-check-square");
    });

    tickIcon.addEventListener("mouseleave", function () {
      if (!cntTick) {
        tickIcon.classList.remove("fa-check-square");
        tickIcon.classList.add("fa-square");
      } else {
        tickIcon.classList.remove("fa-square");
        tickIcon.classList.add("fa-check-square");
      }
    });
    tickIcon.addEventListener("click", function () {
      if (cntTick) {
        quesTick = document.querySelectorAll(".quesTick");
        tickIcon.classList.remove("fa-check-square");
        tickIcon.classList.add("fa-square");
        cntTick = false;
        checkQuesTick(quesTick, cntTick);
        cntQuesTick = 0;
      } else {
        tickIcon.classList.remove("fa-square");
        tickIcon.classList.add("fa-check-square");
        cntTick = true;
        checkQuesTick(quesTick, cntTick);
        cntQuesTick = 1;
      }
    });
  }
};

let cntQues = 2;
if (cntQues) {
  localStorage.setItem("checkSave", 1);
}

let quesTypeLocale = "quiz";
const changeUIBOXANS = () => {
  let ansgreen = document.getElementById("green");
  let ansyellow = document.getElementById("yellow");
  let btnQuiz = document.getElementById("btn-quiz");
  let btnTof = document.getElementById("btn-tof");
  btnTof.onclick = () => {
    ansgreen.classList.add("displayNone");
    ansyellow.classList.add("displayNone");
    quesTypeLocale = "tof";
    localStorage.setItem("quesType", quesTypeLocale);
  };
  btnQuiz.onclick = () => {
    ansgreen.classList.remove("displayNone");
    ansyellow.classList.remove("displayNone");
    quesTypeLocale = "quiz";
    localStorage.setItem("quesType", quesTypeLocale);
  };
};
document.addEventListener("DOMContentLoaded", () => {
  changeUIBOXANS();
  changeQuesType();
  localStorage.setItem("cntQues", cntQues);
});

changeTime();
changeTickQues();
changePoint();
