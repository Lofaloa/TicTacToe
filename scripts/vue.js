let timer;

//Shows the current player in the given box.
function showMove(box, player) {
	if ($("body").hasClass("night")) {
		showIcon(box, "night");
	} else {
		showIcon(box, "day");
	}

}

//Shows the icon corresponding to the player.
function showIcon(box, theme) {
	let posBox = box.data('pos');
	if (game.board[posBox.row][posBox.col] == 'X') {
		$(box).html(`<img src='./images/${theme}/cross.png' width='50'>`);
	} else if (game.board[posBox.row][posBox.col] == 'O') {
		$(box).html(`<img src='./images/${theme}/circle.png' width='50'>`);
	}
}

//Shows a replay button.
function showReplayButton() {
	$('body').append('<button id="replay">New round</button>');
	$('#replay').click(startNewRound);
}

//Shows the scores in the page.
function showScores() {
	$('#scoreX').text(game._players[0].score);
	$('#scoreO').text(game._players[1].score);
}

//Clears the board from all the player.
function clearBoard() {
	for (let i = 0; i < $('#board tr').length; i++) {
		for (let j = 0; j < $('#board td').length; j++) {
			$('#board tr').eq(i).children().eq(j).text(' ');
		}
	}
}

//Shows the current player.
function showCurrentPlayer() {
	if (game.currentPlayer.isX()) {
		$("#circleHeader").parent().css("border", "1px solid var(--border_color)");
		$("#crossHeader").parent().css("border", "3px solid var(--border_color)");
	} else {
		$("#crossHeader").parent().css("border", "1px solid var(--border_color)");
		$("#circleHeader").parent().css("border", "3px solid var(--border_color)");
	}
}

function showHeaderIcons(theme) {
	if (theme != "day" && theme != "night") {
		throw theme + " is not a valid theme, it should be either night or day";
	}
	$("#crossHeader").attr("src", `./images/${theme}/cross.png`);
	$("#circleHeader").attr("src", `./images/${theme}/circle.png`);
}

function updateIcons(theme) {
	if (theme != "day" && theme != "night") {
		throw theme + " is not a valid theme, it should be either night or day";
	}
	for (let table_row = 1; table_row <= 3; table_row++) {
		let current_row = $("table tr").eq(table_row);
		for (let data_row = 0; data_row < 3; data_row++) {
			let current_box = current_row.find("td").eq(data_row);
			showIcon(current_box, theme);
		}
	}
}

//Toggles the theme. It can be either black on with (night) or white n clock (day)
function toggleTheme() {
	if ($("body").hasClass("night")) {
		showHeaderIcons("day");
		updateIcons("day");
		$("#theme_control").attr("title", "Click for night theme");
		$("#theme_control").attr("class", "far fa-moon");
	} else {
		showHeaderIcons("night");
		updateIcons("night");
		$("#theme_control").attr("title", "Click for day theme");
		$("#theme_control").attr("class", "far fa-sun");
	}
	$("body").toggleClass("night");
}

function showTimer() {
	$("body").append("<div id=\"timer\">" +
		"<span id=\"minutes\">00</span>:<span id=\"seconds\">00</span>" +
		"</div>");
	timer = new Timer();
	timer.start();
}

function removeTimer() {
	timer.stop();
	$("#timer").remove();
}