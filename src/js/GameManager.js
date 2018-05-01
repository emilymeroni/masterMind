(function() {

    'use strict';

    mastermind.GameManager = function() {

        const board = new mastermind.board.Board({});

        const pegChooser = mastermind.PegChooser.getInstance();
        document.body.appendChild(board.node);
        document.body.appendChild(pegChooser.node);
    };

})();