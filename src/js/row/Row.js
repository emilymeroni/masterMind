(function() {
    'use strict';

    /**
     * @typedef {Object} mastermind.row.RowParams
     * @property {Array<mastermind.peg.Peg>|undefined} pegs
     * @property {number|undefined} holeCount
     *
     */

    const CSS_NODE = 'masterMindRow';

    /**
     * @param {mastermind.row.RowParams} params
     * @abstract
     * @constructor
     */
    mastermind.row.Row = function(params) {
        this._init(params);
    };

    /**
     * @type {Array<mastermind.hole.Hole>}
     */
    mastermind.row.Row.prototype._holes = undefined;

    /**
     * @type {mastermind.hole.Hole}
     * @private
     */
    mastermind.row.Row.prototype._activeHole = undefined;

    mastermind.row.Row.prototype._init = function(params) {
        this._holes = this._getHoles(params.holeCount);
        this.node = this._renderNode();

    };

    /**
     * @param {number} holeCount the amount of holes for this row
     * @private
     */
    mastermind.row.Row.prototype._getHoles = function(holeCount) {
        let holes = [];
        for(let i = 0; i < holeCount; i++) {
            holes.push(this._initHole());
        }
        return holes;
    };

    mastermind.row.Row.prototype._renderNode = function() {
        const node = document.createElement('div');
        node.classList.add(CSS_NODE);

        this._holes.forEach(function(hole) {
           node.appendChild(hole.node);
        });

        return node;
    };

    /**
     * @abstract
     * @private
     */
    mastermind.row.Row.prototype._initHole = function() {
        throw new Error("Abstract method!");
    };

})();