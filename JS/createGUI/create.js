import {db} from "../firebase.js"
import {collection, getDocs, addDoc, deleteDoc, doc, onSnapshot,} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
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


let pinPriv = '111111';
saveBtn.onclick = () => {
    addDoc(collectionRef,{
        pin:  pinPriv,
        title:String(nameQues.value),
        ques: [
            {
                answers: [
                    {
                        answer: "Minh1",
                        isCorrect: true
                    },
                    {
                        answer: "Minh2",
                        isCorrect: true
                    },
                    {
                        answer:"Minh3",
                        isCorrect:true
                    },
                    {
                        answer:"Minh4",
                        isCorrect:true
                    }
                ],
                name:"cau hoi la gi",
                points:100,
                time:15
          }
        ]
    })
    // console.log(String(nameQues.value))
}


// Get the div elements

