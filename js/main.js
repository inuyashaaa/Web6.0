var Nakama = {};
var backgroundGame;
var bullets;
var bulletTime = 0;
var fireKey;
Nakama.configs = {
    GAME_SPEED: 4,
    GAME_WIDTH: 640,
    GAME_HIGHT: 960,
    MIN_WIDTH: 320,
    MIN_HEIGHT: 480,
    MAX_WIDTH: 640,
    MAX_HEIGHT: 960,
    PLAYER1_POS: {
        x: 200,
        y: 800
    },
    PLAYER2_POS: {
        x: 400,
        y: 800
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
};

// preparations before game starts
var preload = function() {
    Nakama.game.scale.minWidth = Nakama.configs.MIN_WIDTH;
    Nakama.game.scale.minHeight = Nakama.configs.MIN_HEIGHT;
    Nakama.game.scale.maxWidth = Nakama.configs.MAX_WIDTH;
    Nakama.game.scale.maxHeight = Nakama.configs.MAX_HEIGHT;
    Nakama.game.scale.pageAlignHorizontally = true;
    Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    Nakama.game.time.advancedTiming = true;

    Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
    Nakama.game.load.image('background', 'Assets/Map1.png');
};

// initialize the game
var create = function() {
    Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
    Nakama.keyboard = Nakama.game.input.keyboard;
    backgroundGame = Nakama.game.add.tileSprite(0, 0, Nakama.configs.GAME_WIDTH, Nakama.configs.GAME_HIGHT, 'background');
    Nakama.players = [];
    Nakama.players.push(
        new ShipController(
            Nakama.configs.PLAYER1_POS.x,
            Nakama.configs.PLAYER1_POS.y,
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
            Nakama.configs.PLAYER2_POS.x,
            Nakama.configs.PLAYER2_POS.y,
            "Spaceship2-Player.png", {
                up: Phaser.Keyboard.W,
                down: Phaser.Keyboard.S,
                left: Phaser.Keyboard.A,
                right: Phaser.Keyboard.D,
                fire: Phaser.Keyboard.F
            }
        )
    );
    Nakama.players.push(
        new EnemyShip(
            100,
            100,
            "EnemyType1.png"
        )
    );
    Nakama.players.push(
        new EnemyShip(
            200,
            100,
            "EnemyType2.png"
        )
    );
    Nakama.players.push(
        new EnemyShip(
            300,
            100,
            "EnemyType3.png"
        )
    );
};
// update game state each frame
var update = function() {
    backgroundGame.tilePosition.y += Nakama.configs.GAME_SPEED;
    Nakama.players.forEach(function(ship) {
        ship.update();
    });
};

// before camera render (mostly for debug)
var render = function() {};
