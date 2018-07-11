var game = new Phaser.Game({
    type: Phaser.AUTO,    // renderer
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
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

function preload () {
    this.load.spritesheet('man', 'assets/manSpritesheet.png', {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.spritesheet('shoe', 'assets/shoeSpritesheet.png', {
        frameWidth: 8,
        frameHeight: 5
    });
    this.load.image('block', 'assets/block.png');
}

var platforms;
var player;
var shoe;
var scoreText;
var cursors;

function create () {
    //
    // Platforms
    //
    platforms = this.physics.add.staticGroup();
    platforms.create(0, 240, 'block').setScale(30, 1).refreshBody();

    //
    // Player
    //
    player = this.physics.add.sprite(30, 150, 'man');
    player.setScale(3);
    // player.setSize(6, 25);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('man', { frames: [23, 16, 17, 18, 19, 20, 21, 22] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('man', { frames: [15, 8, 9, 10, 11, 12, 13, 14] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'front',
        frames: this.anims.generateFrameNumbers('man', { start: 1, end: 1 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'back',
        frames: this.anims.generateFrameNumbers('man', { start: 5, end: 5 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('man', { start: 0, end: 7 }),
        frameRate: 8,
        repeat: -1
    });

    this.physics.add.collider(player, platforms);

    //
    // Shoe
    //
    shoe = this.physics.add.sprite(10, 150, 'shoe');
    this.anims.create({
        key: 'glow',
        frames: this.anims.generateFrameNumbers('shoe', { start: 0, end: 3 }),
        frameRate: 3,
        repeat: -1
    });
    shoe.anims.play('glow', true);
    this.physics.add.collider(shoe, platforms);

    this.physics.add.overlap(player, shoe, win, null, this);

    //
    // Text
    //
    scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#ddd'});

    //
    // Input
    //
    cursors = this.input.keyboard.createCursorKeys();
}

function update () {
    if (cursors.left.isDown) {
        player.setVelocityX(-90);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(90);

        player.anims.play('right', true);
    }
    else if (cursors.down.isDown) {
        player.setVelocityX(0);
        player.anims.play('spin', true);
    }
    else if (cursors.up.isDown) {
        player.setVelocityX(0);
        player.anims.play('front', true);
    }
    else {
        player.setVelocityX(0);

        player.anims.stop();
    }
}

function win (player, shoe) {
    shoe.disableBody(true, true);
    scoreText.setText('You win.');
}