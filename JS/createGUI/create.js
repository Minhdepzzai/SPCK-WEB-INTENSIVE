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

let ansRed = document.getElementById("ans1")
let ansGreen = document.getElementById("ans4")
let ansBlue = document.getElementById("ans2")
let ansYellow = document.getElementById("ans3")


let pinPriv = '111111';
saveBtn.onclick = () => {
    addDoc(collectionRef,{
        pin:  pinPriv,
        title:String(titleLesson.value),
        ques: [
            {
                answers: [
                    {
                        answer: String(ansRed),
                        isCorrect: true
                    },
                    {
                        answer: String(ansBlue),
                        isCorrect: true
                    },
                    {
                        answer:String(ansYellow),
                        isCorrect:true
                    },
                    {
                        answer:String(ansGreen),
                        isCorrect:true
                    }
                ],
                name:String(nameQues.value),
                points:100,
                time:15
          }
        ]
    })
    // console.log(String(nameQues.value))
}



