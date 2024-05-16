class Buzz{   
    constructor(x, y) {
        // figure out empty vectors
        this.globalBest = createVector(0, 0); 
        this.pBest = createVector(x, y);
        this.x = x;
        this.y = y;
        this.personalTerm = createVector(random(this.pBest.x, this.x), random(this.pBest.y, this.y));
        this.socialTerm = createVector(random(this.globalBest.x, this.x), random(this.globalBest.y, this.y));
        this.inertiaTerm = createVector();
        this.velocity = createVector(random(0, 1), random(0, 1));
        this.maxVelocity = 5.0;
       // print("Personal: " + this.personalTerm + " Social: " + this.socialTerm + " Inertia: " + this.inertiaTerm);
    }
  
    update(globalBestX, globalBestY, inertia, c1, c2){  //nned to adjust the numbers squares disapear almost instantly.
        let tempVelocity = createVector(this.velocity);
        tempVelocity.mult(inertia);
        this.globalBest = createVector(globalBestX, globalBestY);
        this.inertiaTerm = tempVelocity;
        this.personalTerm = createVector(random(this.pBest.x, this.x), random(this.pBest.y, this.y));
        this.socialTerm = createVector(random(this.globalBest.x, this.x), random(this.globalBest.y, this.y));
        this.personalTerm.mult(c1); 
        this.socialTerm.mult(c2);
        this.velocity.x = min(this.maxVelocity, max(-this.maxVelocity, this.inertiaTerm.x+this.personalTerm.x+this.socialTerm.x));
        this.velocity.y = min(this.maxVelocity, max(-this.maxVelocity, this.inertiaTerm.y+this.personalTerm.y+this.socialTerm.y));
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }   

    makeBuzz(){
        noStroke();
        fill(0, 100, 200);
        rect(this.x, this.y, 20, 20);
        // console.log("makeBuzz running");
    }
  }
// difference between   this.globalBest = { x: this.particles[0].x, y: this.particles[0].y };
//& this.globalBest = createVector()????????
