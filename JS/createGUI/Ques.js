
const addQues = () =>{
    const btnAddQues = document.getElementById("addQues")
    let cntQues = 1
    const leftCol = document.getElementsByClassName("scroll-bar")[0]; 
    btnAddQues.onclick = () => {
        leftCol.insertAdjacentHTML('beforeend', `<div class="create-left-ques">
        <div class="create-left-ques-left">
        <i class="fas fa-square "></i>
        <h6 >Question ${cntQues}</h6>
        </div>
        <div class="create-left-ques-right">
        <i class="fa-solid fa-x"></i>
        </div>
        
        </div>`);
        cntQues++;
    }

    const createLeftQuesItems = document.querySelectorAll('.create-left-ques-item');

    createLeftQuesItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            console.log(index);
        });
    });
}
addQues();



