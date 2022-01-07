import anims from "../mixins/anims";
import collidable from "../mixins/collidable";
import initAnimation from './animations/PlayerAnims';

class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');

        Object.assign(this, collidable);
        Object.assign(this, anims);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.init();
        this.initEvents();
    }

    init() {
        // configuration values
        this.gravity = 500;
        this.speed = 100;
        this.jumpPower = 200;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;

        // animation
        initAnimation(this.scene.anims);
        this.play('playerMove', true);

        // controls
        this.controls = this.scene.input.keyboard.addKeys('W, S');
        this.arrowControls = this.scene.input.keyboard.createCursorKeys();

        // player styling
        this.setOrigin(0.5,1);
        const cropValues = {x: 10, y: 5};
        this.setSize(this.width - cropValues.x, this.height - cropValues.y);
        // player physics
        this.setCollideWorldBounds();
        this.body.setGravityY(this.gravity);
        this.setVelocityX(this.speed);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update(time) {

        const {space, down, up} = this.arrowControls;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        const isWJustDown = Phaser.Input.Keyboard.JustDown(this.controls.W);
        const onFloor = this.body.onFloor();

        if ((isSpaceJustDown || isUpJustDown || isWJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.jumpPower);
            this.jumpCount++;
        }

        if (onFloor) {
            this.jumpCount = 0;
        }

        if (this.collideWorldBounds) {
        }
    }

    turnAround(source) {
        console.log(source);
        if (this.body.touching.right) {
            this.setVelocityX(-this.speed);
            this.setFlipX(true);
        } else if (this.body.touching.left) {
            this.setVelocityX(this.speed);
            this.setFlipX(false);
        }
    }

    handleMovements() {

    }

    handleAttacks() {

    }
}

export default Player;
