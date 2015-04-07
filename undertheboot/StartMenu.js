UnderTheBoot.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
}

UnderTheBoot.StartMenu.prototype = {
    create: function() {
        // startBG = this.add.image(0, 0, 'titlescreen');
        startBG = this.add.image(this.world.centerX-200, this.world.centerY-200, 'titleimage');
        startBG.inputEnabled = true;
        startBG.events.onInputDown.addOnce(this.startGame, this);
        
        startPrompt = this.add.bitmapText(this.world.centerX-125, this.world.centerY+100, '8bitwonderwhite', 'Touch to Start!', 20);
    },
    
    startGame: function(pointer) {
        this.state.start('main');
    }
}