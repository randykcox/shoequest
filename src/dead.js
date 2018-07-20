var deadState = {

    create: function () {

        var nameLabel = game.add.text(80, 80, 'You are DEAD!',
            {font: '30px Arial', fill: '#baddad'});

        var startLabel = game.add.text(80, game.world.height-80,
            'press "W" to play again',
            {font: '25px Arial', fill: '#ffffff'});

        // Define a key that we can monitor for events
        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wkey.onDown.addOnce(this.start, this);
    },

    // called when the user presses 'W'
    start: function () {
        game.state.start('menu');
    }
};
