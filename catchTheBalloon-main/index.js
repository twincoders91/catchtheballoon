const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d"); //use getContext("2d") function to get access to the canvas tags 2D drawing functions.

// const platform = document.getElementById("platform").innerHTML;
// console.log(platform);

//changing canvas size to size of window screen
canvas.width = 1024;
canvas.height = 576;

let gravity = 0.5; //creating gravity acceleration
let itemCollection = false;

let gameModeEasy = true;
let gameModeMedium = false;
let gameModeHard = false;

let playerImage1 = true;
let playerImage2 = false;
let playerImage3 = false;

//===============================================================
//========================PLAYER CREATION========================
//===============================================================
class Player {
  constructor() {
    this.speed = 6;
    //player's property
    this.position = {
      //player's starting position (object)
      x: 100,
      y: 100,
    };
    this.width = 66;
    this.height = 120;

    this.velocity = {
      x: 0,
      y: 0,
    };
    if (playerImage1 === true) {
      this.image = createImage("./img/character1.png");
    } else if (playerImage2 === true) {
      this.image = createImage("./img/character2.png");
    } else if (playerImage3 === true) {
      this.image = createImage("./img/character3.png");
    }
    this.frames = 0;
  }

  draw() {
    //If you define a function called "draw" in your code, then that function will get called repeatedly, about 60 times per second.
    c.drawImage(
      //context.drawImage(img,x,y);
      this.image,
      200 * this.frames,
      0,
      200,
      400,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    // //changing the color of the player, on the canvas.
    // c.fillStyle = "red";
    // //filling the player as a rectangle on the canvas, referencing the constructor method
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    // this.frames++;
    // if (this.frames > 19) {
    //   this.frames = 0;
    // }
    //updating player's y position with gravity on the canvas
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.draw();

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity; //acceleration to gravity
    } else {
      // this.velocity.y = 0;
      //stopping the player at the bottom of the page (using the bottom of the player as reference)
    }
  }
}

//===============================================================
//===================== PLATFORM CREATION =======================
//===============================================================
class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = image.height;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
    // c.fillStyle = "blue";
    // c.fillRect(this.position.x, this.position.y, this.width.w, this.height.h);
  }
}

//===============================================================
//===================== DECORATIVE CLASS ========================
//===============================================================
class DecorativeObjects {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width;
    this.height = 580;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

//===============================================================
//======================== ITEM CLASS ===========================
//===============================================================
class ItemObjects {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = image.width * 0.5;
    this.height = image.height * 0.5;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

//===============================================================
//======================== ENEMY CLASS ==========================
//===============================================================
class EnemyObjects {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.image = image;
    this.width = image.width * 0.5;
    this.height = image.height * 0.5;
    this.movement = false;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

//===============================================================
//===================== ENEMY FLYING CLASS ======================
//===============================================================
class EnemyFlyingObjects {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };

    this.image = image;
    this.width = image.width * 0.8;
    this.height = image.height * 0.8;
    this.movement = false;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.y += this.velocity.y;
  }
}

//===============================================================
//======================= WINNING CLASS =========================
//===============================================================
class WinningObject {
  constructor({ x, y, image }) {
    this.position = {
      x: x,
      y: y,
    };
    this.image = image;
    this.width = 70;
    this.height = 128;
  }

