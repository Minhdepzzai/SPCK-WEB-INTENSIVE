import { db } from "../firebase.js";
import { showToast } from "./toast.js";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
let titleLesson = document.getElementById("title-lesson");
let nameQues = document.getElementById("quesName");
let submitBtn = document.querySelector("#submit-btn");
const collectionRef = collection(db, "questions");

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
    showToast("Fill in all blank");
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
    console.log(answerList);
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
      });
    } else if (checkBlankFillTOF(red, blue, nameQues, titleLesson)) {
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
    }
  };
};

const checkQuesCnt = () => {
  let btnAddQues = document.getElementById("addQues");
  btnAddQues.onclick = () => {
    if (localStorage.getItem("cntQues") == 1) {
      prevTypeQues = checkBlankFill();
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
      const data = doc.data();
      // console.log("Document ID:", doc.id, "Title:", data.title);
      docIdType = doc.id;
    });
    console.log(docIdType);
  } catch (error) {}
};

// const addDocQues = () =>{
//   let saveBtn = document.getElementById("saveBtn")
//   saveBtn.onclick = () =>{
//     checkFireBase(titleLesson.value)
//     if(docIdType === null){
//       addDoc(collectionRef,{
//                       pin:  pinPriv,
//                       title:String(titleLesson.value),
//                       ques:
//                          answerList
//       })
//     }
//     else{
//       setDoc(collectionRef,docIdType,{
//         pin:  pinPriv,
//                       title:String(titleLesson.value),
//                       ques:
//                          answerList
//       })
//     }
//   }
// }

const addDocQues = () => {
  let saveBtn = document.getElementById("saveBtn");
  saveBtn.onclick = async () => {
    await checkFireBase(titleLesson.value);

    const data = {
      pin: pinPriv,
      title: String(titleLesson.value),
      ques: answerList,
    };

    if (docIdType === null) {
      addDoc(collectionRef, {
        pin: pinPriv,
        title: String(titleLesson.value),
        ques: answerList,
      });
    } else {
      const detailDocRef = doc(db, "questions", docIdType);
      console.log(detailDocRef);
      // addDoc(doc(collectionRef, docIdType), {
      //   pin: pinPriv,
      //   title: String(titleLesson.value),
      //   ques: answerList,
      // });
    }
  };
};

const test = () => {
  let saveBtn = document.getElementById("saveBtn");
  saveBtn.onclick = () => {
    checkFireBase("123");
  };
};

test();

// submitBtn.onclick = () => {
//   currentStatus++;
//   updateLocalStorage();
//   let quesType = localStorage.getItem("quesType");
//   console.log(ans);
//   if (
//     checkBlankFill(ansRed, ansBlue, ansGreen, ansYellow, nameQues, titleLesson)
//   ) {
//     if (currentStatus === 1) {
//         answerList.push({  // Use push() method to add objects to the array
//             answers:[
//               {
//                 answer: String(ansRed.value),
//                 isCorrect: ans === 1,
//               },
//               {
//                 answer: String(ansBlue.value),
//                 isCorrect: ans === 3,
//               },
//               {
//                 answer: String(ansYellow.value),
//                 isCorrect: ans === 2,
//               },
//               {
//                 answer: String(ansGreen.value),
//                 isCorrect: ans === 4,
//               },
//             ],
//             name: String(nameQues.value),
//             points: 100,
//             time: numberOfSeconds,
//           });
//       console.log(answerList);
//     } else {
//         answerList.push({  // Use push() method to add objects to the array
//             answers:[
//               {
//                 answer: String(ansRed.value),
//                 isCorrect: ans === 1,
//               },
//               {
//                 answer: String(ansBlue.value),
//                 isCorrect: ans === 3,
//               },
//               {
//                 answer: String(ansYellow.value),
//                 isCorrect: ans === 2,
//               },
//               {
//                 answer: String(ansGreen.value),
//                 isCorrect: ans === 4,
//               },
//             ],
//             name: String(nameQues.value),
//             points: 100,
//             time: numberOfSeconds,
//           });
//       console.log(answerList);
//     }
//     // Specify the document ID
//   } else {
//     console.log(0);
//   }
// };

// let saveBtn = document.getElementById("saveBtn")
// saveBtn.onclick = () => {
//     addDoc(collectionRef,{
//                 pin:  pinPriv,
//                 title:String(titleLesson.value),
//                 ques:
//                     answerList
//             })

// };

document.addEventListener("DOMContentLoaded", () => {
  checkSaveFillBlank();
  // addDocQues();
});
// test();
addDocQues();
export { clearFillBlank };
