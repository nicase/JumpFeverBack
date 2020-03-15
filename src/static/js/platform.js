class Wall {
    constructor (x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    contained(dot) { // {x:1, y:2}
        if (this.x1 == this.x2 && dot.x != this.x1)
            return false;
        if (this.y1 == this.y2 && dot.y != this.y1) 
            return false;
    
        if (this.x1 > this.x2) {
            if (dot.x > this.x1) return false;
            if (dot.x < this.x2) return false;
        }
        else {
            if (dot.x > this.x2) return false;
            if (dot.x < this.x1) return false;
        }
        if (this.y1 > this.y2) {
            if (dot.y > this.y1) return false;
            if (dot.y < this.y2) return false;
        }
        else {
            if (dot.y > this.y2) return false;
            if (dot.y < this.y1) return false;
        }
        return true;
    }

    intersection(w) {
        let x3 = w.x1;
        let y3 = w.y1;
        let x4 = w.x2;
        let y4 = w.y2;
        let x1 = this.x1;
        let x2 = this.x2;
        let y1 = this.y1;
        let y2 = this.y2;


        let den = (x1 - x2)*(y3 - y4) - (y1 - y2)*(x3 - x4);
        if (den == 0) return undefined;

        let t = ((x1 - x3)*(y3 - y4) - (y1 - y3)*(x3 - x4)) / den;
        let u = ((x1 - x2)*(y1 - y3) - (y1 - y2)*(x1 - x3)) / den;
        
        let dot = {
            x: x1 + t*(x2 - x1),
            y: y1 + t*(y2 - y1)
        }
        if (this.contained(dot) && w.contained(dot)) return dot;
        else return undefined;
    }

    show() {
        const dt = new drawTool("mycanvas");
        dt.line(this.x1,this.y1,this.x2,this.y2, {width: 3})
    }

    equal(w) {
        if (w.x1 != this.x1) return false;
        if (w.x2 != this.x2) return false;
        if (w.y1 != this.y1) return false;
        if (w.y2 != this.y2) return false;
        return true;
    }
}

class Platform {
    constructor (x, y, w, actLevel) {
        this.x = x
        this.y = y
        this.w = w
        this.h = 20
        this.x1 = this.x + this.w/2 
        this.x2 = this.x - this.w/2
        this.y1 = this.y + this.h/2
        this.y2 = this.y - this.h/2

        this.walls = [new Wall(this.x1, this.y1, this.x2, this.y1), new Wall(this.x2, this.y1, this.x2, this.y2),
                      new Wall(this.x2, this.y2, this.x1, this.y2), new Wall(this.x1, this.y2, this.x1, this.y1)]
        
        //console.log(rectColor)
        this.level = actLevel;
    }

    isCollision(w) {
        for (let i = 0; i < this.walls.length; ++i) {
            //w es els walls del player
            if (this.walls[i].intersection(w) != undefined) {
                return this.walls[i].y1
                /*console.log("platform")
                console.log(this.walls[i])
                console.log("player")
                console.log(w);*/
            }
        }
        return undefined;
    }

    dotIsInside(x, y) {
        if (x <= this.x1 && x >= this.x2 && y <= this.y1 && y >= this.y2) return true
        return false;
    }

    isInside(w) {
        if (this.dotIsInside(w.x1, w.y1) || this.dotIsInside(w.x2, w.y2)) return true
        return false
    }

    show() {
        let d = new drawTool("mycanvas")
        //console.log(this.color)
        //console.log(dataColors[this.level])
        d.rectangle(this.x, this.y, this.w, this.h, {color: "#" + dataColors[this.level].toString(16)})
    }

    update(vel) {
        this.y += vel // Moviment cap aball de les plataformes

        this.x1 = this.x + this.w/2
        this.x2 = this.x - this.w/2
        this.y1 = this.y + this.h/2
        this.y2 = this.y - this.h/2

        this.walls = [new Wall(this.x1, this.y1, this.x2, this.y1), new Wall(this.x2, this.y1, this.x2, this.y2),
            new Wall(this.x2, this.y2, this.x1, this.y2), new Wall(this.x1, this.y2, this.x1, this.y1)]
    }

    equal(p) {
        if (this.x != p.x) return false;
        if (this.y != p.y) return false;
        if (this.w != p.w) return false;
        if (this.x1 != p.x1) return false;
        if (this.x2 != p.x2) return false;
        if (this.y1 != p.y1) return false;
        if (this.y2 != p.y2) return false;
        return true;
    }

}