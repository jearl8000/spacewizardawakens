Awaken.main = function(game) {

};


Awaken.main.prototype = {
    
    create: function () {
        this.stage.backgroundColor = '#0A9CB1';
        this.add.tileSprite(0, 0, 800, 600, 'background');
        
        this.add.sprite(46, 340, 'light_blue');
        this.add.sprite(584, 248, 'dark_blue');
        this.add.sprite(669, 203, 'light_pink');
        this.add.sprite(130, 285, 'dark_pink');
        
        this.add.sprite(468, 327, 'red_spot');
        
        
        this.add.sprite(46, 340, 'light_blue_lit');
        this.add.sprite(584, 248, 'dark_blue_lit');
        this.add.sprite(669, 203, 'light_pink_lit');
        this.add.sprite(130, 285, 'dark_pink_lit');
        this.add.sprite(468, 327, 'red_spot_lit');
        
    },
    
    update: function () {      
            
    },   
    
    restartGame: function () {
        // start the 'main' state, which restarts the game
        this.state.start('main');
    },
    
    victory: function () {
        // alert("You win!");
        // this.restartGame();
        this.state.start('EndScene');

    },
    
}