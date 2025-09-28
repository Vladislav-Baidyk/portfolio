let context;
let boardHeight = 600;
let boardWidth = 1200;
let board;

let SpaceShipImg;
let SpaceShipHeight = 128;
let SpaceShipWidth = 128;
let SpaceShipX = boardWidth/10;
let SpaceShipY = 250;
let velocityPlayer = 0;

let velocityEnemy = -2;
let enemyArray = [];

let enemyImg;
let enemyHeight = 64;
let enemyWidth = 64;

let EnemyBulletArray = [];

let score = 0;
let gameOver = false;

let bulletImg;
let bulletWidthPlayer = 128;
let bulletHeightPlayer = 128;

let bulletArray = [];
let bulletVelocityX = 10;

let  enemyBulletVelocityX = -5;
let gameOverImg;

let player = {
    x:SpaceShipX,
    y:SpaceShipY,
    width:SpaceShipWidth,
    height:SpaceShipHeight
}

window.onload = function(){
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");


    SpaceShipImg = new Image();
    SpaceShipImg.src = "./pics/ship3.png";
    SpaceShipImg.onload = function(){
        context.drawImage(SpaceShipImg,player.x,player.y,player.width,player.height);
    }
    enemyImg = new Image();
    enemyImg.src = "./pics/ship1.png";
    
    bulletImg = new Image();
    bulletImg.src = "./pics/shot5_5.png";

    gameOverImg = new Image();
    gameOverImg.src = "./pics/Daco_2008543.png";

    requestAnimationFrame(update);
    setInterval(placeEnemyShip , 1500);
    setInterval(EnemyShoot,1000);
    document.addEventListener("keydown" , moveShip);
    document.addEventListener("keyup", shoot);
}

function EnemyShoot(){
    if (enemyArray.length === 0) return;
    for (let i = 0; i < enemyArray.length; i++) {
        let enemy = enemyArray[i];        
        if (Math.random() < 0.9) {
            let enemyBullet = {
                x: enemy.x, 
                y: enemy.y + enemy.height/2 - 10, 
                width: 40, 
                height: 20,
                used: false
            };
            EnemyBulletArray.push(enemyBullet);
        }
    }
}

function update(){
      if(gameOver){
       context.clearRect(0, 0, boardWidth, boardHeight);
        context.drawImage(gameOverImg, boardWidth/2 - 150, boardHeight/2 - 150, 300, 300);
       return;
    }
    context.clearRect(0,0,boardWidth,boardHeight);
    requestAnimationFrame(update);
  
    //speed 
    player.y += velocityPlayer  ;
    if(player.y < boardHeight - boardHeight ){
        player.y = 0;
        velocityPlayer = 0;
    }
    else if(player.y > boardHeight - player.height){
        player.y = boardHeight - player.height;
        velocityPlayer = 0;
    }
    //enemy bullet
for (let i = EnemyBulletArray.length - 1; i >= 0; i--) {
        let enemyBullet = EnemyBulletArray[i];
        enemyBullet.x += enemyBulletVelocityX;
        context.fillStyle = "red";
        context.fillRect(enemyBullet.x, enemyBullet.y, enemyBullet.width, enemyBullet.height);
        
        if(enemyBullet.x < 0){
            bulletArray.splice(i,1);
            continue;
        }
        if(collision(player,enemyBullet)){
            gameOver = true;
            break;
        }
    }

    //enemies

    for(let i  = 0; i < enemyArray.length; i++){
        let enemy = enemyArray[i];
        enemy.x += velocityEnemy;
        context.drawImage(enemy.img,enemy.x,enemy.y,enemy.width,enemy.height)
         if(collision(enemy,player)){
            gameOver = true;
   }
    }
    //player drawing
    context.drawImage(SpaceShipImg,player.x,player.y,player.width,player.height);

   for(let i = 0; i < bulletArray.length;i++){
    let bullet = bulletArray[i];
    bullet.x += bulletVelocityX;
    context.drawImage(bulletImg,bullet.x,bullet.y,bullet.width,bullet.height);
    
     if(bullet.x > boardWidth){
            bulletArray.splice(i, 1);
            continue;
        }
   
  for(let j = enemyArray.length - 1; j >= 0; j--){
            let enemy = enemyArray[j];
            if(collision(bullet, enemy)){
                bulletArray.splice(i, 1);
                enemyArray.splice(j, 1);
                score += 10;
                break;
            }
        }
    }
        context.fillStyle = "white";
        context.font = "20px courier";
        context.fillText(score,5,20);
    }
 
  
  

function moveShip(e){
    if(e.code == "ArrowUp" || e.code == "KeyW"){
        velocityPlayer +=-3;
    }
    else if(e.code == "ArrowDown" || e.code == "KeyS"){
        velocityPlayer += 3;
    }
}
function placeEnemyShip(){

    let enemyY = Math.random()*(boardHeight-enemyHeight);
    let enemy = {
        img:enemyImg,
        x:boardWidth,
        y:enemyY,
        height:enemyHeight,
        width:enemyWidth,
        destroyed:false
    }
    enemyArray.push(enemy);

    if(enemyArray.length > 4){
        enemyArray.shift();
    }
}
function shoot(e){

    if(e.code == "Space"){
        let bullet = {
            img:bulletImg,
            x:player.x + player.width,
            y:player.y + player.height/2 - bulletHeightPlayer/2,
            width:bulletWidthPlayer,
            height:bulletHeightPlayer,
            used:false
        }
        bulletArray.push(bullet);
    }
}
function collision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}