  draw() {
    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

//===============================================================
//====================== IMAGE CREATION =========================
//===============================================================

function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
  // console.log(image);
}

const platformImage = createImage("./img/platform_1.png");
const platformImage2 = createImage("./img/platform_2.png");
const platformImage3 = createImage("./img/platform_3.png");
const backgroundImage = createImage("./img/background_2.png");
let itemImage = createImage("./img/potion.png");
const winningImage = createImage("./img/princess.png");
const enemyImage = createImage("./img/mines.png");

//===============================================================
//================Implement the Player class ====================
//===============================================================
let player = new Player();
//==================== PLAYER IMAGE Creation ====================
const character1 = document.querySelector("#character1Button");
const character2 = document.querySelector("#character2Button");
const character3 = document.querySelector("#character3Button");

character1.addEventListener("click", () => {
  playerImage1 = true;
  playerImage2 = false;
  playerImage3 = false;
  closeModal(characterSelection);
  if (gameModeEasy === true) {
    restartGame();
  } else if (gameModeMedium === true) {
    restartGameMedium();
  } else if (gameModeHard === true) {
    restartGameHard();
  }
});

character2.addEventListener("click", () => {
  playerImage1 = false;
  playerImage2 = true;
  playerImage3 = false;
  closeModal(characterSelection);
  console.log(playerImage2);
  if (gameModeEasy === true) {
    restartGame();
  } else if (gameModeMedium === true) {
    restartGameMedium();
  } else if (gameModeHard === true) {
    restartGameHard();
  }
});
console.log(playerImage2);

character3.addEventListener("click", () => {
  playerImage1 = false;
  playerImage2 = false;
  playerImage3 = true;
  closeModal(characterSelection);
  console.log(playerImage2);
  if (gameModeEasy === true) {
    restartGame();
  } else if (gameModeMedium === true) {
    restartGameMedium();
  } else if (gameModeHard === true) {
    restartGameHard();
  }
});
console.log(playerImage2);

//===============================================================
//=============== Implement the Platform class ==================
//===============================================================

let platforms = [
  new Platform({ x: -50, y: 560, image: platformImage }),
  new Platform({ x: platformImage.width - 60, y: 560, image: platformImage }),
  new Platform({
    x: platformImage.width * 2 + 100,
    y: 560,
    image: platformImage,
  }),
  new Platform({ x: 2000, y: 420, image: platformImage }),
  new Platform({ x: 2800, y: 300, image: platformImage2 }),
  new Platform({ x: 3200, y: 350, image: platformImage2 }),
  new Platform({ x: 3600, y: 450, image: platformImage2 }),
  new Platform({ x: 3800, y: 300, image: platformImage3 }),
  new Platform({ x: 4000, y: 150, image: platformImage3 }),
  new Platform({ x: 4300, y: 150, image: platformImage3 }),
  new Platform({ x: 4500, y: 300, image: platformImage }),
  new Platform({ x: 5200, y: 550, image: platformImage2 }),
  new Platform({ x: 4800, y: 550, image: platformImage2 }), //easter
  new Platform({ x: 4600, y: 550, image: platformImage2 }), //easter
  new Platform({ x: 5500, y: 450, image: platformImage }),
  new Platform({ x: 6200, y: 550, image: platformImage2 }),
  // new Platform({ x: 6400, y: 350, image: platformImage2 }),
  new Platform({ x: 6300, y: 200, image: platformImage2 }), //first gravity box
  new Platform({ x: 6900, y: 200, image: platformImage2 }),
  new Platform({ x: 7500, y: 200, image: platformImage2 }), //third gravity box
  new Platform({ x: 8100, y: 450, image: platformImage }),
  new Platform({ x: 8900, y: 520, image: platformImage }),
  new Platform({ x: 9700, y: 550, image: platformImage2 }),
  new Platform({ x: 9900, y: 410, image: platformImage2 }),
  new Platform({ x: 9700, y: 260, image: platformImage2 }),
  new Platform({ x: 9900, y: 110, image: platformImage2 }),
  new Platform({ x: 10400, y: 520, image: platformImage }),
  new Platform({
    x: 10350 + platformImage.width,
    y: 520,
    image: platformImage,
  }),
  new Platform({
    x: 10350 + platformImage.width + platformImage.width,
    y: 520,
    image: platformImage,
  }),
  new Platform({
    x: 10350 + platformImage.width + platformImage.width + platformImage.width,
    y: 520,
    image: platformImage,
  }),
]; //creation of an array of platforms

//===============================================================
//================ Implement Decorative class ===================
//===============================================================
let decorativeObjects = [
  new DecorativeObjects({
    x: -150, //left most part of screen
    y: -1, //top most part of screen
    image: backgroundImage,
  }),
];

//===============================================================
//================= Implement the ITEM class ====================
//===============================================================

let item = [new ItemObjects({ x: 4625, y: 500, image: itemImage })];

//===============================================================
//================= Implement the ENEMY class ===================
//===============================================================

let enemy = [new EnemyObjects({ x: -3000, y: 370, image: enemyImage })];

//===============================================================
//============== Implement the FLYING ENEMY class ===============
//===============================================================

let enemyFlying = [
  new EnemyFlyingObjects({ x: -3000, y: 370, image: enemyImage }),
];

//===============================================================
//================ Implement the Winning class ==================
//===============================================================

let winningItem = [
  new WinningObject({
    x: 12400,
    y: 395,
    image: winningImage,
  }),
];

//===============================================================
//====================== Implement Keys =========================
//===============================================================
//Keys (Objects) right and left keys pressed down, return true, else false. Tagged to Event Listener.
const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

let scrollOffset = 0;

//===============================================================
// ======================= RESTART GAME  ========================
//===============================================================

function restartGame() {
  document.querySelector("#easyButton").innerHTML = "Easy";
  document.querySelector("#easyButton").style.backgroundColor = "darkgoldenrod";
  mediumButton.innerHTML = "Medium";
  mediumButton.style.backgroundColor = "darkgoldenrod";
  hardButton.innerHTML = "Hard";
  hardButton.style.backgroundColor = "darkgoldenrod";

  gravity = 0.5;
  player = new Player();

  gameModeEasy = true;
  gameModeMedium = false;
  gameModeHard = false;

  itemCollection = false;

  platforms = [
    new Platform({ x: -50, y: 560, image: platformImage }),
    new Platform({ x: platformImage.width - 60, y: 560, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 560,
      image: platformImage,
    }),
    new Platform({ x: 2000, y: 420, image: platformImage }),
    new Platform({ x: 2800, y: 300, image: platformImage2 }),
    new Platform({ x: 3200, y: 350, image: platformImage2 }),
    new Platform({ x: 3600, y: 450, image: platformImage2 }),
    new Platform({ x: 3800, y: 300, image: platformImage3 }), //balloons
    new Platform({ x: 4000, y: 150, image: platformImage3 }), //balloons
    new Platform({ x: 4300, y: 150, image: platformImage3 }), //balloons
    new Platform({ x: 4500, y: 300, image: platformImage }),
    new Platform({ x: 5200, y: 550, image: platformImage2 }),
    new Platform({ x: 4800, y: 550, image: platformImage2 }), //easter
    new Platform({ x: 4600, y: 550, image: platformImage2 }), //easter
    new Platform({ x: 5500, y: 450, image: platformImage }),
    new Platform({ x: 6200, y: 550, image: platformImage2 }),
    new Platform({ x: 6300, y: 200, image: platformImage2 }),
    new Platform({ x: 6900, y: 200, image: platformImage2 }),
    new Platform({ x: 7500, y: 200, image: platformImage2 }),
    new Platform({ x: 8100, y: 450, image: platformImage }),
    new Platform({ x: 8900, y: 520, image: platformImage }),
    new Platform({ x: 9700, y: 550, image: platformImage2 }),
    new Platform({ x: 9900, y: 410, image: platformImage2 }),
    new Platform({ x: 9700, y: 260, image: platformImage2 }),
    new Platform({ x: 9900, y: 110, image: platformImage2 }),
    new Platform({ x: 10400, y: 520, image: platformImage }),
    new Platform({
      x: 10350 + platformImage.width,
      y: 520,
      image: platformImage,
    }),
    new Platform({
      x: 10350 + platformImage.width + platformImage.width,
      y: 520,
      image: platformImage,
    }),
    new Platform({
      x:
        10350 + platformImage.width + platformImage.width + platformImage.width,
      y: 520,
      image: platformImage,
    }),
  ];

  decorativeObjects = [
    new DecorativeObjects({
      x: -150,
      y: -1,
      image: backgroundImage,
    }),
  ];

  enemy = [new EnemyObjects({ x: -3000, y: 370, image: enemyImage })];

  enemyFlying = [
    new EnemyFlyingObjects({ x: -3000, y: 370, image: enemyImage }),
  ];

  item = [new ItemObjects({ x: 4600, y: 500, image: itemImage })];

  winningItem = [
    new WinningObject({
      x: 12400,
      y: 395,
      image: winningImage,
    }),
  ];

  scrollOffset = 0;
  player.position.x = 100;
  keys.right.pressed = false;
  // keys.up.pressed = false;
  keys.left.pressed = false;
}

//===============================================================
// ======================== ANIMATION  ==========================
//===============================================================

function animate() {
  toggleScreen("startScreen", false);
  toggleScreen("canvas", true);
  //animate loop
  //requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
  requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height); //function to clear your canvas
  //updating/call the platform's draw function (style and fill)

