let quesT = document.querySelectorAll("#dropdownbox-quesT .dropdown-item");
let boxquesT = document.getElementsByClassName("box-quesType");
let prevItemQuesT = null; 
let btnQuiz = document.getElementById("btn-quiz")
btnQuiz.classList.add("dropdown-item-active")
prevItemQuesT = btnQuiz
quesT.forEach((item) => {
    item.onclick = () => {
        boxquesT[0].textContent = item.textContent;
        item.classList.add("dropdown-item-active");
        if (prevItemQuesT  != item) {
            prevItemQuesT.classList.remove("dropdown-item-active");
        }
        prevItemQuesT = item;
        console.log(prevItemQuesT);
    };
});

let timeItems = document.querySelectorAll("#dropdownbox-time .dropdown-item");
let boxtime = document.getElementsByClassName("time");
let prevItemTime = null;
let timeFi = document.getElementById("timeFirst");

timeFi.classList.add("dropdown-item-active");
prevItemTime = timeFi;

timeItems.forEach((item) => {
    
    item.onclick = (e) => {
            prevItemTime.classList.remove("dropdown-item-active")
            boxtime[0].textContent = item.textContent;
            item.classList.add("dropdown-item-active");
            if (prevItemTime && prevItemTime !== item) {
                prevItemTime.classList.remove("dropdown-item-active");
            }
            prevItemTime = item;
            console.log(prevItemTime);
        
    };
});





let pointItems = document.querySelectorAll("#dropdown-point .dropdown-item");
let boxpoint = document.getElementsByClassName("point");
let prevItemPoint = null;
let pointFi = document.getElementById("pointFi");

pointFi.classList.add("dropdown-item-active");
prevItemPoint = pointFi;

pointItems.forEach((item) => {
    item.onclick = () => {
        boxpoint[0].textContent = item.textContent;
        item.classList.add("dropdown-item-active");
        if (prevItemPoint && prevItemPoint !== item) {
            prevItemPoint.classList.remove("dropdown-item-active");
        }
        prevItemPoint = item;
        console.log(prevItemPoint);
    };
});


let checkboxBtn = document.querySelectorAll(".create-middle-box-ans .checkbox");
let ans = null;
let prevItemCheckBox = checkboxBtn[0]; // Initialize prevItemCheckBox to the first item

// Attach click event listeners to each checkbox
checkboxBtn.forEach((item, index) => {
    item.onclick = () => {
        prevItemCheckBox.classList.remove("active"); // Remove active class from previous item
        item.classList.add("active"); // Add active class to the clicked item
        ans = index + 1;
        console.log(ans); // Log the selected answer
        prevItemCheckBox = item; // Update prevItemCheckBox to the clicked item
    };
});

