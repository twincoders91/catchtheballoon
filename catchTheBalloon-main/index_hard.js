//===============================================================
// ======================= RESTART GAME  ========================
//===============================================================

function restartGameHard() {
  easyButton.innerHTML = "Easy";
  easyButton.style.backgroundColor = "darkgoldenrod";
  mediumButton.innerHTML = "Medium";
  mediumButton.style.backgroundColor = "darkgoldenrod";
  hardButton.innerHTML = "Naise!";
  hardButton.style.backgroundColor = "white";

  gameModeEasy = false;
  gameModeMedium = false;
  gameModeHard = true;

  gravity = 0.5;
  player = new Player();
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
    new Platform({ x: 3800, y: 300, image: platformImage3 }),
    new Platform({ x: 4000, y: 150, image: platformImage3 }),
    new Platform({ x: 4300, y: 150, image: platformImage3 }),
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

  item = [new ItemObjects({ x: 4625, y: 500, image: itemImage })];

  enemy = [
    new EnemyObjects({ x: 800, y: 510, image: enemyImage }),
    new EnemyObjects({ x: 2100, y: 370, image: enemyImage }),
    new EnemyObjects({ x: 2400, y: 370, image: enemyImage }),
    new EnemyObjects({ x: 4500, y: 250, image: enemyImage }),
    new EnemyObjects({ x: 8400, y: 400, image: enemyImage }),
    new EnemyObjects({ x: 9100, y: 470, image: enemyImage }),
    new EnemyObjects({ x: 9150, y: 470, image: enemyImage }),
  ];

  enemyFlying = [
    new EnemyFlyingObjects({ x: 750, y: 370, image: enemyImage }),
    new EnemyFlyingObjects({ x: 1155, y: 200, image: enemyImage }),
    new EnemyFlyingObjects({ x: 3050, y: 370, image: enemyImage }),
    new EnemyFlyingObjects({ x: 3450, y: 100, image: enemyImage }),
    new EnemyFlyingObjects({ x: 3900, y: 370, image: enemyImage }),
    new EnemyFlyingObjects({ x: 4100, y: 500, image: enemyImage }),
    new EnemyFlyingObjects({ x: 6500, y: 1, image: enemyImage }),
    new EnemyFlyingObjects({ x: 6700, y: 500, image: enemyImage }),
    new EnemyFlyingObjects({ x: 7100, y: 1, image: enemyImage }),
    new EnemyFlyingObjects({ x: 7900, y: 500, image: enemyImage }),
    new EnemyFlyingObjects({ x: 10000, y: 200, image: enemyImage }),
    new EnemyFlyingObjects({ x: 10200, y: 400, image: enemyImage }),
  ];

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
