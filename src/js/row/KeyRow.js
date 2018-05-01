(function() {
    'use strict';

    const CSS_NODE = 'mastermindKeyRow';

    /**
     * @constructor
     */
    mastermind.row.KeyRow = function(params) {
        mastermind.row.Row.call(this, params);
        this.node.classList.add(CSS_NODE);
    };

    mastermind.row.KeyRow.prototype = Object.create(mastermind.row.Row.prototype);

    mastermind.row.KeyRow.prototype._initHole = function() {
        return new mastermind.hole.KeyHole();
    };

})();