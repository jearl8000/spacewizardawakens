JulesVerne.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

JulesVerne.Preloader.prototype = {
    
    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.titleText = this.add.image(this.world.centerX, this.world.centerY-100, 'titleimage');
        this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', 'assets/europa_background.png');
        // this.load.image('titlescreen', '../../assets/europa/julesverne_title.png');
        this.load.bitmapFont('8bitwonderbluepink', '../assets/8bitbluepink_font/8bitbluepink.png', '../assets/8bitbluepink_font/8bitbluepink.fnt');
        
        this.load.image('background', 'assets/europa_background.png');
        this.load.image('player', 'assets/submarine.png');
        
        this.load.image('ice_sm', 'assets/ice_1.png');
        this.load.image('ice_md', 'assets/ice_2.png');
        this.load.image('ice_lg', 'assets/ice_3.png');
        this.load.image('eye_mine', 'assets/eye_mine.png');
    },
    
    create: function() {
        this.preloadBar.cropEnabled = false;
    },
    
    update: function() {
        this.ready = true;
        this.state.start('StartMenu');
    }
}