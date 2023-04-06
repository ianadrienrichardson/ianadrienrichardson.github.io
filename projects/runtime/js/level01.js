var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(xvalue, yvalue) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);

            sawBladeHitZone.x = xvalue;
            sawBladeHitZone.y = yvalue;
            game.addGameItem(sawBladeHitZone)

            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);

            obstacleImage.x = -sawBladeHitZone;
            obstacleImage.y = -sawBladeHitZone;
        }
        createSawBlade(800, 325);
        createSawBlade(600, 325);
        createSawBlade(1000, 325);

        var enemy = game.createGameItem("enemy", 25);
        var redSquare = draw.rect(75, 75, "black");
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = 800;
        enemy.y = groundY;

        game.addGameItem(enemy);
        enemy.velocityX = -3;
    
        enemy.rotationalVelocity = 5;


        enemy.onPlayerCollision = function () {
            game.changeIntegrity(-10);
        };

        enemy.onProjectileCollision = function () {
            game.increaseScore(100);
            enemy.fadeOut();
        };

        function createEnemy (x, y) {
            var enemy =
            game.createGameItem('enemy' ,80);
            var brandon = draw.bitmap('img/enemy.png');
            brandon.x = x;
            brandon.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -2;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-50);
            }
        }
        
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
