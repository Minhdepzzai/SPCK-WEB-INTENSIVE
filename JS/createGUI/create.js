import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { db } from "../firebase.js";
import { showErrorToast, showSuccessToast } from "./toast.js";
let titleLesson = document.getElementById("title-lesson");
let nameQues = document.getElementById("quesName");
let submitBtn = document.querySelector("#submit-btn");
const collectionRef = collection(db, "questions");

let checkboxBtn = document.querySelectorAll(".create-middle-box-ans .checkbox");
let ans = 1;
let prevItemCheckBox = checkboxBtn[0];
let currentQuestionIndex = 0;

checkboxBtn.forEach((item, index) => {
  item.onclick = () => {
    prevItemCheckBox.classList.remove("active");
    item.classList.add("active");
    ans = index + 1;
    // console.log(ans);
    prevItemCheckBox = item;
  };
});

let numberOfSeconds = 15;
const dropdownItems = document.querySelectorAll(
  "#dropdownbox-time .dropdown-item"
);

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    const text = item.textContent.trim();
    numberOfSeconds = parseInt(text.split(" ")[0]);
    console.log(numberOfSeconds);
  });
});

let ansRed = document.getElementById("ans1");
let ansGreen = document.getElementById("ans4");
let ansBlue = document.getElementById("ans2");
let ansYellow = document.getElementById("ans3");

let currentStatus = 1;
localStorage.setItem("currentStatus", currentStatus);
const updateLocalStorage = () => {
  localStorage.setItem("currentStatus", currentStatus);
};
let pinPriv = "111111";

const checkBlankFill = (ans1, ans2, ans3, ans4, nameQues, titleLesson) => {
  const minValue = 0;
  const maxValue = 200;
  console.log(
    ans1.value.trim().length > minValue,
    ans2.value.trim().length > minValue,
    ans3.value.trim().length > minValue,
    ans4.value.trim().length > minValue,
    titleLesson.value.trim().length > minValue
  );
  if (
    ans1.value.trim().length > minValue &&
    ans2.value.trim().length > minValue &&
    ans3.value.trim().length > minValue &&
    ans4.value.trim().length > minValue &&
    nameQues.value.trim().length > minValue &&
    nameQues.value.trim().length <= maxValue
  ) {
    return 1;
  } else {
    showErrorToast("Fill in all blank");
    return 0;
  }
};

const clearFillBlank = () => {
  ansRed.value = "";
  ansBlue.value = "";
  ansGreen.value = "";
  ansYellow.value = "";
  nameQues.value = "";
};

const checkBlankFillTOF = (ans1, ans2, nameQues, titleLesson) => {
  const minValue = 0;
  const maxValue = 200;
  const minValueName = 45;
  if (
    ans1.value.trim().length > minValue &&
    ans2.value.trim().length > minValue &&
    titleLesson.value.trim().length > minValue &&
    titleLesson.value.trim().length <= minValueName &&
    nameQues.value.trim().length > minValue &&
    nameQues.value.trim().length <= maxValue
  ) {
    return 1;
  } else {
    return 0;
  }
};

let answerList = [];

const checkSaveFillBlank = () => {
  let saveBtn = document.getElementById("submit-btn");
  // let checkSave = localStorage.getItem("checkSave");
  saveBtn.onclick = () => {
    if (
      checkBlankFill(
        ansRed,
        ansBlue,
        ansGreen,
        ansYellow,
        nameQues,
        titleLesson
      )
    ) {
      localStorage.setItem("checkSave", 1);
      answerList[currentQuestionIndex] = {
        answers: [
          {
            answer: String(ansRed.value),
            isCorrect: ans === 1,
          },
          {
            answer: String(ansBlue.value),
            isCorrect: ans === 3,
          },
          {
            answer: String(ansYellow.value),
            isCorrect: ans === 2,
          },
          {
            answer: String(ansGreen.value),
            isCorrect: ans === 4,
          },
        ],
        name: String(nameQues.value),
        points: String(localStorage.getItem("pointType")),
        time: numberOfSeconds,
      };
      console.log(answerList);

      showSuccessToast("Create question sucessfully");
    } else if (checkBlankFillTOF(ansRed, ansBlue, nameQues, titleLesson)) {
      localStorage.setItem("checkSave", 1);
      answerList.push({
        answers: [
          {
            answer: String(ansRed.value),
            isCorrect: ans === 1,
          },
          {
            answer: String(ansBlue.value),
            isCorrect: ans === 3,
          },
        ],
        name: String(nameQues.value),
        points: String(localStorage.getItem("pointType")),
        time: numberOfSeconds,
      });

      showSuccessToast("Create question sucessfully");
    }
  };
};

