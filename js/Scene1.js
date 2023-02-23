class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "scene1"});
    this.score = 0;
    this.autoIncrement = 0;
    this.timer = 0;
    this.paper_icon_offset = 0;
  }

  preload() {
    this.load.image('paper', 'assets/paper.png');
    this.load.image('paper_icon', 'assets/paper_icon.png');
  }

  create() {
    // Add paper to the scene
    this.paper = this.add.image(400, 300, 'paper');
    this.paper.setInteractive(); // Make paper clickable
    this.paper.visible = true;

    // Add click event listener to paper
    this.paper.on('pointerdown', this.onClickPaper, this);

    // Add paper_icon to the scene
    this.paper_icon = this.add.image(750, 100, 'paper_icon');
    this.paper_icon.setInteractive(); // Make paper_icon clickable
    this.paper_icon.visible = true;

    // Add click event listener to paper_icon
    this.paper_icon.on('pointerdown', () => {
      if (this.score > 10) {
        this.score -= 10;
        this.scoreText.setText('Score: ' + this.score);
        this.load.image('paper_icon2', 'assets/paper_icon.png');
        this.add.image(50, 300 + this.paper_icon_offset, 'paper_icon');
        this.paper_icon_offset += 70;
        this.autoIncrement += 0.1;
        this.autoIncrementText.setText('AutoIncrement: ' + this.autoIncrement);
      }
    });
    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.autoIncrementText = this.add.text(10, 50, 'AutoIncrement: ' + this.autoIncrement, { fontSize: '16px', fill: '#000' });
  }

  onClickPaper(pointer, gameObject) {
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
  }

  update(time, delta) {
    this.timer += delta;
    if (this.timer >= 1000) {
        this.score += this.autoIncrement;
        this.scoreText.setText('Score: ' + this.score);
        this.timer -= 1000;
    }
  }
}