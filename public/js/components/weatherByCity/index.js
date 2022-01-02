'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import Page from '../../lib/page.js';
import WeatherStack from '../../modules/weatherStack.js';
import Tabulate from '../../modules/tabulate.js';

/**
 * Manage WeatherByCity page
 * @param {WeatherStack} weatherstack API of weather Data
 * @param {Tabulate} tabulate Module for tabs interaction
 */
class WeatherByCity extends Page {

    constructor(weatherstack, tabulate) {
        super();
        // Modules
        this._weatherstack = new weatherstack;
        this._tabulate = new tabulate;

        // Static values
        this.title = `API météo par ville`;
        this.desc = `Page qui utilise l'API de données météo Weather Stack en fonction d'une ville choisie`;
        this._cities = ['Bruxelles', 'Liege', 'Namur', 'Mons', 'Shablablagou'];
        
        // DOM containers
        this._weather = undefined;
    }
    
    async render() {
        return `<h2>Weather Stack API <span class="light">:: Villes</span></h2>
        <div>
            <h4>Villes disponibles</h4>
            ${await this._tabulate.render(this._cities)}
        </div>
        <div>
            <h4>Méteo actuelle</h4>
            <div id="weather"><p><strong>Sélectionnez une ville</strong> parmis les onglets ci-dessus.</p></div>
        </div>`;
    }

    async enable() {
        // Limit DOM query to one
        if (this._weather === undefined) this._weather = document.querySelector('#weather');
        
        // Bindind Events with module
        await this._tabulate.enable();
        this._tabulate.bindRenderChange(this.updateTable);
    }

    /**
     * Replace Weather table with new results
     */
     updateTable = async city => {
        this._weather.innerHTML = await this._weatherstack.renderOne(city);
    }
}

export default new WeatherByCity(WeatherStack, Tabulate);