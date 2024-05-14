
// const changeQuesType = () =>{
//     let quesT = document.querySelectorAll("#dropdownbox-quesT .dropdown-item");
//     let boxquesT = document.getElementsByClassName("box-quesType");
//     let prevItemQuesT = null; 
//     let btnQuiz = document.getElementById("btn-quiz")
//     btnQuiz.classList.add("dropdown-item-active")
//     prevItemQuesT = btnQuiz
//     quesT.forEach((item) => {
//         item.onclick = () => {
//             boxquesT[0].textContent = item.textContent;
//             item.classList.add("dropdown-item-active");
//             if (prevItemQuesT  != item) {
//                 prevItemQuesT.classList.remove("dropdown-item-active");
//             }
//             prevItemQuesT = item;
//             console.log(prevItemQuesT);
//         };
//     });    
// }

const changeQuesType = () => {
    let quesT = document.querySelectorAll("#dropdownbox-quesT .dropdown-item");
    let boxquesT = document.querySelector(".box-quesType"); 
    let prevItemQuesT = null;
    let btnQuiz = document.getElementById("btn-quiz")
    btnQuiz.classList.add("dropdown-item-active")
    const handleItemClick = (item) => {
        boxquesT.textContent = item.textContent;
        item.classList.add("dropdown-item-active");
        if (prevItemQuesT && prevItemQuesT !== item) {
            prevItemQuesT.classList.remove("dropdown-item-active");
        }
        prevItemQuesT = item;
        console.log(prevItemQuesT.textContent);
    };
    quesT.forEach((item) => {
        item.addEventListener("click", () => {
            handleItemClick(item);
        });
    });
};
const changeTime = () => {
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
}

const changePoint = () =>{
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
}


function checkQuesTick(quesTick, cntTick) {
    if (!cntTick) {
        quesTick.forEach((item) => {
            item.classList.remove("fa-check-square");
            item.classList.add("fa-square");
            cntQuesTick = 0
        });
    } else {
        quesTick.forEach((item) => {
            item.classList.remove("fa-square");
            item.classList.add("fa-check-square");
            cntQuesTick = 1;
        });
    }
}

const changeTickQues = () =>{
    let quesTick = document.querySelectorAll(".quesTick");
    let tickIcon = document.getElementById("tickIconAll");
    let cntTick = 0;
    let cntQuesTick = 0

if (tickIcon) {
    tickIcon.addEventListener("mouseover", function() {
        tickIcon.classList.remove("fa-square");
        tickIcon.classList.add("fa-check-square");
    });

    tickIcon.addEventListener("mouseleave", function() {
        if (!cntTick) {
            tickIcon.classList.remove("fa-check-square");
            tickIcon.classList.add("fa-square");
        }
        else{
            tickIcon.classList.remove("fa-square");
            tickIcon.classList.add("fa-check-square");    
        }
    });
    tickIcon.addEventListener("click", function() {
        
        if(cntTick){
            quesTick = document.querySelectorAll(".quesTick");
            tickIcon.classList.remove("fa-check-square");
            tickIcon.classList.add("fa-square");
            cntTick = false;   
            checkQuesTick(quesTick,cntTick) 
            cntQuesTick = 0;
        }
        else{
            tickIcon.classList.remove("fa-square");
            tickIcon.classList.add("fa-check-square");   
            cntTick = true;    
            checkQuesTick(quesTick,cntTick) 
            cntQuesTick = 1;
        }
    });
}
}







const addQues = () =>{
    const btnAddQues = document.getElementById("addQues")
    let cntQues = 1
    const leftCol = document.getElementsByClassName("scroll-bar")[0]; 
    btnAddQues.onclick = () => {
        tickIcon = document.getElementById("tickIconAll");
        leftCol.insertAdjacentHTML('beforeend', `<div class="create-left-ques">
        <div class="create-left-ques-left">
        <i class="fas fa-square quesTick"></i>
        <div class = "create-ques-list">
        <h6 >Question ${cntQues}</h6>
        </div>
        </div>
        <div class="create-left-ques-right">
        <i class="fa-solid fa-x"></i>
        </div>
        </div>`);
        cntQues++;
        quesTick = document.querySelectorAll(".quesTick");
        tickIcon.classList.remove("fa-check-square");
            tickIcon.classList.add("fa-square");
            cntTick = false;   
        checkQuesTick(quesTick,0) 
        let quesList = document.querySelectorAll(".create-left-ques")
        console.log(quesList)
        // console.log(quesTick)
        
        quesTick.forEach((item,index) => {
            item.onclick = () =>{
                if(item.classList.contains("fa-check-square")){
                    item.classList.remove("fa-check-square")
                    item.classList.add("fa-square");
                }  
                else{
                    item.classList.remove("fa-square");
                    item.classList.add("fa-check-square")
                }
            }
        })
    }

    const createLeftQuesItems = document.querySelectorAll('.create-left-ques-item');

    createLeftQuesItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // console.log(index);
        });
    });
    
}


let quesTypeLocale = "quiz";
const changeUIBOXANS = () =>{
    let ansgreen = document.getElementById("green")
    let ansyellow = document.getElementById("yellow")
    let btnQuiz = document.getElementById("btn-quiz")
    let btnTof  = document.getElementById("btn-tof")
    btnTof.onclick = () =>{
        ansgreen.classList.add("displayNone")
        ansyellow.classList.add("displayNone")
        quesTypeLocale = "tof"
        localStorage.setItem("quesType", quesTypeLocale);
    }
    btnQuiz.onclick = () =>{
        ansgreen.classList.remove("displayNone")
        ansyellow.classList.remove("displayNone")    
        quesTypeLocale = "quiz"
        localStorage.setItem("quesType", quesTypeLocale);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    changeUIBOXANS();
    changeQuesType();
    updateQues();
    
    
});


const updateQues = () =>{
    console.log(1)
        quesList = document.querySelectorAll(".create-left-ques")
        console.log(quesList)
        quesList.forEach((item,index) =>{
            item.onclick = () =>{
                console.log(item)
            }
        })
    
}
// changeQuesType();

addQues();
changeTime();
changeTickQues();
changePoint();
