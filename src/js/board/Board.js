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

    mastermind.board.Board.prototype._isLastRowHolder = function () {
        return this._rowHolders.indexOf(this._activeRowHolder + 1) === this._rowHolders.length;
    };


    mastermind.board.Board.prototype._discoverPegsCorrectPositionAndColor = function (guessingPegs, guessingPegsCopy, pegColorMap, keyPegs) {
        const victoryCode = this._codeToGuessRow.getPegs();
        for (let i = 0; i < guessingPegs.length; i++) {
            const guessingColor = guessingPegs[i].getColor();
            if (guessingColor === victoryCode[i].getColor()) {
                // insert black peg in key pegs
                keyPegs.push(new mastermind.peg.KeyPeg({
                    color: mastermind.peg.KeyPeg.colors.get(mastermind.peg.CORRECT_POSITION_AND_COLOR)
                }));

                guessingPegsCopy[i] = null;
                pegColorMap.set(guessingColor, pegColorMap.get(guessingColor) - 1);
            }
        }
    };

    mastermind.board.Board.prototype._discoverPegsCorrectColorWrongPosition = function(guessingPegsCopy, pegColorMap, keyPegs) {
        for (let i = 0; i < guessingPegsCopy.length; i++) {
            if(guessingPegsCopy[i] === null) {
                continue;
            }

            const guessingColor = guessingPegsCopy[i].getColor();
            if (pegColorMap.get(guessingColor) !== undefined && pegColorMap.get(guessingColor) > 0) {

                keyPegs.push(new mastermind.peg.KeyPeg({
                    color: mastermind.peg.KeyPeg.colors.get(mastermind.peg.CORRECT_POSITION)
                }));

                pegColorMap.set(guessingColor, pegColorMap.get(guessingColor) - 1);
            }
        }
    };

    mastermind.board.Board.prototype._getNextRowHolder = function() {
        return this._rowHolders[this._rowHolders.indexOf(this._activeRowHolder) + 1];
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

    mastermind.board.Board.prototype.verifyCode = function (data) {

        const victoryCode = this._codeToGuessRow.getPegs();
        const userCodeCopy = data.codePegs.slice(0);
        const pegColorMap = mastermind.utils.getPegColorCountMap(victoryCode);
        const keyPegs = [];

        // First, find the pegs that are in the correct position and color
        this._discoverPegsCorrectPositionAndColor(data.codePegs, userCodeCopy, pegColorMap, keyPegs);

        if (keyPegs.length !== victoryCode.length) {
            this._discoverPegsCorrectColorWrongPosition(userCodeCopy, pegColorMap, keyPegs);
        }

        this.getActiveRowHolder().getKeyRow().fillWithPegs(keyPegs);

        if (keyPegs.length === victoryCode.length || this._isLastRowHolder()) {
            this._revealCodeToGuess();
            return;
        }

        this.activateRowHolder(this._getNextRowHolder());

    };

    mastermind.board.Board.prototype._revealCodeToGuess = function () {
        this.node.appendChild(this._codeToGuessRow.node);
    };

})();