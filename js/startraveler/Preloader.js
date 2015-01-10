StarTraveler.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

StarTraveler.Preloader.prototype = {
    
    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.titleText = this.add.image(this.world.centerX, this.world.centerY-100, 'titleimage');
        this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', '../../assets/traveler/star_traveler_title.png');
        
        this.load.bitmapFont('8bitwonderwhite', '../../assets/8bitwhite_font/8bitwhite.png', '../../assets/8bitwhite_font/8bitwhite.fnt');
        
        // change the background color
        this.stage.backgroundColor = '#222222';
        
        // starting background image
        this.load.image('background', '../../assets/traveler/star_traveler_tunnel1.png');
        
        // load the ship sprite
        this.load.image('ship', '../../assets/traveler/traveler_ship.png');
        
        // touch controls
        this.load.spritesheet('CCW_arrow', '../../assets/traveler/CCW_arrow.png', 79, 60);
        this.load.spritesheet('CW_arrow', '../../assets/traveler/CW_arrow.png', 79, 60);
        
        // load the obstacle image
        this.load.image('debris_cube', '../../assets/traveler/tumbling_cube.png');
        
    },
    
    create: function() {
        this.preloadBar.cropEnabled = false;
    },
    
    update: function() {
        this.ready = true;
        this.state.start('StartMenu');
    }
}