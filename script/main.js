function main(param) {
	var scene = new g.Scene({game: g.game, assetIds: ["heart"]});
	scene.loaded.add(function() {
		function generateHeart(x, y) {
			// heart変数にheart画像のSpriteを追加
			var heart = new g.Sprite({
				scene: scene,
				src: scene.assets["heart"]
			});
			// heartの位置をタッチされた場所にする。Akashicの基準座標は左上なので、タッチされた中心になるように微調整する
			heart.moveTo(
				x,
				y
			);
			// heartのtagという変数にcounterを格納
			heart.tag = {
				counter: 0
			};
			// 毎フレーム実行されるイベントであるupdateにイベントを登録
			heart.update.add(function(e) {
				// 毎フレームカウンタを追加
				heart.tag.counter++;
				if (heart.tag.counter > 100) {
					// カウンタが100を超えていたら削除する
					heart.destroy();
				} else if (heart.tag.counter > 50) {
					// カウンタが50を超えていたら半透明にしていく
					heart.opacity = (100 - heart.tag.counter) / 50;
					// このエンティティが変更されたという通知
					heart.modified();
				}
			});
			// 作成したheartスプライトをシーンに追加
			scene.append(heart);
		}
		// pointDownCaptureトリガーに関数を登録
		scene.pointDownCapture.add(function(e) {
			// タッチされたらハートを中心点に配置する
			generateHeart(
				e.point.x - scene.assets["heart"].width / 2,
				e.point.y - scene.assets["heart"].height / 2
			);
		});

		// 最初に中心にハートを出現させる
		generateHeart(
			g.game.width / 2 - scene.assets["heart"].width / 2,
			g.game.height / 2 - scene.assets["heart"].height / 2
		);
	});
	g.game.pushScene(scene);
}

module.exports = main;