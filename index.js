const cvs = document.getElementById("myCanvas");
const ctx = cvs.getContext("2d");

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;


const circle = {
    angle : Math.PI,
    angle2 : 3/2*Math.PI,
    velocity : Math.PI/80,
    index : 1,
    bgClr : "rgb(107, 172, 47)",
    round : 0,
    
    position : [
        {x : cvs.width/2, y : cvs.height/2 - 100, r : 30, c : "yellow"},
        {x : cvs.width/2, y :cvs.height/2, r : 150, c : "yellow"},
        {x : cvs.width/2, y : cvs.height/2 , r : 150, c : "green"}
    ],
    
    draw : function(){
        ctx.beginPath();
        ctx.fillStyle = this.bgClr;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.closePath();
        
        ctx.beginPath();
        ctx.fillStyle = this.position[0].c;
        ctx.arc(this.position[0].x, this.position[0].y, this.position[0].r, 0, 2*Math.PI);
        ctx.fill();
        ctx.closePath();
        
        ctx.strokeStyle = this.position[this.index].c;
        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.arc(this.position[this.index].x, this.position[this.index].y, this.position[this.index].r, 3/2*Math.PI, this.angle2);
        ctx.stroke();
        ctx.closePath();
    },
    update : function(){
        if(this.angle2 >= 3/2*Math.PI && this.round == 1){
            this.index = 2;
            this.position[0].c = "green";
        }
        if(this.angle2 >= 3/2*Math.PI && this.round == 2){
            this.index = 1;
            this.position[0].c = "yellow";
        }
        this.angle -= this.velocity;
        this.angle2 += this.velocity;
        
        if(this.angle2 >= 2*Math.PI){
            this.angle2 = 0;
            if(this.round == 0 || this.round == 2) this.round = 1;
            else if(this.round == 1) this.round = 2;
        }
        this.position[0].x = cvs.width/2 + this.position[this.index].r * Math.sin(this.angle);
        this.position[0].y = cvs.height/2 + this.position[this.index].r * Math.cos(this.angle);
            
    }
}

function main(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    circle.update();
    circle.draw();
    requestAnimationFrame(main);
}
requestAnimationFrame(main);