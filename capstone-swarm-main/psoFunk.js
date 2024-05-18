class Buzz{   
    constructor(x, y) {
        // figure out empty vectors
        // figure out velocity it's really fucky the way you wrote it
        this.pBest = createVector(x, y);
        this.loc = createVector(x, y);
        // this.x = x;
        // this.y = y;
        this.velocity = createVector(random(0., 1.), random(0., 1.));
        this.maxVelocity = 5.0;
        this.inertiaTerm = createVector();
        this.personalTerm = createVector();
        this.socialTerm = createVector();
        // let tempVelocity = createVector(this.velocity.x, this.velocity.y);
        // this.globalBest = createVector(this.globalBestX, this.globalBestY);
    //    console.log("Personal: " + this.personalTerm + " Social: " + this.socialTerm + " Inertia: " + this.inertiaTerm);
    }
  
    update(globalBestX, globalBestY, inertia, c1, c2){  //nned to adjust the numbers squares disapear almost instantly.       
        globalBest = createVector(globalBest.x, globalBest.y);
        inertiaTerm = this.velocity.mult(inertia) 
        personalTerm = this.pBest.sub(this.loc);
        personalTerm = personalTerm.mult(c1);
        socialTerm = globalBest.sub(this.loc);
        socialTerm = socialTerm.mult(c2)
        // this.personalTerm.mult(c1); 
        this.velocity.x = min(this.maxVelocity, max(-this.maxVelocity, this.inertiaTerm.x+this.personalTerm.x+this.socialTerm.x));
        this.velocity.y = min(this.maxVelocity, max(-this.maxVelocity, this.inertiaTerm.y+this.personalTerm.y+this.socialTerm.y));
     this.loc.add(this.velocity);
     `  
        

        //update the canvas here! Repaint with the new pos!
        //Only the vars gets changed, no repainting is happenig in the loop far as I can see...
        //Copy the function that paints the first frame, paste here
    }   

    makeBuzz(){
        noStroke();
        fill(0, 100, 200);
        rect(this.loc.x, this.loc.y, 20, 20);
        console.log('locX', this.loc.x,'locY', this.loc.y);
                // console.log("makeBuzz running");
    }
  }
// difference between   this.globalBest = { x: this.particles[0].x, y: this.particles[0].y };
//& this.globalBest = createVector()????????
