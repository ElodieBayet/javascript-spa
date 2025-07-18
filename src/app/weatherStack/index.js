'use strict';
/**
 * @author Elodie Bayet
 */

import Component from "../../../core/component.js";
import WeatherStack from "../../modules/weatherStack.js";
import Navigation from "../../modules/navigation.js";
import Geolocation from "../../modules/geolocation.js";

class WeatherStackComponent extends Component {

    static getDependencies(service) {
        return [
            service.get('HTTPService'),
            {class: WeatherStack, construct:[service.get('HTTPService')]},
            {class: Navigation, construct: [['Bruxelles', 'Liege', 'Namur', 'Mons', 'Shablablagou']]},
            {class: Geolocation, construct: []}
        ];
    }

    constructor(HTTPService, weatherStack, navigation, geolocation) {
        super();
        this._HTTPService = HTTPService;
        this._weatherStack = weatherStack;
        this._navigation = navigation;
        this._geolocation = geolocation;
        this._city = {};
        this._latLong = {};
    }

    render() {
        let isGeolocation = this._HTTPService.isProduction()
            ? `<p class="nothing">Cette partie n'est pas accessible puisque les données utilisée sur cette page doivent être “mockées”.</p>`
            : `<p class="light">Cliquer sur "Géolocaliser" pour afficher les données.</p>`;

        return `<section>
        <h2>Météo par ville</h2>
        <h3>Villes disponibles</h3>
        ${this._navigation.build()}
        <h3>Météo actuelle</h3>
        <div id="city">
            <p class="light">Cliquer sur une ville pour afficher les données.</p>
        </div>
        </section>
        <hr>
        <section>
        <h2>Météo par géolocalisation</h2>
        <h3>Géolocaliser votre emplacement</h3>
        ${this._geolocation.build()}
        <h3>Météo actuelle</h3>
        <div id="latLong">
            ${isGeolocation}
        </div>
        </section>`;
    }

    enable() {
        this._city = document.querySelector('#city');
        this._latLong = document.querySelector('#latLong');

        this._navigation.active();
        this._navigation.bindUpdate(this.updateTableCity);

        if (navigator.geolocation && !this._HTTPService.isProduction()) {
            this._geolocation.active();
            this._geolocation.bindUpdate(this.updateTableLatLong);
            this._geolocation.bindUnavailable(this.geolocationUnavailable);
        } else {
            this.geolocationUnavailable(`Cette fonctionnalité n'est pas disponible.`);
        }
    }

    updateTableCity = async (location) => {
        await this._weatherStack.loadWeather(location);
        this._city.innerHTML = this._weatherStack.implementWeather(location);
    }

    updateTableLatLong = async (location) => {
        await this._weatherStack.loadWeather(location);
        this._latLong.innerHTML = this._weatherStack.implementWeather(location);
    }

    geolocationUnavailable = (message) => {
        this._latLong.innerHTML = `<p class="nothing">${message}</p>`;
    }
}

export default WeatherStackComponent;