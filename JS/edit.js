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

const checkboxAnsElements = document.querySelectorAll(".checkbox");
const titleQuestionElement = document.querySelector("#title-lesson");
const quesListElement = document.querySelector("#ques-list");
const addQuesBtnElement = document.querySelector("#addQues");
const quesItemNameElement = document.querySelector("#quesName");
const ansRedElement = document.querySelector("#ans1");
const ansYellowElement = document.querySelector("#ans2");
const ansBlueElement = document.querySelector("#ans3");
const ansGreenElement = document.querySelector("#ans4");

const initialQuestion = {
  answers: [
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
    { answer: "", isCorrect: false },
  ],
  name: "",
  points: "Standard",
  time: 15,
};

let quesListHTML = "";

// gán câu hỏi hiện tại mặc định là câu hỏi đầu tiên
let currentQuestionIndex = 0;

// Lấy ra question doc theo id đã lưu vào local storage
const questionDocRef = doc(
  db,
  "questions",
  localStorage?.getItem("detailQuestionID")
);

const snapDoc = await getDoc(questionDocRef);

const dataDetail = snapDoc.data();

titleQuestionElement.value = dataDetail?.title;

// sự kiện thay đổi tên câu hỏi
quesItemNameElement.oninput = (e) => {
  dataDetail.ques[currentQuestionIndex].name = e.target.value;
};

// Sự kiện click khi bấm vào nút add question
addQuesBtnElement.onclick = () => {
  // đẩy dữ liệu khởi tạo vào mảng ques
  dataDetail.ques.push(initialQuestion);

  //   gán câu hỏi hiện tại thành câu hỏi mới nhất đã tạo
  currentQuestionIndex = dataDetail.ques.length - 1;

  renderCurrentQuestion();
};

// hiển thị ra giao diện đúng với dữ liệu của câu hỏi hiện tại
const renderCurrentQuestion = () => {
  quesListHTML = "";
  const data = dataDetail?.ques[currentQuestionIndex];
  console.log(data);
  quesItemNameElement.value = data.name;
  ansRedElement.value = data.answers[0].answer;
  ansYellowElement.value = data.answers[1].answer;
  ansBlueElement.value = data.answers[2].answer;
  ansGreenElement.value = data.answers[3].answer;

  // render phần số lượng câu hỏi bên trái
  dataDetail?.ques?.forEach((item, index) => {
    quesListHTML += `
          <div class="create-left-ques" style="cursor: pointer">
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

  const quesItemElements = document.querySelectorAll(".create-left-ques");

  //   sự kiện click vào thì gán currentQuestion thành item vừa click
  quesItemElements.forEach((item, index) => {
    item.onclick = () => {
      currentQuestionIndex = index;
      renderCurrentQuestion();
    };
  });

  //   gán phần tick câu hỏi đúng
  data?.answers?.forEach((item, idx) => {
    if (item.isCorrect) {
      checkboxAnsElements[idx].classList.add("active");
    } else {
      checkboxAnsElements[idx].classList.remove("active");
    }
  });
};

renderCurrentQuestion();
