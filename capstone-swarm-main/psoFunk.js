class Buzz{   
    constructor(x, y, a, b, red, green, blue) {
        // figure out empty vectors
        // figure out velocity it's really fucky the way you wrote it
        this.pBest = createVector(a, b)
        this.loc = createVector(x, y);
        this.velocity = createVector(random(0.0, 2.0), random(0.0, 2.0));
        this.maxVelocity = 2.0;
        // this.inertiaTerm = createVector();
        // this.personalTerm = createVector();
        // this.socialTerm = createVector();
        
        this.sizeX = 15;
        this.sizeY = 15;
        this.red = red;
        this.green = green;
        this.blue = blue;
        
        // let tempVelocity = createVector(this.velocity.x, this.velocity.y);
        // this.globalBest = createVector(this.globalBestX, this.globalBestY);

    }
  
    update(globalBestX, globalBestY, inertia, c1, c2, r1, r2){  //nned to adjust the numbers squares disapear almost instantly.       
        var vUp;
        var inertiaTerm;
        var socialTerm;
        var personalTerm;
        globalBest = createVector(globalBestX, globalBestY);
        inertiaTerm = this.velocity.mult(inertia);
        personalTerm = this.pBest.sub(this.loc);
        personalTerm = personalTerm.mult(c1);
        personalTerm = personalTerm.mult(r1);
        socialTerm = globalBest.sub(this.loc);
        socialTerm = socialTerm.mult(c2)
        socialTerm = socialTerm.mult(r2);
        vUp = socialTerm.add(personalTerm); 
        vUp = vUp.add(inertiaTerm); 
        this.velocity.x = min(this.maxVelocity, max(-this.maxVelocity,  inertiaTerm.x+ personalTerm.x +  socialTerm.x));
        this.velocity.y = min(this.maxVelocity, max(-this.maxVelocity,  inertiaTerm.y + personalTerm.y  + socialTerm.y));
        // this.loc.add(this.velocity);
        this.loc.x += this.velocity.x;   
        this.loc.y += this.velocity.y;
        // if (this.loc.x < 0) {
        //     this.loc.x = 0;

        // }
        // if (this.loc.x > width-this.sizeX) {  
        //     this.loc.x = width-this.sizeX;
        // }
        // if (this.loc.y > height - this.sizeY) {
        //     this.loc.y = height -this.sizeY;
        // }
        // if (this.loc.y < 0) {
        //     this.loc.y = 0;
        // }
        //update the canvas here! Repaint with the new pos!
        //Only the vars gets changed, no repainting is happenig in the loop far as I can see...
        // Copy the function that paints the first frame, paste here**** the update is looped in the draw() function. In p5 it does the repainting. I'm actually not sure how to adopt the animaiton function to the draw loop
        console.log('social',socialTerm.x, socialTerm.y, 'personal:', personalTerm.x, personalTerm.y, 'inertiaTerm:', inertiaTerm);
    }   

    makeBuzz(){
        noStroke();
        fill(this.red, this.green, this.blue);
        rect(this.loc.x, this.loc.y, this.sizeX, this.sizeY);
        console.log('locX', this.loc.x,'locY', this.loc.y);
                // console.log("makeBuzz running");
    }
  }


  class Swormn{
    constructor(x, y, a, b, red, green, blue, buzzezMany){
        this.buzzez = [];
        this.inertia = 0.5; //inertia value between 0 and 1 (non inclusive)
        this.c1; //c1 and c2 value between 0 and 2
        this.c2;
        this.r1;
        this.r2;
        this.globalBest;
        this.objective;
        this.globalBest;
        this.swormnMany;
        this.buzzezMany = buzzezMany;
    }
    setupBuzzez(){
        for(let i; i < this.buzzezMany; i++){
            this.objective = new createVector(mouseX, mouseY);         
            this.buzzez[i] = new Buzz(x, y, a, b, red, green, blue);

        }
    this.globalBest = new createVector(this.buzzez[0].loc.x, this.buzzez[0].loc.y);
    console.log(this.buzzez[0].loc.x, this.buzzez[0].loc.x)
    }

    
    updateParticles() {

        for(let i = 0; i < this.buzzezMany; i++){
              this.buzzez[i].update(this.globalBest.x, this.globalBest.y, this.inertia, this.c1, this.c2, this.r1, this.r2);
              // console.log(globalBest.x, globalBest.y);
          }
      
        updateGlobalBest();
        // console.log("partieUPdie")
            // console.log(globalBest.x, globalBest.y);
      
      }

      drawParticles(){  
        for(let i = 0; i < this.buzzezMany; i++){
            this.buzzez[i].makeBuzz();
          }    
      }
      
      updateGlobalBest(){
        this.objective = createVector(mouseX, mouseY);
        let currentDistance;
        let gBestDistance;
        for(let i = 0; i < this.buzzezMany; i++){
          currentDistance = dist(this.objective.x, this.objective.y, this.buzzez[i].loc.x, this.buzzez[i].loc.y);
          gBestDistance = dist(this.objective.x, this.objective.y, this.globalBest.x, this.globalBest.y);
          if(currentDistance < gBestDistance){
            this.globalBest.x = this.buzzez[i].loc.x;
            this.globalBest.y = this.buzzez[i].loc.y;
          }
      
        }
        // console.log("globalberst");
      }
  //     updateObjective(){
  //         this.objective.x = mouseX;
  //         this.objective.y = mouseY;
  //         // console.log("objX =", objective.x,"objY =", objective.y);
  // }
}