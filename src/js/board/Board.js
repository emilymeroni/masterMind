(function () {
    'use strict';

    /**
     * @typedef {Object} mastermind.board.BoardParams
     * @property {number|undefined} holeCount
     * @property {number|undefined} rowNumber
     *
     */

    const CSS_NODE = 'masterMindBoard';

    /**
     * @param {mastermind.board.BoardParams} params
     * @constructor
     */
    mastermind.board.Board = function (params) {
        this._init(params);
    };

    /**
     * @type {Array.<mastermind.rowholder.RowHolder>}
     */
    mastermind.board.Board.prototype._rowHolders = undefined;

    /**
     * @type {mastermind.rowholder.RowHolder}
     * @private
     */
    mastermind.board.Board.prototype._activeRowHolder = undefined;

    /**
     * @type {mastermind.row.CodeRow}
     * @private
     */
    mastermind.board.Board.prototype._codeToGuessRow = undefined;

    mastermind.board.Board.prototype._init = function (params) {
        const rowNumber = params.rowNumber === undefined ? 8 : params.rowNumber;
        const holeCount = params.holeCount === undefined ? 4 : params.holeCount;
        this._rowHolders = this._initRowHolders(rowNumber, holeCount);
        this.node = this._renderNode();
        // initialise the active row to be the first
        this.activateRowHolder(this._rowHolders[0]);
        this._initCodeToGuessRow(holeCount);

    };
    /**
     * @param {number} rowNumber
     * @param {number|undefined} holeCount
     * @returns {Array.<mastermind.rowholder.RowHolder>} the
     * @private
     */
    mastermind.board.Board.prototype._initRowHolders = function (rowNumber, holeCount) {
        let rowHolders = [];
        for (let i = 0; i < rowNumber; i++) {
            const rowHolder = new mastermind.rowholder.RowHolder({
                holeCount: holeCount
            });
            rowHolder.addObserver(this, mastermind.rowholder.IS_FILLED_WITH_PEGS, 'verifyCode');
            rowHolders.push(rowHolder);
        }
        return rowHolders;
    };

    mastermind.board.Board.prototype._initCodeToGuessRow = function (holeCount) {
        this._codeToGuessRow = new mastermind.row.CodeRow({
            holeCount: holeCount
        });
        this._codeToGuessRow.fillWithRandomPegs();
    };

    mastermind.board.Board.prototype._renderNode = function () {
        const node = document.createElement('div');
        node.classList.add(CSS_NODE);

        this._rowHolders.forEach(function (rowHolder) {
            node.appendChild(rowHolder.node);
        });

        return node;
    };

    mastermind.board.Board.prototype.getActiveRowHolder = function () {
        return this._activeRowHolder;
    };

    /**
     * @param {mastermind.rowholder.RowHolder} rowHolder
     */
    mastermind.board.Board.prototype.activateRowHolder = function (rowHolder) {
        this._activeRowHolder = rowHolder;

        this._rowHolders.forEach(function (rowHolder) {
            rowHolder.deactivate();
        });
        rowHolder.activate();
    };

    //TODO: refactor me!!
    mastermind.board.Board.prototype.verifyCode = function (data) {
        const pegsToGuess = this._codeToGuessRow.getPegs();
        const pegsToGuessTemp = Object.assign(pegsToGuess);
        const guessingPegsTemp = Object.assign(data.codePegs);
        const keyPegs = [];

        console.log(pegsToGuess);

        // First, find the pegs that are in the correct position and color
        for (let i = 0; i < data.codePegs.length; i++) {
            // insert black peg in key pegs
            if (data.codePegs[i].getColor() === pegsToGuess[i].getColor()) {
                keyPegs.push(new mastermind.peg.KeyPeg({
                    color: mastermind.peg.KeyPeg.colors.get(mastermind.peg.CORRECT_POSITION_AND_COLOR)
                }));

                pegsToGuessTemp[i] = null;
                guessingPegsTemp[i] = null;
            }
        }

        if (keyPegs.length === pegsToGuess.length) {
            alert('you won!');
            this.getActiveRowHolder().getKeyRow().fillWithPegs(keyPegs);
            this._revealCodeToGuess();
            return;
        }

        for (let i = 0; i < guessingPegsTemp.length; i++) {

            const foundPeg = pegsToGuessTemp.find(function(pegToGuess) {
                if(guessingPegsTemp[i] !== null && pegToGuess !== null) {
                    return pegToGuess.getColor() === guessingPegsTemp[i].getColor();
                }
            });

            if(foundPeg !== undefined) {
                keyPegs.push(new mastermind.peg.KeyPeg({
                    color: mastermind.peg.KeyPeg.colors.get(mastermind.peg.CORRECT_POSITION)
                }));

                pegsToGuessTemp.splice(pegsToGuessTemp.indexOf(foundPeg), 1);
            }
        }

        this.getActiveRowHolder().getKeyRow().fillWithPegs(keyPegs);

        if (this._rowHolders.indexOf(this._activeRowHolder + 1) === this._rowHolders.length) {
            alert('you lost!');
            this._revealCodeToGuess();
            return;
        }
        this.activateRowHolder(this._rowHolders[this._rowHolders.indexOf(this._activeRowHolder) + 1]);

    };

    mastermind.board.Board.prototype._revealCodeToGuess = function () {
        this.node.appendChild(this._codeToGuessRow.node);
    };

})();