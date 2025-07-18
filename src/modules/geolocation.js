'use strict';
/**
 * @author Elodie Bayet
 */

class Geolocation {

    constructor() {
        this._button = {};
    }

    build() {
        return `<div id="geolocation"><button class="button" type="button">Géolocaliser</button></div>`;
    }

    active() {
        this._button = document.querySelector('#geolocation button');
        this._button.addEventListener('click', this._handle);
    }

    bindUpdate(callback) {
        this._update = callback;
    }

    bindUnavailable(callback) {
        this._unavailabe = callback;
    }

    _handle = (evt) => {
        evt.target.classList.add('disabled');
        navigator.geolocation.getCurrentPosition(this._success, this._error, {timeout: 5000});
    }

    _success = position => {
        this._update([
            position.coords.latitude,
            position.coords.longitude
        ]);
    }
    
    _error = error => {
        let message = (error.code === 1)? 'Géolocalisation refusée' : (error.code === 2)? 'Position indisponible' : 'Temps écoulé';
        this._unavailabe(message);
    }
}

export default Geolocation;
