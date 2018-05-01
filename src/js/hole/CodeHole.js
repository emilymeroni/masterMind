(function() {
    'use strict';

    const CSS_NODE = 'masterMindCodeHole';
    const CSS_ACTIVE = 'masterMindCodeHole--active';

    mastermind.hole.CodeHole = function(params) {
        mastermind.hole.Hole.call(this, params);

        this.node.classList.add(CSS_NODE);
        this._attachEvents();
    };

    mastermind.hole.CodeHole.prototype = Object.create(mastermind.hole.Hole.prototype);


    mastermind.hole.CodeHole.prototype._attachEvents = function() {
        this.node.addEventListener('click', this._handleClick.bind(this));
    };

    mastermind.hole.CodeHole.prototype._handleClick = function() {
        if(this.hasPegAssigned() === false) {
            this.activateHole();
            // notify the row, so that it sets the correct active hole to active
        }
    };

    mastermind.hole.CodeHole.prototype.activateHole = function() {
        this.node.classList.add(CSS_ACTIVE);
    };

    mastermind.hole.CodeHole.prototype.deactivateHole = function() {
        this.node.classList.remove(CSS_ACTIVE);
    };

})();