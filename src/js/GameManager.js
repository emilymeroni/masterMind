(function() {

    'use strict';

    mastermind.GameManager = function() {
        const peg1 = new mastermind.Peg({});
        const peg2 = new mastermind.Peg({});
        const peg3 = new mastermind.Peg({});
        const peg4 = new mastermind.Peg({});

        document.body.appendChild(peg1.node);
        document.body.appendChild(peg2.node);
        document.body.appendChild(peg3.node);
        document.body.appendChild(peg4.node);
    };

})();