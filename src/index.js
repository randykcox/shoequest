import 'phaser';

import titleScene from './title';
import playScene from './play';

var game = new Phaser.Game({
    title: 'Shoe Quest',
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
    scene: [ titleScene, playScene ],
    parent: 'gameDiv'
});