let docIdType = null;
const checkFireBase = async (queryValue) => {
  const questionsCollectionRef = collection(db, "questions");

  const titleQuery = query(
    questionsCollectionRef,
    where("title", "==", queryValue.trim())
  );

  try {
    const matchingDocsSnapshot = await getDocs(titleQuery);
    matchingDocsSnapshot.forEach((doc) => {
      docIdType = doc.id;
    });
  } catch (error) {
    showErrorToast(error.message);
  }
};

const renderQuestion = () => {
  const data = answerList[currentQuestionIndex];
  console.log("data", data);
  nameQues.value = data.name;
  ansRed.value = data.answers[0].answer;
  ansYellow.value = data.answers[1].answer;
  ansBlue.value = data.answers[2].answer;
  ansGreen.value = data.answers[3].answer;
};

const addQues = () => {
  const btnAddQues = document.getElementById("addQues");
  const leftCol = document.getElementsByClassName("scroll-bar")[0];
  let tickIcon = document.getElementById("tickIconAll");

  btnAddQues.onclick = () => {
    let questionListHTML = "";
    let checkSavee = parseInt(localStorage.getItem("checkSave"));
    let titleName = document.getElementById("title-lesson");
    if (titleName.value.trim().length == 0) {
      showErrorToast("Fill in title for me");
      titleName.focus();
    } else if (checkSavee) {
      answerList.push({
        answers: [
          {
            answer: "",
            isCorrect: true,
          },
          {
            answer: "",
            isCorrect: false,
          },
          {
            answer: "",
            isCorrect: false,
          },
          {
            answer: "",
            isCorrect: false,
          },
        ],
        name: "",
        points: "Standard",
        time: 5,
      });

      currentQuestionIndex = answerList.length - 1;
      // clearFillBlank();
      localStorage.setItem("checkSave", 0);
      tickIcon = document.getElementById("tickIconAll");

      answerList?.forEach((item, indx) => {
        questionListHTML += `<div class="create-left-ques">
        <div class="create-left-ques-left">
        <i class="fas fa-square quesTick"></i>
        <div class = "create-ques-list">
        <h6 >Question ${indx + 1}</h6>
        </div>
        </div>
        <div class="create-left-ques-right">
        <i class="fa-solid fa-x"></i>
        </div>
        </div>`;
      });

      leftCol.innerHTML = questionListHTML;

      renderQuestion();

      const questionItemElement =
        document.querySelectorAll(".create-left-ques");

      questionItemElement.forEach((item, indx) => {
        item.onclick = () => {
          currentQuestionIndex = indx;
          renderQuestion();
        };
      });

      let quesTick = document.querySelectorAll(".quesTick");
      tickIcon.classList.remove("fa-check-square");
      tickIcon.classList.add("fa-square");
      cntTick = false;
      checkQuesTick(quesTick, 0);

      quesTick.forEach((item, index) => {
        item.onclick = () => {
          if (item.classList.contains("fa-check-square")) {
            item.classList.remove("fa-check-square");
            item.classList.add("fa-square");
          } else {
            item.classList.remove("fa-square");
            item.classList.add("fa-check-square");
          }
        };
      });
    }
  };
};

const addDocQues = () => {
  let saveBtn = document.getElementById("saveBtn");
  saveBtn.onclick = async () => {
    await checkFireBase(titleLesson.value);

    // const data = {
    //   pin: pinPriv,
    //   title: String(titleLesson.value),
    //   ques: answerList,
    // };

    if (docIdType === null) {
      if (titleLesson.value.trim().length > 0) {
        addDoc(collectionRef, {
          pin: Math.floor(100000 + Math.random() * 900000), // random dãy 6 số
          title: String(titleLesson.value),
          ques: answerList,
        });

        window.location.href = "./HomeGUI/home.html";
      } else {
        showErrorToast("Please fill game title");
      }
    } else {
      showErrorToast("Title has already existed. Please choose another title!");
    }
  };
};

document.addEventListener("DOMContentLoaded", () => {
  checkSaveFillBlank();
  addQues();
});

// test();
addDocQues();
export { clearFillBlank };
