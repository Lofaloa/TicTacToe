// This class manages the display of the game.
class View {

    // Constructs this view with the game to represent.
    constructor(game) {
        this._game = game;
        this._timer;
        this._timer_display = "<div id='timer'><span id='minutes'>00</span>:" +
            "<span id='seconds'>00</span>" +
            "</div>";
        this._theme = View.DAY_THEME;
    }

    static get NIGHT_THEME() {
        return "night";
    }

    static get DAY_THEME() {
        return "day";
    }

    // Gets the path to the picture file representing X. The file depends of 
    // the current theme of this view: black on white (day) or white on black 
    // (night).
    get X_IMG_PATH() {
        return `./images/${this._theme}/cross.png`;
    }

    // Gets the path to the picture file representing O. The file depends of 
    // the current theme of this view: black on white (day) or white on black 
    // (night).
    get O_IMG_PATH() {
        return `./images/${this._theme}/circle.png`;
    }

    // Tells if this view is in night theme.
    get isNightTheme() {
        return this._theme == View.NIGHT_THEME;
    }

    // Initializes this view. 
    init() {
        this.clearBoard();
        this.showCurrentPlayer();
        this.showScores();
    }

    // Sets this view theme to night (white on black).
    setNightTheme() {
        this._theme = View.NIGHT_THEME;
        this.updateTheme();
    }

    // Sets this view theme to day (black on white).
    setDayTheme() {
        this._theme = View.DAY_THEME;
        this.updateTheme();
    }

    // Toggles this view theme.
    toggleTheme() {
        this.isNightTheme ? this.setDayTheme() : this.setNightTheme();
    }

    // Updates the marker of the given box.
    updateMarker(box) {
        let position = box.data('pos');
        if (game.isPlayerAt(Board.X_MARKER, position.row, position.col)) {
            $(box).html(`<img class='marker' src=${this.X_IMG_PATH}>`);
        } else if (game.isPlayerAt('O', position.row, position.col)) {
            $(box).html(`<img class='marker' src=${this.O_IMG_PATH}>`);
        }
    }

    // Updates this view board according to its game.
    updateBoard() {
        for (let row = 1; row <= Board.SIZE; row++) {
            let current_row = $("table tr").eq(row);
            for (let box = 0; box < Board.SIZE; box++) {
                let current_box = current_row.find("td").eq(box);
                this.updateMarker(current_box);
            }
        }
    }

    // Toggles the theme. It can be either black on with (night) or white on 
    // black (day)
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

    // Shows the scores in the page.
    showScores() {
        $('#scoreX').text(this._game._players[0].score);
        $('#scoreO').text(this._game._players[1].score);
    }

    // Clears the board from all the player.
    clearBoard() {
        for (let i = 0; i < $('#board tr').length; i++) {
            for (let j = 0; j < $('#board td').length; j++) {
                $('#board tr').eq(i).children().eq(j).text(' ');
            }
        }
    }

    // Shows the current player.
    showCurrentPlayer() {
        if (this._game.currentPlayer.isX()) {
            $("#circleHeader").parent().css("border", "1px solid var(--border_color)");
            $("#crossHeader").parent().css("border", "3px solid var(--border_color)");
        } else {
            $("#crossHeader").parent().css("border", "1px solid var(--border_color)");
            $("#circleHeader").parent().css("border", "3px solid var(--border_color)");
        }
    }

    // Shows the icons representing the markers in the game header.
    showHeaderIcons() {
        $("#crossHeader").attr("src", this.X_IMG_PATH);
        $("#circleHeader").attr("src", this.O_IMG_PATH);
    }

    // Shows the timer and makes it start. The timer only holds the minutes and
    // the seconds. It starts from 00.00.
    showTimer() {
        $("body").append(this._timer_display);
        this._timer = new Timer();
        this._timer.start();
    }

    // Removes the timer.
    removeTimer() {
        this._timer.stop();
        $("#timer").remove();
    }

    // Updates this view: the board and the current player display are updated. 
    update() {
        this.updateBoard("day");
        this.showCurrentPlayer();
    }

    // Shows the start menu. It prompts the user in order to know what marker
    // he/ she desires to use.
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

    // Removes the start menu from the document.
    removeStartMenu() {
        $('h1, table, #theme_control').css("filter", "blur(0px)");
        $('#start_menu').remove();
    }

    // Shows the replay menu. It prompts the user in order to know if he/ she
    // wants to replay or quit the game.
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
        $('#quit').click(start);
    }

    // Removes the replay menu.
    removeReplayMenu() {
        $('h1, table, #theme_control').css("filter", "blur(0px)");
        $('#replay_menu').remove();
    }

}