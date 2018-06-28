class Field {
    constructor(id) {
        this.id = id;
        this.node = document.querySelectorAll('.gameDiv > .board > .holder')[this.id];
        this.x = this.id % 4;
        this.y = Math.floor(this.id / 4);
        this.hasVal = this.node.children.length !== 0;
        this.val;
        this.hasVal ? this.val = this.node.children[0] : null;
    }

    updateVal() {
        this.hasVal = this.node.children.length !== 0;
        this.hasVal ? this.val = this.node.children[0].innerHTML : null;
        this.hasVal ? this.node.children[0].setAttribute('class', 'val' + this.val) : null;
    }

    moveTo(newField) {
        board.updateVals();
        if (newField.val === this.val && newField.node.children[0]) {
            //this.node.children[0].remove();
            newField.node.innerHTML = '';

            let numNode = document.createElement('DIV');
            numNode.appendChild(document.createTextNode(this.val * 2));
            numNode.setAttribute('class', 'val' + (this.val * 2));
            newField.node.appendChild(numNode);

            this.val = undefined;
        } else {
            newField.node.appendChild(this.node.children[0]);
        }
        board.updateVals();
        board.cleanFields();
    }
}