class View {

    constructor(game) {
        this._game = game;
        this._timer;
        this._theme = View.DAY_THEME;
    }

    static get NIGHT_THEME() {
        return "night";
    }

    static get DAY_THEME() {
        return "day";
    }

    setNightTheme() {
        this._theme = View.NIGHT_THEME;
    }

    setDayTheme() {
        this._theme = View.DAY_THEME;
    }

    toggleTheme() {
        if (this._theme == View.DAY_THEME) {
            this.setNightTheme();
        } else {
            this.setDayTheme();
        }
        this.updateTheme();
    }

    //Tells if this view is in night theme.
    get isNightTheme() {
        return this._theme == View.NIGHT_THEME;
    }

    //Shows the icon corresponding to the player.
    showIcon(box) {
        let posBox = box.data('pos');
        if (game.isPlayerAt('X', posBox.row, posBox.col)) {
            $(box).html(`<img src='./images/${this._theme}/cross.png' width='50'>`);
        } else if (game.isPlayerAt('O', posBox.row, posBox.col)) {
            $(box).html(`<img src='./images/${this._theme}/circle.png' width='50'>`);
        }
    }

    updateIcons() {
        for (let table_row = 1; table_row <= 3; table_row++) {
            let current_row = $("table tr").eq(table_row);
            for (let data_row = 0; data_row < 3; data_row++) {
                let current_box = current_row.find("td").eq(data_row);
                this.showIcon(current_box);
            }
        }
    }

    //Toggles the theme. It can be either black on with (night) or white on black (day)
    updateTheme() {
        if (this.isNightTheme) {
            $("#theme_control").attr("title", `Click for day theme`);
            $("#theme_control").attr("class", "far fa-sun");
        } else {
            $("#theme_control").attr("title", "Click for night theme");
            $("#theme_control").attr("class", "far fa-moon");
        }
        $("body").attr("class", this._theme);
        this.update();
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

    showHeaderIcons() {
        $("#crossHeader").attr("src", `./images/${this._theme}/cross.png`);
        $("#circleHeader").attr("src", `./images/${this._theme}/circle.png`);
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

    update() {
        this.updateIcons("day");
        this.showCurrentPlayer();
        this.showHeaderIcons();
    }

    showStartMenu() {
        let div_id = "start_menu";
        let title = "Welcome to Tic Tac Toe!";
        let subtitle = "Choose your side!";
        let cross_src = `./images/${this._theme}/cross.png`; 
        let circle_src = `./images/${this._theme}/circle.png`;
        $('body').append(`<div class="popup" id=${div_id}></div>`);
        $(`#${div_id}`).append(`<span id="start_title">${title}</span></br>`);
        $(`#${div_id}`).append(`<span id="start_subtitle">${subtitle}</span>`);
        $(`#${div_id}`).append("<div id='choose'></div>")
        $('#choose').append(`<img src=${cross_src} id="choose_cross"></img>`);
        $('#choose').append(`<img src=${circle_src} id="choose_circle"></img>`);
        $('h1, table, #theme_control').css("filter", "blur(5px)");
    }

    removeStartMenu() {
        $('h1, table, #theme_control').css("filter", "blur(0px)");
        $('#start_menu').remove();
    }

    showReplayMenu() {
        let div_id = "replay_menu";
        let title = "Well done!";
        let subtitle = "Do you want to replay?";
        $('body').append(`<div class="popup" id=${div_id}></div>`);
        $(`#${div_id}`).append(`<span id="replay_title">${title}</span></br>`);
        $(`#${div_id}`).append(`<span id="replay_subtitle">${subtitle}</span>`);
        $(`#${div_id}`).append("<div id='options'></div>")
        $('#options').append(`<button id="replay">New round</button>`);
        $('#options').append(`<button id="quit">Quit</button>`);
        $('h1, table, #theme_control').css("filter", "blur(5px)");
        $('#replay').click(startNewRound);
        $('#quit').click(reset);
    }

    removeReplayMenu() {
        $('h1, table, #theme_control').css("filter", "blur(0px)");
        $('#replay_menu').remove();
    }

}