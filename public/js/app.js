let image = document.getElementById('image');
let title = document.getElementById("title");
let question = document.getElementById("question");
let mcq1 = document.getElementById("mcq1");
let mcq2 = document.getElementById("mcq2");
let mcq3 = document.getElementById("mcq3");
let mcq4 = document.getElementById("mcq4");

let graph_container = document.getElementById("graph-content");

console.log("data", data.length)
var index = -1;
setData()
function setData() {
       index++;
       document.getElementById("image").src = `./uploaded/${data[index].imgUrl}`;
       document.getElementById("title").innerText = data[index].title;
       document.getElementById("mcq-text1").innerText = data[index].answers[0].text;
       document.getElementById("mcq-text2").innerText = data[index].answers[1].text;
       document.getElementById("mcq-text3").innerText = data[index].answers[2].text;
       document.getElementById("mcq-text4").innerText = data[index].answers[3].text;
       document.getElementById("question").innerText = data[index].question;

}
addFirstGraphElement();

function addFirstGraphElement() {

       let graph_element = document.createElement('div');
       graph_element.classList.add("graph-item", "flex-row", "arrow-top");
       graph_element.innerHTML = `<span><div class="o-flow">${data[0].answers[0].text}</div></span>
       <span><div class="o-flow">${data[0].answers[1].text}</div></span>
       <span><div class="o-flow">${data[0].answers[2].text}</div></span>
       <span><div class="o-flow">${data[0].answers[3].text}</div></span> `;

       graph_container.appendChild(graph_element)

}
let graph_item = document.getElementsByClassName("graph-item");
function nextQuestion() {

       let clicked;
       if (document.getElementById('mcq1').checked) {
              clicked = document.getElementById('mcq1').value;
       } else if (document.getElementById('mcq2').checked) {
              clicked = document.getElementById('mcq2').value;
       } else if (document.getElementById('mcq3').checked) {
              clicked = document.getElementById('mcq3').value;
       } else if (document.getElementById('mcq4').checked) {
              clicked = document.getElementById('mcq4').value;
       }

       graph_item[index].children[clicked].classList.add("bg-red");


       let answerIndex = currectAnswer(index);
if(clicked == answerIndex){
       graph_item[index].children[answerIndex].classList.remove("bg-red");
       graph_item[index].children[answerIndex].classList.add("bg-green");
}else{
       graph_item[index].children[answerIndex].classList.add("bg-green");
}
      

       document.getElementById("mcq-submit").classList.toggle("display-none");
       document.getElementById("next-submit").classList.toggle("display-none");
       countScore()

}

document.getElementById("mcq-submit").addEventListener("click", nextQuestion)
document.getElementById("next-submit").addEventListener("click", () => {
       document.querySelectorAll('input[type=radio]').forEach(element => {
              element.checked = false;
       })

       if (graph_item.length < data.length) {
              setData();
              addGraphElement();
              document.getElementById("mcq-submit").classList.toggle("display-none");
              document.getElementById("next-submit").classList.toggle("display-none");
              arrowBelow();
       } else {
              alert("You Don't Any more questions!!")
       }


})

function addGraphElement() {

       let graph_element = document.createElement('div');
       graph_element.classList.add("graph-item", "flex-row");
       graph_element.innerHTML = `<span><div class="o-flow">${data[index].answers[0].text}</div></span>
       <span><div class="o-flow">${data[index].answers[1].text}</div></span>
       <span><div class="o-flow">${data[index].answers[2].text}</div></span>
       <span><div class="o-flow">${data[index].answers[3].text}</div></span> `;

       graph_container.appendChild(graph_element)
       graph_item = document.getElementsByClassName("graph-item");

}


function currectAnswer(index) {
       let ans;
       data[index].answers.forEach((element, i) => {
              if (element.correct) {
                     ans = i;
              }
       });
       return ans;
}


function arrowBelow() {
       let currentGraphItem = graph_item[graph_item.length - 2];

       let element = currentGraphItem.getElementsByClassName("bg-green")[0];
       let arrow = document.createElement("hr");
       arrow.classList.add("arrow-below")
       element.appendChild(arrow)


}


function reverse() {
       if (index > 0) {
              z = 0;
              removeArrowBelow();
              graph_container.removeChild(graph_item[graph_item.length - 1])
              index = index - 2;
              setData();
              document.getElementById("mcq-submit").classList.remove("display-none")
              document.getElementById("next-submit").classList.add("display-none");
              countScore()
       }

}

var y = 2;
function removeArrowBelow() {
       let previousItem = graph_item[graph_item.length - y].getElementsByTagName("span");
       for (var i = previousItem.length - 1; i >= 0; i--) {
              let hr = previousItem[i].getElementsByClassName("arrow-below")[0]
              if (previousItem[i].classList.contains("bg-green")) {
                     previousItem[i].removeChild(hr)
              }
              previousItem[i].classList.remove("bg-green", "bg-red")
       }

       graph_item = document.getElementsByClassName("graph-item")

}

function countScore() {
       let totalAnswered = document.getElementsByClassName("bg-green").length;
       let wrongAnswer = document.getElementsByClassName("bg-red").length;
       let totalMark = totalAnswered*5 - wrongAnswer*5 - wrongAnswer*3;
       document.getElementById("score").innerText = totalMark;
}