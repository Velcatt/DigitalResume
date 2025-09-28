ROT.RNG.setSeed(7571)
var tileSet = document.createElement("img");
tileSet.src = "Alloy_curses_12x12_black.png";

var options = {
    layout: "tile",
    bg: "transparent",
    tileWidth: 12,
    tileHeight: 12,
    tileSet: tileSet,
    tileMap: {
        "@": [0, 48],
        ".": [168, 24],
        "*": [120, 24]
    },
    width: 40,
    height: 20
}


var Game = {
    display: null,
    map: {},
    engine: null,
    player: null,

    story: null,
    links: null,
    technologies: null,
    experiences: null,
    education: null,
    softskills: null,
    projects: null,
    general: null,
    
    init: function() {
        this.display = new ROT.Display(options);
        document.getElementById("game-window").appendChild(this.display.getContainer());
        
        this._generateMap();
        
        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },
    
    _generateMap: function() {
        var digger = new ROT.Map.Digger(40,20);
        var freeCells = [];
        
        var digCallback = function(x, y, value) {
            if (value) { return; }
            
            var key = x+","+y;
            this.map[key] = ".";
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));
        this._generateBoxes(freeCells);
        this._drawWholeMap();
        this._createPlayer(freeCells);
    },
    
    _createPlayer: function(freeCells) {
        var index = 145;
        var key = freeCells.splice(index, 1)[0];
        var parts = key.split(",");
        var x = parseInt(parts[0]);
        var y = parseInt(parts[1]);
        this.player = new Player(x, y);
    },
    
    _generateBoxes: function(freeCells) {
        var index = 135;
        var key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.story = key;

        index = 124;
        key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.links = key;

        index = 111;
        key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.technologies = key;

        index = 92;
        key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.experiences = key;

        index = 102;
        key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.education = key;

        index = 45;
        key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.softskills = key;

        index = 13;
        key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.projects = key;

        index = 140;
        key = freeCells.splice(index, 1)[0];
        this.map[key] = "*";
        this.general = key;
    },
    
    _drawWholeMap: function() {
        for (var key in this.map) {
            var parts = key.split(",");
            var x = parseInt(parts[0]);
            var y = parseInt(parts[1]);
            this.display.draw(x, y, this.map[key]);
        }
    }
};

