StarTraveler.main = function(game) {};

var cursors;
var center_x = 400;
var center_y = 400;
var radius = 300;
var theta = 0;

var moveCW = false;
var moveCCW = false;

StarTraveler.main.prototype = {

    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        
        start_x = Math.sin( theta ) * radius + center_x;
        start_y = Math.cos( theta ) * radius + center_y;

        
        // set the physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        this.add.tileSprite(0, 0, 800, 800, 'background');

        
        // create our virtual game controller buttons 
        this.CW_arrow = this.add.button(20, 700, 'CW_arrow', null, this, 0, 0, 0, 0);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        this.CW_arrow.fixedToCamera = true;  //our buttons should stay on the same place  
        this.CW_arrow.events.onInputOver.add(function(){moveCW=true;});
        this.CW_arrow.events.onInputOut.add(function(){moveCW=false;});
        this.CW_arrow.events.onInputDown.add(function(){moveCW=true;});
        this.CW_arrow.events.onInputUp.add(function(){moveCW=false;});
        
        this.CCW_arrow = this.add.button(700, 700, 'CCW_arrow', null, this, 0, 0, 0, 0);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
        this.CCW_arrow.fixedToCamera = true;  //our buttons should stay on the same place  
        this.CCW_arrow.events.onInputOver.add(function(){moveCCW=true;});
        this.CCW_arrow.events.onInputOut.add(function(){moveCCW=false;});
        this.CCW_arrow.events.onInputDown.add(function(){moveCCW=true;});
        this.CCW_arrow.events.onInputUp.add(function(){moveCCW=false;});

        // display the ship on the screen
        this.ship = this.game.add.sprite(start_x, start_y, 'ship');

        this.physics.arcade.enable(this.ship);
        this.ship.anchor.set(0.5);
        this.ship.body.allowRotation = true;
        console.log(this.ship.anchor, this.ship.body.x, this.ship.body.y);
        
        
        
        // set up left and right keys to move ship
        cursors = this.input.keyboard.createCursorKeys();
        
        
    },
    
    update: function () {
        // This function is called 60 times a second
        // It contains the game logic
        
        // If the ship is out of the world, call the 'restartGame' function
        if (this.ship.inWorld === false) {
            this.restartGame();
        }
        
        if (cursors.left.isDown || moveCW)
        {
            //  Move clockwise
            // this.ship.body.velocity.x = -150;
            theta = theta - Math.PI/90;
            this.ship.body.x = Math.sin( theta ) * radius + center_x - 32;
            this.ship.body.y = Math.cos( theta ) * radius + center_y - 32;
            this.ship.rotation = -theta;
    //        console.log(this.ship.anchor, this.ship.body.x, this.ship.body.y);

            // dude.animations.play('left');
        }
        else if (cursors.right.isDown || moveCCW)
        {
            //  Move counter-clockwise
            // this.ship.body.velocity.x = 150;
            theta = theta + Math.PI/90;
            this.ship.body.x = Math.sin( theta ) * radius + center_x - 32;
            this.ship.body.y = Math.cos( theta ) * radius + center_y - 32;
            this.ship.rotation = -theta;

            // player.animations.play('right');
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
    
    
    render: function () {
        // game.debug.bodyInfo(this.ship, 32, 32);
        // game.debug.body(this.ship);
    },
    
    
    restartGame: function () {
        // start the 'main' state, which restarts the game
        this.state.start('main');
    } 
    
    
    
};
    
    
    