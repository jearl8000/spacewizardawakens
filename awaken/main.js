/* Credit is due to the Simon Says example from Phaser: http://phaser.io/examples/v2/games/simon */


Awaken.main = function(game) {

};

var lightgroup;
var background, finale;
var N = 3;
var userCount = 0;
// var currentCount = 0;
var sequenceCount = 10;
var sequenceCount = 5;
var sequenceList = [];
var timeCheck;
var litSquare;

var templeTurn = false;
var winner = false;
var loser = false;
var intro = false;

var sounds = ["one", "two", "three", "four", "five"];


Awaken.main.prototype = {
    
    create: function () {
        this.stage.backgroundColor = '#0A9CB1';
        background = this.add.tileSprite(0, 0, 800, 600, 'background');
        
        this.add.image(46, 340, 'light_blue');
        this.add.image(584, 248, 'dark_blue');
        this.add.image(669, 203, 'light_pink');
        this.add.image(130, 285, 'dark_pink');
        this.add.image(468, 327, 'red_spot');
        
        
        // add all them lit-up buttons
        lightgroup = this.add.group();
        
        var light_blue_lit = lightgroup.create(46, 340, 'light_blue_lit');       
        var dark_pink_lit = lightgroup.create(130, 285, 'dark_pink_lit');
        var red_spot_lit = lightgroup.create(468, 327, 'red_spot_lit'); 
        var dark_blue_lit = lightgroup.create(584, 248, 'dark_blue_lit');
        var light_pink_lit = lightgroup.create(669, 203, 'light_pink_lit');
        
        
        // set up input and sound
        for (var i = 0; i < 5; i++) {
            var light = lightgroup.getAt(i);
            light.inputEnabled = true;
            light.input.start(0, true);
            light.events.onInputDown.add(this.select, this);
            light.events.onInputUp.add(this.release, this);
            light.events.onInputOut.add(this.moveOff, this);
            light.alpha = 0;
            light.sound = sounds[i];
        }
        
        finale = this.add.tileSprite(0, 0, 800, 600, 'finale');  // the end screen
        finale.alpha = 0;
        
        this.introTween();
        this.setUp();
        this.time.events.add(Phaser.Timer.SECOND * 5, this.templeSequence, this);
        
    },
    
    setUp: function() {
        // sequenceList = [0,1,1,1,1];
        
        for (var i = 0; i < sequenceCount; i++)
        {
            thisSquare = this.rnd.integerInRange(0,4);
            sequenceList.push(thisSquare);
        }
    },
    
    restart: function() {
        N = 3;
        userCount = 0;
        currentCount = 0;
        sequenceList = [];
        winner = false;
        loser = false;
        this.introTween();
        this.setUp();
        this.time.events.add(Phaser.Timer.SECOND * 5, this.templeSequence, this);
        intro=false;

    },
    
    introTween: function() {
        intro = true;
        for (var i = 0; i < 5; i++)
        {
            var flashing = this.add.tween(lightgroup.getAt(i)).to( { alpha: 1 }, 400, Phaser.Easing.Linear.None, true, 0, 3, true);
            var final = this.add.tween(lightgroup.getAt(i)).to( { alpha: 0 }, 400, Phaser.Easing.Linear.None, false);

            flashing.chain(final);
            // flashing.start();
        }
        intro=false;
    },

    
    templeSequence: function () {
        templeTurn = true;
        var lights = new Array;
        var light = sequenceList[0];
        lights[0] = this.add.tween(lightgroup.getAt(light)).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, false, 0, 0, true);
        for (i=1; i < N; i++) { 
            light = sequenceList[i];
            // play sound and light up litSquare
            // dim litSquare when sound ends
            lights[i] = this.add.tween(lightgroup.getAt(light)).to( { alpha: 1 }, 300, Phaser.Easing.Linear.None, false, 0, 0, true)
            lights[i-1].chain(lights[i]);
        }
        lights[0].start();
        templeTurn = false;
    },
    
    playerTurn: function(selected) {
        correctSquare = sequenceList[userCount];
        userCount++;
        thisSquare = lightgroup.getIndex(selected);

        if (thisSquare == correctSquare)
        {
            if (userCount == N)
            {
                if (N == sequenceCount)
                {
                    winner = true;
//                    this.time.events.add(Phaser.Timer.SECOND * 3, this.restart, this);
                    this.time.events.add(Phaser.Timer.SECOND * 1, this.victory, this);
                }
                else
                {
                    userCount = 0;
                    currentCount = 0;
                    N++;
                    this.time.events.add(Phaser.Timer.SECOND * 1, this.templeSequence, this);
                    // this.templeSequence();
                    // templeTurn = true;
                }
            }
        }
        else
        {
            loser = true;
            this.time.events.add(Phaser.Timer.SECOND * 3, this.restart, this);
        }

    },
    
    
    update: function () {
    },
    

        
    select: function(light, pointer) {

        if (!templeTurn && !intro && !loser && !winner)
        {
            light.alpha = 1;
            console.log(light.sound);
        }

    },

    release: function(light, pointer) {
        if (!templeTurn && !intro && !loser && !winner)
        {
            light.alpha = 0;
            this.playerTurn(light);
        }
    },

    moveOff: function(light, pointer) {

        if (!templeTurn && !intro && !loser && !winner)
        {
            light.alpha = 0;
        }

    },
    
    restartGame: function () {
        // start the 'main' state, which restarts the game
        this.state.start('main');
    },
    
    victory: function () {
        var glow_it_up = this.add.tween(finale).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
        glow_it_up.onComplete.add(function() { this.state.start('EndScene'); }, this);
    },
    
}