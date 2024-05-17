import {
  deleteDoc,
  doc,
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";

import { showErrorToast, showSuccessToast } from "./createGUI/toast.js";

import { db, auth } from "./firebase.js";

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
      <div class="btn btn-info mt-3 edit-btn" style="width: 100%">Chỉnh sửa</div>
      <div class="btn btn-danger mt-3 delete-btn" style="width: 100%">Xóa</div>
    </div>
    `;
  });

  // Gán chuỗi HTML và question list
  quesListElement.innerHTML = questListHTML;

  const editBtnList = document.querySelectorAll(".edit-btn");
  const deleteBtnList = document.querySelectorAll(".delete-btn");

  // Thêm sự kiện click vào các nút xóa
  deleteBtnList?.forEach(
    (item, index) =>
      (item.onclick = async (e) => {
        const currentUser =
          localStorage.getItem("currentUser") === "null"
            ? null
            : localStorage.getItem("currentUser");

        if (currentUser) {
          const docRef = doc(db, "questions", quesLists[index].id);
          await deleteDoc(docRef);
          showSuccessToast("Delete sucessfully");
        } else {
          showErrorToast("Login permission!");
        }
      })
  );

  // Thêm sự kiện click vào khi các nút chỉnh sửa
  editBtnList?.forEach(
    (item, index) =>
      (item.onclick = (e) => {
        const currentUser =
          localStorage.getItem("currentUser") === "null"
            ? null
            : localStorage.getItem("currentUser");

        if (currentUser) {
          localStorage.setItem("detailQuestionID", quesLists[index]?.id);
          window.location.href = "/EditGUI/edit.html";
        } else {
          showErrorToast("Login permission!");
        }
      })
  );
});
