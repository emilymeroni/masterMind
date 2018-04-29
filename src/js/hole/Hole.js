(function() {
    'use strict';

    const CSS_NODE = 'masterMindHole';

    mastermind.hole.Hole = function(params) {
        this._init();
        this._attachEvents();
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

    mastermind.hole.Hole.prototype._attachEvents = function() {
        this.node.addEventListener('click', this._handleClick());
    };

    mastermind.hole.Hole.prototype._handleClick = function() {
        if(this._assignedPeg === undefined) {
            // notify
        }
    };

})();