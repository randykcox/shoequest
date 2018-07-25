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
    platforms.create(0, 240, 'block').setScale(60, 3).refreshBody();

    //
    // Player
    //
    player = this.physics.add.sprite(this.sys.game.config.width/2, 180, 'man');
    player.body.setSize(6, 25, true);
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
        key: 'faceLeft',
        frames: this.anims.generateFrameNumbers('man', { start: 7, end: 7 }),
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

    this.physics.add.collider(player, platforms);

    //
    // Shoe
    //
    shoe = this.physics.add.sprite(20, 210, 'shoe');
    shoe.body.setSize(4, 1, true);
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
    if (this.cursors.left.isDown || this.cursors.A.isDown) {
        player.setVelocityX(-90);
        player.stoppingAnim = 'faceLeft';
        if (this.cursors.up.isDown || this.cursors.W.isDown) {
            player.anims.play('walkLeftLookUp', true);
        } else {
            player.anims.play('walkLeft', true);
        }
    }
    else if (this.cursors.right.isDown || this.cursors.D.isDown) {
        player.setVelocityX(90);
        player.stoppingAnim = 'faceRight';
        if (this.cursors.up.isDown || this.cursors.W.isDown) {
            player.anims.play('walkRightLookUp', true);
        } else {
            player.anims.play('walkRight', true);
        }
    }
    else if (this.cursors.down.isDown || this.cursors.S.isDown) {
        player.setVelocityX(0);
        player.anims.play('spin', true);
    }
    else if (this.cursors.up.isDown || this.cursors.W.isDown) {
        player.setVelocityX(0);
        player.anims.play('faceFront', true);
        player.stoppingAnim = 'faceFront';
    }
    else {
        player.setVelocityX(0);
        // player.anims.stop();
        player.anims.play(player.stoppingAnim);
    }

    // Falling off the bottom of the screen
    if (player.y > this.sys.game.config.height) {
        this.dead();
    }
}

playScene.stopPlayer = function stopPlayer () {
}

playScene.win = function win (player, shoe) {
    shoe.disableBody(true, true);
    scoreText.setText('You win.');

    this.backToTitle();
}

playScene.dead = function dead () {
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

/*
var playState = {

    create: function () {

        //
        // Blocks
        //
        this.blocks = game.add.group();
        this.blocks.enableBody = true;

        game.add.sprite(
            0, game.world.centerY + 50,
            'block', 0, this.blocks)
            .scale.setTo(30, 1);

        this.blocks.setAll('body.immovable', true);

        //
        // Player
        //
        this.man = game.add.sprite(
            game.world.centerX, game.world.centerY, 'man', 1);
        this.man.scale.setTo(3);
        this.man.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7], 8, true);
        this.man.animations.add('right', [15, 8, 9, 10, 11, 12, 13, 14], 13, true);
        this.man.animations.add('left', [23, 16, 17, 18, 19, 20, 21, 22], 13, true);

        // Set the center of the sprite as the anchor point
        this.man.anchor.setTo(0.5, 0.5);

        game.physics.arcade.enable(this.man);
        this.man.body.setSize(6, 25, 10, 10);
        this.man.body.gravity.y = 500;

        //
        // Shoe
        //
        this.shoe = game.add.sprite(50, game.world.centerY, 'shoe');
        this.shoe.scale.setTo(3);
        this.shoe.animations.add('glow', [0,1,2,3], 3, true);
        this.shoe.anchor.setTo(0, 0);
        game.physics.arcade.enable(this.shoe);
        this.shoe.body.setSize(4, 1, 2, 6);
        this.shoe.body.gravity.y = 500;

        this.shoe.animations.play('glow');



        //
        // Input
        //
        this.cursor = game.input.keyboard.createCursorKeys();
    },

    update: function () {
        game.physics.arcade.collide(this.man, this.blocks);
        game.physics.arcade.collide(this.shoe, this.blocks);
        game.physics.arcade.collide(this.shoe, this.man, this.win, null, true);

        this.movePlayer();

        // If the player has left the world, HE DIES!!
        if (!this.man.inWorld) {
            this.dead();
        }
    },

    movePlayer: function () {

        if (this.cursor.left.isDown) {
            // move player left
            this.man.animations.play('left');
            this.man.body.velocity.x = -90;
            this.man.standingFrame = 7;
        }

        else if (this.cursor.right.isDown) {
            // move player right
            this.man.animations.play('right');
            this.man.body.velocity.x = 90;
            this.man.standingFrame = 3;
        }

        else if (this.cursor.up.isDown) {
            // face back
            this.man.animations.stop();
            this.man.frame = this.man.standingFrame = 5;
        }

        else if (this.cursor.down.isDown) {
            // face front
            this.man.animations.stop();
            this.man.frame = this.man.standingFrame = 1;
        }

        else {
            // No keys are pressed. Stop the player.
            this.man.animations.stop();
            this.man.frame = this.man.standingFrame;
            this.man.body.velocity.x = 0;
        }
    },

    // called when the user wins the game
    win: function () {
        game.state.start('win');
    },

    dead: function () {
        game.state.start('dead');
    }
};
*/