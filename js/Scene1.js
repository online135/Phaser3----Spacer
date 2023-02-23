class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "scene1"});
    this.score = 0;
    this.autoIncrement = 0;
    this.timer = 0;
    this.paperIconOffset = 0;
    this.paperIconPrice = 10;
  }

  preload() {
    this.load.image('paper', 'assets/paper.png');
    this.load.image('paperIcon', 'assets/paperIcon.png');
  }

  create() {
    // Add paper to the scene
    this.paper = this.add.image(400, 300, 'paper');
    this.paper.setInteractive(); // Make paper clickable
    this.paper.visible = true;

    // Add click event listener to paper
    this.paper.on('pointerdown', this.onClickPaper, this);

    // Add paperIcon to the scene
    this.paperIcon = this.add.image(750, 100, 'paperIcon');
    this.paperIcon.setInteractive(); // Make paperIcon clickable
    this.paperIcon.visible = true;
    this.paperIconText = this.add.text(740, 150, this.paperIconPrice, { fontSize: '32px', fill: '#000' });


    // Add click event listener to paperIcon
    this.paperIcon.on('pointerdown', () => {
      if (this.score > this.paperIconPrice) {
        this.score -= this.paperIconPrice;
        this.scoreText.setText('Score: ' + this.score.toFixed(2));
        this.load.image('paperIcon2', 'assets/paperIcon.png');
        this.add.image(50, 300 + this.paperIconOffset, 'paperIcon');
        this.paperIconOffset += 70;
        this.autoIncrement += 0.1;
        this.autoIncrementText.setText('AutoIncrement: ' + this.autoIncrement.toFixed(2));

        this.paperIconPrice *= 1.5;
        this.paperIconText .setText(this.paperIconPrice.toFixed(2));
      }
    });
    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.autoIncrementText = this.add.text(10, 50, 'AutoIncrement: ' + this.autoIncrement.toFixed(2), { fontSize: '16px', fill: '#000' });
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