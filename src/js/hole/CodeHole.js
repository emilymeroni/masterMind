(function() {
    'use strict';

    mastermind.hole.CodeHole = function(params) {
        mastermind.hole.Hole.call(this, params);
    };

    mastermind.hole.CodeHole.prototype = Object.create(mastermind.hole.Hole.prototype);

})();