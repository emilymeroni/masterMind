(function() {

    'use strict';

    mastermind.GameManager = function() {

        this._board = new mastermind.board.Board({});

        const pegChooser = mastermind.PegChooser.getInstance();

        document.body.appendChild(this._board.node);
        document.body.appendChild(pegChooser.node);

        pegChooser.addObserver(this, mastermind.PegChooser.PEG_CHOSEN, 'insertPegInBoard');
    };

    mastermind.GameManager.prototype._board = undefined;

    /**
     * Listens to the mastermind.PegChooser.PEG_CHOSEN event notifications broadcast by the PegChooser
     */
    mastermind.GameManager.prototype.insertPegInBoard = function(peg) {
        const activeRowHolder = this._board.getActiveRowHolder();
        activeRowHolder.insertCodePeg(peg);
    };

})();