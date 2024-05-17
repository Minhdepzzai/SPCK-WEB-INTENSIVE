import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { db } from "./firebase.js";

const questionRef = collection(db, "questions");

const quesListElement = document.getElementById("ques-list");

onSnapshot(questionRef, (data) => {
  // console.log(data.docs)
  const quesLists = [];
  data.docs.forEach((doc) => {
    // console.log(doc.data())
    quesLists.push({ ...doc.data(), id: doc.id });
    // console.log(doc.data().id)
  });

  console.log(quesLists);

  let questListHTML = "";

  // Lặp qua Array queslists vừa lấy về ở firebase và tạo HTML cho câu hỏi
  quesLists?.forEach((item) => {
    questListHTML += `
    <div
      style="padding: 20px 50px"
      class="ques-item col-lg-2 col-md-3 col-sm-6"
    >
      <img src="../Image/ques-background.jpg" alt="" />
      <div class="ques-name">${item?.title || "-"}</div>
      <div class="ques-pin">PIN:
        <span style="font-weight: bold; letter-spacing: 3px; font-size: 20px; margin-left: 4px">${
          item?.pin || "-"
        }</span>
      </div>
      <div class="ques-quantity">${item?.ques?.length} câu hỏi</div>
    </div>
    `;
  });

  // Gán chuỗi HTML và question list
  quesListElement.innerHTML = questListHTML;

  const quesListItem = document.querySelectorAll(".ques-item");

  // Thêm sự kiện click vào từng câu hỏi
  quesListItem?.forEach(
    (item, index) =>
      (item.onclick = (e) => {
        console.log(quesLists[index]);
        localStorage.setItem("detailQuestionID", quesLists[index]?.id);
        window.location.href = "/SPCK-WEB-INTENSIVE/EditGUI/edit.html";
      })
  );
});
