(function () {
    'use strict';

    /** @event mastermind.rowholder.RowHolder#IS_FILLED_WITH_PEGS */

    /**
     * @type {string}
     */
    mastermind.rowholder.IS_FILLED_WITH_PEGS = 'isFilledWithPegs';

    /**
     * @typedef {Object} mastermind.row.RowParams
     * @property {number|undefined} holeCount
     *
     */

    const CSS_NODE = 'masterMindRowHolder';
    const CSS_NODE_ACTIVE = 'masterMindRowHolder--active';

    /**
     * @param {mastermind.row.RowParams} params
     *
     * @fires mastermind.rowholder.RowHolder.IS_FILLED_WITH_PEGS
     * @constructor
     *
     * @extends luga.Notifier
     */
    mastermind.rowholder.RowHolder = function (params) {
        luga.extend(luga.Notifier, this);
        this._init(params);
    };

    /**
     * @type {mastermind.row.CodeRow}
     */
    mastermind.rowholder.RowHolder.prototype._codeRow = undefined;

    /**
     * @type {mastermind.row.KeyRow}
     */
    mastermind.rowholder.RowHolder.prototype._keyRow = undefined;

    /**
     * @type {boolean}
     * @protected
     * @private
     */
    mastermind.rowholder.RowHolder.prototype._isActive = false;

    mastermind.rowholder.RowHolder.prototype._init = function (params) {
        const holeCount = params.holeCount === undefined ? 4 : params.holeCount;
        this._codeRow = new mastermind.row.CodeRow({
            rowHolder: this,
            holeCount: holeCount
        });
        this._keyRow = new mastermind.row.KeyRow({
            rowHolder: this,
            holeCount: holeCount
        });
        this.node = this._renderNode();

    };

    mastermind.rowholder.RowHolder.prototype._renderNode = function () {
        const node = document.createElement('div');
        node.classList.add(CSS_NODE);

        node.appendChild(this._codeRow.node);
        node.appendChild(this._keyRow.node);

        return node;
    };

    mastermind.rowholder.RowHolder.prototype.isActive = function () {
        return this._isActive;
    };

    mastermind.rowholder.RowHolder.prototype.activate = function () {
        this._isActive = true;
        this.node.classList.add(CSS_NODE_ACTIVE);
    };

    mastermind.rowholder.RowHolder.prototype.deactivate = function () {
        this._isActive = false;
        this.node.classList.remove(CSS_NODE_ACTIVE);
    };


    mastermind.rowholder.RowHolder.prototype.getKeyRow = function () {
        return this._keyRow;
    };

    /**
     * @param {mastermind.peg.CodePeg} peg
     */
    mastermind.rowholder.RowHolder.prototype.insertCodePeg = function (peg) {
        const activeHole = this._codeRow.getActiveHole();
        if (activeHole !== undefined && activeHole.hasPegAssigned() === false) {
            activeHole.insertPeg(peg);
        }

        if (this._codeRow.isFilledWithPegs() === true) {
            const codeRowPegs = [];
            this._codeRow.getHoles().forEach(function (hole) {
                codeRowPegs.push(hole.getAssignedPeg());
            });

            this.notifyObservers(mastermind.rowholder.IS_FILLED_WITH_PEGS, {
                codePegs: codeRowPegs
            });
        }
    };
})();