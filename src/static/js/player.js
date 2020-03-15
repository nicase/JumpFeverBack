class Player{

    constructor(x, y, id) {

        if (id) this.id = id;
        
        this.w = 25;
        this.h = 25;
        this.anim = 0
        this.animY = 0

        this.posX = x;
        this.posY = y;
        
        let canv = new drawTool("mycanvas")
        this.offset =  - this.h/2 + canv.height - 20;
        this.offset2 = this.h/2;
        this.velX = 0.0;
        this.velY = 0.0;

        // ultima platform amb la q hem xocat
        this.platformCollision;

        //collisions
        this.collisionTOP = false;
        this.collisionRIGHT = false;
        this.collisionLEFT = false;
        this.isGrounded = true;

        this.ty = this.posY - this.h/2; //top y
        this.lx = this.posX - this.w/2; //left x
        this.by = this.posY + this.h/2 //bot y
        this.rx = this.posX + this.w/2 //right x

        // Movement parameters
        this.speedX = 1.5;
        this.speedY = 3; 
        this.gravity = 0.03;
        
        // [0] baix [1] cap [2] dreta [3] esquerra
        this.walls = [new Wall(this.rx, this.by, this.lx, this.by), new Wall(this.lx, this.ty, this.rx, this.ty), 
                     new Wall(this.rx, this.ty, this.rx, this.by), new Wall(this.lx, this.by, this.lx, this.ty)]
        
        //animations
        this.jumpAnimation = -1;
        this.jumpAnimationStep = 3;
        this.jumpDeform = 10

        this.topAnimation = -1;
        this.topAnimationStep = 3;
        this.topDeform = 10;
    }
    
    show() {
        const dt = new drawTool("mycanvas");
        
        //Jump animation
        if (this.jumpAnimation >= 0) {
            //deform
            if (this.jumpAnimation <= 1*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 1*(this.jumpDeform/5), this.h + 1*(this.jumpDeform/5), {color: "#FFFFFF"})
            else if (this.jumpAnimation <= 2*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 2*(this.jumpDeform/5), this.h + 2*(this.jumpDeform/5), {color: "#FFFFFF"})
            else if (this.jumpAnimation <= 3*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 3*(this.jumpDeform/5), this.h + 3*(this.jumpDeform/5), {color: "#FFFFFF"})
            else if (this.jumpAnimation <= 4*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 4*(this.jumpDeform/5), this.h + 4*(this.jumpDeform/5), {color: "#FFFFFF"})
            else if (this.jumpAnimation <= 5*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 5*(this.jumpDeform/5), this.h + 5*(this.jumpDeform/5), {color: "#FFFFFF"})

            //reform
            else if (this.jumpAnimation <= 6*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 4*(this.jumpDeform/5), this.h + 4*(this.jumpDeform/5), {color: "#FFFFFF"})
            else if (this.jumpAnimation <= 7*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 3*(this.jumpDeform/5), this.h + 3*(this.jumpDeform/5), {color: "#FFFFFF"})
            else if (this.jumpAnimation <= 8*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 2*(this.jumpDeform/5), this.h + 2*(this.jumpDeform/5), {color: "#FFFFFF"})
            else if (this.jumpAnimation <= 9*this.jumpAnimationStep) dt.rectangle(this.posX, this.posY, this.w - 1*(this.jumpDeform/5), this.h + 1*(this.jumpDeform/5), {color: "#FFFFFF"})
            else {
                dt.rectangle(this.posX, this.posY, this.w, this.h, {color: "#FFFFFF"})
                this.jumpAnimation = -2
            }
            this.jumpAnimation++;
        }
        
        //Top Collision animation
        else if (this.topAnimation >= 0) {
            if (this.topAnimation <= 1*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 1*(this.topDeform/5), this.h - 1*(this.topDeform/5), {color: "#FFFFFF"})
            else if (this.topAnimation <= 2*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 2*(this.topDeform/5), this.h - 2*(this.topDeform/5), {color: "#FFFFFF"})
            else if (this.topAnimation <= 3*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 3*(this.topDeform/5), this.h - 3*(this.topDeform/5), {color: "#FFFFFF"})
            else if (this.topAnimation <= 4*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 4*(this.topDeform/5), this.h - 4*(this.topDeform/5), {color: "#FFFFFF"})
            else if (this.topAnimation <= 5*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 5*(this.topDeform/5), this.h - 5*(this.topDeform/5), {color: "#FFFFFF"})

            //reform
            else if (this.topAnimation <= 6*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 4*(this.topDeform/5), this.h - 4*(this.topDeform/5), {color: "#FFFFFF"})
            else if (this.topAnimation <= 7*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 3*(this.topDeform/5), this.h - 3*(this.topDeform/5), {color: "#FFFFFF"})
            else if (this.topAnimation <= 8*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 2*(this.topDeform/5), this.h - 2*(this.topDeform/5), {color: "#FFFFFF"})
            else if (this.topAnimation <= 9*this.topAnimationStep) dt.rectangle(this.posX, this.posY, this.w + 1*(this.topDeform/5), this.h - 1*(this.jumpDeform/5), {color: "#FFFFFF"})
            else {
                dt.rectangle(this.posX, this.posY, this.w, this.h, {color: "#FFFFFF"})
                this.topAnimation = -2
            }
            this.topAnimation++;
        }
        else {
            dt.rectangle(this.posX, this.posY, this.w, this.h, {color: "#FFFFFF"});
         }

        dt.rectangle(this.posX - 5 + this.anim, this.posY - 1 + this.animY, 4, 4);
        dt.rectangle(this.posX + 5 + this.anim, this.posY - 1 + this.animY, 4, 4);
        this.anim = 0;
        this.animY = 0;
    }

    jump() {

        let bopLeftRight = (this.collisionRIGHT && this.collisionLEFT) || 
        (!this.collisionLEFT && !this.collisionRIGHT);

        if (this.isGrounded && bopLeftRight) {
            this.velY -= this.speedY;
            this.isGrounded = false;
            this.jumpAnimation = 0;
            this.topAnimation = -1;
        }
        this.animY = -4;
    }

    moveRight() {
        this.velX = this.speedX;
        this.anim = 4;
    }

    moveLeft() {
        this.velX = -this.speedX;
        this.anim = -4
    }

        // [0] baix [1] cap [2] dreta [3] esquerra

    isCollision(platform) {
        
        this.collisionLEFT = this.collisionRIGHT  = this.collisionTOP = this.isGrounded = false; 
        let trobat = false; 
        for (let i = 0; i < this.walls.length; ++i) {
            if (platform.isInside(this.walls[i])) {
                trobat = true;
                this.platformCollision = platform;
                //console.log(i);
                if (i == 0) {
                    this.isGrounded = true;
                    //console.log(this.lastCollision)
                } 
                else if (i == 1) {
                    this.collisionTOP = true;
                    this.jumpAnimation = -1; //parem l'animació de salt
                    this.topAnimation = 0; //comencem l'animacio de colisió
                } 
                else if (i == 2) this.collisionRIGHT = true;
                else if (i == 3) this.collisionLEFT = true;

            }
        }
        return trobat;
    }

    updateWalls() {

        this.ty = this.posY - this.h/2; //top y
        this.lx = this.posX - this.w/2; //left x
        this.by = this.posY + this.h/2 //bot y
        this.rx = this.posX + this.w/2 //right x

        // [0] baix [1] cap [2] dreta [3] esquerra
        let ofs = 2
        this.walls = [
            new Wall(this.rx - ofs, this.by, this.lx + ofs, this.by), 
            new Wall(this.lx + ofs, this.ty, this.rx - ofs, this.ty), 
            new Wall(this.rx, this.ty + ofs, this.rx, this.by - ofs), 
            new Wall(this.lx, this.by - ofs, this.lx, this.ty + ofs)
        ]
    }

    worldMove(vel) {
        this.posY += vel;
    }

    update() {
        if (this.velX > 0) this.velX -= 0.1;
        if (this.velX < 0) this.velX += 0.1;
        if (Math.abs(this.velX) <= 0.1) this.velX = 0;

        // Botom right
        if (this.isGrounded && this.collisionRIGHT && !this.collisionLEFT) {
            // Enough to be up
            if (this.posX + 2*this.w/5 <= this.platformCollision.x2) {
                this.posX = this.platformCollision.x2 - this.w/2 - 1;
                this.velX = 0;
            }
            else {
                this.posY = this.platformCollision.y2 - this.h/2 - 1;
                if (this.velY > 0) this.velY = 0;
            }
        }

        // Botom left
        else if (this.isGrounded && this.collisionLEFT && !this.collisionRIGHT) {
            // Enough to be up
            if (this.posX - 2*this.w/5 >= this.platformCollision.x1) {
                this.posX = this.platformCollision.x1 + this.w/2 + 1;
                this.velX = 0;
            }
            else {
                this.posY = this.platformCollision.y2 - this.h/2 - 1;
                if (this.velY > 0) this.velY = 0;
            }
        }

        // Top right
        else if (this.collisionTOP && this.collisionRIGHT && !this.collisionLEFT) {
            // Enough to be up
            if (this.posY - 2*this.h/5 <= this.platformCollision.y1) {
                this.posX = this.platformCollision.x2 - this.w/2 - 1;
                this.velX = 0;
            }
            else {
                this.posY = this.platformCollision.y1 + this.h/2 + 3;
                // this.velY = 0;
            }
        }

        // Top left
        else if (this.collisionTOP && !this.collisionRIGHT && this.collisionLEFT) {
            // Enough to be up
            if (this.posY - 2*this.h/5 <= this.platformCollision.y1) {
                this.posX = this.platformCollision.x1 + this.w/2;
                this.velX = 0;
            }
            else {
                this.posY = this.platformCollision.y1 + this.h/2 + 3;
                // this.velY = 0;
            }
        }

        // Only Right
        else if (!this.collisionTOP && !this.isGrounded && !this.collisionLEFT && this.collisionRIGHT) {
            this.velX = 0;
            this.posX = this.platformCollision.x2 - this.w/2 - 1;
        }

        // Only Left
        else if (!this.collisionTOP && !this.isGrounded && this.collisionLEFT && !this.collisionRIGHT) {
            this.velX = 0;
            this.posX = this.platformCollision.x1 + this.w/2 + 1;
        }

        let leftRight = (this.collisionRIGHT && this.collisionLEFT) || 
        (!this.collisionLEFT && !this.collisionRIGHT);

        if (this.collisionTOP && leftRight) {
            this.velY = 0;
            this.posY = this.platformCollision.y1 + this.h/2 + 3;
        }
        
        this.posX += this.velX;
        this.posY += this.velY;
        
        // Mirem limits parets
        if (this.posX - this.w/2 <= 0) {
            this.posX = this.w/2 + 1; // posem 1 de offset per assegurar-nos que va bé
            this.velX = 0;
            this.accX = 0;
        }

        else if (this.posX + this.w/2 >= d.width) {
            this.posX = d.width - this.w/2 - 1;// posem 1 de offset per assegurar-nos que va b;
            this.velX = 0;
            this.accX = 0;
        }
        
        this.updateWalls()

        // Draw walls
        // for (let h = 0; h < this.walls.length; ++h) {
        //     this.walls[h].show();
        // }

        if (!this.isGrounded) {
            this.velY += this.gravity;
        } 

        if (this.isGrounded && leftRight) {
            this.posY = this.platformCollision.y2 - this.h/2
            this.velY = 0
        }
        this.show();
        
    }

    update_other() {
        //demano pos a pau i faig show
    }

    kill() {
        // Report that I'm dead
    }

}
