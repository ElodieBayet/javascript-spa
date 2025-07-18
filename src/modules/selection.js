'use strict';
/**
 * @author Elodie Bayet
 */

class Selection {

    constructor() {
        this._button = {};
        this._select = {};
    }

    build() {
        return `<form method="GET" name="selecteur" class="grid">
            <div class="col">
                <label for="subDomains">Sélectionnez un sous-domaine</label>
                <select name="subDomains" id="subDomains"></select>
            </div>
            <div class="col">
                <input type="button" value="Envoyer" id="send">
            </div>
        </form>`;
    }

    active(options) {
        this._select = document.querySelector('#subDomains');
        options.forEach(option => {
            this._select.innerHTML += `<option value="${option.id}">${option.title}</option>`;
        });
        this._button = document.querySelector('#send');
        this._button.addEventListener('click', this._handle);
    }

    bindUpdate(callback) {
        this._update = callback;
    }

    _handle = (evt) => {
        this._update(parseInt(this._select.value));
    }
}

export default Selection;
