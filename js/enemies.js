class Rectangle {
  constructor(x, y, width, height, vx, vy, frameSets, imgSrc, color) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.frameSets = frameSets;
    this.img = new Image();
    this.animation = new Animation();
    this.imgSrc = imgSrc;
    this.color = color;
  }

  update() {

      this.x+=this.vx;
      this.y+=this.vy;

      if(this.width != canvas.width) {
        if(this.x >= canvas.width - this.width) {
          this.vx = -this.vx;
        }
        else if(this.x <= 0){
          this.vx = -this.vx;
        }
  		/*var animation = new Animation();
        this.animation.change([0,0,0,1], 2)
        this.animation.update();*/
      }
  };

  draw() {
  	ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  checkCollision() {
    return collisionDetection(player, this);
  }

}

/*

	var batSize = 35; //30
			var batX = random(batSize, (canvas.width)-batSize);
			var batY = -batSize;
			var batVx = 0
			var batVy = 8;
			var batImgSrc = "";
			pushSquares(batX, batY, batSize, batSize, batVx, batVy, [[0,0,0,0,01]], "img/teeth.png")
*/

class Enemy extends Rectangle {
	img = new Image();
	animation = new Animation();
 	constructor(x, y, width, height, vx, vy, frameSets, imgSrc) {
    	super(x, y, width, height, vx, vy, frameSets, imgSrc); // call the super class constructor and pass in the name parameter
  	}


  	draw() {
  		// this is for the roof, although I really should have a different way of doing this
  		if(this.width == canvas.width) {
			ctx.fillStyle = "black"
	   		ctx.fillRect(this.x, this.y, this.width, this.height);
	    }
	    // drawing sprites
	    else {
	    	
			this.img.src = this.imgSrc;
        	this.animation.change(this.frameSets[0], 2)
        	this.animation.update();
	    	ctx.drawImage(this.img, this.animation.frame * this.width, 0, 
						  this.width, this.height, Math.floor(this.x), 
						  Math.floor(this.y), this.width, this.height);
	    		ctx.fillStyle = "black"
	   		/*ctx.fillRect(this.x, this.y, this.width, this.height);*/
	    }
  	}

  	// if there is a collision, the player will lose health
  	// and become invincible for about a second
  	onCollision() {
  		if(this.checkCollision() && !player.invincible) {
	    	player.loseHealth();
			setTimeout(function(){
				player.invincible = false;
			},1000)
    	}
  	}
}

class Teeth extends Enemy {
	constructor(x, y, width, height, vx, vy, frameSets, imgSrc) {
    	super(x, y, width, height, vx, vy, frameSets, imgSrc); // call the super class constructor and pass in the name parameter
  	}


  	draw() {
  		// this is for the roof, although I really should have a different way of doing this
  		if(this.width == canvas.width) {
			ctx.fillStyle = "black"
	   		ctx.fillRect(this.x, this.y, this.width, this.height);
	    }
	    // drawing sprites
	    else {
	    	this.img.src = imgSrc;
	    	ctx.drawImage(this.img, this.animation.frame * this.width, 0, 
						  this.width, this.height, Math.floor(this.x), 
						  Math.floor(this.y), this.width, this.height);
	    }
  	}

  	// if there is a collision, the player will lose health
  	// and become invincible for about a second
  	onCollision() {
  		if(this.checkCollision() && !player.invincible) {
	    	player.loseHealth();
			setTimeout(function(){
				player.invincible = false;
			},1000)
    	}
  	}
}


// enemies 
var enemies = [];

function pushLeftTriangles(x, y, vx, vy, color) {
	enemies.push({
		x: x,
		y: y, 
		width: 22,
		height: 25,
		vx: vx,
		vy: vy,
		update: function() {
			this.x+=this.vx;
			this.y+=this.vy;
		},
		draw: function() {

			ctx.beginPath();
			ctx.fillStyle = color;
    		ctx.moveTo(this.x, this.y);
    		ctx.lineTo(this.x+25, this.y+25);
			ctx.lineTo(this.x+25, this.y-25);
    		ctx.fill();

		}
	})
}

function pushRightTriangles(x, y, vx, vy, color) {
	enemies.push({
		x: 0,
		y: y,
		actualX: x,
		width: 19, 
		height: 25,
		vx: vx,
		vy: vy,
		update: function() {
			this.x+=this.vx;
			this.y+=this.vy;
		},
		draw: function() {

			ctx.beginPath();
			ctx.fillStyle = color;
    		ctx.moveTo(this.actualX, this.y);
    		ctx.lineTo(this.actualX-25, this.y-25);
			ctx.lineTo(this.actualX-25, this.y+25);
    		ctx.fill();

		}
	})
}



