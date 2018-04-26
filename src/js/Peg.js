(function(){

    'use strict';

    const CSS_PEG = 'masterMindPeg';
    const COLORS = new Set(['green', 'yellow', 'purple', 'red', 'blue', 'orange']);

    mastermind.Peg = function(params) {

        // This color MUST be from the existing ones only
        this.color = params.color === undefined ? this._getRandomColor() : params.color;
        this.node = this._renderNode();
    };

    mastermind.Peg.prototype.color = undefined;

    /**
     * @type {HTMLElement} The peg node
     */
    mastermind.Peg.prototype.node = undefined;

    mastermind.Peg.prototype._renderNode = function() {
        const node = document.createElement('div');
        node.classList.add(CSS_PEG);
        node.style.backgroundColor = this.color;
        return node;
    };

    mastermind.Peg.prototype._getRandomColor = function() {
        const colors = [...COLORS];
        return colors[Math.floor(Math.random() * colors.length)];
    }
})();