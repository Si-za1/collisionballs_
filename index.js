const canvas=document.getElementById('myCanvas');
const ctx= canvas.getContext("2d"); // it helps to get access to all the context property of canvas to be used in the 2d

const balls=[]; // for creating an array of different size of balls.

//start button 
const startButton = document.getElementById('startButton');
startButton.addEventListener('click', init);

//stop button 
const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", stopAnimation);


class SmallCircle{
    constructor(){
        this.x=canvas.width/2;
        this.y=canvas.height/2;
        this.size = Math.random()*20 + 1; // it will generate from 1 to 20
        this.speedX = Math.random()* 5 -2  // both plus and minus value for the circles to hover 
        this.speedY=Math.random()*5 -2

        // generate random colors and it store random RGB values between 0 and 255.
        this.red = Math.floor(Math.random() * 256);
        this.green = Math.floor(Math.random() * 256);
        this.blue = Math.floor(Math.random() * 256);
    }

    // the logic part 
    update(){
        //for the different speed
        this.x+=this.speedX;
        this.y+=this.speedY;

        //collision detection  right and left side

        if(this.x+ this.speedX >canvas.width - this.size || this.x + this.speedX < this.size){
                this.speedX =-this.speedX;
        }

        //collision detection for the up and down 

        if(this.y+ this.speedY >canvas.height - this.size || this.y + this.speedY < this.size){
            this.speedY =-this.speedY;
    }

    // if the collision will happen between the balls 

    for (let i = 0; i < balls.length; i++) {
        if (this === balls[i])
         continue; // Skip if checking with itself
    
        const dx = this.x - balls[i].x;
        const dy = this.y - balls[i].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // logic is: if distance between 2 balls are less, collision has occured
        if (distance < this.size + balls[i].size) {
            if (distance < this.size + balls[i].size) {
                // Collision occurred, adjust positions

                // to remove collision, change in the angle using tan 
                const angle = Math.atan2(dy, dx);
                // the cos angle calculates the x direction and the y for sin 
                const targetX = this.x + Math.cos(angle) * (this.size + balls[i].size);
                const targetY = this.y + Math.sin(angle) * (this.size + balls[i].size);

                //calculating the acceleration between the balls, acc factor 0.03
                const ax = (targetX - balls[i].x) * 0.1;
                const ay = (targetY - balls[i].y) * 0.1;
          
                // this will be subtracting the acceleration and generating new speed 
                this.speedX -= ax;
                this.speedY -= ay;
                balls[i].speedX += ax;
                balls[i].speedY += ay;
            }
        }
      }
    }

    // now for drawing the circle
    draw(){
        ctx.beginPath();
        ctx.fillStyle = `rgb(${this.red}, ${this.green}, ${this.blue})`; // for different color of balls
        ctx.arc(this.x, this.y, this.size, 0, Math.PI *2)  // x, y, radius, start degree 
        ctx.fill();
        ctx.closePath();
    }
}

// generating the number of balls 
function generate(numBalls){
    for (let i=0;i<numBalls;i++) 
    // 20 circles{}
    {
        balls.push(new SmallCircle());
    }
    updateBallCount();
}


generate(10); // the number of the ball

function updateBallCount() {
    const ballCountElement = document.getElementById('ballCount');
    ballCountElement.textContent = `Number of balls: ${balls.length}`;
  }

function removeBall() {
    balls.pop(); // Remove a ball from the balls array
    updateBallCount(); // Call the function after removing the ball
  }


function handle(numBalls){
    for (let i=0; i<numBalls;i++){
        balls[i].draw();
        balls[i].update();
    }
}

// to generate small circle 
function init(){
    ctx.clearRect(0,0, canvas.width, canvas.height)
    handle(balls.length);
    animationId = requestAnimationFrame(init);
 // it will run in the loop 
}

function stopAnimation() {
    cancelAnimationFrame(animationId);
  }



init(); // starts the whole thing 
