// Enemies our player must avoid
var Enemy = function(x, y, s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    if (this.x > 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
};

Player.prototype.update = function (direction) {
    if (direction === 'left') {
        if (this.x > 0) {
            this.x -=  100;
        }
    }
    if (direction === 'right') {
        if (this.x < 400) {
            this.x += 100;
        }
    }
    if (direction === 'up') {
        if (this.y > -50) {
            this.y -= 90;
        }
    }

    if (direction === 'down') {
        if (this.y < 400) {
            this.y += 90;
        }
    }

    if (this.y <= -50) {
        this.score++;
        setTimeout(() => {
            alert(`You won. Your score is: ${this.score}`);
            this.resetPosition();
        }, 100);
    }
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Player.prototype.handleInput = function (direction) {
    switch(direction) {
        case 'left': this.update(direction);
            break;
        case 'right': this.update(direction);
            break;
        case 'up': this.update(direction);
            break;
        case 'down': this.update(direction);
            break;
    }
};

Player.prototype.resetPosition = function () {
    this.x = 200;
    this.y = 400;
};

Player.prototype.resetScore = function () {
  this.score = 0;
};

var allEnemies = [];
// Now instantiate your objects.

var e1 = new Enemy(50, 60, 100);
var e2 = new Enemy(80, 150, 300);

// Place all enemy objects in an array called allEnemies
allEnemies.push(e1, e2);


// Place the player object in a variable called player
var player = new Player();


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
