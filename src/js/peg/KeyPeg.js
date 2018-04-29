(function() {
    'use strict';

    const CSS_NODE = 'masterMindKeyPeg';

    mastermind.peg.KeyPeg = function(params) {
        mastermind.peg.Peg.call(this, params);
        this.node.classList.add(CSS_NODE);
    };

    mastermind.peg.KeyPeg.prototype = Object.create(mastermind.peg.Peg.prototype);

    mastermind.peg.KeyPeg.colors = new Map()
        .set('CORRECT_POSITION_AND_COLOR', 'black')
        .set('CORRECT_POSITION', 'white');

    mastermind.peg.KeyPeg.prototype.getAvailableColors = function() {
        return mastermind.peg.KeyPeg.colors.values();
    }

})();