class View {

    constructor(game) {
        this._game = game;
        this._timer;
    }

    static get NIGHT_THEME() {
        return "night";
    }

    static get DAY_THEME() {
        return "day";
    }

    //Tells if this view is in night theme.
    get isNightTheme() {
        return $("body").hasClass(View.NIGHT_THEME);
    }

    //Shows the current player in the given box.
    showMove(box) {
        if (this.isNightTheme) {
            this.showIcon(box, View.NIGHT_THEME);
        } else {
            this.showIcon(box, View.DAY_THEME);
        }
    }

    //Shows the icon corresponding to the player.
    showIcon(box, theme) {
        let posBox = box.data('pos');
        if (game.isPlayerAt('X', posBox.row, posBox.col)) {
            $(box).html(`<img src='./images/${theme}/cross.png' width='50'>`);
        } else if (game.isPlayerAt('O', posBox.row, posBox.col)) {
            $(box).html(`<img src='./images/${theme}/circle.png' width='50'>`);
        }
    }

    //Shows a replay button.
    showReplayButton() {
        $('body').append('<button id="replay">New round</button>');
        $('#replay').click(startNewRound);
    }

    //Shows the scores in the page.
    showScores() {
        $('#scoreX').text(game._players[0].score);
        $('#scoreO').text(game._players[1].score);
    }

    //Clears the board from all the player.
    clearBoard() {
        for (let i = 0; i < $('#board tr').length; i++) {
            for (let j = 0; j < $('#board td').length; j++) {
                $('#board tr').eq(i).children().eq(j).text(' ');
            }
        }
    }

    //Shows the current player.
    showCurrentPlayer() {
        if (game.currentPlayer.isX()) {
            $("#circleHeader").parent().css("border", "1px solid var(--border_color)");
            $("#crossHeader").parent().css("border", "3px solid var(--border_color)");
        } else {
            $("#crossHeader").parent().css("border", "1px solid var(--border_color)");
            $("#circleHeader").parent().css("border", "3px solid var(--border_color)");
        }
    }

    showHeaderIcons(theme) {
        if (theme != View.NIGHT_THEME && theme != View.DAY_THEME) {
            throw theme + " is not a valid theme, it should be either night or day";
        }
        $("#crossHeader").attr("src", `./images/${theme}/cross.png`);
        $("#circleHeader").attr("src", `./images/${theme}/circle.png`);
    }

    updateIcons(theme) {
        if (theme != View.NIGHT_THEME && theme != View.DAY_THEME) {
            throw theme + " is not a valid theme, it should be either night or day";
        }
        for (let table_row = 1; table_row <= 3; table_row++) {
            let current_row = $("table tr").eq(table_row);
            for (let data_row = 0; data_row < 3; data_row++) {
                let current_box = current_row.find("td").eq(data_row);
                this.showIcon(current_box, theme);
            }
        }
    }

    //Toggles the theme. It can be either black on with (night) or white on black (day)
    toggleTheme() {
        if (this.isNightTheme) {
            this.showHeaderIcons("day");
            this.updateIcons("day");
            $("#theme_control").attr("title", "Click for night theme");
            $("#theme_control").attr("class", "far fa-moon");
        } else {
            this.showHeaderIcons("night");
            this.updateIcons("night");
            $("#theme_control").attr("title", "Click for day theme");
            $("#theme_control").attr("class", "far fa-sun");
        }
        $("body").toggleClass("night");
    }

    //Shows the timer.
    showTimer() {
        $("body").append("<div id=\"timer\">" +
            "<span id=\"minutes\">00</span>:<span id=\"seconds\">00</span>" +
            "</div>");
        this._timer = new Timer();
        this._timer.start();
    }

    //Removes the timer.
    removeTimer() {
        this._timer.stop();
        $("#timer").remove();
    }

}