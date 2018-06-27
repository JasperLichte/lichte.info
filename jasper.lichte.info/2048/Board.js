class Board {
    constructor() {
        this.node = document.querySelector('.gameDiv > .board');
        this.fields1d = [];

        for (let i = 0; i < 16; i++) {
            this.fields1d.push(new Field(i, this));
        }

        this.fields2d = [];
        while (this.fields1d.length) this.fields2d.push(this.fields1d.splice(0, 4));

        this.emptyFields = [];
        this.occupiedFields = [];
    }

    addRandomNumber() {
        this.updateEmptyFields();
        const val = Math.round(Math.random()) + 1;
        let numNode = document.createElement('DIV');
        numNode.appendChild(document.createTextNode(val));
        numNode.setAttribute('class', 'val' + val);

        const randField = this.emptyFields[Math.floor(Math.random() * this.emptyFields.length)].node;
        randField.appendChild(numNode);
    }

    updateEmptyFields() {
        this.updateVals();
        this.emptyFields = [];

        for (let fields of this.fields2d) {
            for (let field of fields) {
                if (!field.hasVal) {
                    this.emptyFields.push(field);
                }
            }
        }
    }

    updateOccupiedFields() {
        this.updateVals();
        this.occupiedFields = [];

        for (let fields of this.fields2d) {
            for (let field of fields) {
                if (field.hasVal) {
                    this.occupiedFields.push(field);
                }
            }
        }
    }

    updateVals() {
        for (let fields of this.fields2d) {
            for (let field of fields) {
                field.updateVal();
            }
        }
    }

    updateArr() {
        
    }

    shiftBoard(dir) {
        this.updateVals();
        this.updateEmptyFields();
        this.updateOccupiedFields();

        let rightShift = () => {
            const sortedByXAsc = this.occupiedFields.sort(function (a, b) {
                return b.x - a.x;
            });
            for (const field of sortedByXAsc) {
                let newField;
                if (field.x < 1 && (!this.fields2d[field.y][field.x + 3].hasVal || this.fields2d[field.x + 3][field.x].val === field.val)) {
                    newField = this.fields2d[field.y][field.x + 3];
                    field.moveTo(newField);
                } else if (field.x < 2 && (!this.fields2d[field.y][field.x + 2].hasVal || this.fields2d[field.x + 2][field.x].val === field.val)) {
                    newField = this.fields2d[field.y][field.x + 2];
                    field.moveTo(newField);
                } else if (field.x < 3 && (!this.fields2d[field.y][field.x + 1].hasVal || this.fields2d[field.x + 1][field.x].val === field.val)) {
                    newField = this.fields2d[field.y][field.x + 1];
                    field.moveTo(newField);
                }
            }
        }

        let leftShift = () => {
            const sortedByXDesc = this.occupiedFields.sort(function (a, b) {
                return a.x - b.x;
            });
            for (const field of sortedByXDesc) {
                let newField;
                if (field.x > 2 && (!this.fields2d[field.y][field.x - 3].hasVal || this.fields2d[field.x - 3][field.x].val === field.val)) {
                    newField = this.fields2d[field.y][field.x - 3];
                    field.moveTo(newField);
                } else if (field.x > 1 && (!this.fields2d[field.y][field.x - 2].hasVal || this.fields2d[field.x - 2][field.x].val === field.val)) {
                    newField = this.fields2d[field.y][field.x - 2];
                    field.moveTo(newField);
                } else if (field.x > 0 && (!this.fields2d[field.y][field.x - 1].hasVal || this.fields2d[field.x - 1][field.x].val === field.val)) {
                    newField = this.fields2d[field.y][field.x - 1];
                    field.moveTo(newField);
                }
            }
        }

        let upShift = () => {
            const sortedByXAsc = this.occupiedFields.sort(function (a, b) {
                return a.y - b.y;
            });
            for (const field of this.occupiedFields) {
                let newField;
                if (field.y > 2 && (!this.fields2d[field.y - 3][field.x].hasVal || this.fields2d[field.y - 3][field.x].val === field.val)) {
                    newField = this.fields2d[field.y - 3][field.x];
                    field.moveTo(newField);
                } else if (field.y > 1 && (!this.fields2d[field.y - 2][field.x].hasVal || this.fields2d[field.y - 2][field.x].val === field.val)) {
                    newField = this.fields2d[field.y - 2][field.x];
                    field.moveTo(newField);
                } else if (field.y > 0 && (!this.fields2d[field.y - 1][field.x].hasVal || this.fields2d[field.y - 2][field.x].val === field.val)) {
                    newField = this.fields2d[field.y - 1][field.x];
                    field.moveTo(newField);
                }
            }
        }

        let downShift = () => {
            const sortedByXAsc = this.occupiedFields.sort(function (a, b) {
                return b.y - a.y;
            });
            for (const field of this.occupiedFields) {
                let newField;
                if (field.y < 1 && (!this.fields2d[field.y + 3][field.x].hasVal || this.fields2d[field.y + 3][field.x].val === field.val)) {
                    newField = this.fields2d[field.y + 3][field.x];
                    field.moveTo(newField);
                } else if (field.y < 2 && (!this.fields2d[field.y + 2][field.x].hasVal || this.fields2d[field.y + 2][field.x].val === field.val)) {
                    newField = this.fields2d[field.y + 2][field.x];
                    field.moveTo(newField);
                } else if (field.y < 3 && (!this.fields2d[field.y + 1][field.x].hasVal || this.fields2d[field.y + 1][field.x].val === field.val)) {
                    newField = this.fields2d[field.y + 1][field.x];
                    field.moveTo(newField);
                }
            }
        }

        switch (dir) {
            case 'right':
                rightShift();
                break;
            case 'left':
                leftShift();
                break;
            case 'up':
                upShift();
                break;
            case 'down':
                downShift();
                break;
        }

        this.addRandomNumber();
    }

    cleanFields() {
        for (let fields of this.fields2d) {
            for (let field of fields) {
                while (field.node.childNodes.length > 1) {
                    field.node.removeChild(field.node.lastChild);
                }
            }
        }
    }
}