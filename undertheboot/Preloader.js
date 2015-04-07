UnderTheBoot.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

UnderTheBoot.Preloader.prototype = {
    
    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar);
        this.titleText = this.add.image(this.world.centerX, this.world.centerY-100, 'titleimage');
        this.titleText.anchor.setTo(0.5, 0.5);
        
        this.stage.backgroundColor = '#000000';
        
        this.load.tilemap('map', 'assets/under_the_boot.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('pink_blue_32_tile', 'assets/pink_blue_32_tile.png');
        
        this.load.spritesheet('dude', 'assets/running_suit_32_32_11.png', 32, 32);
        this.load.image('spotlight', 'assets/spotlight_dithered_128.png');
        
        this.load.image('exit', 'assets/exit.png');
        
        this.load.image('titlescreen', 'assets/undertheboot_title.png');

        this.load.bitmapFont('8bitwonderwhite', '../assets/8bitwhite_font/8bitwhite.png', '../assets/8bitwhite_font/8bitwhite.fnt');
        
        this.load.bitmapFont('8bitwonderbluepink', '../assets/8bitbluepink_font/8bitbluepink.png', '../assets/8bitbluepink_font/8bitbluepink.fnt');
        
    },
    
    create: function() {
        this.preloadBar.cropEnabled = false;
    },
    
    update: function() {
        this.ready = true;
        this.state.start('StartMenu');
    }
}

