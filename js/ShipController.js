class ShipController {
    constructor(x, y, spriteName, configs) {
        // this.sprite = Nakama.game.add.sprite(x, y, 'assets', spriteName);
        this.sprite = Nakama.playerGroup.create(x, y, 'assets', spriteName);
        // Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.body.collideWorldBounds = true;
        this.configs = configs;
        this.timeSinceLastFire = 0;
        this.bulletHoming = [];
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
        this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
        //Kiem tra xem nguoi choi co an phim ban dan hay khong va thuc hien ban dan
        if (Nakama.keyboard.isDown(this.configs.fire)) {
            this.tryFire();
        }
        this.updateBulletHoming();
    }

    tryFire() {
        if (this.timeSinceLastFire >= this.configs.cooldown) {
            this.fire();
            this.timeSinceLastFire = 0;
        }
    }
    fire() {
        // this.createBullet(new Phaser.Point(0, -1));
        // this.createBullet(new Phaser.Point(1, -10));
        // this.createBullet(new Phaser.Point(-1, -10));
        // this.createBullet(new Phaser.Point(1, -5));
        // this.createBullet(new Phaser.Point(-1, -5));
        this.createBulletHoming(new Phaser.Point(1, -1));
        // this.createBulletHoming(new Phaser.Point(1, -10));

    }

    createBullet(direction) {
        new BulletController(
            this.sprite.position,
            direction,
            "BulletType2.png"
        );
    }

    createBulletHoming(direction) {
        var angleRotation = 20;
        this.bulletHoming.push(
            new HomingBulletController(
                this.sprite.position,
                direction,
                angleRotation,
                "BulletType2.png"
            )
        );
    }

    updateBulletHoming() {
        this.bulletHoming.forEach(
            function(bullet) {
                bullet.update();
            }
        );
    }

}
ShipController.SHIP_SPEED = 400;
