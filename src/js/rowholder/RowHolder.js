(function() {
    'use strict';

    /**
     * @typedef {Object} mastermind.row.RowParams
     * @property {number|undefined} holeCount
     *
     */

    const CSS_NODE = 'masterMindRowHolder';

    /**
     * @param {mastermind.row.RowParams} params
     * @constructor
     */
    mastermind.rowholder.RowHolder = function(params) {
        this._init(params);
    };

    /**
     * @type {mastermind.row.CodeRow}
     */
    mastermind.rowholder.RowHolder.prototype._codeRow = undefined;

    /**
     * @type {mastermind.row.KeyRow}
     */
    mastermind.rowholder.RowHolder.prototype._keyRow = undefined;

    mastermind.rowholder.RowHolder.prototype._init = function(params) {
        const holeCount = params.holeCount === undefined ? 4 : params.holeCount;
        this._codeRow = new mastermind.row.CodeRow({
           holeCount: holeCount
        });
        this._keyRow = new mastermind.row.KeyRow({
            holeCount: holeCount
        });
        this.node = this._renderNode();

    };

    mastermind.rowholder.RowHolder.prototype._renderNode = function() {
        const node = document.createElement('div');
        node.classList.add(CSS_NODE);

        node.appendChild(this._codeRow.node);
        node.appendChild(this._keyRow.node);

        return node;
    };

})();