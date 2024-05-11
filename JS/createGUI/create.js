import {db} from "../firebase.js"
import {collection, getDocs, addDoc, deleteDoc, doc, onSnapshot,} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
let titleLesson = document.getElementById("title-lesson")
let nameQues = document.getElementById("quesName")
let saveBtn = document.querySelector("#saveBtn")
const collectionRef = collection(db, "questions")
onSnapshot(collectionRef, (data) =>{
    // console.log(data.docs)
    const quesLists = [];
    data.docs.forEach((doc) => {
        // console.log(doc.data())
        quesLists.push({...doc.data(), id: doc.id})
        // console.log(doc.data().id)
    });
})


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
const dropdownItems = document.querySelectorAll("#dropdownbox-time .dropdown-item");

dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        // Extract the number of seconds from the text content
        const text = item.textContent.trim(); // Remove any leading or trailing spaces
        numberOfSeconds = parseInt(text.split(" ")[0]); // Extract the numeric part and convert it to an integer

        console.log(numberOfSeconds); // Output the number of seconds to the console
    });
});


let ansRed = document.getElementById("ans1")
let ansGreen = document.getElementById("ans4")
let ansBlue = document.getElementById("ans2")
let ansYellow = document.getElementById("ans3")


let pinPriv = '111111';
saveBtn.onclick = () => {
    let quesType = localStorage.getItem("quesType")
    console.log(ans)
    if(quesType === "quiz"){
        addDoc(collectionRef,{
            pin:  pinPriv,
            title:String(titleLesson.value),
            ques: [
                {
                    answers: [
                        {
                            answer: String(ansRed.value),
                            isCorrect: ans === 1
                        },
                        {
                            answer: String(ansBlue.value),
                            isCorrect: ans === 3
                        },
                        {
                            answer:String(ansYellow.value),
                            isCorrect:ans === 2
                        },
                        {
                            answer:String(ansGreen.value),
                            isCorrect:ans === 4
                        }
                    ],
                    name:String(nameQues.value),
                    points:100,
                    time:numberOfSeconds
              }
            ]
        })
        console.log(String(nameQues.value))    
    }
    else{
        addDoc(collectionRef,{
            pin:  pinPriv,
            title:String(titleLesson.value),
            ques: [
                {
                    answers: [
                        {
                            answer: String(ansRed.value),
                            isCorrect: ans === 1
                        },
                        {
                            answer: String(ansBlue.value),
                            isCorrect: ans === 3
                        },
                    ],
                    name:String(nameQues.value),
                    points:100,
                    time:numberOfSeconds
              }
            ]
        })
        console.log(String(nameQues.value))        
    }
    
}






