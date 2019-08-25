

class killAllEnemies extends Rectangle {
  constructor(x, y, width, height, vx, vy, frameSets, imgSrc, color) {
    super(x, y, width, height, vx, vy, frameSets, imgSrc, color); // call the super class constructor and pass in the name parameter
  }

  onCollision() {
    if(this.checkCollision()) {
      enemies = [];
      pushDeathRoof();
      powerups.pop();
    }
  }

}

class invincibility extends Rectangle {
  constructor(x, y, width, height, vx, vy, frameSets, imgSrc, color) {
    super(x, y, width, height, vx, vy, frameSets, imgSrc, color); // call the super class constructor and pass in the name parameter
  }

  onCollision() {
    if(this.checkCollision()) {
      player.invincible = true;

      setTimeout(function(){
        player.invincible = false;
      }, 7000)

      powerups.pop();

    }
  }
}

class healthUp extends Rectangle {
  constructor(x, y, width, height, vx, vy, frameSets, imgSrc, color) {
    super(x, y, width, height, vx, vy, frameSets, imgSrc, color); // call the super class constructor and pass in the name parameter
  }

  onCollision() {
    if(this.checkCollision()) {
      powerups.pop();
      if(player.currentHealth < player.limitHealth) {
        player.currentHealth++;

      }
    }
  }
}

class limitHealthUp extends Rectangle {
  constructor(x, y, width, height, vx, vy, frameSets, imgSrc, color) {
    super(x, y, width, height, vx, vy, frameSets, imgSrc, color); // call the super class constructor and pass in the name parameter
  }

  onCollision() {
    if(this.checkCollision()) {
      powerups.pop();
      if(player.limitHealth < player.maxHealth) {
        player.limitHealth++;
      }
    }
  }

}


var powerups = [];
var powerupReleaseTime = 20000;
var powerupsRelease;

function createPowerups() {
  var randomNum = random(1, 100);
  var health = new healthUp(random(0, canvas.width-20), -20, 20, 20, 0, 10, 0, "", "red");
  var untouchable = new invincibility(random(0, canvas.width-20), -20, 20, 20, 0, 10, 0, "", "blue");
  var killer = new killAllEnemies(random(0, canvas.width-20), -20, 20, 20, 0, 10, 0, "", "black");
  var moreHealth = new limitHealthUp(random(0, canvas.width-20), -20, 20, 20, 0, 10, 0, "", "orange");

  if(randomNum < 50) {
    powerups.push(health);
  }
  else if(randomNum <= 75 && randomNum >= 50) {
    powerups.push(untouchable);
  }
  else if(randomNum >= 75 && randomNum <= 95) {
    powerups.push(killer);
  }
  else {
    powerups.push(moreHealth);
  }

}


function powerupsUpdateandDraw() {
  for(var i = 0; i < powerups.length; i++) {
      powerups[i].update();
      powerups[i].draw();
      powerups[i].onCollision();
    }
}