class Player {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.draw();
    }

    draw() {
        Game.display.draw(this.x, this.y, "@");
    }

    moveLeft() {
        Game.engine.lock();
        var newX = this.x - 1;
        var newKey = newX + "," + this.y;
        if (!(newKey in Game.map)) { return; }
        Game.display.draw(this.x, this.y, Game.map[this.x+","+this.y]);
        this.x = newX;
        this.draw();
        Game.engine.unlock();
        this.checkBox();

    }

    moveRight() {
        Game.engine.lock();
        var newX = this.x + 1;
        var newKey = newX + "," + this.y;
        if (!(newKey in Game.map)) { return; }
        Game.display.draw(this.x, this.y, Game.map[this.x+","+this.y]);
        this.x = newX;
        this.draw();
        Game.engine.unlock();
        this.checkBox();
    }

    moveUp() {
        Game.engine.lock();
        var newY = this.y - 1;
        var newKey = this.x + "," + newY;
        if (!(newKey in Game.map)) { return; }
        Game.display.draw(this.x, this.y, Game.map[this.x+","+this.y]);
        this.y = newY;
        this.draw();
        Game.engine.unlock();
        this.checkBox();
    }

    moveDown() {
        Game.engine.lock();
        var newY = this.y + 1;
        var newKey = this.x + "," + newY;
        if (!(newKey in Game.map)) { return; }
        Game.display.draw(this.x, this.y, Game.map[this.x+","+this.y]);
        this.y = newY;
        this.draw();
        Game.engine.unlock();
        this.checkBox();
    }

    checkBox() {
        var key = this.x + "," + this.y;
        if (Game.map[key] != "*") {
            return;
        } else if (key == Game.story) {
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.add("d-none");
            document.getElementById("right-panel-story").classList.remove("d-none");
            document.getElementById("right-panel-technologies").classList.add("d-none");
            document.getElementById("right-panel-experiences").classList.add("d-none");
            document.getElementById("right-panel-education").classList.add("d-none");
            document.getElementById("right-panel-soft-skills").classList.add("d-none");
            document.getElementById("right-panel-projects").classList.add("d-none");
            document.getElementById("right-panel-general").classList.add("d-none");
        } else if (key == Game.links){
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.remove("d-none");
            document.getElementById("right-panel-story").classList.add("d-none");
            document.getElementById("right-panel-technologies").classList.add("d-none");
            document.getElementById("right-panel-experiences").classList.add("d-none");
            document.getElementById("right-panel-education").classList.add("d-none");
            document.getElementById("right-panel-soft-skills").classList.add("d-none");
            document.getElementById("right-panel-projects").classList.add("d-none");
            document.getElementById("right-panel-general").classList.add("d-none");
        } else if (key == Game.technologies) {
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.add("d-none");
            document.getElementById("right-panel-story").classList.add("d-none");
            document.getElementById("right-panel-technologies").classList.remove("d-none");
            document.getElementById("right-panel-experiences").classList.add("d-none");
            document.getElementById("right-panel-education").classList.add("d-none");
            document.getElementById("right-panel-soft-skills").classList.add("d-none");
            document.getElementById("right-panel-projects").classList.add("d-none");
            document.getElementById("right-panel-general").classList.add("d-none");
        } else if (key == Game.experiences) {
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.add("d-none");
            document.getElementById("right-panel-story").classList.add("d-none");
            document.getElementById("right-panel-technologies").classList.add("d-none");
            document.getElementById("right-panel-experiences").classList.remove("d-none");
            document.getElementById("right-panel-education").classList.add("d-none");
            document.getElementById("right-panel-soft-skills").classList.add("d-none");
            document.getElementById("right-panel-projects").classList.add("d-none");
            document.getElementById("right-panel-general").classList.add("d-none");
        } else if (key == Game.education) {
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.add("d-none");
            document.getElementById("right-panel-story").classList.add("d-none");
            document.getElementById("right-panel-technologies").classList.add("d-none");
            document.getElementById("right-panel-experiences").classList.add("d-none");
            document.getElementById("right-panel-education").classList.remove("d-none");
            document.getElementById("right-panel-soft-skills").classList.add("d-none");
            document.getElementById("right-panel-projects").classList.add("d-none");
            document.getElementById("right-panel-general").classList.add("d-none");
        } else if (key == Game.softskills) {
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.add("d-none");
            document.getElementById("right-panel-story").classList.add("d-none");
            document.getElementById("right-panel-technologies").classList.add("d-none");
            document.getElementById("right-panel-experiences").classList.add("d-none");
            document.getElementById("right-panel-education").classList.add("d-none");
            document.getElementById("right-panel-soft-skills").classList.remove("d-none");
            document.getElementById("right-panel-projects").classList.add("d-none");
            document.getElementById("right-panel-general").classList.add("d-none");
        } else if (key == Game.projects) {
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.add("d-none");
            document.getElementById("right-panel-story").classList.add("d-none");
            document.getElementById("right-panel-technologies").classList.add("d-none");
            document.getElementById("right-panel-experiences").classList.add("d-none");
            document.getElementById("right-panel-education").classList.add("d-none");
            document.getElementById("right-panel-soft-skills").classList.add("d-none");
            document.getElementById("right-panel-projects").classList.remove("d-none");
            document.getElementById("right-panel-general").classList.add("d-none");
        } else if (key == Game.general) {
            document.getElementById("right-panel-tutorial").classList.add("d-none");
            document.getElementById("right-panel-links").classList.add("d-none");
            document.getElementById("right-panel-story").classList.add("d-none");
            document.getElementById("right-panel-technologies").classList.add("d-none");
            document.getElementById("right-panel-experiences").classList.add("d-none");
            document.getElementById("right-panel-education").classList.add("d-none");
            document.getElementById("right-panel-soft-skills").classList.add("d-none");
            document.getElementById("right-panel-projects").classList.add("d-none");
            document.getElementById("right-panel-general").classList.remove("d-none");
        } else {
            return;
        }
    }  
}
    
Player.prototype.act = function() {
    Game.engine.lock();
    window.addEventListener("keydown", this);
}
    
Player.prototype.handleEvent = function(e) {
    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    var code = e.keyCode;
    // one of numpad directions? 
    if (!(code in keyMap)) { return; }

    // is there a free space? 
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this.x + dir[0];
    var newY = this.y + dir[1];
    var newKey = newX + "," + newY;
    if (!(newKey in Game.map)) { return; }
    Game.display.draw(this.x, this.y, Game.map[this.x+","+this.y]);
    this.x = newX;
    this.y = newY;
    this.draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
    this.checkBox();
}

window.addEventListener("keydown", function(e) {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

Game.init();

