(function() {
    'use strict';

    const CSS_NODE = 'masterMindKeyHole';

    mastermind.hole.KeyHole = function(params) {
        mastermind.hole.Hole.call(this, params);

        this.node.classList.add(CSS_NODE);
    };

    mastermind.hole.KeyHole.prototype = Object.create(mastermind.hole.Hole.prototype);

})();