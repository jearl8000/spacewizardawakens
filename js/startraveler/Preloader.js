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
        
        // three background images for the tunnel
        this.load.image('tunnel1', '../../assets/traveler/star_traveler_tunnel1.png');
        this.load.image('tunnel2', '../../assets/traveler/star_traveler_tunnel2.png');
        this.load.image('tunnel3', '../../assets/traveler/star_traveler_tunnel3.png');
        
        // load the ship sprite
        this.load.image('ship', '../../assets/traveler/traveler_ship.png');
        
        // touch controls
        // this.load.spritesheet('CCW_arrow', '../../assets/traveler/CCW_arrow.png', 79, 60);
        // this.load.spritesheet('CW_arrow', '../../assets/traveler/CW_arrow.png', 79, 60);
        this.load.spritesheet('CCW_arrow', '../../assets/traveler/traveler_ccw_arrow.png', 64, 64);
        this.load.spritesheet('CW_arrow', '../../assets/traveler/traveler_cw_arrow.png', 64, 64);
        
        // load the obstacles
        this.load.spritesheet('debris_cube', '../../assets/traveler/tumbling_cube.png', 64, 64);
        
    },
    
    create: function() {
        this.preloadBar.cropEnabled = false;
    },
    
    update: function() {
        this.ready = true;
        this.state.start('StartMenu');
    }
}