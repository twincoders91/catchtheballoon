# Catch The Balloon
Play the game and catch the Balloon!

<h1> Overview </h1>
This project is a 2D side scrolling game where a player must get to the finishing line, while avoiding obstacles along the way, to complete the game. The player will be able to test their skills by selecting the different difficulty modes the game offers.
<br> <br> Damien a devoted Kung Fu master is tired of Man-kind and the damages man have done to Mother Earth. <br> After years of farming and mining BTC, Damien has saved enough to challenge Elon Musk in building the next generation Green technology. <br> To save Earth, it is vital that Damien catches the Bang Balloon to Austin, Texas, United States...

# Table of Contents

1. [ Canvas ](#canvas)
2. [ Global values ](#globalvalues)
3. [ Classes creation ](#classescreation)
* [Class and Constructor](#classandconstructor)
* [Position](#position)
* [Dimension](#dimension)
* [Velocity](#velocity)
* [Player skin selection](#skin)
* [draw() method](#draw)
* [update() method](#update)
4. [ Image creation ](#imagecreation)
5. [ Implementing the Classes ](#implementingclasses)
6. [ Restart Game ](#restartgame)
7. [ Animation ](#animation)
8. [ Enemy Collision Detection](#enemycollision)
9. [ Platform Collision Detection](#platformcollision)
10. [ Win condition ](#wincondition)
11. [Lose condition ](#losecondition)
12. [Event listener ](#eventlistener)



<a name="canvas"></a>
## 1. Canvas creation
Create a 2D canvas which will act as your blank space to draw your game "items" on. First create a canvas on HTML, and define the canvas's properties such as width and height. <br>

Use getContext("2d") function to get access to the canvas tags 2D drawing functions.
```
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
```


Define the size of your canvas by pixels
```
canvas.width = 1024;
canvas.height = 576;
```

<a name="globalvalues"></a>
## 2. Global values
<p> Global variables are defined outside the functions to facilitate the subsequent conditions that will be defined in the later stages</p>

```
let gravity = 0.5; //creating gravity acceleration
let itemCollection = false;

let gameModeEasy = true;
let gameModeMedium = false;
let gameModeHard = false;

let playerImage1 = true;
let playerImage2 = false;
let playerImage3 = false;
```



<a name="classescreation"></a>
## 3. Classes creation
<p> Create the individual classes of the various items that will be drawn onto the canvas. These classes will define the key properties of the items such as position and velocity.</p> Here are some examples of the classes that have been created.<br>
<li>Player class</li>
  <ul>
  <li>constructor()</li>
  <li>draw()</li>
  <li>update()</li>
  </ul>
<li>Enemy class</li>
<li>Flying Enemy class</li>
<li>Platform class</li>
<li>Background class</li>
<li>Item class</li>
<br>
The properties of each class varies depending on the functionality. The Player class contains the most comprehensive properties and we will use the player class as an example.

<a name="classandconstructor"></a>
<h2>Class and Constructor</h2> We first create the class and following constructor() method

```
class Player {
  constructor() {
    this.speed = 6;
```

<a name="position"></a>
<h2>Position</h2> Next we define the position which sets the player's starting position

```
this.position = {
      x: 100,
      y: 100,
    };
```

<a name="dimension"></a>
<h2>Dimensions</h2> The dimensions of the player's size on the canvas is defined as such

```
    this.width = 66;
    this.height = 120;
```

<a name="velocity"></a>
<h2>Velocity</h2>

```
   this.velocity = {
      x: 0,
      y: 0,
    };
```

<a name="skin"></a>
<h2>Player skin selection</h2> if statements and conditions are used to facilitate the player's image being chosen to draw on the canvas

```
    if (playerImage1 === true) {
      this.image = createImage("./img/character1.png");
    } else if (playerImage2 === true) {
      this.image = createImage("./img/character2.png");
    } else if (playerImage3 === true) {
      this.image = createImage("./img/character3.png");
    }
    this.frames = 0;
  }
```

<a name="draw"></a>
<h2>draw() method</h2> The draw method is used to draw the image onto the canvas. The drawImage() method draws an image, canvas, or video onto the canvas.

```
  draw() { 
    c.drawImage(
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
  }
```

<a name="update"></a>
<h2>update() method</h2> The udpdate() method is used to update the player's position on the canvas. <br> An if statement is used to 

```
  update() {
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;
    this.draw();

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity; //acceleration to gravity
    } 
  }
```

<a name="imagecreation"></a>
## 4. Image creation
<p> As multiple images will be used in this project, defining a function to create the image will be useful</p>

```
function createImage(imageSrc) {
  const image = new Image();
  image.src = imageSrc;
  return image;
  // console.log(image);
}
```


<p>Variable assign the image creation for each item. For example:</p>

```
const platformImage3 = createImage("./img/platform_3.png");
const backgroundImage = createImage("./img/background_2.png");
```


<a name="implementingclasses"></a>
## 5. Implementing the Classes
<p> Once the classes have been defined, we can implement each class by assigning variables to an array containing the object key-values pairs </p>

```
let player = new Player();

let platforms = [
  new Platform({ x: -50, y: 560, image: platformImage }),
  new Platform({ x: platformImage.width - 60, y: 560, image: platformImage }),
  ];
  
let enemy = [new EnemyObjects({ x: -3000, y: 370, image: enemyImage })];
```

<p> The same implementation approach described above can be used to populate the Classes and have them drawn onto the canvas </p>


<a name="restartgame"></a>
## 6. Restart game 
<p> The restart game functions are essential to this game and will be called in multiple scenarios such as when a player dies, selects a new difficulty mode, a new skin or completes the game.</p><br>
<p> The restart game functions will also be used to reset certain values such as the positions of the items on the canvas and assigning new values to the global values to meet certain conditions</p><br>
<p>Here is an example of the restart game function</p>

```
function restartGame() {
player = new Player();

itemCollection = false;

platforms = [
    new Platform({ x: -50, y: 560, image: platformImage }),
    new Platform({ x: platformImage.width - 60, y: 560, image: platformImage })
    ];

  scrollOffset = 0;
  player.position.x = 100;
  keys.right.pressed = false;
  // keys.up.pressed = false;
  keys.left.pressed = false;
  }
  ```
  
  
<a name="animation"></a>
## 7. Animation
<p>An animate function is used to perform and execute various actions such as calling the individual classes and their draw functions for the array. Conditional statements are used to control the animation, such as velocity and position of objects.</p>

<p>An example of the animate function is shown below:</p>

```
function animate() {
  toggleScreen("startScreen", false);
  toggleScreen("canvas", true);
  
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
  
   platforms.forEach((platform) => {
    platform.draw();
  });
  
    enemy.forEach((item) => {
    item.draw();
  });
  
   player.update();
```



<a name="enemycollision"></a>
## 8. Enemy Collision Detection
<p>Enemy Collision Detection is used to detect if the player physically contacts an enemy, which will result in the player dying. Other collision detection such as platform collision detection, and item collection detection also share the same fundamentals.</p><br>

```
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
  ```


<a name="platformcollision"></a>
## 9. Platform Collision Detection
<p>Platform Collision Detection is used to create the illusion of the character landing and moving on the platforms. </p> <br>
<p> Basically, this detection system makes use of the if statement and conditions, and any y position above or equal to the platform, player y velocity = 0 </p>

```
platforms.forEach((platform) => {
    if (
      player.position.y + player.height <= platform.position.y && 
      player.position.y + player.height + player.velocity.y >= 
        platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0;
    }
  });
```


<a name="wincondition"></a>
## 10. Win condition
<p> To ensure a player wins, certain conditions must be met. We can define them using if statements as such: </p>

```
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
```

<a name="losecondition"></a>
## 11. Lose condition
<p> To ensure a player loses, certain conditions must be met. We can define them using if statements as such: </p>

```
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
```

<a name="eventlistener"></a>
## 12. Event listener
<p> Event listeners are used to listen for user's inputs, the keys pressed will determine how the player interacts and moves. </p>

```
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


```
