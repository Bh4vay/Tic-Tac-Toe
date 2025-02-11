const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [0,3,6],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameInfo.textContent = `Current Player - ${currentPlayer}`;
    gameGrid = ["","","","","","","","",""];
    // UI pr empty krna hai
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // remove green colour 
        // box.classList = `box box${index+1}`;
        box.classList.remove("win");
    })
    newGameBtn.classList.remove("active");
    
}
initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position)=>{
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){
            // check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            // or O
            else{
                answer = "O";
            }
            // disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents ="none";
            })

            // NOW WE KNOW WINNER
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // means we have a winner
    if (answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // when no winner/tie
    let fillCount = 0;
    gameGrid.forEach((box) =>{
        if(box !== ""){
            fillCount++;
        }
    });

    if(fillCount === 9 ){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

    
}




function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turns

        swapTurn();

        // see if wins
        checkGameOver();
    }
}


boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    })
})


newGameBtn.addEventListener("click",initGame);