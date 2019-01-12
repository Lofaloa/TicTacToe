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
		}
	});
	$('#replay').remove();
	view.showCurrentPlayer();
}

$('document').ready(function () {
	view.showCurrentPlayer();
	$('#start').click(function () {
		startNewRound();
		$('#start').remove();
	});
	$("#theme_control").click(function() {view.toggleTheme()});
});