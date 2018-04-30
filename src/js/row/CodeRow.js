(function() {
    'use strict';

    /**
     * @constructor
     */
    mastermind.row.CodeRow = function(params) {
        mastermind.row.Row.call(this, params);
    };

    mastermind.row.CodeRow.prototype = Object.create(mastermind.row.Row.prototype);

    mastermind.row.CodeRow.prototype._initHole = function() {
        return new mastermind.hole.CodeHole();
    };

})();