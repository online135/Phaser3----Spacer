window.onload = function () {
	var config = {
			type: Phaser.AUTO,
			width: 1200,
			height: 800,
			backgroundColor: 0x222222,
			scene: [ Scene1, Scene2 ]
			// scene: {
			// 		preload: preload,
			// 		create: create,
			// 		update: update
			// }
	};

	var game = new Phaser.Game(config);
}
