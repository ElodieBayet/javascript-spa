'use strict';
/**
 * @author Elodie Bayet
 */

class WeatherStack {

    constructor(HTTPService) {
        this._HTTPService = HTTPService;
        this._weather = {};
    }

    get weather() {
        return this._weather;
    }

    async loadWeather(location) {
        if (Array.isArray(location)) {
            location = location.join(',');
        }
        
        let token = await this._HTTPService.getTokens();
        token = token.weatherstack;
        let query = this._HTTPService.isProduction() ? `mocked-${location.toLocaleLowerCase()}.json` : `?access_key=${token}&query=${location}`;
        this._weather = {};

        this._weather = await fetch(`${this._HTTPService.getWeatherstackUrl()}${query}`)
            .then(result => result.json())
            .catch(error => {
                console.error(error);
                if (this._HTTPService.isProduction()) {
                    return {
                        success: false,
                        error: "Échec de requête"
                    };
                }
                return error.json();
            });
    }

    implementWeather(location) {
        if (!('request' in this._weather) || 'error' in this._weather) {
            return `<p class="nothing">Aucune donnée ne correspond à l'emplacement <strong>${location}</strong></p>`;
        }

        let localTime = new Date(this._weather.location.localtime);
        let weather = `<table>`;
        weather += `<thead><tr><th colspan="2"><h4>${this._weather.request.query}</h4></th></tr></thead>`;
        weather += `<tbody class="col-2"><tr><td><h5>Pays</h5></td><td><p>${this._weather.location.country}</p></td></tr>`;
        weather += `<tr><td><h5>Heure locale</h5></td><td><p>${localTime.getHours()}:${localTime.getMinutes()} <small class="light">– ${localTime.getDate()}/${localTime.getMonth()+1}/${localTime.getFullYear()}</small></p></td></tr>`;
        weather += `<tr><td><h5>Température</h5></td><td><p>${this._weather.current.temperature} °C</p></td></tr>`;
        weather += `<tr><td><h5>Vent et direction</h5></td><td><p>${this._weather.current.wind_speed} km/h : ${this._weather.current.wind_dir}</p></td></tr>`;
        weather += `</tbody></table>`;

        return weather;
    }
}

export default WeatherStack;