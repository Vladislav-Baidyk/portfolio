 var blockSize = 30;
 var cols = 20;
 var rows = 20;
 var board;
 var context;


//snake place
 var snakeX = blockSize * 5;
 var snakeY = blockSize * 5;
 var snakeBody = [];


//food
var foodX  ;
var foodY ;


//
var trapX ;
var trapY;

//speed snake
var velocityX = 0;
var velocityY = 0;

var gameOver = false;

 window.onload = function(){
    if(gameOver){
        return;
    }
    board = document.getElementById("board");
    board.height = blockSize * rows;
    board.width = blockSize * cols;
    context = board.getContext("2d");

    randomFood();
    randomTrap();
    document.addEventListener("keyup" ,  changeDirection);
    setInterval(trap,2000);
    setInterval(update, 1000/10);
 }


    function update(){
        context.fillStyle= "black";
        context.fillRect(0 , 0 ,board.width ,board.height);
        
        context.fillStyle= "red";
        context.fillRect(foodX,foodY,blockSize,blockSize);

        if (snakeX == foodX && snakeY == foodY){
            snakeBody.push([foodX,foodY]);
            randomFood();
        }
            
        if(snakeX == trapX && snakeY == trapY){
            gameOver = true;
            alert("Game over");
        }



         for (let i = snakeBody.length-1; i > 0 ; i--){
            snakeBody[i] = snakeBody[i-1];
        }
        if(snakeBody.length){
            snakeBody[0]=[snakeX,snakeY];
        }
        context.fillStyle = "lime";

        snakeX += velocityX * blockSize;
        snakeY += velocityY * blockSize;
        context.fillRect(snakeX,snakeY,blockSize,blockSize);


        for(let i = 0; i < snakeBody.length;i++){
            context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
        }

       


        if(snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize){
            gameOver = true;
            alert("Game Over"); 
        }
        for( let i = 0; i < snakeBody.length;i++){
            if( snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
                gameOver = true;
                alert("Game Over");
            }   
        }
    }
function trap(){
    context.fillStyle="yellow";
        context.fillRect(trapX,trapY,blockSize,blockSize);
}
        function randomFood(){
    foodX = Math.floor(Math.random() *  cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

    function randomTrap(){
        trapX = Math.floor(Math.random() * cols) * blockSize;
        trapY = Math.floor(Math.random() * rows) * blockSize;
    }


    function changeDirection(e){
        if(e.code == "ArrowUp" && velocityY !=1){
            velocityX = 0;
            velocityY = -1;
        }
        else if(e.code == "ArrowDown" && velocityY !=-1){
            velocityX = 0;
            velocityY = 1;
        }
        else if(e.code == "ArrowLeft" && velocityX !=1){
            velocityX = -1;
            velocityY = 0;
        }
        else if(e.code == "ArrowRight" && velocityX !=-1){
            velocityX = 1;
            velocityY = 0;
        }

        }
    