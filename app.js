let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container ");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, playerO
let count = 0;  //to track draw

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6], 
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked"); //optional
        if (turn0) {  //playerO
            box.innerText = "O";
            turn0 = false;
        } else {   //playerX
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true; //once you entered the value inside the box, you can't change it further 
        count++;
        
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});


const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {  //once the winner is announced , the game will be deactivated for that turn
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {  
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");  //now the congratulation statement will be shown on the top
    disableBoxes();
};


const checkWinner = () => {
    for(let pattern of winPatterns) {
    
        let pos1Val = boxes[pattern[0]].innerText;  //pos-> position
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner",pos1Val);  //optional
                showWinner(pos1Val);
            }
        }
    }
};



newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
