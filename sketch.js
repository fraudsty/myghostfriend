let ghost;
let zombie;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;

function setup() {
  createCanvas(600, 500);
  spawnGhost();
  spawnZombie();
}
 

function draw() {
  background("#ee1717");
 

  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }

  let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }

  if (frameCount % spawnEvery === 0) spawnZombie();
  drawZombie(ghost.x, ghost.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);

  {
    
  if (frameCount % spawnEvery === 0) spawnGhost();
  if (frameCount % spawnEvery === 0) spawnZombie();
  drawGhost(ghost.x, ghost.y);
  drawZombie(zombie.x, zombie.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
  }
}

function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnZombie();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnZombie();
    spawnGhost();
  }
}
function spawnGhost() {
  ghost = { x: random(80, width - 80), y: random(80, height - 80) };
}
function spawnZombie() {
  zombie = { x: random(80, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke();
  fill(500, 255, 230);
  ellipse(x, y, 60, 60);
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
}

function drawZombie(x, y) {
  noStroke();

 
  fill(85, 138, 85); 
  ellipse(x, y, 60, 60); // Head
  rect(x - 15, y + 15, 30, 15); // Jaw
  

  fill(240, 230, 180); 
  ellipse(x - 12, y - 5, 14, 14);
  fill(20);
  ellipse(x - 12, y - 5, 4);
  

  fill(60, 80, 60); 
  ellipse(x + 12, y - 5, 10, 10);
  fill(255);
  ellipse(x + 12, y - 5, 3);
  
  
  fill(20);
  rect(x - 12, y + 12, 24, 10, 4);
  
  
  fill(240, 240, 210);
  rect(x - 8, y + 12, 4, 4);
  rect(x + 4, y + 12, 4, 4);
}