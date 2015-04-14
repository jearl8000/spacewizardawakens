Awaken.main = function(game) {

};


Awaken.main.prototype = {
    
    create: function () {
        this.stage.backgroundColor = '#0A9CB1';
        this.add.tileSprite(0, 0, 800, 600, 'background');
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