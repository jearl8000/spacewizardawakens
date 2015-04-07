StarTraveler.EndMenu = function(game) {
    this.endBG;
}

StarTraveler.EndMenu.prototype = {
    create: function() {
        endBG = this.add.image(0, 0, 'endscreen');
        
        var menu_restart = this.add.image (this.world.centerX-125, this.world.centerY, 'menu_play_again');
        var menu_next = this.add.image (this.world.centerX-125, this.world.centerY+35, 'menu_next_track');
        var menu_list = this.add.image (this.world.centerX-125, this.world.centerY+70, 'menu_track_list');

        menu_restart.inputEnabled = true;
        menu_restart.events.onInputDown.addOnce(this.startGame, this);
        
        menu_next.inputEnabled = true;
        menu_next.events.onInputDown.addOnce(function() { window.location = "../ministerofpropaganda/index.html"; }, this);
        
        menu_list.inputEnabled = true;
        menu_list.events.onInputDown.addOnce(function() { window.location = "../index.html"; }, this);
        
    },
    
    startGame: function(pointer) {
        this.state.start('main');
    }
}
