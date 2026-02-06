const colorNames = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Purple",
  "Cyan",
  "Magenta",
  "Orange",
  "Pink",
  "Brown",
  "Lime",
  "Olive",
  "Teal",
  "Navy",
  "Maroon",
  "Silver"
];

let winingScore = 3;
let targetColor = "";
let score = 0;
let timer = 120;
let gameTimeInterval, gameColorInterval;

let setRandomColor = ()=> {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell)=> {
    const randomColorIndex = Math.floor(Math.random()*colorNames.length);
    const randomColor = colorNames[randomColorIndex];
    cell.style.backgroundColor = randomColor;
    cell.setAttribute('data-color', randomColor);
  })
}

let setTargetColor =()=> {
  const randomColorIndex = Math.floor(Math.random()*colorNames.length);
  targetColor = colorNames[randomColorIndex];
  document.querySelector('#targetColor').textContent = targetColor;
}

let formateTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

let updateTimer = () => {
  timer--;
  document.getElementById("timer").textContent = formateTime(timer);

  if(timer <=0){
    endGame(false);
  }
};

let initializeGame = ()=> {
  score=0;
  timer=120;
  document.querySelector('#score').textContent = score;
  document.querySelector('#timer').textContent = formateTime(timer);
  document.querySelector('#congratsOverlay').style.display = 'none';
  document.querySelector('#loseOverlay').style.display = 'none';

  setRandomColor();
  setTargetColor();
  document.querySelector('#backgroundMusic').play();

  gameColorInterval = setInterval(() => {
    setRandomColor()
  }, 1250);
  
  gameTimeInterval = setInterval(() => {
    updateTimer()
  }, 1250);
}

let endGame = (isWinner)=> {
  clearInterval(gameColorInterval)
  clearInterval(gameTimeInterval)
  document.querySelector('#backgroundMusic').pause();

  const overlay = (isWinner) ? document.querySelector('#congratsOverlay') : document.querySelector('#loseOverlay');

  overlay.style.display = 'block';
  if(isWinner){
    document.querySelector('#winMusic').play();
  }else{
    document.querySelector('#loseMusic').play();
  }
}


const handleColorClick = (e)=> {
  const colorClick = e.target.getAttribute('data-color');
  if(colorClick === targetColor){
    score++;
    document.querySelector('#score').textContent = score;

    if(score === winingScore){
      endGame(true);
    }
    setRandomColor();
    setTargetColor();
    document.querySelector('#correctMusic').play();
    
  }else{
    document.querySelector('#incorrectMusic').play();
  }
}

const cells = document.querySelectorAll('.cell');
cells.forEach((cell)=> {
  cell.addEventListener('click', handleColorClick);
})

const winRestartBtn = document.querySelector('#restartGameOverlay');
winRestartBtn.addEventListener('click', initializeGame);
const loseRestartBtn = document.querySelector('#restartGameOverlayLose');
loseRestartBtn.addEventListener('click', initializeGame);

initializeGame();