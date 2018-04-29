(function() {

    'use strict';

    mastermind.GameManager = function() {
        const peg1 = new mastermind.peg.CodePeg({});
        const peg2 = new mastermind.peg.CodePeg({});
        const peg3 = new mastermind.peg.CodePeg({});
        const peg4 = new mastermind.peg.CodePeg({});

        const peg5 = new mastermind.peg.KeyPeg({
            color: mastermind.peg.KeyPeg.colors.get('CORRECT_POSITION_AND_COLOR')
        });

        const peg6 = new mastermind.peg.KeyPeg({
            color: mastermind.peg.KeyPeg.colors.get('CORRECT_POSITION')
        });

        const hole1 = new mastermind.hole.CodeHole({});
        const hole2 = new mastermind.hole.CodeHole({});
        const hole3 = new mastermind.hole.CodeHole({});
        const hole4 = new mastermind.hole.CodeHole({});

        document.body.appendChild(peg1.node);
        document.body.appendChild(peg2.node);
        document.body.appendChild(peg3.node);
        document.body.appendChild(peg4.node);
        document.body.appendChild(peg5.node);
        document.body.appendChild(peg6.node);
        document.body.appendChild(hole1.node);
        document.body.appendChild(hole2.node);
        document.body.appendChild(hole3.node);
        document.body.appendChild(hole4.node);
    };

})();