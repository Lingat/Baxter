


// walls
function pushDeathRoof() {
	/*pushSquares(0, 0, canvas.width, 20, 0, 0, 0, "");*/
	enemies.push(new Enemy(0, 0, canvas.width, 20, 0, 0, 0, ""))
	//pushSquares(x, y, width, height, vx, vy, frameSets, imgSrc)
	
}

pushDeathRoof();


// player structure
var playerSpriteSheet = {

	// standing still, hitting right wall, hitting left wall, dying, taking hit standing still, taking hit on left wall, taking hit on right wall
    frame_sets:[[0, 1], [2, 3], [4, 5], [6, 7], [0, 9], [2, 9], [4, 9]],
    image:new Image()

  };

var player = {
	x: (canvas.width/2),
	y: (canvas.height/2),
	img: new Image(),
	animation:new Animation(),
	width: 30,
	height: 54,
	color: "black",
	vx: 20,
	vy: 0,
	grounded: false,
	alive: false,
	currentHealth: 0,
	limitHealth: 3,
	maxHealth: 8,
	invincible: false,
	update: function() {

		// some physics or something
		this.x+=this.vx;
		this.y+=this.vy;
		player.vy+=gravity;

		var rightWall = ((canvas.width-this.width+5));
		var leftWall = -5;
		var roof = 0;
		if(this.hitFloor()){
			this.die();
		}
		if(this.hitRoof()) {
			this.y = roof;
		}

		

		if(this.hitLeftWall() ) {
			if(!pause) {
				//this.img.src = "img/baxterLeft.png"
				
				if(this.invincible) {
					this.animation.change(playerSpriteSheet.frame_sets[5], 1);
				}
				else {
					this.animation.change(playerSpriteSheet.frame_sets[1], 10);
				}
			}
			//ctx.drawImage(this.img, this.x, this.y);
			this.x = leftWall;

		}
		else if(this.hitRightWall()) {
			if(!pause) {
				//this.img.src = "img/baxterRight.png"
		
				if(this.invincible) {
					this.animation.change(playerSpriteSheet.frame_sets[6], 1);
				}
				else {
					this.animation.change(playerSpriteSheet.frame_sets[2], 10);
				}
			}
			//ctx.drawImage(this.img, this.x, this.y);
			this.x = rightWall;



		}
		else {
			//this.img.src = "img/baxterNormal.png"
			
			this.grounded = false;

			if(this.invincible) {
				this.animation.change(playerSpriteSheet.frame_sets[4], 1);
			}
			else {
				this.animation.change(playerSpriteSheet.frame_sets[0], 10);
			}
		}

		
		
		
	},
	draw: function() {
		/*ctx.drawImage(this.img, this.x, this.y);*/
		this.drawHealth();
		playerSpriteSheet.image.src = "img/player.png";
		ctx.drawImage(playerSpriteSheet.image, this.animation.frame * this.width, 0, 
					  this.width, this.height, Math.floor(this.x), 
					  Math.floor(this.y), this.width, this.height);
		
	},
	hitLeftWall: function() {
		this.grounded = true;
		return  this.x <= 0;

	},
	hitRightWall: function() {
		this.grounded = true;
		return this.x >= (canvas.width-this.width);
	},
	hitRoof: function() {
		return this.y <= 0;
	},
	hitFloor: function() {
		return this.y >= canvas.height;
	},
	die: function() {
		this.animation.change(playerSpriteSheet.frame_sets[3], 1);
		this.alive = false;
		clearInterval(horde);
		clearInterval(powerupsRelease);
		pause = true;
		deathTextDisplayed = false;
		showMenu();
	},
	drawHealth: function() {
		ctx.fillStyle = "white";
		ctx.font = "20px Monaco"
		ctx.fillText("Health: ", 2, (canvas.height-7));
		this.drawHearts();
	},
	drawHearts: function() {
		var heartSize = 15;
		for(var heart = 1; heart <= this.limitHealth; heart++) {
			if(heart <= this.currentHealth) {
				// red squares
				ctx.fillStyle = "red";
				ctx.fillRect(70+heart*heartSize*1.5,canvas.height-heartSize-5, heartSize, heartSize);
			}
			else {
				// black squares
				ctx.fillStyle = "black";
				ctx.fillRect(70+heart*heartSize*1.5,canvas.height-heartSize-5, heartSize, heartSize);
			}
		}
	},
	loseHealth: function() {
		this.currentHealth--;
		this.invincible = true;
		if(this.currentHealth <= 0) {
			this.die();
		}

	},
	reset: function() {
		this.x = (canvas.width/2);
		this.y = (canvas.height/2);
		this.vy = 0;
		this.grounded = false;
		this.alive = true;
		this.limitHealth = 2;
		this.currentHealth = this.limitHealth;
	}
}


// player controls 
document.addEventListener('keydown', function(e) {
	var key = e.keyCode
	switch(String.fromCharCode(key)) {
		case " ":
			if(!pause) {
				player.vy=-8;
				player.vx=-player.vx;
			}
		break;
	}
});

// game functions 
function play() {
	if(pause) {
		pause = false;
		reset();
	}
}

function hideMenu() {
	menu.style.opacity = 0;
}

function showMenu() {
	menu.style.opacity = 1;
	document.querySelector("h1").innerHTML = "You died."
	var actualScore = score+1;
	document.getElementById("score").innerHTML = "Your score: <br>" + actualScore;
}

function reset() {
	enemies = [];
	powerups = [];
	pushDeathRoof();
	difficultyLevel = 1;
	hordeTime = 2500;
	if(canvas.width > 600) {
		hordeTime = 500;
	}
	horde = setInterval(createEnemies, hordeTime)
	powerupsRelease = setInterval(createPowerups, powerupReleaseTime);
	score = 0;
	player.reset();
	hideMenu();	
}



function showDeathText() {
	/*ctx.fillStyle = "white";
	ctx.font = "25px Monaco";
	ctx.fillText("Press A to play.", (canvas.width/2)-120, 200);*/
}
function updateScore() {
	if(score < 999999999) {
		score++;
	}
	
	ctx.fillStyle = "white";
	ctx.font = "25px Monaco";
	ctx.fillText(score.pad(9), (canvas.width)-135, (canvas.height-5));
}


function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	player.update();

	enemiesUpdateAndDraw()
	powerupsUpdateandDraw();
	updateScore();
}

// so it doesn't keep drawing
var deathTextDisplayed = false;



function draw() {
	player.draw();

	
	// drawWalls();
}
	
function tick() {
	if(!pause) {
		update();
		player.animation.update();
		draw();
	}
	if(!player.alive && !deathTextDisplayed){
		deathTextDisplayed = true;
		showDeathText()
	}
}

setInterval(tick, 50);


