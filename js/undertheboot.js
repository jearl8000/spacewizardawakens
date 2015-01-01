// Initialize Phaser, and create a 800 x 800 px game
var game = new Phaser.Game(800, 800, Phaser.AUTO, 'gameDiv');

var cursors;

// create our 'main' state that will contain the game
var mainState = {
    
    preload: function () {
        
        // change the background color
        game.stage.backgroundColor = '#000000';
        
        // game.load.tilemap('map', 'assets/maze_run.json', null, Phaser.Tilemap.TILED_JSON);
        // game.load.image('tiles_doodle32x32x6', 'assets/tiles_doodle32x32x6.png');
        
        
        game.load.tilemap('map', '../assets/under_the_boot.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('pink_blue_32_tile', '../assets/pink_blue_32_tile.png');
        
        
        // load the player sprite
        // game.load.image('dude', 'assets/ship.png');
        // game.load.spritesheet('dude', 'assets/redman_run_sheet.png', 32, 32);
        game.load.spritesheet('dude', '../assets/running_suit_32_32_11.png', 32, 32);
        
        // load the enemy image
        // game.load.image('enemy', 'assets/enemy.png');
        game.load.image('spotlight', '../assets/spotlight_dithered_128.png');
        
        // and the exit
        game.load.image('exit', '../assets/exit.png');
        
    },
    
    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        
        map = game.add.tilemap('map');

        map.addTilesetImage('pink_blue_32_tile');

        map.setCollisionBetween(0, 4);

        layer = map.createLayer('Tile Layer 1');

        layer.resizeWorld();

        // set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // display the player on the screen
        this.dude = this.game.add.sprite(50, 700, 'dude');
        this.dude.anchor.set(0.5);
        
        game.physics.arcade.enable(this.dude);
        
        //where's the exit
        this.exit = this.game.add.sprite(680, 180, 'exit');
        game.physics.enable(this.exit, Phaser.Physics.ARCADE);
        
        // display the enemy on the screen
        // this.spotlight = this.game.add.sprite(100, 100, 'spotlight');
        // this.spotlight.enableBody = true;
        
        this.spotlight = this.game.add.sprite(100, 280, 'spotlight');
        this.spotlight.anchor.set(0.5);
        this.spotlight.checkWorldBounds = true;
        
        game.physics.enable(this.spotlight, Phaser.Physics.ARCADE);

        this.spotlight.body.collideWorldBounds = true;
        this.spotlight.body.bounce.set(1);
        
        this.spotlight.body.velocity.y = 150;
        this.spotlight.body.velocity.x = 150;
        

        
        
        
        //  Our animations, standing idle, and walking left and right.
        this.dude.animations.add('idle', [0, 1, 2, 1], 3, true);
        this.dude.animations.add('right', [3, 4, 5, 6], 10, true);
        this.dude.animations.add('left', [7, 8, 9, 10], 10, true);
        

        // add keys
        cursors = game.input.keyboard.createCursorKeys();

    },
    
    update: function () {
        // This function is called 60 times a second
        // It contains the game logic
        
        game.physics.arcade.collide(this.dude, layer);
        
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
            if (game.physics.arcade.distanceToPointer(this.dude, game.input.activePointer) > 8)
            {
                //  Make the object seek to the active pointer (mouse or touch).
                game.physics.arcade.moveToPointer(this.dude, 300);
            }
            else
            {
                //  Otherwise turn off velocity because we're close enough to the pointer
                this.dude.animations.play('idle');
                this.dude.body.velocity.set(0);
            }

            // run left if the pointer's to the left
            if (this.dude.body.x > game.input.x && game.physics.arcade.distanceToPointer(this.dude, game.input.activePointer) > 8) {
                this.dude.animations.play('left');  
            }
        
            // run right if the pointer's to the right
            if (this.dude.body.x < game.input.x && game.physics.arcade.distanceToPointer(this.dude, game.input.activePointer) > 8) {
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
        
        game.physics.arcade.overlap(this.dude, this.exit, this.victory, null, this);
        game.physics.arcade.overlap(this.dude, this.spotlight, this.defeat, null, this);
    },
    
    restartGame: function () {
        // start the 'main' state, which restarts the game
        game.state.start('main');
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

// Add and start the 'main' state to start the game
game.state.add('main', mainState);
game.state.start('main');
    
    
    