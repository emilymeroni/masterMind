(function() {
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
    mastermind.board.Board = function(params) {
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
    mastermind.board.Board.prototype._activeRow = undefined;

    mastermind.board.Board.prototype._init = function(params) {
        const rowNumber = params.rowNumber === undefined ? 8 : params.rowNumber;
        this._rowHolders = this._initRowHolders(rowNumber, params.holeCount);
        this.node = this._renderNode();
        // initialise the active row to be the first
        this.activateRowHolder(this._rowHolders[0]);

    };
    /**
     * @param {number} rowNumber
     * @param {number|undefined} holeCount
     * @returns {Array.<mastermind.rowholder.RowHolder>} the
     * @private
     */
    mastermind.board.Board.prototype._initRowHolders = function(rowNumber, holeCount) {
        let rowHolders = [];
        for(let i = 0; i < rowNumber; i++) {
            const rowHolder = new mastermind.rowholder.RowHolder({
                holeCount: holeCount
            });
            rowHolders.push(rowHolder);
        }
        return rowHolders;
    };

    mastermind.board.Board.prototype._renderNode = function() {
        const node = document.createElement('div');
        node.classList.add(CSS_NODE);

        this._rowHolders.forEach(function(rowHolder) {
           node.appendChild(rowHolder.node);
        });

        return node;
    };

    mastermind.board.Board.prototype.getActiveRowHolder = function() {
      return this._activeRow;
    };

    /**
     * @param {mastermind.rowholder.RowHolder} rowHolder
     */
    mastermind.board.Board.prototype.activateRowHolder = function(rowHolder) {
        this._activeRow = rowHolder;

        this._rowHolders.forEach(function(rowHolder) {
            rowHolder.deactivate();
        });
        rowHolder.activate();
    };

})();