(function() {
    'use strict';

    const CSS_NODE = 'masterMindHole';
    const CSS_ACTIVE = 'masterMindHole--active';

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
            this.activateHole();
            // notify the row, so that it sets the correct active hole to active
        }
    };

    mastermind.hole.Hole.prototype.activateHole = function() {
        this.node.classList.add(CSS_ACTIVE);
    };

    mastermind.hole.Hole.prototype.deactivateHole = function() {
        this.node.classList.remove(CSS_ACTIVE);
    };

})();