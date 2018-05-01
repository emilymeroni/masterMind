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

    mastermind.board.Board.prototype._init = function(params) {
        const rowNumber = params.rowNumber === undefined ? 8 : params.rowNumber;
        this._rowHolders = this._initRowHolders(rowNumber, params.holeCount);
        this.node = this._renderNode();

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
            rowHolders.push(new mastermind.rowholder.RowHolder({
                holeCount: holeCount
            }));
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

})();