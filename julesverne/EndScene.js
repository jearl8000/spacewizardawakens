JulesVerne.EndScene = function(game) {
}

var rebels, rebel1, rebel2, rebel3, rebel4;
var rebtween1, rebtween2, rebtween3, rebtween4; 
var style = { font: "24px Courier", fill: "#FFFFFF", align: "center" };
var narration = ["I think I've reached the target area...",
    "Wait, I don't see any accident.",
    "What are those craft?\nWhat are those markings?",
    "My controls are frozen!",
    "Uh oh, they've seen me..."
];

JulesVerne.EndScene.prototype = {
    create: function() {
        
        this.world.setBounds(0, 0, 600, 800);
        this.stage.backgroundColor = '#0A9CB1';
        
        // display the player on the screen
        this.player = this.game.add.sprite(300, 50, 'player');
        this.player.anchor.set(0.5);
        this.player.animations.add('Motor', [0, 1, 2], 3, true);
        this.player.animations.play('Motor', 10, true);
        
        this.physics.arcade.enable(this.player, Phaser.Physics.ARCADE);
        
        // make the player's hitbox a little smaller
        //this.player.body.setSize(80, 40, 20, 10);
        
        // add tween to slowly move player to midscreen
        var player_tween = this.add.tween(this.player).to({ x: 300, y: 350 }, 4000, "Quad", true, 0, 0, false);
        
        
        //enemy sprites!
        var nautilus = this.game.add.sprite(250, 650, 'nautilus');
        rebels = this.add.group();
        
        // this is way too many lines, should be a for loop
        rebels.enableBody = true;
        rebels.physicsBodyType = Phaser.Physics.ARCADE;
        
        rebel1 = rebels.create(this.rnd.integerInRange(-50,500), this.rnd.integerInRange(450,700), 'drillsub');
        rebel2 = rebels.create(this.rnd.integerInRange(0,300), this.rnd.integerInRange(450,700), 'drillsub');
        rebel3 = rebels.create(this.rnd.integerInRange(0,400), this.rnd.integerInRange(450,700), 'rebel_sub');
        rebel4 = rebels.create(this.rnd.integerInRange(-50,500), this.rnd.integerInRange(450,700), 'rebel_sub');
        
        rebel1.body.velocity.x = this.rnd.integerInRange(-20, 20);
        rebel1.body.velocity.y = this.rnd.integerInRange(-3, 3);
        rebel1.body.collideWorldBounds = true;
        rebel1.body.bounce.set(1);
        
        rebel2.body.velocity.x = this.rnd.integerInRange(-20, 20);
        rebel2.body.velocity.y = this.rnd.integerInRange(-3, 3);
        rebel2.body.collideWorldBounds = true;
        rebel2.body.bounce.set(1);

        rebel3.body.velocity.x = this.rnd.integerInRange(-20, 20);
        rebel3.body.velocity.y = this.rnd.integerInRange(-3, 3);
        rebel3.body.collideWorldBounds = true;
        rebel3.body.bounce.set(1);

        rebel4.body.velocity.x = this.rnd.integerInRange(-20, 20);
        rebel4.body.velocity.y = this.rnd.integerInRange(-3, 3);
        rebel4.body.collideWorldBounds = true;
        rebel4.body.bounce.set(1);
        
        // var rebel_tween1 = this.add.tween(rebel1).to({ x: 240, y: 300 }, 4000, "Quad", true, 2000, 0, false);

        this.showMessage(0);
        /*
        var text1 = this.add.text(this.world.centerX, 100, narration[0], style);
        text1.anchor.set(0.5);
        var text_tween1 = this.add.tween(text1).to({ alpha: 0 }, 1000, "Quad", true, 2000, 0, false);
        text_tween1.onComplete.add(function() { text1.destroy(); this.showMessage() }, this);
        */
        
    },
    
    update: function() {
        // add timers or something for text messages
        
        
        // enemy ships come up to meet player, run menu when they reach it
        // object1, object2, collideCallback, processCallback, callbackContext
        this.physics.arcade.collide(this.player, rebels, this.endMenu, null, this);
    },
    
    /*
    showMessage: function() {
        var text2 = this.add.text(this.world.centerX, 100, narration[1], style);
        text2.anchor.set(0.5);
        var text_tween2 = this.add.tween(text2).to({ alpha: 0 }, 1000, "Quad", true, 2000, 0, false);
        text_tween2.onComplete.add(function() { text2.destroy(); }, this);
    },*/
    
    showMessage: function(i) {
        if (i >= narration.length) {
            this.rebelSwarm();
            return;
        }
        var text = this.add.text(this.world.centerX, 100, narration[i], style);
        text.anchor.set(0.5);
        var text_tween = this.add.tween(text).to({ alpha: 0 }, 1000, "Quad", true, 2000, 0, false);
        text_tween.onComplete.add(function() { text.destroy(); this.showMessage(++i)}, this);
    },
    

    rebelSwarm: function() {
        rebtween1 = this.add.tween(rebel1).to({ x: 240, y: 300 }, 4500, "Quad", true, 500, 0, false);
        rebtween2 = this.add.tween(rebel2).to({ x: 240, y: 300 }, 4000, "Quad", true, 1000, 0, false);
        rebtween3 = this.add.tween(rebel3).to({ x: 240, y: 300 }, 4500, "Quad", true, 1500, 0, false);
        rebtween4 = this.add.tween(rebel4).to({ x: 240, y: 300 }, 4000, "Quad", true, 2000, 0, false);
    },
    
    endMenu: function() {
        
        var end_message = this.add.image(this.world.centerX-240, this.world.centerY-300, 'endscreen');
        
        var menu_restart = this.add.image (this.world.centerX-125, this.world.centerY, 'menu_play_again');
        var menu_next = this.add.image (this.world.centerX-125, this.world.centerY+35, 'menu_next_track');
        var menu_list = this.add.image (this.world.centerX-125, this.world.centerY+70, 'menu_track_list');
        
        menu_restart.inputEnabled = true;
        menu_restart.events.onInputDown.addOnce(this.startGame, this);
        
        menu_next.inputEnabled = true;
        menu_next.events.onInputDown.addOnce(function() { window.location = "../ageofscience/index.html"; }, this);
        
        menu_list.inputEnabled = true;
        menu_list.events.onInputDown.addOnce(function() { window.location = "../index.html"; }, this);
        
    },
    
    startGame: function(pointer) {
        this.state.start('main');
    }
    
}