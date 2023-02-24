class Icon extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, price, offset) {
        super(scene, x, y, texture)

        this.price = price;
        this.offset = offset;
        this.text = scene.add.text(x - 30, y + 50, this.price, { fontSize: '32px', fill: '#000' });
        this.text.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
    
        scene.add.image(this.x, this.y, texture);
        this.setInteractive();
        this.visible = true;

        this.on('pointerdown', () => {
            if (scene.score > this.price) {
              scene.score -= this.price;
              scene.scoreText.setText('Score: ' + scene.score.toFixed(2));
              scene.scoreText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
      
              scene.add.image(this.x - 70, this.y + this.offset, texture);
      
              this.offset += 70;
              scene.autoIncrement += (texture === 'paperIcon') ? 0.1 : 1;
              scene.autoIncrementText.setText('AutoIncrement: ' + scene.autoIncrement.toFixed(2));
              scene.autoIncrementText.setShadow(1, 1, 'rgba(0,0,0,0.5)', 2);
      
              this.price = Math.ceil((texture === 'paperIcon') ? 1.5 * this.price : 2.5 * this.price);
              this.text.setText(this.price);
            }
        });
    }
}