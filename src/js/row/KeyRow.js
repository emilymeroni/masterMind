(function() {
    'use strict';

    /**
     * @constructor
     */
    mastermind.row.KeyRow = function(params) {
        mastermind.row.Row.call(this, params);
    };

    mastermind.row.KeyRow.prototype = Object.create(mastermind.row.Row.prototype);

    mastermind.row.KeyRow.prototype._initHole = function() {
        return new mastermind.hole.KeyHole();
    };

})();