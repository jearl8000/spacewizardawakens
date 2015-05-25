Awaken.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

Awaken.Preloader.prototype = {
    
    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar, 0);
        this.titleText = this.add.image(this.world.centerX, this.world.centerY-100, 'titleimage');
        this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', 'assets/main_title.png');

        this.load.image('background', 'assets/jupiter_background.png');
        this.load.image('finale', 'assets/jupiter_glowing_endscreen.png');
        this.load.image('endBG', 'assets/end_of_disc_one.png');
        
        this.load.image('light_blue', 'assets/light_blue.png');
        this.load.image('light_blue_lit', 'assets/light_blue_lit.png');
        this.load.image('dark_blue', 'assets/dark_blue.png');
        this.load.image('dark_blue_lit', 'assets/dark_blue_lit.png');
        this.load.image('light_pink', 'assets/light_pink.png');
        this.load.image('light_pink_lit', 'assets/light_pink_lit.png');
        this.load.image('dark_pink', 'assets/dark_pink.png');
        this.load.image('dark_pink_lit', 'assets/dark_pink_lit.png');
        this.load.image('red_spot', 'assets/red_spot.png');
        this.load.image('red_spot_lit', 'assets/red_spot_lit.png');
        
        
        this.load.image('menu_play_again', '../assets/menu_play_again.png');
        this.load.image('menu_next_track', '../assets/menu_next_track.png');
        this.load.image('menu_track_list', '../assets/menu_track_list.png');
        
        
        this.load.bitmapFont('8bitwonderwhite', '../assets/8bitwhite_font/8bitwhite.png', '../assets/8bitwhite_font/8bitwhite.fnt');
        
        // change the background color
        this.stage.backgroundColor = '#222222';
        
        
    },
    
    create: function() {
        this.preloadBar.cropEnabled = false;
    },
    
    update: function() {
        this.ready = true;
        this.state.start('StartMenu');
    }
}