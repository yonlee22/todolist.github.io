// 유저가 값을 입력한다 
// +버튼을 클릭하면 ,할일이 추가된다 
// delete 버튼을 누르면 할일이 삭제된다
// 두번째(객체의 활용)(3 lesson) 
// 1. check 버튼을 클릭하는 순간 true false
// 2. true 이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false 이면 안끝난걸로 간주하고 그대로 

// check button을 누르면 할일이 끝나면서 밑줄이 간다
// 진행중 끝남 탭을 누르면, 언더바가 이동한다 
// 끝난 탭은, 끝난 아이템만 (all done ), 진행중탭은 진행중인 아이템만(not done) 나온다 
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs= document.querySelectorAll(".task-tabs div");
let underLine=document.getElementById("tab-underline");
let taskList = [];
let mode="all";
let selectedMenu = "tab-all";
let filterList=[]
addButton.addEventListener("click",addTask);



for (let i=1; i<tabs.length;i++){
    tabs[i].addEventListener("click",function(event){filter(event);});
}

console.log(tabs);

function addTask() {
    let task= {
    id:randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
   };
   taskList.push(task);
   
  render();
}

function render() {
    let list=[]
    if (mode=="all"){
        list=taskList;
    }else if (mode=="ongoing"|| mode=="done"){
        list=filterList;
    }
    let resultHTML ="";
    for(let i = 0; i < list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML += `<div class="task">
          <div class="task-done">${list[i].taskContent}</div>
            <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        }else {
            resultHTML += `<div class="task">
                <div>${list[i].taskContent}</div>
                <div>
            <button onclick="toggleComplete('${list[i].id}')">Check</button>
            <button onclick="deleteTask('${list[i].id}')">Delete</button>
            </div>
            </div>`;
        }
        
    document.getElementById("task-board").innerHTML = resultHTML;
    }
}

function toggleComplete(id) {       //id값이 잘 넣어졌는지 확인 console.log("id:",id)'
    for(let i=0; i<taskList.length; i++) {
        if (taskList[i].id==id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }render ();
}


function deleteTask(id) {
    for (let i=0; i<taskList.length; i++) {
        if (taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }render();
    }
}
function filter(event) {
    mode = event.target.id;
    filterList=[];
    document.getElementById("under-line").style.width=
    event.target.offsetWidth +"px";
    document.getElementById("under-line").style.top =
    event.target.offsetTop +event.target.offsetHeight +"px";
    document.getElementById("under-line").style.left =
    event.target.offsetLeft +"px";
    if(mode == "all"){
        render();
    }else if (mode == "ongoing"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            } 
        }render();
    }else if (mode == "done"){
        for(let i=0; i<taskList.length;i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }render();
    }
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
    }
// 두번째 프로젝트 :할일 앱 만들기. 
// 좀더티엘한거 section  5 밑에 과제로 남겨주심 마저 끝내서웹사이트로 올리기. 

