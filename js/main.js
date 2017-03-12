var Nakama = {};
Nakama.configs = {
    GAME_WIDTH: 640,
    GAME_HIGHT: 960,
    MIN_WIDTH: 320,
    MIN_HEIGHT: 480,
    MAX_WIDth: 640,
    MAX_HEIGHT: 960,
    PLAYER1_POS : {
      x: 200,
      y:200
    },
    PLAYER2_POS : {
      x: 400,
      y: 200
    }
};

window.onload = function() {
    Nakama.game = new Phaser.Game(
        Nakama.configs.GAME_WIDTH,
        Nakama.configs.GAME_HIGHT,
        Phaser.AUTO, '', {
            preload: preload,
            create: create,
            update: update,
            render: render
        }, false, false);
}

// preparations before game starts
var preload = function() {
    Nakama.game.scale.minWidth = Nakama.configs.MIN_WIDTH;
    Nakama.game.scale.minHeight = 480;
    Nakama.game.scale.maxWidth = 640;
    Nakama.game.scale.maxHeight = 960;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.time.advancedTiming = true;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background', 'Assets/Map1.png');
}

// initialize the game
var create = function() {
    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard;
    Nakama.game.add.sprite(0, 0, 'background');
    Nakama.players = [];
    Nakama.players.push(
        new ShipController(
            200,
            200,
            "Spaceship1-Player.png", {
                up: Phaser.Keyboard.UP,
                down: Phaser.Keyboard.DOWN,
                left: Phaser.Keyboard.LEFT,
                right: Phaser.Keyboard.RIGHT,
                fire: Phaser.Keyboard.SPACEBAR
            }
        )
    );
    Nakama.players.push(
        new ShipController(
            400,
            200,
            "Spaceship2-Player.png", {
                up: Phaser.Keyboard.W,
                down: Phaser.Keyboard.S,
                left: Phaser.Keyboard.A,
                right: Phaser.Keyboard.D,
                fire: Phaser.Keyboard.F
            }
        )
    );

}
// update game state each frame
var update = function() {
    Nakama.players.forEach(function(ship) {
        ship.update();
    });
}

// before camera render (mostly for debug)
var render = function() {}
