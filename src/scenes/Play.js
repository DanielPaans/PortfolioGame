import Player from "../entities/Player";

class PlayScene extends Phaser.Scene {

    constructor(config) {
        super('PlayScene');
        this.config = config;
    }

    create() {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones);

        const player = this.createPlayer(playerZones.start);
        this.setupFollowupCameraOn(player);

        this.createPlayerColliders(player, {
            colliders: {
                platforms: layers.platforms,
                colliders: layers.colliders,
            }
        });
    }

    // Map
    createMap() {
        const map = this.make.tilemap({key: 'map'});
        map.addTilesetImage('thetowertop_foreground', 'foreground');
        // map.addTilesetImage('bg_spikes_tileset', 'bg-spikes-tileset');
        return map;
    }

    createLayers(map) {
        const location = [0 , this.config.bottom];  // x, y
        const tileset = map.getTileset('thetowertop_foreground');
        // const tilesetBG = map.getTileset('bg_spikes_tileset');

        const colliders = map.createLayer('sideCollide', tileset, ...location);
        const platforms = map.createLayer('platforms', tileset, ...location);
        const playerZones = map.getObjectLayer('playerZones');

        // platforms.setCollisionByProperty({collide: true});
        platforms.setCollisionByExclusion(-1);
        colliders.setCollisionByExclusion(-1);
        colliders.forEachTile(tile => {
            if (tile.canCollide) {
                // tile.setCollision(true, true, false, false);
                tile.setSize(tile.width, tile.height - 0.2, tile.baseWidth, tile.baseHeight);
            }
        });
        return {platforms, playerZones, colliders};
    }

    setupFollowupCameraOn(player) {
        const {height, width, mapOffset, zoomFactor} = this.config;
        this.physics.world.setBounds(0, -mapOffset.y/2, width + mapOffset.x, height + mapOffset.y);
        this.cameras.main.setBounds(0, 0, width + mapOffset.x, height).setZoom(zoomFactor);
        this.cameras.main.startFollow(player);
    }

    // Player
    createPlayer(start) {
        return new Player(this, start.x, this.config.bottom + start.y);
    }

    getPlayerZones(playerZonesLayer) {
        const playerZones = playerZonesLayer.objects;

        return {
            start: playerZones.find(zone => zone.name === 'start'),
            end: playerZones.find(zone => zone.name === 'finish')
        }
    }

    createPlayerColliders(player, {colliders}) {
        player
            .addCollider(colliders.colliders, this.onCollision)
            .addCollider(colliders.platforms);
    }

    onCollision(player) {
        player.turnAround();
    }

    update(time, delta) {
        super.update(time, delta);


    }
}

export default PlayScene
