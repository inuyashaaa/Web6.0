class HomingBulletController {
    constructor(position, direction, angleRotation, bulletName) {
        this.bulletHoming = Nakama.playerBulletHomingGroup.create(position.x, position.y, 'assets', bulletName);
        this.bulletHoming.anchor = new Phaser.Point(0.5, 0.5);
        this.bulletHoming.body.checkWorldBounds = true;
        this.bulletHoming.body.outOfBoundsKill = true;
        this.bulletHoming.body.velocity = direction.setMagnitude(HomingBulletController.SPEED_BULLET);
        this.bulletHoming.angle = (Math.atan(direction.x / -direction.y) * 180 / Math.PI);
        this.angleRotation = angleRotation;
        this.direction = direction;
        this.timeToFire = 0;
    }

    update() {
        this.enemyShip = Nakama.enemyGroup.getFirstAlive();

        if (this.enemyShip && this.enemyShip.alive) {
            this.direction = new Phaser.Point.subtract(this.enemyShip.position, this.bulletHoming.position);
            this.bulletHoming.body.velocity.x = 0;
            this.bulletHoming.body.velocity.y = 0;
            if (this.bulletHoming.position.y > this.enemyShip.position.y) {
                this.bulletHoming.angle = (Math.atan(this.direction.x / -this.direction.y) * 180 / Math.PI);
                Nakama.game.physics.arcade.velocityFromAngle(-90 + this.bulletHoming.angle, 200, this.bulletHoming.body.velocity);
            } else {
                this.bulletHoming.angle = -(Math.atan(this.direction.x / -this.direction.y) * 180 / Math.PI);
                Nakama.game.physics.arcade.velocityFromAngle(90 - this.bulletHoming.angle, 200, this.bulletHoming.body.velocity);
            }

        }
    }

    angleOfVector(point) {
        return (Math.atan(point.x / -point.y) * 180 / Math.PI);
    }
}

HomingBulletController.SPEED_BULLET = 100;
