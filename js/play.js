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
