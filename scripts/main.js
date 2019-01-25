let game = new Game();
let view = new View(game);
let controller = new Controller(game, view);

//Starts a new round. 
function startNewRound() {
	view.clearBoard();
	view.showTimer();
	game.start();
	$('td').click(function() {
		try {
			controller.makeAMove($(this));
		} catch (e) {
			alert(e);
			console.log(e);
		}
	});
	$('#replay').remove();
	view.showCurrentPlayer();
}

$('document').ready(function () {
	view.showCurrentPlayer();
	view.showStartMenu();
	$('#start').click(function () {
		startNewRound();
		$('#start').remove();
		view.removeStartMenu();
	});
	$("#theme_control").click(function() {
		view.toggleTheme();
	});
});