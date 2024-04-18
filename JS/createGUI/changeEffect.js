let btnQuiz = document.getElementById("btn-quiz");
let btnTOF = document.getElementById("btn-tof");
let currentQuesType = "quiz";
let boxQT = document.getElementsByClassName("box-quesType");
for (let i = 0; i < boxQT.length; i++) {
    boxQT[i].textContent = "Quiz";
}
btnQuiz.classList.add("dropdown-item-active");
btnQuiz.onclick = (e) => {
    e.preventDefault();
    currentQuesType = "quiz";
    console.log(1);
    console.log(currentQuesType);
    btnQuiz.classList.add("dropdown-item-active");
    btnTOF.classList.remove("dropdown-item-active");
    for (let i = 0; i < boxQT.length; i++) {
        boxQT[i].textContent = "Quiz";
    }
};

btnTOF.onclick = (e) => {
    e.preventDefault();
    console.log(2);
    currentQuesType = "tof";
    console.log(currentQuesType);
    btnTOF.classList.add("dropdown-item-active");
    btnQuiz.classList.remove("dropdown-item-active");
    for (let i = 0; i < boxQT.length; i++) {
        boxQT[i].textContent = "True or False";
    }
};
