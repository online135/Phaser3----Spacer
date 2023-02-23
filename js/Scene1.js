class Scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
    this.score = 0;
    this.maxEnergy = 100;
    this.currentEnergy = 50;
  }

  preload() {
    this.load.image('picture', 'assets/paper.png');
    this.load.image('energyBar', 'assets/energy-bar.png');
  }

  create() {

    this.add.image(400, 300, 'picture').setInteractive();

    this.energyBar = this.add.image(200, 10, 'energyBar').setOrigin(0, 0);

    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });
    this.energyText = this.add.text(10, 90, 'Energy: ' + this.currentEnergy + '/' + this.maxEnergy, { fontSize: '32px', fill: '#000' });

    this.input.on('gameobjectup', this.onClickPicture, this);
  }

  onClickPicture(pointer, gameObject) {
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);

    this.currentEnergy += 10;
    if (this.currentEnergy > this.maxEnergy) {
      this.currentEnergy = this.maxEnergy;
    }
    this.energyBar.setScale(this.currentEnergy / this.maxEnergy, 1);
    this.energyText.setText('Energy: ' + this.currentEnergy + '/' + this.maxEnergy);
  }
}
