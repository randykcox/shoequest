import Phaser from 'phaser';
import titleImageUrl from '../assets/title.png';

let titleScene = new Phaser.Scene('title');

titleScene.preload = function preload () {
    this.load.image('titleImg', titleImageUrl);
};

titleScene.create = function create () {
    const centerX = this.sys.game.config.width/2;
    const centerY = this.sys.game.config.height/2

    this.add.image(centerX, centerY, 'titleImg')
        .setScale(5);

    const startText = this.add.text(
        centerX, this.sys.game.config.height-80,
        'press space to start',
        {
        fontSize: '25px',
        fill: '#fff'
    });
    startText.setOrigin(0.5, 0.5);

    const versionText = this.add.text(5, this.sys.game.config.height-20,
        `v${VERSION}`, // global variable created by webpack.DefinePlugin
        { fontSize: '15px', fill: '#9999bb' });

    this.input.keyboard.once('keydown_SPACE', function () { 
        const fadeDuration = 250;
        this.cameras.main.fade(fadeDuration);
        this.time.delayedCall(fadeDuration, function () { this.scene.start('play'); },
            [], this);
    }, this);
};

titleScene.update = function update () {
};

export default titleScene;