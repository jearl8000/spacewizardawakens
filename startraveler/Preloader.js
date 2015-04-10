StarTraveler.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.ready = false;
};

StarTraveler.Preloader.prototype = {
    
    preload: function() {
        this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloadBar');
        this.preloadBar.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.preloadBar, 0);
        this.titleText = this.add.image(this.world.centerX, this.world.centerY-100, 'titleimage');
        this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', 'assets/star_traveler_title.png');
        this.load.image('defeat_message', 'assets/crash_restart.png');
        this.load.image('endscreen', 'assets/star_traveler_win_screen.png');
        this.load.image('menu_play_again', 'assets/menu_play_again.png');
        this.load.image('menu_next_track', 'assets/menu_next_track.png');
        this.load.image('menu_track_list', 'assets/menu_track_list.png');
        
        
        this.load.bitmapFont('8bitwonderwhite', '../assets/8bitwhite_font/8bitwhite.png', '../assets/8bitwhite_font/8bitwhite.fnt');
        
        // change the background color
        this.stage.backgroundColor = '#222222';
        
        // three background images for the tunnel
        this.load.image('tunnel1', 'assets/star_traveler_tunnel1.png');
        this.load.image('tunnel2', 'assets/star_traveler_tunnel2.png');
        this.load.image('tunnel3', 'assets/star_traveler_tunnel3.png');
        
        // load the ship sprite
        // this.load.image('ship', 'assets/traveler_ship2.png');
        this.load.spritesheet('ship', 'assets/star_traveler_ship_sprite.png', 92, 92);
        
        // touch controls
        this.load.spritesheet('CCW_arrow', 'assets/CCW_arrow.png', 69, 80);
        this.load.spritesheet('CW_arrow', 'assets/CW_arrow.png', 69, 80);
        // this.load.spritesheet('CCW_arrow', 'assets/traveler_ccw_arrow.png', 64, 64);
        // this.load.spritesheet('CW_arrow', 'assets/traveler_cw_arrow.png', 64, 64);
        
        // load the obstacles
        this.load.spritesheet('debris_cube', 'assets/tumbling_cube.png', 64, 64);
        this.load.spritesheet('debris_rock', 'assets/spacerock2_512x64.png', 64, 64);
        
    },
    
    create: function() {
        this.preloadBar.cropEnabled = false;
    },
    
    update: function() {
        this.ready = true;
        this.state.start('StartMenu');
    }
}