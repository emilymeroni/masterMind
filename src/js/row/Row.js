(function() {
    'use strict';

    /**
     * @typedef {Object} mastermind.row.RowParams
     * @property {mastermind.rowholder.RowHolder|undefined} rowHolder
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
     * @protected
     */
    mastermind.row.Row.prototype._holes = undefined;

    /**
     * @type {mastermind.hole.Hole}
     * @protected
     */
    mastermind.row.Row.prototype._activeHole = undefined;

    /**
     * @type {mastermind.rowholder.RowHolder}
     * @protected
     */
    mastermind.row.Row.prototype._rowHolder = undefined;

    mastermind.row.Row.prototype._init = function(params) {
        this._rowHolder = params.rowHolder;
        this._holes = this._initHoles(params.holeCount);
        this.node = this._renderNode();
    };

    /**
     * @param {number} holeCount the amount of holes for this row
     * @private
     */
    mastermind.row.Row.prototype._initHoles = function(holeCount) {
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

    /**
     * @returns {mastermind.hole.Hole}
     */
    mastermind.row.Row.prototype.getActiveHole = function() {
        return this._activeHole;
    };

    /**
     * @returns {Array.<mastermind.hole.Hole>}
     */
    mastermind.row.Row.prototype.getHoles = function() {
        return this._holes;
    };

    // TODO unify with method below
    mastermind.row.Row.prototype.fillWithPegs = function(pegs) {
        this._holes.forEach(function(hole, index) {
            hole.insertPeg(pegs[index]);
        });
    };

    /**
     * @abstract
     * @private
     */
    mastermind.row.Row.prototype.fillWithRandomPegs = function() {
        throw new Error("Abstract method!");
    };

    mastermind.row.Row.prototype.isFilledWithPegs = function() {
        const holesNotFilled = this._holes.find(function(hole) {
            return hole.hasPegAssigned() === false;
        });
        return holesNotFilled === undefined;
    };

    mastermind.row.Row.prototype.getPegs = function() {
        let pegs = [];
        this._holes.forEach(function(hole) {
            // Could also return undefined which may be a valid value
            pegs.push(hole.getAssignedPeg());
        });
        return pegs;
    };

})();