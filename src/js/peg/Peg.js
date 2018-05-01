(function(){

    'use strict';

    const CSS_NODE = 'masterMindPeg';

    const CSS_VARIABLE_COLOR = '--peg-color';

    mastermind.peg.Peg = function(params) {

        // TODO: This color MUST be from the existing ones only, otherwise throw error
        this.color = params.color === undefined ? this._getRandomColor() : params.color;
        this.node = this._renderNode();
    };

    mastermind.peg.Peg.prototype.color = undefined;

    /**
     * @type {HTMLElement} The peg node
     */
    mastermind.peg.Peg.prototype.node = undefined;

    mastermind.peg.Peg.prototype._renderNode = function() {
        const node = document.createElement('div');
        node.classList.add(CSS_NODE);
        node.style.setProperty(CSS_VARIABLE_COLOR, this.color);
        return node;
    };

    mastermind.peg.Peg.prototype._getRandomColor = function() {
        const colors = [...this.getAvailableColors()];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    /**
     @abstract
     */
    mastermind.peg.Peg.prototype.getAvailableColors = function() {
        throw new Error("Abstract method!");
    }
})();