(function() {
    'use strict';

    const CSS_NODE = 'masterMindHole';
    const CSS_NODE_FILLED = 'masterMindHole--filled';

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
        this.node.classList.add(CSS_NODE_FILLED);
        this.node.insertAdjacentElement('afterend', peg.node);
        this._assignedPeg = peg;

    };

})();