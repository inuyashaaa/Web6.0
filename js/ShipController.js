class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.configs = configs;
    }
    update() {
        if (Nakama.keyboard.isDown(this.configs.up)) {
            this.sprite.body.velocity.y = -ShipController.SHIP_SPEED;
        } else if (Nakama.keyboard.isDown(this.configs.down)) {
            this.sprite.body.velocity.y = +ShipController.SHIP_SPEED;
        } else {
            this.sprite.body.velocity.y = 0;
        }
        if (Nakama.keyboard.isDown(this.configs.left)) {
            this.sprite.body.velocity.x = -ShipController.SHIP_SPEED;
        } else if (Nakama.keyboard.isDown(this.configs.right)) {
            this.sprite.body.velocity.x = +ShipController.SHIP_SPEED;
        } else {
            this.sprite.body.velocity.x = 0;
        }
        // if (Nakama.keyboard.isDown(this.configs.fire)) {
        //     this.bullet.fire();
        // }
    }

//     fireBullet() {
//         //Tao so luong dan va hinh anh dan tuong ung
//         this.bullet = Nakama.game.add.weapon(50, 'assets', 'BulletType1.png');
//
//         //Kill dan khi dan di ra khoi gioi han
//         this.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
//
//         this.bullet.bulletAngleOffset = 90;
//         this.bullet.bulletSpeed = 400;
//         this.bullet.bulletAngleVariance = 10;
//         this.bullet.trackSprite(this.sprite, 14, 0);
//     }
}
ShipController.SHIP_SPEED = 400;
