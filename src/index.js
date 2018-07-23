import 'phaser';

import menuScene from './menu';
import playScene from './play';

var game = new Phaser.Game({
    type: Phaser.AUTO,    // renderer
    width: 640,
    height: 480,
    backgroundColor: '#aaaacc',
    render: {
        pixelArt: true,
        transparent: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: [ menuScene, playScene ],
    parent: 'gameDiv'
                // 'gameDiv',      // DOM ID of parent container
                // null,           // default state object
                // false,          // use transparent canvas background
                // false,          // antialias image textures?
                // null            // physics config object
});

// game.state.add('boot', bootState);
// game.state.add('load', loadState);
// game.state.add('menu', menuState);
// game.state.add('play', playState);
// game.state.add('dead', deadState);
// game.state.add('win',  winState);

// Start the game by calling the boot state
// game.state.start('boot');



