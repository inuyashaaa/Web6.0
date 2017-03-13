class EnemyShip {
    constructor(x, y, spriteName) {
        this.sprite = Nakama.game.add.sprite(x, y, "assets", spriteName);
        Nakama.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        // this.configs = configs;
        this.sprite.body.velocity.y = 400;
        this.sprite.body.velocity.x = 400;
    }

    update() {
        if (this.sprite.position.y <= 0) {
            this.sprite.body.velocity.y = this.randomVelocity(100,400);
        } else if (this.sprite.position.y >= 400) {
            this.sprite.body.velocity.y = -this.randomVelocity(100,400);
        }
        if (this.sprite.position.x <= 0) {
            this.sprite.body.velocity.x = this.randomVelocity(100,400);
        } else if (this.sprite.position.x >= 554) {
            this.sprite.body.velocity.x = -this.randomVelocity(100,400);
        }
    }

    randomVelocity(a,b){
      return Nakama.game.rnd.between(a,b);
    }
}
