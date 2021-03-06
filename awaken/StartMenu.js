Awaken.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
}

Awaken.StartMenu.prototype = {
    create: function() {
        startBG = this.add.image(0, 0, 'titlescreen');
        startBG.inputEnabled = true;
        startBG.events.onInputDown.addOnce(this.startGame, this);
        
        startPrompt = this.add.bitmapText(this.world.centerX-130, this.world.centerY+120, '8bitwonderwhite', 'Touch to Start!', 20);
    },
    
    startGame: function(pointer) {
        this.state.start('main');
    }
}