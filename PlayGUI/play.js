import { db } from "../CreateGUI/firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
const collectionRef = collection(db, "questions");
onSnapshot(collectionRef, (data) => {
  // console.log(data.docs)
  const quesLists = [];
  data.docs.forEach((doc) => {
    quesLists.push({ ...doc.data(), id: doc.id });
  });
  let gamePin = document.getElementById("pinInput");
  let submitBtn = document.getElementById("submitBtn");

  submitBtn.onclick = (e) => {
    e.preventDefault();

    const searchQues = quesLists.find((item) => {
      return gamePin.value == item.pin;
    });
  };
});

// const snap = await getDoc(doc(db, 'questions', 'LEVJIcvIoV1VKcaqTP6q'))
