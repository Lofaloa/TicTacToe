let game = new Game();
let view = new View(game);
let controller = new Controller(game, view);

//Starts a new round. 
function startNewRound() {
	view.clearBoard();
	view.showTimer();
	game.start_round();
	$('td').click(function() {
		try {
			controller.makeAMove($(this));
		} catch (e) {
			alert(e);
			console.log(e);
		}
	});
	view.removeReplayMenu();
	view.showCurrentPlayer();
}

function reset() {
	game.start();
	view.removeReplayMenu();
	view.showCurrentPlayer();
	view.showStartMenu();
	view.showScores();
	$('#choose_cross').click(function() {
		game.ai_player = 1;
		startNewRound();
		view.removeStartMenu();
		$("#theme_control").click(function() {
			view.toggleTheme();
		});
	});
	$('#choose_circle').click(function() {
		game.ai_player = 0;
		startNewRound();
		view.removeStartMenu();
		$("#theme_control").click(function() {
			view.toggleTheme();
		});
	});
}

$('document').ready(function () {
	view.showCurrentPlayer();
	view.showStartMenu();
	$('#choose_cross').click(function() {
		game.ai_player = 1;
		startNewRound();
		view.removeStartMenu();
		$("#theme_control").click(function() {
			view.toggleTheme();
		});
	});
	$('#choose_circle').click(function() {
		game.ai_player = 0;
		startNewRound();
		view.removeStartMenu();
		$("#theme_control").click(function() {
			view.toggleTheme();
		});
	});
});