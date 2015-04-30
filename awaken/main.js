/* Credit goes to the Simon Says example from Phaser: http://phaser.io/examples/v2/games/simon */


Awaken.main = function(game) {

};

var lightgroup;
var N = 1;
var userCount = 0;
var currentCount = 0;
var sequenceCount = 10;
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
        this.add.tileSprite(0, 0, 800, 600, 'background');
        
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
        
        this.introTween();
        this.setUp();
        // var that = this; // oh maiden wept
        // setTimeout(function(){ that.templeSequence(); intro = false; }, 6000);
        this.time.events.add(Phaser.Timer.SECOND * 5, this.templeSequence, this);
        
    },
    
    setUp: function() {

        for (var i = 0; i < sequenceCount; i++)
        {
            thisSquare = this.rnd.integerInRange(0,4);
            sequenceList.push(thisSquare);
        }

    },
    
    restart: function() {
        N = 1;
        userCount = 0;
        currentCount = 0;
        sequenceList = [];
        winner = false;
        loser = false;
        this.introTween();
        this.setUp();
        // var that = this;
        // setTimeout(function(){that.templeSequence(); intro=false;}, 6000);
        this.time.events.add(Phaser.Timer.SECOND * 5, this.templeSequence, this);
        intro=false;

    },
    
    introTween: function() {
        intro = true;
        for (var i = 0; i < 5; i++)
        {
            var flashing = this.add.tween(lightgroup.getAt(i)).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 3, true);
            var final = this.add.tween(lightgroup.getAt(i)).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);

            flashing.chain(final);
            flashing.start();
        }
        intro=false;
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
                    // setTimeout(function(){restart();}, 3000);
                    this.time.events.add(Phaser.Timer.SECOND * 3, this.restart, this);
                }
                else
                {
                    userCount = 0;
                    currentCount = 0;
                    N++;
                    templeTurn = true;
                }
            }
        }
        else
        {
            loser = true;
            // that = this; // oh no
            // setTimeout(function(){ that.restart();}, 3000);
            this.time.events.add(Phaser.Timer.SECOND * 3, this.restart, this);
        }

    },
    
    templeSequence: function () {
        templeTurn = true;
        litSquare = sequenceList[currentCount];
        console.log(litSquare);
        lightgroup.getAt(litSquare).alpha = 1;
        
        /*var lightOn = this.add.tween(lightgroup.getAt(litSquare)).to( { alpha: 1 }, 200, Phaser.Easing.Linear.None, true, 0, 0, true);
        var lightOff = this.add.tween(lightgroup.getAt(litSquare)).to( { alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
        lightOn.chain(lightOff);
        lightOn.start(); */
        timeCheck = this.time.now;
        currentCount++;
    },
    
    
    
    update: function () {
        if (templeTurn)
        {
            console.log("this.time.now: " + this.time.now);
            console.log("timeCheck: " + timeCheck);
            
            if (this.time.now - timeCheck > 700-N*40)
            {
                console.log("pausing!");
                lightgroup.getAt(litSquare).alpha = 0;
                this.paused = true;

                /*setTimeout(function()
                {
                    if ( currentCount< N)
                    {
                        this.paused = false;
                        this.templeSequence();
                    }
                    else
                    {
                        templeTurn = false;
                        this.paused = false;
                    }
                }, 400 - N * 20); */
                this.time.events.add(400 - N * 20, this.updateTemple, this);
            }
        }         
    },
    
    updateTemple: function() {
        if ( currentCount < N)
        {
            this.paused = false;
            this.templeSequence();
        }
        else
        {
            templeTurn = false;
            this.paused = false;
        }
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
        // alert("You win!");
        // this.restartGame();
        this.state.start('EndScene');

    },
    
}