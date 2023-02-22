class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  create() {
    this.add.text(40, 40, "bootGame...");
    //this.scene.start("playGame");
  }
}
