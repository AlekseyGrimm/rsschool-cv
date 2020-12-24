const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const level1 = document.querySelector(".easy");
const level2 = document.querySelector(".medium");
const level3 = document.querySelector(".hard");
const record = document.querySelector(".record");
let lastHole;
let timeUp = false;
let score = 0;
let rec = localStorage.getItem("totalScore");;


function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};

function randomHole(holes) {
    let idx = Math.floor(Math.random() * holes.length);
    let hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
};

function peep(a, b) {
    let time = randomTime(a, b);
    const hole = randomHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
      hole.classList.remove("up");
      if (!timeUp) peep(a, b);
    }, time);
  };


// writes the score
function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
    if (score > rec) { 
        rec = score;
        record.textContent = rec;// rec ++
        localStorage.setItem("totalScore", rec);
    };
};

function startGame(a, b) {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep(a, b);
    setTimeout(() => (timeUp = true), 10000);
};

function startLevel1() {
    startGame(700, 1000);
};
  
function startLevel2() {
    startGame(400, 700);
};
  
function startLevel3() {
    startGame(100, 400);
};

moles.forEach(mole => mole.addEventListener("click", bonk));

level1.addEventListener("click", startLevel1);
level2.addEventListener("click", startLevel2);
level3.addEventListener("click", startLevel3);