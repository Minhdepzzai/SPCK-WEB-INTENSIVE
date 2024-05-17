import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
import { showErrorToast, showSuccessToast } from "./createGUI/toast.js";
import { db } from "./firebase.js";

const checkboxAnsElements = document.querySelectorAll(".checkbox");
const titleQuestionElement = document.querySelector("#title-lesson");
const quesListElement = document.querySelector("#ques-list");
const addQuesBtnElement = document.querySelector("#addQues");
const quesItemNameElement = document.querySelector("#quesName");
const ansRedElement = document.querySelector("#ans1");
const ansYellowElement = document.querySelector("#ans2");
const ansBlueElement = document.querySelector("#ans3");
const ansGreenElement = document.querySelector("#ans4");
const saveBtnElement = document.querySelector("#saveBtn");

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

// Lấy ra chi tiết câu hỏi
const snapDoc = await getDoc(questionDocRef);
const dataDetail = snapDoc.data();

// Gán tên câu hỏi dựa vào chi tiết câu hỏi vừa lấy
titleQuestionElement.value = dataDetail?.title;

// sự kiện thay đổi tên câu hỏi
quesItemNameElement.oninput = (e) => {
  dataDetail.ques[currentQuestionIndex].name = e.target.value;
  renderCurrentQuestion();
};

// sự kiện thay đổi câu trả lời đỏ
ansRedElement.oninput = (e) => {
  dataDetail.ques[currentQuestionIndex].answers[0].answer = e.target.value;
};

// sự kiện thay đổi câu trả lời vàng
ansYellowElement.oninput = (e) => {
  dataDetail.ques[currentQuestionIndex].answers[1].answer = e.target.value;
};

// sự kiện thay đổi câu trả lời xanh lá
ansGreenElement.oninput = (e) => {
  dataDetail.ques[currentQuestionIndex].answers[3].answer = e.target.value;
};

// sự kiện thay đổi câu trả lời xanh dương
ansBlueElement.oninput = (e) => {
  dataDetail.ques[currentQuestionIndex].answers[2].answer = e.target.value;
};

// Sự kiện khi ấn vào nút Save
saveBtnElement.onclick = async () => {
  await updateDoc(questionDocRef, dataDetail);
  showSuccessToast("Edit successfully");
};

// Sự kiện click khi bấm vào nút add question
addQuesBtnElement.onclick = () => {
  // đẩy dữ liệu khởi tạo vào mảng ques
  dataDetail.ques.push({
    answers: [
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
      { answer: "", isCorrect: false },
    ],
    name: "",
    points: "Standard",
    time: 15,
  });

  currentQuestionIndex = dataDetail.ques.length - 1;

  //   gán câu hỏi hiện tại thành câu hỏi mới nhất đã tạo

  renderCurrentQuestion();
};

// hiển thị ra giao diện đúng với dữ liệu của câu hỏi hiện tại
const renderCurrentQuestion = () => {
  try {
    quesListHTML = "";
    const data = dataDetail?.ques[currentQuestionIndex];
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
                      <h6>${item.name}</h6>
                  </div>
              </div>
              <div class="create-left-ques-right">
                  <i class="fa-solid fa-x"></i>
              </div>
          </div>
      `;
    });

    quesListElement.innerHTML = quesListHTML;

    const quesItemElements = document.querySelectorAll(
      ".create-left-ques-left"
    );
    const removeQuesItemElements = document.querySelectorAll(
      ".create-left-ques-right"
    );

    //   sự kiện click vào các nút xóa question
    removeQuesItemElements.forEach((item, index) => {
      item.onclick = () => {
        if (dataDetail.ques.length == 1) {
          showErrorToast("Game has at least one question!");
        } else {
          currentQuestionIndex = index;
          dataDetail.ques.splice(index, 1);

          // Gán lại current question là question trước đó
          currentQuestionIndex = index === 0 ? 0 : index - 1;
          renderCurrentQuestion();
        }
      };
    });

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
  } catch (error) {}
};

renderCurrentQuestion();