  // ================== FLYING ENEMY MOVEMENT ===================
  enemyFlying.forEach((movingEnemy) => {
    if (movingEnemy.movement === false && movingEnemy.position.y > 0) {
      movingEnemy.velocity.y = 4;
      movingEnemy.movement = true;
    } else if (movingEnemy.movement === true && movingEnemy.position.y >= 510) {
      movingEnemy.velocity.y = -4;
    } else if (movingEnemy.position.y <= 0) {
      movingEnemy.velocity.y = 4;
      movingEnemy.movement = false;
    }
  });

  //=================== DRAWING OBJECTS  ====================
  decorativeObjects.forEach((decorativeObjects) => {
    decorativeObjects.draw();
  });

  platforms.forEach((platform) => {
    platform.draw();
  });

  item.forEach((item) => {
    item.draw();
  });

  winningItem.forEach((item) => {
    item.draw();
  });

  enemy.forEach((item) => {
    item.draw();
  });

  enemyFlying.forEach((item) => {
    item.update();
  });

  player.update(); //updating/call the draw function and player new position

  //=================== KEY PRESSED CONDITION ====================
  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed;
  } else if (
    (keys.left.pressed && player.position.x > 200) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed;
  } else {
    player.velocity.x = 0;
    // Scroll conditions
    if (keys.right.pressed) {
      platforms.forEach((platform) => {
        platform.position.x -= player.speed;
      });
      decorativeObjects.forEach((decorativeObject) => {
        decorativeObject.position.x -= player.speed * 0.3;
      });
      item.forEach((itemObject) => {
        itemObject.position.x -= player.speed;
      });
      winningItem.forEach((itemObject) => {
        itemObject.position.x -= player.speed;
      });
      enemy.forEach((enemyObject) => {
        enemyObject.position.x -= player.speed;
      });
      enemyFlying.forEach((flyingObject) => {
        flyingObject.position.x -= player.speed;
      });

      scrollOffset += player.speed;
    } else if (keys.left.pressed && scrollOffset > 0) {
      platforms.forEach((platform) => {
        platform.position.x += player.speed;
      });
      decorativeObjects.forEach((decorativeObject) => {
        decorativeObject.position.x += player.speed * 0.3;
      });
      item.forEach((itemObject) => {
        itemObject.position.x += player.speed;
      });
      enemy.forEach((enemyObject) => {
        enemyObject.position.x += player.speed;
      });
      enemyFlying.forEach((flyingObject) => {
        flyingObject.position.x += player.speed;
      });

      winningItem.forEach((itemObject) => {
        itemObject.position.x += player.speed;
      });
      scrollOffset -= player.speed;
    }
  }
  // console.log(item[0].position.y);
  console.log(scrollOffset);
  // console.log(gameModeMedium);

