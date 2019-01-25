class Controller {

    constructor(game, view) {
        this._game = game;
        this._view = view;
    }

    get game() {
        return this._game;
    }

    get view() {
        return this._view;
    }

    //Assigns the given box to the current player of the game.
    writePlayerTo(box) {
        let boxPos = box.data('pos');
        this.game.playAt(boxPos.row, boxPos.col);
    }

    //Makes the current player play and passes to the next player if the current
    //round is not over.
    makeAMove(box) {
        if (!this.game.isOver()) {
            this.writePlayerTo(box);
            this.game.nextPlayer();
            if (this.game.currentPlayer.isAI) {
                this.game.currentPlayer.play();
                this.game.nextPlayer();
            }
        }
        this.view.update();
        this.endRound();
    }

    //Gives a point to the winner. Shows a replay button. If the round is even, 
    //no player get a point, the replay button is also displayed.
    endRound() {
        if (this.game.isOver()) {
            if (!game.isEven) this.game.currentPlayer.scoreUp();
            this.view.showScores();
            this.view.removeTimer();
            this.view.showReplayMenu();
            $('td').off("click");
        }
    }

}