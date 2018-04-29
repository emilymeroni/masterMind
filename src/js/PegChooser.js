(function() {

    'use strict';

    let uniqueInstance = undefined;

    /**
     * A panel from which the code breaker chooses her/his pegs.
     * @constructor
     */
    const PegChooser = function() {

        const CSS_NODE = 'mastermindPegChooser';

        /**
         * @type {HTMLElement}
         */
        this.node = undefined;

        const self = this;

        const init = function() {
            self.node = renderNode();
            renderContent();
        };

        const renderNode = function() {
            const node = document.createElement('div');
            node.classList.add(CSS_NODE);
            return node;
        };

        const renderContent = function() {
            renderCodePegs();
        };

        const renderCodePegs = function() {
            mastermind.peg.CodePeg.colors.forEach(function(value) {
                const peg = initPeg(value);
                self.node.appendChild(peg.node);
            });
        };

        const initPeg = function(color) {
            const peg = new mastermind.peg.CodePeg({
                color: color
            });
            peg.node.addEventListener('click', function() {
               // Notify my listeners I was clicked
            });

            return peg;
        };
        init();
    };

    mastermind.PegChooser.getInstance = function() {
        if(uniqueInstance === undefined) {
            uniqueInstance = new PegChooser();
        }
        return uniqueInstance;
    };

})();