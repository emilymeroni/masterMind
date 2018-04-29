(function() {
    'use strict';

    mastermind.hole.CodeHole = function(params) {
        mastermind.hole.Hole.call(this, params);
    };

    mastermind.hole.CodeHole.prototype = Object.create(mastermind.hole.Hole.prototype);

    mastermind.hole.Hole.prototype._initAvailablePegs = function() {
        const availablePegs = new Set();

        mastermind.peg.CodePeg.colors.forEach(function(value) {
            availablePegs.add(new mastermind.peg.CodePeg({
                color: value
            }));
        });

        return availablePegs;
    };

})();