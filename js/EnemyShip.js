class EnemyShip {
    constructor(x, y, spriteName, configs) {
        this.sprite = Nakama.enemyGroup.create(x, y, "assets", spriteName);
        // Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.configs = configs;
        this.sprite.health = this.configs.health;
        // this.sprite.body.velocity.y = 100;
        this.sprite.body.velocity.x = 100;
        // this.autofire();
    }

    update() {
        // if (this.sprite.position.y <= 0) {
        //     this.sprite.body.velocity.y = this.randomVelocity(50, 100);
        // } else if (this.sprite.position.y >= 200) {
        //     this.sprite.body.velocity.y = -this.randomVelocity(50, 100);
        // }

        if (this.sprite.position.x <= 0) {
            this.sprite.body.velocity.x = this.randomVelocity(50, 100);
        } else if (this.sprite.position.x >= 554) {
            this.sprite.body.velocity.x = -this.randomVelocity(50, 100);
        }
    }

    //Hàm tự đọng bắn cho tàu địch
    autofire() {
        // Thiet lap loai vu khi ban cho tau dich va so luong dan
        this.weapon = Nakama.game.add.weapon(1, 'assets', this.configs.bullet);

        this.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;

        //  The speed at which the bullet is fired
        this.weapon.bulletSpeed = 200;

        this.weapon.bulletAngleOffset = 90;

        //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 50ms
        this.weapon.fireRate = 60;

        //  Set the weapon to autofire - you can toggle this on and off during play as well
        this.weapon.autofire = true;

        this.weapon.fireAngle = 90;

        this.weapon.bulletAngleVariance = 10;

        // CHọn vị tàu xuất hiện đạn và vi trí đạn bắn trên tàu
        this.weapon.trackSprite(this.sprite, 0, 0);
    }

    //Tạo vận tốc ramdom cho tàu địch
    randomVelocity(a, b) {
        return Nakama.game.rnd.between(a, b);
    }
}
