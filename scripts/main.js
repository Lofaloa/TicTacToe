let game = new Game();
let view = new View(game);
let controller = new Controller(game, view);

//Starts a new round. Players scores are kept and the board is cleared.
function startNewRound() {
	view.init();
	game.start_round();
	$('td').click(function() {
		try {
			controller.handle($(this));
		} catch (e) {
			console.log(e);
			alert(e);
		}
	});
	view.removeReplayMenu();
}

// Restarts the game. Players scores are resetted and the board is cleared.
function start() {
	game.start();
	view.init();
	view.removeReplayMenu();
	view.showStartMenu();
	$('#choose_cross').click(function() {
		game.ai_player = 1;
		startNewRound();
		view.removeStartMenu();
		view.showTimer();
		$("#theme_control").click(function() {
			view.toggleTheme();
		});
	});
	$('#choose_circle').click(function() {
		game.ai_player = 0;
		startNewRound();
		view.removeStartMenu();
		view.showTimer();
		$("#theme_control").click(function() {
			view.toggleTheme();
		});
	});
}

$('document').ready(function () {
	start();
});