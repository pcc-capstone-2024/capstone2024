class Buzz{   
    constructor(x, y, a, b) {
        // figure out empty vectors
        // figure out velocity it's really fucky the way you wrote it
        this.pBest = createVector(a, b)
        this.loc = createVector(x, y);
        
        // this.x = x;
        // this.y = y;
        this.velocity = createVector(random(0.0, 3.0), random(0.0, 3.0));
        this.maxVelocity = 5.0;
        inertiaTerm = createVector();
        personalTerm = createVector();
        socialTerm = createVector();
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
        // this.loc.add(this.velocity);
        this.loc.x += this.velocity.x;
        this.loc.y += this.velocity.y;
    

        //update the canvas here! Repaint with the new pos!
        //Only the vars gets changed, no repainting is happenig in the loop far as I can see...
        // Copy the function that paints the first frame, paste here**** the update is looped in the draw() function. In p5 it does the repainting. I'm actually not sure how to adopt the animaiton function to the draw loop
        
    }   

    makeBuzz(){
        noStroke();
        fill(0, 100, 200);
        rect(this.loc.x, this.loc.y, 20, 20);
        console.log('locX', this.loc.x,'locY', this.loc.y);
                // console.log("makeBuzz running");
    }
  }
