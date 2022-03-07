'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

/**
 * Create and Manage Geolocalisation
 */
class Geolocate {

    constructor(){
        this._trigger = undefined;
    }

    /**
     * Build the button for getting coordinates
     * @returns 
     */
    async render(){
        return `<div id="geolocation"><button class="button" type="button">Géolocaliser</button></div>`;
    }

    /**
     * Active events and references
     */
    async enable(){
        
        this._trigger = document.querySelector('#geolocation button');

        this._trigger.addEventListener('click', evt => {
            evt.preventDefault();
            if (navigator.geolocation) navigator.geolocation.getCurrentPosition(this.handleGeolocation, this.handleBlocking, {timeout: 5000});
        });
    }

    /**
     * Extract latitude and longitude of current position if triggered
     * @param {Object} position Contains geolocalized data
     */
    handleGeolocation = position => {

        const result = [position.coords.latitude, position.coords.longitude];
        this.renderChange(result);
    }

    /**
     * Build human-readable reason of Geolocalisation failure
     * @param {Object} error 
     */
    handleBlocking = error => {
        let code = (error.code === 1)? 'Géolocalisation refusée' : (error.code === 2)? 'Position non disponible' : 'Temps écoulé';
        this.renderChange(code);
    }

    /**
     * Bind internal call with external Function
     * @param {Function} callback External action to trigger
     */
    bindRenderChange(callback) {
        this.renderChange = callback;
    }
}

export default Geolocate;