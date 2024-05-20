class Buzz{   
    constructor(x, y, a, b, red, green, blue) {
        // figure out empty vectors
        // figure out velocity it's really fucky the way you wrote it
        this.pBest = createVector(a, b)
        this.loc = createVector(x, y);
        
        // this.x = x;
        // this.y = y;
        this.velocity = createVector(random(0.0, 3.0), random(0.0, 3.0));
        this.maxVelocity = 10.0;
        this.inertiaTerm = createVector();
        this.personalTerm = createVector();
        this.socialTerm = createVector();
        
        this.sizeX = random(15, 30);
        this.sizeY = random(15, 30);
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.vUp = createVector();
        // let tempVelocity = createVector(this.velocity.x, this.velocity.y);
        // this.globalBest = createVector(this.globalBestX, this.globalBestY);

    }
  
    update(globalBestX, globalBestY, inertia, c1, c2){  //nned to adjust the numbers squares disapear almost instantly.       
        globalBest = createVector(globalBestX, globalBestY);
        this.inertiaTerm = this.velocity.mult(inertia);
        this.personalTerm = this.pBest.sub(this.loc);
        this.personalTerm = this.personalTerm.mult(c1);
        this.socialTerm = globalBest.sub(this.loc);
        this.socialTerm = this.socialTerm.mult(c2)
        this.vUp = this.socialTerm.add(this.personalTerm); 
        // this.personalTerm.mult(c1); 
        this.velocity.x = min(this.maxVelocity, max(-this.maxVelocity, this.inertiaTerm.x+this.personalTerm.x+this.socialTerm.x));
        this.velocity.y = min(this.maxVelocity, max(-this.maxVelocity, this.inertiaTerm.y+this.personalTerm.y+this.socialTerm.y));
        // this.loc.add(this.velocity);
        this.loc.x += this.velocity.x;   
        this.loc.y += this.velocity.y;
        if (this.loc.x < 0) {
            this.loc.x = 0;

        }
        if (this.loc.x > width-this.sizeX) {  
            this.loc.x = width-this.sizeX;
        }
        if (this.loc.y > height - this.sizeY) {
            this.loc.y = height -this.sizeY;
        }
        if (this.loc.y < 0) {
            this.loc.y = 0;
        }
        //update the canvas here! Repaint with the new pos!
        //Only the vars gets changed, no repainting is happenig in the loop far as I can see...
        // Copy the function that paints the first frame, paste here**** the update is looped in the draw() function. In p5 it does the repainting. I'm actually not sure how to adopt the animaiton function to the draw loop
        
    }   

    makeBuzz(){
        noStroke();
        fill(this.red, this.green, this.blue);
        rect(this.loc.x, this.loc.y, this.sizeX, this.sizeY);
        //console.log('locX', this.loc.x,'locY', this.loc.y);
                // console.log("makeBuzz running");
    }
  }