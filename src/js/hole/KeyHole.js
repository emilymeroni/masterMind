(function() {
    'use strict';

    mastermind.hole.KeyHole = function(params) {
        mastermind.hole.Hole.call(this, params);
    };

    mastermind.hole.KeyHole.prototype = Object.create(mastermind.hole.Hole.prototype);

})();