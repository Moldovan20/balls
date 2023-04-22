const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ball = document.getElementById("ball");
let numberOfParticles = 10;
const particlesArray = [];

class Particle {
    constructor(image){
        this.radius = 50;
        this.x = Math.random() * canvas.width-this.radius;
        this.y = Math.random() * canvas.height-this.radius*2;
        this.velocity = {
            x: 0,
            y:7.81
        }
        
        this.image = image;
        this.width = 100;
        this.height = 100;
        this.angle = 0;
    }

    onGround() {
        return this.y + this.radius >= canvas.height;
    }

    onTop() {
        return this.y <= 0;
    }
    onLeft() {
        return this.x <= 0;
    }
    onRight() {
        return this.x + this.radius >= canvas.width;
    }

    draw(){
        
        ctx.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height );
        

    }
    update(){

        if(this.x < 0)this.x = Math.abs(this.x);
        if(this.y < 0)this.y = Math.abs(this.y);
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        
        
        this.angle += Math.random();
        
        if (this.onLeft() || this.onRight()){
            this.velocity.x *= -1;
        }
       
        if(this.onTop())this.velocity.y *= -1;

        if(this.onGround()){
            
            this.velocity.x += Math.sin(this.angle);
            this.velocity.y += Math.cos(this.angle);
            this.velocity.y *= -1;
           
        }
        
        this.draw();
    }
}

function init(){
    for (let i = 0; i < numberOfParticles; i++){
        particlesArray.push(new Particle(ball));
        
    }
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let k = 0; k < particlesArray.length; k++)
    {
        particlesArray[k].update();
    }
    requestAnimationFrame(animate);

}
init();
animate();