  //=============== PLATFORM COLLISION DETECTION ================
  platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y && //any y position above or equal the platform, player y velocity = 0
      player.position.y + player.height + player.velocity.y >= // any y position below or equal the platform, player y velocity = 0
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });

  //=============== ITEM COLLECTION DETECTION ================

  item.forEach((item) => {
    if (
      player.position.x + player.width >= item.position.x &&
      player.position.x <= item.position.x + item.width &&
      player.position.y + player.height >= item.position.y &&
      player.position.y <= item.position.y + item.height
    ) {
      gravity = 0.25;
      itemCollection = true;
      notification.innerHTML = "You can jump higher!";
      document.querySelector("#notification").style.backgroundColor = "#f8f0e3";
    } else if (
      player.position.x + player.width >=
      item.position.x + item.width + 3500
    ) {
      gravity = 0.5;
      notification.innerHTML = "Your potion has ran out!";
      notification.style.backgroundColor = "darkgoldenrod";
    }
  });

  //=============== ENEMY COLLECTION DETECTION ================
  enemy.forEach((enemyObject) => {
    if (
      player.position.x + player.width >= enemyObject.position.x &&
      player.position.x <= enemyObject.position.x + enemyObject.width &&
      player.position.y + player.height >= enemyObject.position.y &&
      player.position.y <= enemyObject.position.y + enemyObject.height &&
      gameModeMedium === true
    ) {
      notification.innerHTML = "You Died!";
      document.querySelector("#notification").style.backgroundColor = "red";
      restartGameMedium();
    } else if (
      player.position.x + player.width >= enemyObject.position.x &&
      player.position.x <= enemyObject.position.x + enemyObject.width &&
      player.position.y + player.height >= enemyObject.position.y &&
      player.position.y <= enemyObject.position.y + enemyObject.height &&
      gameModeHard === true
    ) {
      notification.innerHTML = "You Died!";
      document.querySelector("#notification").style.backgroundColor = "red";
      restartGameHard();
    }
  });

  //================= FLYING ENEMY  DETECTION ==================

  enemyFlying.forEach((enemyObject) => {
    if (
      player.position.x + player.width >= enemyObject.position.x &&
      player.position.x <= enemyObject.position.x + enemyObject.width &&
      player.position.y + player.height >= enemyObject.position.y &&
      player.position.y <= enemyObject.position.y + enemyObject.height &&
      gameModeHard === true
    ) {
      notification.innerHTML = "You Died!";
      document.querySelector("#notification").style.backgroundColor = "red";
      restartGameHard();
    }
  });

  if (scrollOffset >= 1 && scrollOffset <= 100) {
    notification.innerHTML =
      "Hello there, let's help Damien get to the Bang Balloon!";
    notification.style.backgroundColor = "#f8f0e3";
  }

  //=================== ITEM PROMPT DETECTION =====================
  if (
    scrollOffset >= 5500 &&
    scrollOffset <= 5650 &&
    itemCollection === false
  ) {
    notification.innerHTML = "You need something to help you jump higher.";
    document.querySelector("#notification").style.backgroundColor =
      "darkgoldenrod";
  }
  // console.log(itemCollection);

  //===============================================================
  // ======================= WIN SCENARIO  ========================
  //===============================================================
  if (scrollOffset > 12000 && gameModeEasy === true) {
    window.confirm("You successfully took the balloon!");
    restartGameMedium();
    scrollOffset = 0;
    // console.log("You win.");
  } else if (scrollOffset > 12000 && gameModeMedium === true) {
    window.confirm("You successfully took the balloon!");
    restartGameHard();
    scrollOffset = 0;
  } else if (scrollOffset > 12000 && gameModeHard === true) {
    window.confirm("You successfully took the balloon!");
    restartGameHard();
    scrollOffset = 0;
  }

  //===============================================================
  // ======================= LOSE SCENARIO  =======================
  //===============================================================
  // if (player.position.y + player.height * 0.3 > canvas.height) {
  //   restartGame();
  // }
  if (
    player.position.y + player.height * 0.3 > canvas.height &&
    gameModeEasy === true
  ) {
    notification.innerHTML = "You Died!";
    document.querySelector("#notification").style.backgroundColor = "red";
    restartGame();
  } else if (
    player.position.y + player.height * 0.3 > canvas.height &&
    gameModeMedium === true
  ) {
    notification.innerHTML = "You Died!";
    document.querySelector("#notification").style.backgroundColor = "red";
    restartGameMedium();
  } else if (
    player.position.y + player.height * 0.3 > canvas.height &&
    gameModeHard === true
  ) {
    notification.innerHTML = "You Died!";
    document.querySelector("#notification").style.backgroundColor = "red";
    restartGameHard();
  }
}

//===============================================================
// ======================== START GAME  =========================
//===============================================================
const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", startGame);

function startGame() {
  animate();
  restartGame();
}

function toggleScreen(id, toggle) {
  let element = document.getElementById(id);
  let display = toggle ? "block" : "none";
  element.style.display = display;
}

//===============================================================
//============= EVENT LISTENER - PLAYER MOVEMENTS ===============
//===============================================================
addEventListener("keydown", ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = true;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = true;
      break;

    case 87:
      console.log("up");
      if (player.velocity.y === 0) {
        player.velocity.y -= 12;
        break;
      }
  }
});
// console.log(keys.right.pressed);

addEventListener("keyup", ({ keyCode }) => {
  // console.log(keyCode);
  switch (keyCode) {
    case 65:
      console.log("left");
      keys.left.pressed = false;
      break;

    case 83:
      console.log("down");
      break;

    case 68:
      console.log("right");
      keys.right.pressed = false;
      break;

    case 87:
      console.log("up");
      player.velocity.y -= 0;
      break;
  }
});
// console.log(keys.right.pressed);
