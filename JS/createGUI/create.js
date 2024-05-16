import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
let titleLesson = document.getElementById("title-lesson");
let nameQues = document.getElementById("quesName");
let submitBtn = document.querySelector("#submit-btn");
const collectionRef = collection(db, "questions");
onSnapshot(collectionRef, (data) => {
  // console.log(data.docs)
  const quesLists = [];
  data.docs.forEach((doc) => {
    // console.log(doc.data())
    quesLists.push({ ...doc.data(), id: doc.id });
    // console.log(doc.data().id)
  });
});

let checkboxBtn = document.querySelectorAll(".create-middle-box-ans .checkbox");
let ans = 1;
let prevItemCheckBox = checkboxBtn[0];

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
  const minValueName = 45;
  if (
    ans1.value.trim().length > minValue &&
    ans2.value.trim().length > minValue &&
    ans3.value.trim().length > minValue &&
    ans4.value.trim().length > minValue &&
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



const checkSaveFillBlank = () =>{
  let saveBtn = document.getElementById("submit-btn");
  // let checkSave = localStorage.getItem("checkSave");
  saveBtn.onclick = () =>{
    if(checkBlankFill(ansRed, ansBlue, ansGreen, ansYellow, nameQues, titleLesson)){
      localStorage.setItem("checkSave",1);
    }
  }
}

let answerList = [];
// const checkQuesCnt = () =>{
//   let btnAddQues  = document.getElementById("addQues")
//   btnAddQues.onclick = () =>{
//       if(localStorage.getItem("cntQues") == 1){
//           prevTypeQues = checkBlankFill()
//       }
//   }
// }

submitBtn.onclick = () => {
  currentStatus++;
  updateLocalStorage();
  let quesType = localStorage.getItem("quesType");
  console.log(ans);
  if (
    checkBlankFill(ansRed, ansBlue, ansGreen, ansYellow, nameQues, titleLesson)
  ) {
    if (currentStatus === 1) {
        answerList.push({  // Use push() method to add objects to the array
            answers:[
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
            points: 100,
            time: numberOfSeconds,
          });
      console.log(answerList);
    } else {
        answerList.push({  // Use push() method to add objects to the array
            answers:[
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
            points: 100,
            time: numberOfSeconds,
          });
      console.log(answerList);
    }
    // Specify the document ID
  } else {
    console.log(0);
  }
};


let saveBtn = document.getElementById("saveBtn")
saveBtn.onclick = () => {
    addDoc(collectionRef,{
                pin:  pinPriv,
                title:String(titleLesson.value),
                ques:
                    answerList
            })
   
};

document.addEventListener("DOMContentLoaded", () => {
  checkSaveFillBlank();
});