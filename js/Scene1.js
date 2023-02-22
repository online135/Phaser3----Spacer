class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }

  create() {

    const myText = this.add.text(40, 40, "bootGame...");
    myText.setInteractive();
    // this.scene.start("playGame");

    // add an event listener for the 'pointerup' event on the text object
    myText.on('pointerup', () => {
      // change to another Scene by calling the Scene Manager's start method with the scene key as the argument
      this.scene.start('playGame');
    });
  }

  // upload() {
  //   if ()
  // }
}
