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
        this.jumpPower = 250;
        this.jumpCount = 0;
        this.consecutiveJumps = 1;

        // player states
        this.isSliding = false;

        // animation
        initAnimation(this.scene.anims);
        this.play('playerMove', true);

        // controls
        this.controls = this.scene.input.keyboard.addKeys('W, S');
        this.arrowControls = this.scene.input.keyboard.createCursorKeys();

        // player styling
        this.setOrigin(0.5,1);
        const cropValues = {x: 10, y: 0};
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
        if (this.isSliding || !this.body) { return; }
        this.handleMovements();

    }

    turnAround() {
        if (this.body) {
            if (this.body.blocked.right) {
                this.setVelocityX(-this.speed);
                this.setFlipX(true);
            } else if (this.body.blocked.left) {
                this.setVelocityX(this.speed);
                this.setFlipX(false);
            }
        }
    }

    handleMovements() {
        const onFloor = this.body.onFloor();
        this.handleCrouch(onFloor);
        this.handleJump(onFloor);
    }

    handleCrouch(onFloor) {
        this.scene.input.keyboard.on('keydown-DOWN', () => {
            this.body.setSize(this.width, this.height / 2);
            this.setOffset(0, this.height / 2);
            onFloor ? this.play('playerSlide', true) : this.play('playerDive', true);
            this.isSliding = true;
        });

        this.scene.input.keyboard.on('keyup-DOWN', () => {
            this.body.setSize(this.width, 38);
            this.setOffset(0, 0);
            this.isSliding = false;
        });
    }

    handleJump(onFloor) {
        const {space, up} = this.arrowControls;
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
        const isUpJustDown = Phaser.Input.Keyboard.JustDown(up);
        const isWJustDown = Phaser.Input.Keyboard.JustDown(this.controls.W);

        if ((isSpaceJustDown || isUpJustDown || isWJustDown) && (onFloor || this.jumpCount < this.consecutiveJumps)) {
            this.setVelocityY(-this.jumpPower);
            this.jumpCount++;
        }

        if (onFloor) {
            this.play('playerMove', true);
            this.jumpCount = 0;
        } else {
            this.play('playerJump', true);
        }
    }

    handleAttacks() {

    }
}

export default Player;
