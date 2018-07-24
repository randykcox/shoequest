import Phaser from 'phaser';

let titleScene = new Phaser.Scene('title');
let keys;

titleScene.preload = function preload () {
    this.load.spritesheet('man', 'assets/manSpritesheet.png', {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.spritesheet('shoe', 'assets/shoeSpritesheet.png', {
        frameWidth: 8,
        frameHeight: 5
    });
};

titleScene.create = function create () {
    const titleText = this.add.text(80, 120, 'Shoe Quest', {
        fontSize: '40px',
        fill: '#fff'
    });

    const startText = this.add.text(80, this.sys.game.config.height-80,
        'press space to start',
        {
        fontSize: '25px',
        fill: '#fff'
    });

    this.input.keyboard.once('keydown_SPACE', function () { 
        console.log('Changing scenes: play');
        this.scene.switch('play');
    }, this);
};

titleScene.update = function update () {
};

export default titleScene;