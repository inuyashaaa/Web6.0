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
            if (this.timeToFire >= 0.2) {
                this.vector = new Phaser.Point(this.direction.x, this.direction.y);
                this.direction = new Phaser.Point.subtract(this.enemyShip.position, this.bulletHoming.position);
                var subtractAngle = this.angleOfVector(this.vector) - this.angleOfVector(this.direction);
                console.log(subtractAngle);
                if (subtractAngle >= 20) {
                    this.bulletHoming.angularVelocity = 20;
                }
                this.bulletHoming.body.velocity = this.direction.setMagnitude(HomingBulletController.SPEED_BULLET);
                this.bulletHoming.angle = (Math.atan(this.direction.x / -this.direction.y) * 180 / Math.PI);
                this.timeToFire = 0;
            }

        }
        this.timeToFire += Nakama.game.time.physicsElapsed;
    }

    angleOfVector(point) {
        return (Math.atan(point.x / -point.y) * 180 / Math.PI);
    }
}

HomingBulletController.SPEED_BULLET = 100;
