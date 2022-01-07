
class PreloadScene extends Phaser.Scene {

    constructor(config) {
        super('PreloadScene');
        this.config = config;
    }

    preload() {
        this.loadMap();
        this.loadPlayer();
        this.load.once('complete', () => {
            this.startGame();
        });
    }

    loadMap() {
        this.load.tilemapTiledJSON('map', 'assets/tilesets/TileMap.json');
        this.load.image('foreground', 'assets/tilesets/thetowertop_foreground.png');
        this.load.image('movingblocks', 'assets/tilesets/thetowertop_moving.blocks.png');
    }

    loadPlayer() {
        this.load.image('knight-1', 'assets/player/knight1.png');
        this.load.image('knight-2', 'assets/player/knight2.png');
        this.load.image('knight-3', 'assets/player/knight3.png');
        this.load.image('knight-4', 'assets/player/knight4.png');
        this.load.image('knight-5', 'assets/player/knight5.png');
        this.load.image('knight-6', 'assets/player/knight6.png');
        this.load.image('knight-7', 'assets/player/knight7.png');
        this.load.image('knight-8', 'assets/player/knight8.png');
        this.load.image('knight-9', 'assets/player/knight9.png');
    }

    startGame() {
        this.scene.start('PlayScene');
    }

}

export default PreloadScene;