/*
function pushSquares(x, y, width, height, vx, vy, frameSets, imgSrc) {
	enemies.push({
		x: x,
		y: y,
		width: width, 
		height: height,
		img: new Image(),
		animation: new Animation(),
		frameSets: frameSets,
		vx: vx,
		vy: vy,
		update: function() {

			this.x+=this.vx;
			this.y+=this.vy;

			if(this.width != canvas.width) {
				if(this.x >= canvas.width - this.width) {
					this.vx = -this.vx;
				}
				else if(this.x <= 0){
					this.vx = -this.vx;
				}
	
				this.animation.change(this.frameSets[0], 2)
				this.animation.update();
			}
		},
		draw: function() {
			if(this.width == canvas.width) {
				ctx.fillStyle = "black"
	    		ctx.fillRect(this.x, this.y, this.width, this.height);
	    	}
	    	else {
	    		this.img.src = imgSrc;
	    		ctx.drawImage(this.img, this.animation.frame * this.width, 0, 
						  this.width, this.height, Math.floor(this.x), 
						  Math.floor(this.y), this.width, this.height);
	    	}
		}
	})
}
*/

var colours = ["black"]
var randomColour = colours[random(0, colours.length-1)];

function createEnemies() {
	// likelihood changes dependent on difficulty of enemy
	difficultyIncrease();
	
}

var difficultyLevel = 0;

function difficultyIncrease() {
	var releaseChance = random(1, 100);
	

	// make these into classes or whatever
	
	if(score>100) {
		if(releaseChance < 60) {

			enemies.push(new Enemy(random(35, (canvas.width)-35), -35, 35, 35, 0, 8, [[0,0,0,0,0,1]], "img/teeth.png"));
		
		}
	}
	if(score>150){
		enemies.push(new Enemy(0, -35, 20, 25, 0, random(5,10),[[0,0,0,0,0,1]], "img/teeth.png"));
		/*pushLeftTriangles(canvas.width-25, -25, 0, random(5, 10), randomColour);*/
	
	}
	if(score>250) {
		/*pushRightTriangles(25, -25, 0, random(5, 10), randomColour);*/
		enemies.push(new Enemy(canvas.width-35, -35, 35, 35, 0, random(5,10), [[0,0,0,0,0,1]], "img/teeth.png"));
	}
	if(score>650) {
		if(releaseChance < 60) {
			/*var eyeSize = 40;
			var eyeVx= random(-3, 3);
			var eyeVy = 7;
			var eyeX = random(eyeSize, canvas.width-eyeSize);
			var eyeY = -eyeSize;
			var eyeImgSrc = "";*/
			enemies.push(new Enemy(random(50, (canvas.width)-50), -40, 40, 40, random(-3, 3), 8, [[0,0, 0, 0, 0, 0, 0, 1,2,3,4,4,4,4,5,6,7]], "img/eyeball.png"));
			/*pushSquares(eyeX, eyeY, eyeSize, eyeSize, eyeVx, eyeVy, [[0,0, 0, 0, 0, 0, 0, 1,2,3,4,4,4,4,5,6,7]], "img/eyeball.png")*/
		}
	}


	if(score<1000) {
		decreaseHordeTime(0, hordeTime);
	}
	if(score>1000) { 
		decreaseHordeTime(1, hordeTime/2)
	}
	if(score>1500) { 
		decreaseHordeTime(2, hordeTime/2)
	}
	if(score>2000) { 
		decreaseHordeTime(3, hordeTime/2)
	}
	if(score>2500) { 
		decreaseHordeTime(4, hordeTime/2)
	}
}






// setInterval in main.js
// this just releases enemies
// how often enemies are released
var hordeTime = 2500;
if(canvas.width > 600) {
	hordeTime = 500;
}
var horde;

// difficulty levels of horde
// paramter level is for the difficulty LEVEL and then time is well pretty self-explanatory
function decreaseHordeTime(level, time) {
	if(difficultyLevel == level) {
			clearInterval(horde);
			difficultyLevel++;
			hordeTime = time;
			horde = setInterval(createEnemies, hordeTime)
	}
}

// drawing and updating enemies
function enemiesUpdateAndDraw() {
	for(var i = 0; i < enemies.length; i++) {
		enemies[i].update();
		enemies[i].draw();
		enemies[i].onCollision();
	}
}