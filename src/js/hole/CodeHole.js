(function () {
    'use strict';

    /** @event mastermind.hole.CodeHole#HOLE_ACTIVATED */

    /**
     * @type {string}
     */
    mastermind.hole.HOLE_ACTIVATED = 'holeActivated';

    const CSS_NODE = 'masterMindCodeHole';
    const CSS_ACTIVE = 'masterMindCodeHole--active';

    /**
     * @param params
     * @fires mastermind.hole.CodeHole.HOLE_ACTIVATED
     * @constructor
     *
     * @extends luga.Notifier
     * @extends mastermind.hole.Hole
     */
    mastermind.hole.CodeHole = function (params) {
        mastermind.hole.Hole.call(this, params);

        luga.extend(luga.Notifier, this);

        this.node.classList.add(CSS_NODE);
        this._attachEvents();
    };

    mastermind.hole.CodeHole.prototype = Object.create(mastermind.hole.Hole.prototype);


    mastermind.hole.CodeHole.prototype._attachEvents = function () {
        this.node.addEventListener('click', this._handleClick.bind(this));
    };

    mastermind.hole.CodeHole.prototype._handleClick = function () {
        if (this.hasPegAssigned() === false) {
            this.activateHole();
            this.notifyObservers(mastermind.hole.HOLE_ACTIVATED, this);
        }
    };

    mastermind.hole.CodeHole.prototype.activateHole = function () {
        this.node.classList.add(CSS_ACTIVE);
    };

    mastermind.hole.CodeHole.prototype.deactivateHole = function () {
        this.node.classList.remove(CSS_ACTIVE);
    };

})();