'use strict';
/**
 * @author Elodie Bayet
 */

class Navigation {

    constructor(tabs) {
        this._tabs = tabs;
        this._name = ``;
    }

    get tabs() {
        return this._tabs;
    }

    build() {
        let navigation = `<div id="tabs">`;
        this._tabs.forEach(tab => {
            navigation += `<button type="button" class="tab">${tab}</button>`;
        });
        navigation += `</div>`;

        return navigation;
    }

    active() {
        this._buttons = document.querySelectorAll('#tabs button');
        this._buttons.forEach(button => {
            if (button.textContent.trim() === this._name) {
                button.classList.add('selected');
            }
            button.addEventListener('click', this._handle);
        });
    }

    /**
     * Bind internal call with external Function
     * @param {Function} callback External action to trigger
     */
    bindUpdate(callback) {
        this._update = callback;
    }

    _handle = (evt) => {
        this._buttons.forEach((button) => {
            button.classList.remove('selected');
        });
        evt.target.classList.add('selected');

        const tab = evt.target.textContent.trim();
        this._name = tab;

        this._update(tab);
    }
}

export default Navigation;
