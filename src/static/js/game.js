class Game {
    constructor(seed, others) {
        this.me = new Player(d.width/2, d.height - 20)
        this.seed = seed
        this.others = others
        this.players = []
        this.platforms = []
        this.platformsVel = 0.2
        let oneWidth = 150
        let twoWidth = 100
        let threeWidth = 100
        this.frame = 0
        this.move = false

        this.currentLevel = 0;

        this.oneBlock = [ 
            // One block
            [[d.width/10, oneWidth]],
            [[2*d.width/10, oneWidth]],
            [[3*d.width/10, oneWidth]],
            [[4*d.width/10, oneWidth]],
            [[5*d.width/10, oneWidth]],
            [[6*d.width/10, oneWidth]],
            [[7*d.width/10, oneWidth]],
            [[8*d.width/10, oneWidth]],
            [[9*d.width/10, oneWidth]] 
        ]
        
        this.twoBlock = [ 
            // Two blocks
            [[d.width/10, twoWidth], [9*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[5*d.width/10, twoWidth], [5*d.width/10, twoWidth]],
            
            [[d.width/10, twoWidth], [4*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [5*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[5*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[6*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [5*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[5*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [6*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[4*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [7*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[3*d.width/10, twoWidth], [9*d.width/10, twoWidth]],

            [[d.width/10, twoWidth], [8*d.width/10, twoWidth]],
            [[2*d.width/10, twoWidth], [9*d.width/10, twoWidth]]
        ]
        
        this.threeBlock = [ 
            // Three blocks
            [[d.width/10, threeWidth], [5*d.width/10, threeWidth], [9*d.width/10, threeWidth]],
            [[d.width/10, threeWidth], [4*d.width/10, threeWidth], [9*d.width/10, threeWidth]],
            [[d.width/10, threeWidth], [6*d.width/10, threeWidth], [9*d.width/10, threeWidth]],
        ]
    }

    start() {
        this.frame = 0
        this.move = false
        this.generatePlatforms()
        this.me = new Player(d.width/2, d.height - 20)
        for (let i = 0; i < this.others.length; ++i) {
            this.players.push(new Player(d.width/2, d.height - 20, this.others[i]))
        }
    }

    update() {
        this.frame += 1
        if (this.frame > 1000) this.move = true;
        checkKeys()
        d.clearAll()
        d.backbroung("#000000")
        let minY = d.height;
        for (let i = 0; i < this.players.length; ++i) {
            minY = Math.min(minY, this.players[i].posY);
        }
        minY = Math.min(minY, this.me.posY);

        if (minY < 50) this.platformsVel = 0.8
        else if (minY < 100) this.platformsVel = 0.7
        else if (minY < 150) this.platformsVel = 0.6
        else if (minY < 200) this.platformsVel = 0.5
        else if (minY < 250) this.platformsVel = 0.4
        else if (minY < 300) this.platformsVel = 0.3
        else this.platformsVel = 0.2

        this.drawPlatforms()
        if (this.move) this.me.worldMove(this.platformsVel)
        this.checkCollisions()
        this.me.update()

        for (let i = 0; i < this.players.length; ++i) {
            let p = this.players[i]
            p.update_other()
        }

        // Check if player is dead
        if (this.me.posY >= d.height + 100) {
            this.me.kill();
            this.start();
        }

        if (this.frame > 1) this.currentLevel = this.me.platformCollision.level;
        else this.currentLevel = 0
        updatePanelColor()

    }

    blockEquals(b1, b2) {
        if (b1.length != b2.length) return false
        for (let i = 0; i < b1.length; ++i) {
            if (!b1[i].equal(b2[i])) return false
        }
        return true
    }

    generatePlatforms() {
        var random = (s) => {
            var x = Math.sin(s++) * 10000
            return x - Math.floor(x)
        }
        // Posem terra inicial
        let gap = 100
        //console.log(dataColors[0].toString(16))
        this.platforms = [[new Platform(d.width/2, d.height, d.width, 0)]]

        for (let i = 0; i < 100; ++i) {
            let randomVal = random(i * this.seed + 1)

            let nPlatforms = Math.floor(randomVal*3)
            
            let type = []
            if (nPlatforms == 0) type = this.oneBlock
            else if (nPlatforms == 1) type = this.twoBlock
            else if (nPlatforms == 2) type = this.threeBlock
            
            let index = Math.floor(type.length * random(i*2*this.seed))
            let level = type[index]
            
            let decrease = 1 - 0.1*Math.floor(i/10)
            let blocks = []
            for (let x = 0; x < level.length; ++x) {
                //console.log(this.perc2color(i))
                blocks.push(new Platform(level[x][0], d.height - gap*(i + 1), level[x][1]*decrease, i))
            }

            this.platforms.push(blocks)
        }
    }

    drawPlatforms() {
        for (let i = 0; i < this.platforms.length; ++i) {
            let level = this.platforms[i]
            for (let j = 0; j < level.length; ++j) {
                let current = level[j]

                if (this.move) {
                    current.update(this.platformsVel)
                }

                if (current.y >= 0 && current.y <= d.height + current.h) 
                    current.show()
            }
        }
    }

    checkCollisions() {
        // Comprovar collisions de me
        for (let i = 0; i < this.platforms.length; ++i) {
            let p = this.platforms[i];
            for (let x = 0; x < p.length; ++x) {
                if (this.me.isCollision(p[x])) return;
            }
        }
    }
}

var keys = {}

onkeydown = onkeyup = function(e){
    e = e || event
    keys[e.keyCode] = e.type == 'keydown'
}

function checkKeys() {
    // Up
    if (keys[38]) {
        g.me.jump()
    }
    // Left
    if (keys[37]) {
        g.me.moveLeft()
    }
    // Right
    if (keys[39]) {
        g.me.moveRight()
    }
}

const cnv = document.getElementById("mycanvas")
cnv.height = document.documentElement.clientHeight - 50;

const d = new drawTool("mycanvas")
const g = new Game(3247, [1,2,3,4])
g.start()
var updateAll = () => g.update()

d.setInterval(updateAll, 2)
