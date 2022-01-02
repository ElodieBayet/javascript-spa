'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import { ACCESS_KEY } from '../lib/_tokens.js';

/**
 * Manage API for Weather data.
 * @requires ENV constant in /js/constants.js
 */
class WeatherStack {

    constructor(){
        // [!] - This NOT how to secure token accesses. This is just simplifyed for demo - [!]
        this.ACCESS_KEY = ACCESS_KEY.get();
    }

    /**
     * Call API
     * @param {(String|Array)} query String with city name or Array with coordinates as [0]=lat and [1]=lon
     * @returns {Object} Parsed JSOn data or Error
     */
    async getData(query) {
        let url = ``;
        if (Array.isArray(query) && query.length) {
            query = query.join(",");
            url = ENV.mode() === 'production' && this.ACCESS_KEY ? `http://api.weatherstack.com/current?access_key=${this.ACCESS_KEY}&query=${query}`:`http://localhost:5500/data/weather-stack/weather-data-bruxelles.json`;
        } else {
            url = ENV.mode() === 'production'  && this.ACCESS_KEY ? `http://api.weatherstack.com/current?access_key=${this.ACCESS_KEY}&query=${query}`:`http://localhost:5500/data/weather-stack/weather-data-${query}.json`;
        }
        return fetch(url).then(res => res.json()).catch(err => err);
    }

    /**
     * Build HTML of single result in a Table
     * @param {(String|Array)} place String with city name or Array with coordinates as [0]=lat and [1]=lon
     * @returns {String} HTML of an implemented table or paragraph with error
     */
    async renderOne(place) {

        let data = await this.getData(place);
        let weather = ``;

        if (data.name === 'SyntaxError' || data.error) {
            weather = `<p class="nothing">Aucune donnée ne correspond à la requête : <strong>${place}</strong> <small class="light">– C'est fait exprès pour la démo.</small></p>`;
        } else {
            let localTime = new Date(data.location.localtime);
            weather = `<table>`;
            weather += `<thead><tr><th colspan="2"><h4>${data.request.query}</h4></th></tr></thead>`;
            weather += `<tbody class="col-2"><tr><td><h5>Pays</h5></td><td><p>${data.location.country}</p></td></tr>`;
            weather += `<tr><td><h5>Heure locale</h5></td><td><p>${localTime.getHours()}:${localTime.getMinutes()} <small class="light">– ${localTime.getDate()}/${localTime.getMonth()+1}/${localTime.getFullYear()}</small></p></td></tr>`;
            weather += `<tr><td><h5>Température</h5></td><td><p>${data.current.temperature} °C</p></td></tr>`;
            weather += `<tr><td><h5>Vent et direction</h5></td><td><p>${data.current.wind_speed} km/h : ${data.current.wind_dir}</p></td></tr>`;
            weather += `</tbody></table>`;
        }
        return weather;
    }
}

export default WeatherStack;