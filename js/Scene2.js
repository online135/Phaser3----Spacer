class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
  }

  create() {
    this.add.text(60, 60, "Playing111 game", {
      font: "25px Arial",
      fill: "yellow"
    });
  }
}
