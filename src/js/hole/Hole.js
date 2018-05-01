(function() {
    'use strict';

    const CSS_NODE = 'masterMindHole';
    const CSS_NODE_FILLED = 'masterMindHole--filled';
    const CSS_ACTIVE = 'masterMindHole--active';

    mastermind.hole.Hole = function(params) {
        this._init();
    };

    /**
     * @type {mastermind.peg.Peg}
     * @private
     */
    mastermind.hole.Hole.prototype._assignedPeg = undefined;

    mastermind.hole.Hole.prototype._renderNode = function() {
        const node = document.createElement('div');
        node.classList.add(CSS_NODE);
        return node;
    };

    mastermind.hole.Hole.prototype._init = function() {
        this.node = this._renderNode();
    };

    /**
     * @returns {boolean} the hole has a peg inside it
     */
    mastermind.hole.Hole.prototype.hasPegAssigned = function() {
        return this._assignedPeg !== undefined;
    };

    /**
     * @param {mastermind.peg.CodePeg} peg
     */
    mastermind.hole.Hole.prototype.insertPeg = function (peg) {
        const pegToInsert = this._createPegWithColor(peg.getColor());
        this.node.appendChild(pegToInsert.node);
        this._assignedPeg = pegToInsert;

        this.node.classList.add(CSS_NODE_FILLED);
        this.deactivate();
    };

    mastermind.hole.Hole.prototype._removeAssignedPeg = function() {
        this.node.removeChild(this._assignedPeg.node);
        this._assignedPeg = undefined;
        this.node.classList.remove(CSS_NODE_FILLED);
    };

    mastermind.hole.Hole.prototype.getAssignedPeg = function() {
        return this._assignedPeg;
    }

    mastermind.hole.Hole.prototype.activate = function () {
        this.node.classList.add(CSS_ACTIVE);
    };

    mastermind.hole.Hole.prototype.deactivate = function () {
        this.node.classList.remove(CSS_ACTIVE);
    };

    /**
     @abstract
     */
    mastermind.hole.Hole.prototype._createPegWithColor = function(color) {
        throw new Error("Abstract method!");
    }

})();