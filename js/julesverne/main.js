// Initialize Phaser, and create a 800 x 800 px game
// this is now done in the index.html
// var game = new Phaser.Game(600, 800, Phaser.AUTO, 'gameDiv');

JulesVerne.main = function(game) {};

var cursors;
var icebergs;

JulesVerne.main.prototype = {
    
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        
        this.add.tileSprite(0, 0, 600, 2000, 'background');

        this.world.setBounds(0, 0, 600, 2000);
        

        // set the physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        // display the player on the screen
        this.player = this.game.add.sprite(300, 100, 'player');
        this.player.anchor.set(0.5);
        
        this.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
        
        // make the player's hitbox a little smaller
        this.player.body.setSize(80, 40, 20, 10);
        
        
        
        // create group of obstacles
        icebergs = this.add.group();
        icebergs.enableBody = true;
        icebergs.physicsBodyType = Phaser.Physics.ARCADE;
        for (var i = 0; i < 4; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(this.world.randomX, this.world.randomY, 'ice_sm');
            ice.name = 'obstacle' + i;
            ice.body.velocity.x = this.rnd.integerInRange(-10, 10);
            ice.body.velocity.y = this.rnd.integerInRange(-3, 3);
        }
        
        for (var i = 0; i < 4; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(this.world.randomX, this.world.randomY, 'ice_md');
            ice.name = 'obstacle' + i;
            ice.body.velocity.x = this.rnd.integerInRange(-10, 10);
            ice.body.velocity.y = this.rnd.integerInRange(-10, 10);
        }
        for (var i = 0; i < 2; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(this.world.randomX, this.world.randomY, 'ice_lg');
            ice.body.velocity.x = this.rnd.integerInRange(-10, 10);
            ice.body.velocity.y = this.rnd.integerInRange(-3, 3);
        }
        
        for (var i = 0; i < 4; i++)
        {
            //  Create a new sprite at a random world location
            var ice = icebergs.create(this.world.randomX, this.rnd.integerInRange(1200,2000), 'eye_mine');
            ice.name = 'obstacle' + i;
            ice.body.velocity.x = this.rnd.integerInRange(-3, 3);
            ice.body.velocity.y = this.rnd.integerInRange(-10, 10);
        }
        
        
        
        // add keys
        cursors = this.input.keyboard.createCursorKeys();
        
        
        this.camera.follow(this.player);

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
        this.physics.arcade.collide(this.player, icebergs, this.collisionHandler, null, this);

        // always moving down
        this.player.body.velocity.y = 100;
        
        
        // first stab at some touch controls
        
        if (this.input.activePointer.x < 200 && this.input.activePointer.isDown)
        {
            this.player.body.velocity.x = -150;
            this.player.rotation = -(Math.PI/7);
        }
        
        if (this.input.activePointer.x > 400 && this.input.activePointer.isDown)
        {
            this.player.body.velocity.x = 150;
            this.player.rotation = Math.PI/7;
        }
        
        else if (!this.input.activePointer.isDown)
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
        this.state.start('main');
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
    }
}


    