'use strict';

class Peg {

    constructor({color = this.generateColor()}) {
        this.color = color;
    }

    generateColor() {
        console.log('will generate a color');
    }
}