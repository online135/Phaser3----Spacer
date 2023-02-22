window.onload = function () {
	var config = {
			type: Phaser.AUTO,
			width: 800,
			height: 600,
			backgroundColor: 0x333333,
			scene: [ Scene1, Scene2 ]
			// scene: {
			// 		preload: preload,
			// 		create: create,
			// 		update: update
			// }
	};

	var game = new Phaser.Game(config);
}
