// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    //Updates and multiplies the enemies given speed by time
    this.x = this.x + (this.speed * dt * 2);

    //If the enemies current x pixel position out of the canaves
    //pixel position starts over.
    if (this.x > 600) {
        this.x = -this.x;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};;

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 250;
    this.y = 480;
    //Reference for player movements in each direction
    this.movX = 100;
    this.movY = 90;
};


Player.prototype.update = function(dt) {
    
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//An event listener is set to detect keyup positions of
//the arrows keys. They move the player
//so that the player cannot move outside of the canvas.
Player.prototype.handleInput = function(keyCode) {
    if (keyCode === 'left') {
        this.x -= this.movX;
        if (this.x < 0)
            this.x = 0;
    }
    if (keyCode === 'right') {
        this.x += this.movX;
        if (this.x > 500) {
            this.x = 500;
        }
    }
    if (keyCode === 'up') {
        this.y -= this.movY;
        if (this.y < 0)
            this.y = 0;
        if (this.y === 0) {
            console.log("Wow , You won!");
            this.x = 250;
            this.y = 480;
        }
    }
    if (keyCode === 'down') {
        this.y += this.movY;
        if (this.y > 500) {
            this.y = 500;
        }
    }
};

//Checks for collisions between player
//and all enemies using the Axis-Aligned Bounding
//If a collision occurs then the player's position
//is set back to the initial position of the game, and
//console logs 'You died!'.
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.x > allEnemies[i].x - 85 && 
            this.x < allEnemies[i].x + 85) &&
            this.y > allEnemies[i].y - 50 &&
            this.y < allEnemies[i].y + 50) {
            this.x = 250;
            this.y = 480;
            console.log("Sorry , You died!");
        }
    }

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [
    new Enemy(-100, 60, 200),
    new Enemy(-50, 145, 225),
    new Enemy(-200, 225, 175),
    new Enemy(-200, 305, 100) 
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
