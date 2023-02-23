class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "scene1"});
    this.score = 0;
    this.maxEnergy = 100;
    this.currentEnergy = 50;
    this.currentEnergy = 0;
    this.energyDecayRate = 1;
    this.energyRegenRate = 5;
    this.scoreMultiplier = 1;
    this.timer = null;
    this.timerEvent = null;
    this.countdownSeconds = 10;
    this.isCountdownActive = false;
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

    this.startEnergyTimer();
  }

  onClickPicture(pointer, gameObject) {
    this.score += 1 * this.scoreMultiplier;
    this.scoreText.setText('Score: ' + this.score);

    if (this.currentEnergy >= this.maxEnergy) {
      this.scoreMultiplier = 2;
      this.startCountdown();
    }

    this.currentEnergy += 10;
    if (this.currentEnergy > this.maxEnergy) {
      this.currentEnergy = this.maxEnergy;
    }
    this.energyBar.setScale(this.currentEnergy / this.maxEnergy, 1);
    this.energyText.setText('Energy: ' + this.currentEnergy + '/' + this.maxEnergy);
  }

  startEnergyTimer() {
    this.timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.onEnergyTimerTick,
      callbackScope: this
    });
  }

  onEnergyTimerTick() {
    if (this.isCountdownActive) {
      return;
    }

    this.currentEnergy -= this.energyDecayRate;
    if (this.currentEnergy < 0) {
      this.currentEnergy = 0;
    }
    this.energyBar.setScale(this.currentEnergy / this.maxEnergy, 1);
    this.energyText.setText('Energy: ' + this.currentEnergy + '/' + this.maxEnergy);

    if (this.currentEnergy <= 0) {
      this.scoreMultiplier = 1;
    }
  }

  startCountdown() {
    this.isCountdownActive = true;

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      repeat: this.countdownSeconds - 1,
      callback: this.onCountdownTick,
      callbackScope: this,
      onComplete: this.onCountdownComplete
    });
  }

  onCountdownTick() {
    const timeRemaining = this.timerEvent.getRepeatCount();
    this.energyText.setText(`Energy: ${this.currentEnergy}/${this.maxEnergy} (${timeRemaining}s)`);
  }

  onCountdownComplete() {
    this.isCountdownActive = false;
    this.scoreMultiplier = 1;

    this.currentEnergy = 0;
    this.energyBar.setScale(0, 1);
    this.energyText.setText('Energy: ' + this.currentEnergy + '/' + this.maxEnergy);

    this.time.addEvent({
      delay: 5000,
      callback: this.startEnergyTimer,
      callbackScope: this
    });
  }

  update() {
    if (!this.isCountdownActive) {
      return;
    }
      
    const timeRemaining = Math.ceil(this.timerEvent.getRemainingSeconds());
    this.energyText.setText(`Energy: ${this.currentEnergy}/${this.maxEnergy} (${timeRemaining}s)`);
  }
}