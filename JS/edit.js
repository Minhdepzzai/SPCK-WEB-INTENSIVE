import { db } from "./firebase.js";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

const titleQuestionElement = document.querySelector("#title-lesson");
const quesListElement = document.querySelector("#ques-list");

let quesListHTML = "";
let currentQuestion = null;

const questionDocRef = doc(
  db,
  "questions",
  localStorage?.getItem("detailQuestionID")
);

const snapDoc = await getDoc(questionDocRef);

const dataDetail = snapDoc.data();

console.log(dataDetail);

titleQuestionElement.value = dataDetail?.title;

dataDetail?.ques?.forEach((item, index) => {
  quesListHTML += `
        <div class="create-left-ques">
            <div class="create-left-ques-left">
                <i class="fas fa-square quesTick"></i>
                <div class="create-ques-list">
                    <h6>Question ${index + 1}</h6>
                </div>
            </div>
            <div class="create-left-ques-right">
                <i class="fa-solid fa-x"></i>
            </div>
        </div>
    `;
});

quesListElement.innerHTML = quesListHTML;

// const questionsCollectionRef = collection(db, "questions");

// const titleQuery = query(
//   questionsCollectionRef,
//   where("title", "==", queryValue.trim())
// );

// try {
//   const matchingDocsSnapshot = await getDocs(titleQuery);
//   matchingDocsSnapshot.forEach((doc) => {
//     const data = doc.data();
//     // console.log("Document ID:", doc.id, "Title:", data.title);
//     docIdType = doc.id;
//   });
//   console.log(docIdType);
// } catch (error) {}
