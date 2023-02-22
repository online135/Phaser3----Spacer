class Scene1 extends Phaser.Scene {
  constructor() {
    super("scene1");
    this.score = 0;
    this.spacePressed = false;
  }

  preload() {
    this.load.image('picture', 'assets/paper.png');
  }

  create() {

    this.add.image(400, 300, 'picture').setInteractive();

    this.scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '32px', fill: '#000' });

    this.input.on('gameobjectup', this.onClickPicture, this);
  }

  onClickPicture(pointer, gameObject) {
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
  }

  // upload() {
  //   if ()
  // }

  // update() {
  //   if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown && !this.spacePressed) {
  //     this.spacePressed = true;
  //     this.score += 1;
  //     this.scoreText.setText('Score: ' + this.score);
  //   }

  //   if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isUp) {
  //     this.spacePressed = false;
  //   }
  // }
}
