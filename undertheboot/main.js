UnderTheBoot.main = function(game) {};

var cursors;

UnderTheBoot.main.prototype = {
        
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        
        map = this.add.tilemap('map');

        map.addTilesetImage('pink_blue_32_tile');

        map.setCollisionBetween(0, 4);

        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();

        // set the physics system
        this.physics.startSystem(Phaser.Physics.ARCADE);
        
        // display the player on the screen
        this.dude = this.game.add.sprite(50, 700, 'dude');
        this.dude.anchor.set(0.5);
        
        this.physics.arcade.enable(this.dude);
        
        //where's the exit
        this.exit = this.game.add.sprite(680, 180, 'exit');
        this.physics.enable(this.exit, Phaser.Physics.ARCADE);
        
        // display the enemy on the screen
        // this.spotlight = this.game.add.sprite(100, 100, 'spotlight');
        // this.spotlight.enableBody = true;
        
        this.spotlight = this.game.add.sprite(100, 280, 'spotlight');
        this.spotlight.anchor.set(0.5);
        this.spotlight.checkWorldBounds = true;
        
        this.physics.enable(this.spotlight, Phaser.Physics.ARCADE);

        this.spotlight.body.collideWorldBounds = true;
        this.spotlight.body.bounce.set(1);
        
        this.spotlight.body.velocity.y = 150;
        this.spotlight.body.velocity.x = 150;
        

        
        
        
        //  Our animations, standing idle, and walking left and right.
        this.dude.animations.add('idle', [0, 1, 2, 1], 3, true);
        this.dude.animations.add('right', [3, 4, 5, 6], 10, true);
        this.dude.animations.add('left', [7, 8, 9, 10], 10, true);
        

        // add keys
        cursors = this.input.keyboard.createCursorKeys();

    },
    
    update: function () {
        // This function is called 60 times a second
        // It contains the game logic
        
        this.physics.arcade.collide(this.dude, layer);
        
        // If the man leaves the world, call the 'restartGame' function
        if (this.dude.inWorld === false) {
            this.restartGame();
        }
        
        this.dude.body.velocity.x = 0;
        this.dude.body.velocity.y = 0;

        //  only move when you click
        // if (game.input.mousePointer.isDown)
        // {
            // game.physics.arcade.moveToPointer(this.dude, 350);
            
            //  If the sprite is > 8px away from the pointer then let's move to it
            if (this.physics.arcade.distanceToPointer(this.dude, this.input.activePointer) > 8)
            {
                //  Make the object seek to the active pointer (mouse or touch).
                this.physics.arcade.moveToPointer(this.dude, 300);
            }
            else
            {
                //  Otherwise turn off velocity because we're close enough to the pointer
                this.dude.animations.play('idle');
                this.dude.body.velocity.set(0);
            }

            // run left if the pointer's to the left
            if (this.dude.body.x > this.input.x && this.physics.arcade.distanceToPointer(this.dude, this.input.activePointer) > 8) {
                this.dude.animations.play('left');  
            }
        
            // run right if the pointer's to the right
            if (this.dude.body.x < this.input.x && this.physics.arcade.distanceToPointer(this.dude, this.input.activePointer) > 8) {
                this.dude.animations.play('right');  
            }
        
            /*  if it's overlapping the mouse, don't move any more
            if (Phaser.Rectangle.contains(this.dude.body, game.input.x, game.input.y))
            {
                this.dude.animations.play('idle');  
                this.dude.body.velocity.setTo(0, 0);
                
                // also, stand still
                // this.dude.animations.stop();
                // this.dude.frame = 4;
            } */
        // }
        
        if (cursors.left.isDown)
        {
            //  Move to the left
            this.dude.body.velocity.x = -150;

            this.dude.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            this.dude.body.velocity.x = 150;

            this.dude.animations.play('right');
        }
        else if (cursors.up.isDown)
        {
            //  Move up
            this.dude.body.velocity.y = -150;

            // player.animations.play('right');
        }
        else if (cursors.down.isDown)
        {
            //  Move down
            this.dude.body.velocity.y = 150;

            // player.animations.play('right');
        }
        else
        {
            //  Stand still
            // player.animations.stop();

            // player.frame = 4;
        }
        
        this.physics.arcade.overlap(this.dude, this.exit, this.victory, null, this);
        this.physics.arcade.overlap(this.dude, this.spotlight, this.defeat, null, this);
    },
    
    restartGame: function () {
        // start the 'main' state, which restarts the game
        this.state.start('main');
        this.dude.animations.play('idle');
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
    
};
    
    
    