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
        this.node.appendChild(this._codeToGuessRow.node);

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

    mastermind.board.Board.prototype.verifyCode = function (data) {
        const verifiedCodePegs = [];
        const pegsToGuess = Object.assign(this._codeToGuessRow.getPegs());

        // First, find the pegs that are in the correct position
        for (let i = 0; i < data.codePegs.length; i++) {
            if (data.codePegs[i].getColor() === pegsToGuess[i].getColor()) {
                verifiedCodePegs.push(new mastermind.peg.KeyPeg({
                    color: mastermind.peg.KeyPeg.colors.get(mastermind.peg.CORRECT_POSITION_AND_COLOR)
                }));
                // TODO find better way
                pegsToGuess[i] = null;
            }
        }
        for (let i = 0; i < data.codePegs.length; i++) {
            const foundPeg = pegsToGuess.find(function (peg) {
                if(peg !== null) {
                    return peg.getColor() === data.codePegs[i].getColor();
                }
            });
            if (foundPeg !== undefined) {
                verifiedCodePegs.push(new mastermind.peg.KeyPeg({
                    color: mastermind.peg.KeyPeg.colors.get(mastermind.peg.CORRECT_POSITION)
                }));
            }
        }
        this.getActiveRowHolder().getKeyRow().fillWithPegs(verifiedCodePegs);
        // TODO last will throw an error fix it
        this.activateRowHolder(this._rowHolders[this._rowHolders.indexOf(this._activeRowHolder) + 1]);

    }

})();