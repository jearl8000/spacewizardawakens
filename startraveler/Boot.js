var StarTraveler = {};

StarTraveler.Boot = function(game) {};

StarTraveler.Boot.prototype = {
    preload: function() {
        this.load.image('preloadBar', '../assets/loader_bar.png');
        this.load.image('titleimage', 'assets/traveler_title.png');
    },
    
    create: function() {
        this.input.maxPointers = 1;
        this.stage.disableVisibilityChange = false;
    
        this.input.addPointer();
        this.stage.backgroundColor = '#000000';
        
        this.state.start('Preloader');
    }   
    
}