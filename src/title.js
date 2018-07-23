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

//////////////////
/*
var titleState = {

    create: function () {

        this.stage.backgroundColor = '#9c9c9c';

        var nameLabel = game.add.text(80, 80, 'Shoe Quest',
            {font: '30px Arial', fill: '#ffffff'});

        var startLabel = game.add.text(80, game.world.height-80,
            'press "W" to start',
            {font: '25px Arial', fill: '#ffffff'});

        // Define a key that we can monitor for events
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wkey.onDown.addOnce(this.start, this);

        var man = this.game.add.sprite(100, 150, 'man');
        man.scale.setTo(2,2);
        man.frame = 2;
        man.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        man.animations.add('right', [8, 9, 10, 11, 12, 13, 14, 15], 8, true);
        man.animations.add('left', [16, 17, 18, 19, 20, 21, 22, 23], 8, true);

        man.animations.play('spin');

        var shoe = this.game.add.sprite(250, 150, 'shoe');
        shoe.scale.setTo(2);
        shoe.animations.add('glow', [0,1,2,3], 3, true);
        shoe.animations.play('glow');
    },

    // called when the user presses 'W'
    start: function () {
        game.state.start('play');
    }
};
*/
