import Phaser from 'phaser';
import manImageURL from '../assets/manSpritesheet.png';
import shoeImageURL from '../assets/shoeSpritesheet.png';
import blockImageURL from '../assets/block.png';

var playScene = new Phaser.Scene('play');
playScene.preload = function preload () {
    this.load.spritesheet('man', manImageURL, {
        frameWidth: 32,
        frameHeight: 32
    });
    this.load.spritesheet('shoe', shoeImageURL, {
        frameWidth: 8,
        frameHeight: 5
    });
    this.load.image('block', blockImageURL);
};
var platforms;
var player;
var shoe;
var scoreText;

playScene.create = function create () {

    //
    // Platforms
    //
    platforms = this.physics.add.staticGroup();
    platforms.create(0, 240, 'block').setScale(60, 1).refreshBody();

    //
    // Player
    //
    player = this.physics.add.sprite(this.sys.game.config.width/2, 180, 'man');
    player.body.setSize(6, 25).setOffset(7, 7);
    player.setScale(3);
    player.setBounce(0.2);
    player.setCollideWorldBounds(false);
    this.anims.create({
        key: 'walkLeft',
        frames: this.anims.generateFrameNumbers('man', { frames: [23, 16, 17, 18, 19, 20, 21, 22] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'walkLeftLookUp',
        frames: this.anims.generateFrameNumbers('man', { frames: [39, 32, 33, 34, 35, 36, 37, 38] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'walkLeftLookDown',
        frames: this.anims.generateFrameNumbers('man', { frames: [55, 48, 49, 50, 51, 52, 53, 54] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'walkRight',
        frames: this.anims.generateFrameNumbers('man', { frames: [15, 8, 9, 10, 11, 12, 13, 14] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'walkRightLookUp',
        frames: this.anims.generateFrameNumbers('man', { frames: [31, 24, 25, 26, 27, 28, 29, 30] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'walkRightLookDown',
        frames: this.anims.generateFrameNumbers('man', { frames: [47, 40, 41, 42, 43, 44, 45, 46] }),
        frameRate: 13,
        repeat: -1
    });
    this.anims.create({
        key: 'faceLeft',
        frames: this.anims.generateFrameNumbers('man', { start: 7, end: 7 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'faceLeftLookUp',
        frames: this.anims.generateFrameNumbers('man', { start: 58, end: 58 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'faceLeftLookDown',
        frames: this.anims.generateFrameNumbers('man', { start: 59, end: 59 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'faceRight',
        frames: this.anims.generateFrameNumbers('man', { start: 3, end: 3 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'faceRightLookUp',
        frames: this.anims.generateFrameNumbers('man', { start: 56, end: 56 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'faceRightLookDown',
        frames: this.anims.generateFrameNumbers('man', { start: 57, end: 57 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'faceFront',
        frames: this.anims.generateFrameNumbers('man', { start: 1, end: 1 }),
        frameRate: 1,
        repeat: 0
    });
    this.anims.create({
        key: 'faceBack',
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
    player.stoppingAnim = 'faceFront';
    this.playerIsAlive = true;

    this.physics.add.collider(player, platforms);

    //
    // Shoe
    //
    shoe = this.physics.add.sprite(20, 210, 'shoe');
    shoe.body.setSize(4, 2).setOffset(2, 1);
    shoe.setScale(3);
    this.anims.create({
        key: 'glow',
        frames: this.anims.generateFrameNumbers('shoe', { start: 0, end: 3 }),
        frameRate: 3,
        repeat: -1
    });
    shoe.anims.play('glow', true);
    this.physics.add.collider(shoe, platforms);

    this.physics.add.overlap(player, shoe, this.win, null, this);

    //
    // Text
    //
    scoreText = this.add.text(16, 16, '', { fontSize: '32px', fill: '#ddd'});

    //
    // Input
    //
    this.cursors = this.input.keyboard.createCursorKeys();
    this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.cursors.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}

playScene.update = function update () {
    if (!this.playerIsAlive) {
        return;
    }

    // Falling
    if (!player.body.onFloor()) {
        player.anims.play('spin', true);
    }
    else if (this.cursors.left.isDown || this.cursors.A.isDown) {
        player.body.setSize(5, 25).setOffset(7, 7); // hit box is thinner for side view
        player.setVelocityX(-90);
        player.stoppingAnim = 'faceLeft'; // which anim to play when the player stops
        if (this.cursors.up.isDown || this.cursors.W.isDown) {
            player.anims.play('walkLeftLookUp', true);
        } else if (this.cursors.down.isDown || this.cursors.S.isDown) {
            player.anims.play('walkLeftLookDown', true);
        } else {
            player.anims.play('walkLeft', true);
        }
    }
    else if (this.cursors.right.isDown || this.cursors.D.isDown) {
        player.body.setSize(5, 25).setOffset(8, 7); // hit box is thinner for side view
        player.setVelocityX(90);
        player.stoppingAnim = 'faceRight';
        if (this.cursors.up.isDown || this.cursors.W.isDown) {
            player.anims.play('walkRightLookUp', true);
        } else if (this.cursors.down.isDown || this.cursors.S.isDown) {
            player.anims.play('walkRightLookDown', true);
        } else {
            player.anims.play('walkRight', true);
        }
    }
    else if (this.cursors.up.isDown || this.cursors.W.isDown) {
        player.body.setSize(6, 25).setOffset(7, 7); // hit box is wider
        player.setVelocityX(0);
        player.anims.play('faceBack', true);
        player.stoppingAnim = 'faceBack';
    }
    else if (this.cursors.down.isDown || this.cursors.S.isDown) {
        player.body.setSize(6, 25).setOffset(7, 7); // hit box is wider
        player.setVelocityX(0);
        player.anims.play('faceFront', true);
        player.stoppingAnim = 'faceFront';
    }
    else {
        player.setVelocityX(0);
        player.anims.play(player.stoppingAnim);
    }

    // Falling off the bottom of the screen
    if (player.y > this.sys.game.config.height) {
        this.dead();
    }
}

playScene.win = function win (player, shoe) {
    shoe.disableBody(true, true);
    scoreText.setText('You win.');

    this.backToTitle();
}

playScene.dead = function dead () {
    this.playerIsAlive = false;
    scoreText.setText('You are DEAD!');
    console.log('Dead.');
    this.backToTitle();
}

playScene.backToTitle = function backToTitle () {
    const titleDelay = 2000;

    // Fade out
    const fadeDuration = 250;
    this.time.delayedCall(titleDelay-fadeDuration, function () {
        this.cameras.main.fade(fadeDuration);
    }, [], this);
    // Back to the title
    this.time.delayedCall(titleDelay, function () { this.scene.start('title'); },
        [], this);
}

export default playScene;
