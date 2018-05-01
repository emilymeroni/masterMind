(function() {
    'use strict';

    const CSS_NODE = 'mastermindCodeRow';

    /**
     * @listens mastermind.hole.HOLE_ACTIVATED
     * @constructor
     */
    mastermind.row.CodeRow = function(params) {
        mastermind.row.Row.call(this, params);
        this.node.classList.add(CSS_NODE);

        this._attachEvents();
    };

    mastermind.row.CodeRow.prototype = Object.create(mastermind.row.Row.prototype);

    /**
     * @returns {mastermind.hole.CodeHole}
     * @override
     * @private
     */
    mastermind.row.CodeRow.prototype._initHole = function() {
        return new mastermind.hole.CodeHole();
    };

    mastermind.row.CodeRow.prototype._attachEvents = function() {
        this._holes.forEach(function(hole) {
            hole.addObserver(this, mastermind.hole.HOLE_ACTIVATED, 'setActiveHole');
        }.bind(this));
    };

    /**
     * Listens to the "mastermind.hole.HOLE_ACTIVATED event notifications broadcast by the CodeHole
     * @param {mastermind.hole.CodeHole} activeHole
     */
    mastermind.row.CodeRow.prototype.setActiveHole = function(activeHole) {
        if(this._rowHolder.isActive() === false) {
            return;
        }
        this._activeHole = activeHole;
        this._holes.forEach(function(hole) {
           hole.deactivate();
        });
        activeHole.activate();
    };

})();