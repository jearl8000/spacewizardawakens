// Initialize Phaser, and create a 800 x 800 px game
var game = new Phaser.Game(600, 800, Phaser.AUTO, 'gameDiv');

var cursors;
var icebergs;

// create our 'main' state that will contain the game
var mainState = {
    
    preload: function () {
        
        // change the background color
        game.stage.backgroundColor = '#000000';
        
        game.load.image('background', '../assets/europa/europa_background.png');
        game.load.image('player', '../assets/europa/submarine.png');
        
        game.load.image('ice_sm', '../assets/europa/ice_1.png');
        game.load.image('ice_md', '../assets/europa/ice_2.png');
        game.load.image('ice_lg', '../assets/europa/ice_3.png');
        game.load.image('eye_mine', '../assets/europa/eye_mine.png');

        
    },
    
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        
        game.add.tileSprite(0, 0, 600, 2000, 'background');

        game.world.setBounds(0, 0, 600, 2000);
        

        // set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        // display the player on the screen
        this.player = this.game.add.sprite(300, 100, 'player');
        this.player.anchor.set(0.5);
        
        game.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
        
        // make the player's hitbox a little smaller
        this.player.body.setSize(80, 40, 20, 10);
        
        
        
        // create group of obstacles
        icebergs = game.add.group();
        icebergs.enableBody = true;
        icebergs.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 4; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(game.world.randomX, game.world.randomY, 'ice_sm');
            ice.name = 'obstacle' + i;
            ice.body.velocity.x = game.rnd.integerInRange(-10, 10);
            ice.body.velocity.y = game.rnd.integerInRange(-3, 3);
        }
        
        for (var i = 0; i < 4; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(game.world.randomX, game.world.randomY, 'ice_md');
            ice.name = 'obstacle' + i;
            ice.body.velocity.x = game.rnd.integerInRange(-10, 10);
            ice.body.velocity.y = game.rnd.integerInRange(-10, 10);
        }
        for (var i = 0; i < 2; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(game.world.randomX, game.world.randomY, 'ice_lg');
            ice.body.velocity.x = game.rnd.integerInRange(-10, 10);
            ice.body.velocity.y = game.rnd.integerInRange(-3, 3);
        }
        
        for (var i = 0; i < 4; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(game.world.randomX, game.rnd.integerInRange(1200,2000), 'eye_mine');
            ice.name = 'obstacle' + i;
            ice.body.velocity.x = game.rnd.integerInRange(-3, 3);
            ice.body.velocity.y = game.rnd.integerInRange(-10, 10);
        }
        
        
        
        // add keys
        cursors = game.input.keyboard.createCursorKeys();
        
        
        game.camera.follow(this.player);

    },
    
    update: function () {
        // This function is called 60 times a second
        // It contains the game logic
        
        
        /*
        game.physics.arcade.collide(this.dude, layer);
        
        if (this.dude.inWorld === false) {
            this.restartGame();
        }
        
        this.dude.body.velocity.x = 0;
        this.dude.body.velocity.y = 0;
        */
        
        
        // object1, object2, collideCallback, processCallback, callbackContext
        game.physics.arcade.collide(this.player, icebergs, this.collisionHandler, null, this);

        // always moving down
        this.player.body.velocity.y = 100;
        
        
        // first stab at some touch controls
        
        if (game.input.activePointer.x < 200 && game.input.activePointer.isDown)
        {
            this.player.body.velocity.x = -150;
            this.player.rotation = -(Math.PI/7);
        }
        
        if (game.input.activePointer.x > 400 && game.input.activePointer.isDown)
        {
            this.player.body.velocity.x = 150;
            this.player.rotation = Math.PI/7;
        }
        
        else if (!game.input.activePointer.isDown)
        {
            //  Stand still
            // player.animations.stop();
            // player.frame = 4;
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 100;
            this.player.rotation = 0;
            
        }
        
        
        // cursor controls -- kinda conflicting with the mouse/touch controls atm        
        
        if (cursors.left.isDown)
        {
            //  Move to the left
            this.player.body.velocity.x = -150;
            this.player.rotation = -(Math.PI/7);

            // this.dude.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            this.player.body.velocity.x = 150;
            this.player.rotation = Math.PI/7;

            // this.dude.animations.play('right');
        }
        else if (cursors.up.isDown)
        {
            //  Move up
            this.player.body.velocity.y = 50;

            // player.animations.play('right');
        }
        else if (cursors.down.isDown)
        {
            //  Move down
            this.player.body.velocity.y = 150;

            // player.animations.play('right');
        }
        /* else
        {
            //  Stand still
            // player.animations.stop();
            // player.frame = 4;
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 100;
            this.player.rotation = 0;
            
        }
        */
        
        if (this.player.inWorld === false) {
            this.restartGame();
        }
        
        // game.physics.arcade.overlap(this.dude, this.exit, this.victory, null, this);
        // game.physics.arcade.overlap(this.dude, this.spotlight, this.defeat, null, this);
    },
    
    collisionHandler: function(player, obstacle) {
        alert("ICEBERG'D! Try again.");
        this.restartGame();        
    },
    
    restartGame: function () {
        // start the 'main' state, which restarts the game
        game.state.start('main');
    },
    
    victory: function () {
        // some kind of good alert should happen
        alert("You win!");
        
        this.restartGame();
    },
    
    defeat: function () {
        // some kind of bad alert should happen
        alert("You lose!");
        this.restartGame();
    },
    /*
    render: function() {
        game.debug.text('pointer x:' + game.input.activePointer.x + ' pointer y:' + game.input.activePointer.y, 20, 20);
        game.debug.text('pointer down:' + game.input.activePointer.isDown, 20, 40);
    }
    */
};


// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');
    
    

/* quick brute force hardcoded coords for obstacles
medium icebergs:
64, 112
-6, 136
388, 558
484, 580
6, 1016

small icebergs
360, 294
0, 448
254, 808
520, 1354


large icebergs
292, 896
-10, 1428

mines
372, 1168
510, 1462
348, 1712
110, 1898
*/
    