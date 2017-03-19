class BulletController {
    constructor(position, direction, bulletName) {
        // this.bullet = Nakama.game.add.weapon(50, 'assets', bulletName);
        // //Kill dan khi dan di ra khoi gioi han
        // this.bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        //
        // //Xoay chieu de dan bay len tren
        // this.bullet.bulletAngleOffset = 90;
        //
        // //Toc do bay cua dan
        // this.bullet.bulletSpeed = 400;
        //
        // this.bullet.bulletAngleVariance = directtion;
        //
        // //Chon tau va vi tri cua tau ban dan
        // this.bullet.trackSprite(this.spriteN ame,x, y);

        // this.sprite = Nakama.game.add.sprite(position.x, position.y, 'assets', bulletName);
        this.sprite = Nakama.bulletGroup.create(position.x, position.y, 'assets', bulletName);
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        // Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.body.checkWorldBounds = true;
        this.sprite.body.outOfBoundsKill = true;
        this.sprite.angle = (Math.atan(direction.x / -direction.y)*180/3.14);
        this.sprite.angleOffset = 90;
        // console.log(directtion);
        this.sprite.body.velocity = direction.setMagnitude(BulletController.BULLET_SPEED);
    }
}

BulletController.BULLET_SPEED = 500;
