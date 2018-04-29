(function() {
    'use strict';

    const CSS_NODE = 'masterMindHole';

    mastermind.hole.Hole = function(params) {
        this._init();
        this._attachEvents();
    };

    /**
     * @type {Set<mastermind.peg.Peg>}
     * @private
     */
    mastermind.hole.Hole.prototype._availablePegs = undefined;

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
        this._availablePegs = this._initAvailablePegs();
        console.log(this._availablePegs);
    };

    mastermind.hole.Hole.prototype._attachEvents = function() {
        this.node.addEventListener('click', this._handleClick());
    };

    mastermind.hole.Hole.prototype._handleClick = function() {
        if(this._assignedPeg === undefined) {
            this._showAvailablePegs();
        }
    };

    mastermind.hole.Hole.prototype._showAvailablePegs = function() {
       // TODO open a popup with all the pegs
    };

    /**
     @abstract
     */
    mastermind.hole.Hole.prototype._initAvailablePegs = function() {
        throw new Error("Abstract method!");
    }

})();