'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import Page from '../../lib/page.js';
import WeatherStack from '../../modules/weatherStack.js';
import Geolocate from '../../modules/geolocate.js';

/**
 * Manage WeatherByCity page
 * @param {WeatherStack} weatherstack API of weather Data
 * @param {Geolocate} geolocate Module for geolocation
 */
class WeatherByLocation extends Page {

    constructor(weatherstack, geolocate) {
        super();
        // Modules
        this._weatherstack = new weatherstack;
        this._geolocate = new geolocate;
        
        // Static values
        this.title = `API météo par géolocalisation`;
        this.desc = `Page qui utilise l'API de données météo Weather Stack en fonction de votre emplacement`;
    }

    async render() {
        return `<h2>Weather Stack API <span class="light">:: Géolocalisation</span></h2>
        <div>
            <h4>Géolocaliser votre emplacement</h4>
            ${await this._geolocate.render()}
        </div>
        <div>
            <h4>Méteo actuelle à votre position</h4>
            <div id="weather"><p>Lancez <strong>la géolocalisation</strong> ci-dessus.</p></div>
        </div>`;
    }

    async enable() {
        // Limit DOM query to one
        if (this._weather === undefined) this._weather = document.querySelector('#weather');
        
        // Bindind Events with module
        await this._geolocate.enable();
        this._geolocate.bindRenderChange(this.updateTable);
    }
    
    /**
     * Replace Weather table with new results or error message
     */
     updateTable = async results => {
        if (Array.isArray(results)) {
            this._weather.innerHTML = await this._weatherstack.renderOne(results);
        } else {
            this._weather.innerHTML = `<p class="nothing"><strong>${results}</strong> :: aucune donnée chargée.</p>`;
        }
    }
}

export default new WeatherByLocation(WeatherStack, Geolocate);