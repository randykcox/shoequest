var game = new Phaser.Game(
                640,           // width
                480,            // height
                Phaser.AUTO,    // renderer
                'gameDiv',      // DOM ID of parent container
                null,           // default state object
                false,          // use transparent canvas background
                false,          // antialias image textures?
                null            // physics config object
            );

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('dead', deadState);
game.state.add('win',  winState);

// Start the game by calling the boot state
game.state.start('boot');
