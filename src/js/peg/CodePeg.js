(function() {
    'use strict';

    const CSS_NODE = 'masterMindCodePeg';

    mastermind.peg.CodePeg = function(params) {
        mastermind.peg.Peg.call(this, params);

        this.node.classList.add(CSS_NODE);
    };

    mastermind.peg.CodePeg.colors = new Map()
        .set('COLOR1', 'green')
        .set('COLOR2', 'yellow')
        .set('COLOR3', 'purple')
        .set('COLOR4', 'red')
        .set('COLOR5', 'blue')
        .set('COLOR6', 'orange');

    mastermind.peg.CodePeg.prototype = Object.create(mastermind.peg.Peg.prototype);

    mastermind.peg.CodePeg.prototype.getAvailableColors = function() {
        return mastermind.peg.CodePeg.colors.values();
    }

})();