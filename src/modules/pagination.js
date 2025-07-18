'use strict';
/**
 * @author Elodie Bayet
 */

class Pagination {

    constructor(index, itemsPerPage) {
        this._index = index >= 0 ? index : 0;
        this._itemsPerPage = itemsPerPage > 0 ? itemsPerPage : 1;
        this._buttons = [];
    }

    get index() {
        return this._index;
    }

    get itemsPerPage() {
        return this._itemsPerPage;
    }

    build(total = 1) {
        const pages = Math.ceil(total/this._itemsPerPage);
        let pagination = `<div id="pagination"><ul class="listitem center">`;

        for (let i = 1 ; i <= pages ; i++) {
            pagination += `<li><button type="button" class="button">${i}</button></li>`;
        }
        pagination += `</ul></div>`;

        return pagination;
    }

    active() {
        this._buttons = document.querySelectorAll('#pagination button');
        this._buttons.forEach(button => {
            if (parseInt(button.textContent.trim()) === this._index / this._itemsPerPage + 1) {
                button.classList.add('selected');
            }
            button.addEventListener('click', this._handle);
        });
    }

    bindUpdate(callback) {
        this._update = callback;
    }

    _handle = (evt) => {
        this._buttons.forEach((button) => {
            button.classList.remove('selected');
        });
        evt.target.classList.add('selected');

        const page = parseInt(evt.target.textContent.trim());
        this._index = (page - 1) * this._itemsPerPage;

        this._update();
    }
}

export default Pagination;