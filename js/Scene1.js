class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "scene1"});
    this.score = 1000;
    this.autoIncrement = 0;
    this.timer = 0;
  }

  preload() {
    this.load.image('paper', 'assets/paper.png');
    this.load.image('paperIcon', 'assets/paperIcon.png');
    this.load.image('airplaneIcon', 'assets/airplaneIcon.png');
  }

  create() {
    // Add paper to the scene
    this.paper = this.add.image(400, 300, 'paper');
    this.paper.setInteractive(); // Make paper clickable
    this.paper.visible = true;

    // Add click event listener to paper
    this.paper.on('pointerdown', this.onClickPaper, this);

    // Add paperIcon to the scene
    this.paperIcon = new Icon(this, 750, 100, 'paperIcon', 10, 0);

    // Add airplaneIcon to the scene
    this.airplaneIcon = new Icon(this, 750, 300, 'airplaneIcon', 100, 0);

    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.autoIncrementText = this.add.text(10, 50, 'AutoIncrement: ' + this.autoIncrement.toFixed(2), { fontSize: '16px', fill: '#000' });


    // create a new line game object
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var x1 = windowWidth / 3;
    var lineLeft = new Phaser.Geom.Line(x1, 0, x1, windowHeight);

    // create a new line game object
    var lineRight = new Phaser.Geom.Line(500, 300, 500, 600);

    // draw the line graphics
    var graphics = this.add.graphics();
    graphics.lineStyle(3, 0xFF0000); // set the line thickness and color
    graphics.strokeLineShape(lineLeft); // draw the line
  }

  onClickPaper(pointer, gameObject) {
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score.toFixed(2));
  }

  update(time, delta) {
    this.timer += delta;
    if (this.timer >= 1000) {
        this.score += this.autoIncrement;
        this.scoreText.setText('Score: ' + this.score.toFixed(2));
        this.timer -= 1000;
    }
  }
}