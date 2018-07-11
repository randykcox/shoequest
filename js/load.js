var loadState = {

    // Standard Phaser function
    preload: function () {

        var loadingLabel = game.add.text(80, 150, 'Loading...',
            {font: '30px Courier', fill: '#ffffff'});

        // Load all of the assets
        game.load.spritesheet('man', 'assets/manSpritesheet.png', 32, 32);
        game.load.spritesheet('shoe', 'assets/shoeSpritesheet.png', 8, 5);
        game.load.image('block', 'assets/win.png');
    },

    create: function () {
        // Call the menu state
        game.state.start('menu');
    }
};
