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
    this.paperIcon = this.add.image(750, 100, 'paperIcon');
    this.paperIcon.setInteractive(); // Make paperIcon clickable
    this.paperIcon.visible = true;
    this.paperIconPrice = 10;
    this.paperIconOffset = 0;
    this.paperIconText = this.add.text(720, 150, this.paperIconPrice, { fontSize: '32px', fill: '#000' });
    this.paperIconText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    

    // Add airplaneIcon to the scene
    this.airplaneIcon = this.add.image(750, 300, 'airplaneIcon');
    this.airplaneIcon.setInteractive(); // Make airplaneIcon clickable
    this.airplaneIcon.visible = true;
    this.airplaneIconPrice = 100;
    this.airplaneIconOffset = 0;
    this.airplaneIconText = this.add.text(720, 400, this.airplaneIconPrice, { fontSize: '32px', fill: '#000' });
    this.airplaneIconText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);

    // Add click event listener to paperIcon
    this.paperIcon.on('pointerdown', () => {
      if (this.score > this.paperIconPrice) {
        this.score -= this.paperIconPrice;
        this.scoreText.setText('Score: ' + this.score.toFixed(2));
        this.scoreText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);

        this.add.image(50, 300 + this.paperIconOffset, 'paperIcon');
        
        this.paperIconOffset += 70;
        this.autoIncrement += 0.1;
        this.autoIncrementText.setText('AutoIncrement: ' + this.autoIncrement.toFixed(2));
        this.autoIncrementText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);

        this.paperIconPrice = Math.ceil(1.5 * this.paperIconPrice);
        this.paperIconText .setText(this.paperIconPrice);
      }
    });

    // Add click event listener to airplaneIcon
    this.airplaneIcon.on('pointerdown', () => {
      if (this.score > this.airplaneIconPrice) {
        this.score -= this.airplaneIconPrice;
        this.scoreText.setText('Score: ' + this.score.toFixed(2));
        this.scoreText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
  
        this.add.image(100, 300 + this.airplaneIconOffset, 'airplaneIcon');
        
        this.airplaneIconOffset += 70;
        this.autoIncrement += 1;
        this.autoIncrementText.setText('AutoIncrement: ' + this.autoIncrement.toFixed(2));
        this.autoIncrementText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
  
        this.airplaneIconPrice = Math.ceil(2.5 * this.airplaneIconPrice);
        this.airplaneIconText .setText(this.airplaneIconPrice);
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