StarTraveler.main = function(game) {

    this.cursors;
    this.center_x = 400;
    this.center_y = 400;
    this.radius = 350;
    this.theta = 0;

    this.moveCW = false;
    this.moveCCW = false;

    this.tunnelA;
    this.tunnelB;
    this.tunnelTimer;
    this.tunnelFrame = 1;
    
    // group for our obstacles
    this.spaceDebrisGroup;
    this.maxDebris = 10;
    this.debrisTimer;
};

StarTraveler.main.prototype = {
    
    swapTunnel: function() {
        this.tunnelA.loadTexture('tunnel' + this.tunnelFrame);
        //console.log('tunnel' + tunnelFrame);
        
        this.tunnelFrame++;
        if (this.tunnelFrame > 3)
        {
            this.tunnelFrame = 1;
        }
        this.tunnelTimer.add(300, this.swapTunnel, this);
    },
    
    

    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        
        this.start_x = Math.sin( this.theta ) * this.radius + this.center_x;
        this.start_y = Math.cos( this.theta ) * this.radius + this.center_y;

        
        // set the physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.tunnelA = this.add.sprite(0, 0, 'tunnel1');

        //  Create timer for animating background
        this.tunnelTimer = this.time.create(false);
        
        //  Set a TimerEvent to occur after .3 seconds
        this.tunnelTimer.add(300, this.swapTunnel, this);

        //  Start the timer running
        this.tunnelTimer.start();
        
        // create our virtual game controller buttons 
        this.CW_arrow = this.add.button(20, 700, 'CW_arrow', null, this, 0, 0, 0, 0);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        this.CW_arrow.fixedToCamera = true;  //our buttons should stay in the same place  
        this.CW_arrow.events.onInputOver.add(function(){this.moveCW=true;},this);
        this.CW_arrow.events.onInputOut.add(function(){this.moveCW=false;},this);
        this.CW_arrow.events.onInputDown.add(function(){this.moveCW=true;},this);
        this.CW_arrow.events.onInputUp.add(function(){this.moveCW=false;},this);
        
        this.CCW_arrow = this.add.button(700, 700, 'CCW_arrow', null, this, 0, 0, 0, 0);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        this.CCW_arrow.fixedToCamera = true;  
        this.CCW_arrow.events.onInputOver.add(function(){this.moveCCW=true;},this);
        this.CCW_arrow.events.onInputOut.add(function(){this.moveCCW=false;},this);
        this.CCW_arrow.events.onInputDown.add(function(){this.moveCCW=true;},this);
        this.CCW_arrow.events.onInputUp.add(function(){this.moveCCW=false;},this);

        // display the ship on the screen
        this.ship = this.game.add.sprite(this.start_x, this.start_y, 'ship');

        this.physics.arcade.enable(this.ship);
        this.ship.anchor.set(0.5, 0.5);
        this.ship.body.allowRotation = true;
        console.log(this.ship.anchor, this.ship.body.x, this.ship.body.y);
        
        
        
        // start adding space rocks!
        this.spaceDebrisGroup = this.add.group();
        this.spaceDebrisGroup.enableBody = true;
        
        //  Create timer for animating background
        this.debrisTimer = this.time.create(false);
        
        //  Set a TimerEvent to occur after 1 second
        this.debrisTimer.add(1000, this.createObstacle, this);

        //  Start the timer running
        this.debrisTimer.start();
        
        
        //this.createObstacles();
        
        
        // set up left and right keys to move ship
        cursors = this.input.keyboard.createCursorKeys();
        
    },
    
    /* deprecated; this creates a burst of debris at once
    createObstacles: function() {
        this.spaceDebrisGroup = this.add.group();
        this.spaceDebrisGroup.enableBody = true;
        for(var i=0; i<this.maxDebris; i++) {
            var d = this.spaceDebrisGroup.create(this.center_x, this.center_y, 'debris_cube');
            d.anchor.setTo(0.5, 0.5);
            this.physics.enable(d, Phaser.Physics.ARCADE);
            d.enableBody = true;
            d.animations.add('Tumble', [0, 1, 2, 3, 4, 5], 6, true);
            d.animations.play('Tumble', 16, true);
            d.body.velocity.x = this.rnd.integerInRange(-100, 100);
            d.body.velocity.y = this.rnd.integerInRange(-100, 100);
        }
    },
    */
    
    createObstacle: function() {
        // pick a random direction from center
        var debrisDegree = this.rnd.integerInRange(0, 360);
        var debrisType = ['debris_cube', 'debris_rock'];
        var t = this.rnd.integerInRange(0, 1);
            
        var d = this.spaceDebrisGroup.create(this.center_x, this.center_y, debrisType[t]);
        d.anchor.setTo(0.5, 0.5);
        this.physics.enable(d, Phaser.Physics.ARCADE);
        d.enableBody = true;
        if (t == 0) {
            d.animations.add('Tumble', [0, 1, 2, 3, 4, 5], 6, true);
            d.animations.play('Tumble', 16, true);
        }
        else {
            d.animations.add('Tumble2', [0, 1, 2, 3, 4, 5], 6, true);
            d.animations.play('Tumble2', 16, true);    
        }
        d.body.velocity.x = Math.sin( debrisDegree ) * 120;
        d.body.velocity.y = Math.cos( debrisDegree ) * 120;
        // this.theta instead of debrisDegree would have them come right at the player
        
        d.body.angularVelocity = this.rnd.integerInRange(-150, 150);
            
        this.debrisTimer.add(700, this.createObstacle, this);
        
    },
    
    update: function () {
        // This function is called 60 times a second
        // It contains the game logic
        
        // If the ship is out of the world, call the 'restartGame' function
        if (this.ship.inWorld === false) {
            this.restartGame();
        }
        
        if (cursors.left.isDown || this.moveCW)
        {
            //  Move clockwise
            // this.ship.body.velocity.x = -150;
            this.theta = this.theta - Math.PI/90;
            this.ship.body.x = Math.sin( this.theta ) * this.radius + this.center_x - 48;
            this.ship.body.y = Math.cos( this.theta ) * this.radius + this.center_y - 32;
            this.ship.rotation = -this.theta;
    //        console.log(this.ship.anchor, this.ship.body.x, this.ship.body.y);

        }
        else if (cursors.right.isDown || this.moveCCW)
        {
            //  Move counter-clockwise
            // this.ship.body.velocity.x = 150;
            this.theta = this.theta + Math.PI/90;
            this.ship.body.x = Math.sin( this.theta ) * this.radius + this.center_x - 48;
            this.ship.body.y = Math.cos( this.theta ) * this.radius + this.center_y - 32;
            this.ship.rotation = -this.theta;

        }
        
        else
        {
            //  Stand still
            // this.ship.body.velocity.x = 0;
            // this.ship.body.angularVelocity = 0;
            // player.animations.stop();

            // player.frame = 4;
        }
        
    },
    
    /*
    render: function () {
        this.game.debug.bodyInfo(this.ship, 32, 32);
        this.game.debug.body(this.ship);
    },
    */
    
    restartGame: function () {
        // start the 'main' state, which restarts the game
        this.state.start('main');
    } 
    
    
    
};
    
    
    