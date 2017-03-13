class ShipController {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.configs = configs;
        this.fireBullet();
    }

    fireBullet() {
        //Tao so luong dan va hinh anh dan tuong ung
        this.weapon = Nakama.game.add.weapon(50, 'assets', this.configs.bullet);

        //Kill dan khi dan di ra khoi gioi han
        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //Xoay chieu de dan bay len tren
        this.weapon.bulletAngleOffset = 90;

        //Toc do bay cua dan
        this.weapon.bulletSpeed = 400;

        //Chon tau va vi tri cua tau ban dan
        this.weapon.trackSprite(this.sprite, 40, -20);
    }

    update() {
        //Thiet lap viec di chuyen cua tau
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

        //Kiem tra xem nguoi choi co an phim ban dan hay khong va thuc hien ban dan
        if (Nakama.keyboard.isDown(this.configs.fire)) {
            this.weapon.fire();
        }
    }

}
ShipController.SHIP_SPEED = 400;
