import {db} from "./firebase.js"
import {collection, getDocs, addDoc, deleteDoc, doc, onSnapshot,} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
let nameQues = document.getElementById("quesName")
let saveBtn = document.querySelector("#saveBtn")
const collectionRef = collection(db, "questions")
onSnapshot(collectionRef, (data) =>{
    // console.log(data.docs)
    const quesLists = [];
    data.docs.forEach((doc) => {
        console.log(doc.data())
        quesLists.push({...doc.data(), id: doc.id})
        console.log(doc.data().id)
    });
})
// let ans1 = document.getElementById("ans1")
// let ans2 = document.getElementById("ans2")
// let ans3 = document.getElementById("ans3")
// let ans4 = document.getElementById("ans4")

// let pinPriv = '111111';
// saveBtn.onclick = () => {
//     console.log(ans1.value)
//     console.log(nameQues.value)
//     addDoc(collectionRef,{
//         pin:  pinPriv,
//         title:String(nameQues.value),
//         ques: [
//             {
//                 answers: [
//                     {
//                         answer: String(ans1.value),
//                         isCorrect: true
//                     },
//                     {
//                         answer: String(ans2.value),
//                         isCorrect: true
//                     },
//                     {
//                         answer:String(ans3.value),
//                         isCorrect:true
//                     },
//                     {
//                         answer:String(ans4.value),
//                         isCorrect:true
//                     }
//                 ],
//                 name:"cau hoi la gi",
//                 points:100,
//                 time:15
//           }
//         ]
//     })
//     // console.log(String(nameQues.value))
// }

