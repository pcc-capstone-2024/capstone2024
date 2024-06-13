class Buzz {
    constructor(x, y, targetX, targetY, a, b, red, green, blue) {
        // 
        this.pBest = createVector(a, b);
        this.loc = createVector(x, y);
        this.velocity = createVector(random(-10.0, 10.0), random(-10.0, 10.0));
        this.maxVelocity = 10.0;
        // this.pos = createVector(x, y);
        this.dif = createVector(0, 0);
        this.target = createVector(targetX, targetY);
        this.sizeX = 6;
        this.sizeY = 6;
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.CLAMP_VAL = 150; // adjust this to adjust the reactivity of the followers
        this.MAX_SPEED = 10; // what it says on the tin
    }
    update2() { // this is all a whole bunch of math, just. trust me on it. but hell if you can optimize it, please do and let me know how
       
        this.dif = this.target.sub(this.loc);
        this.dif.mult(0.001);
        this.vel = p5.Vector.add(this.dif, this.vel);
        this.vel.limit(this.MAX_SPEED);
        this.vel.add((2 * this.vel/this.CLAMP_VAL) + (1/this.CLAMP_VAL));
        this.loc.add(this.vel);
      }
      
    update1(globalBest, inertia, c1, c2, r1, r2) {
        let inertiaTerm = p5.Vector.mult(this.velocity, inertia);
        let personalTerm = p5.Vector.sub(this.pBest, this.loc).mult(c1).mult(r1);
        let socialTerm = p5.Vector.sub(globalBest, this.loc).mult(c2).mult(r2);
  
        this.velocity = p5.Vector.add(inertiaTerm, personalTerm).add(socialTerm);
        this.velocity.limit(this.maxVelocity);
  
        this.loc.add(this.velocity);
  
        // Boundary checks
        this.loc.x = constrain(this.loc.x, 0, width - this.sizeX);
        this.loc.y = constrain(this.loc.y, 0, height - this.sizeY);
    }
  
    makeBuzz() {
        noStroke();
        fill(this.red, this.green, this.blue);
        rect(this.loc.x, this.loc.y, this.sizeX, this.sizeY);
    }
  }
class Swarm{
    constructor(personal, social, inertia, r1, r2, buzzezMany){
        this.buzzRed = [0, 100, 175, 225, 255];
        this.buzzGr = [0, 255, 50, 0, 100];
        this.buzzBl = [255, 0, 255, 125, 0];
        this.buzzezMany = buzzezMany;
        this.buzzez = [];
        this.inertia = 0.5;
        this.globalBest; 
        this.c1 = personal;
        this.c2 = social;
        this.r1 = r1;
        this.r2 = r2;
        this.inertia = inertia;
        this.currentDistance;
        this.headX = 0;
        this.headY = 0;
        this.timeStamp = 0;

        for(let i = 0; i < this.buzzezMany; i++){
            let randCol = int(random(5));
            this.randX = random(0, width);
            this.randY = random(0, height);
            this.randA = this.randX - random(3, 20);
            this.randB = this.randY - random(3, 20);
            this.buzzez[i] = new Buzz(this.randX, this.randY, this.randA, this.randB, this.buzzRed[randCol], this.buzzGr[randCol], this.buzzBl[randCol]);
            } 
        this.globalBest = createVector(this.buzzez[0].loc.x, this.buzzez[0].loc.y);

    }

    updateParticles1() {
        // push();
            translate(this.headX, this.headY);
            for (let i = 0; i < this.buzzezMany; i++) {
                this.buzzez[i].update1(this.globalBest, this.inertia, this.c1, this.c2, this.r1, this.r2);
            }
            this.updateGlobalBest();
        // pop();
    }
    updateParticles2(targetX, targetY){ 
        // push();
            translate(this.headX, this.headY);
            for(let i = 0; i < this.buzzezMany; i++){
                this.buzzez[i].update2(targetX, targetY);
            }
            // this.updateGlobalBest();
            console.log(targetX, targetY)
        // pop();
    }

    drawParticles() {
        for (let i = 0; i < this.buzzezMany; i++) {
            this.buzzez[i].makeBuzz();
        }
    }

    updateGlobalBest() {
        let objective = createVector(this.headX, this.headY);
        for (let i = 0; i < this.buzzezMany; i++) {
            this.currentDistance = dist(this.buzzez[i].loc.x, this.buzzez[i].loc.y, this.headX, this.headY);
            this.gBestDistance = dist(this.globalBest.x, this.globalBest.y, this.headX, this.headY);
            if (this.currentDistance < this.gBestDistance) {
                this.globalBest = createVector(this.buzzez[i].loc.x, this.buzzez[i].loc.y);
            }            
        }
        // console.log(objective.x + objective.y);
  }
}
  