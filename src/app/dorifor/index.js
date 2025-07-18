'use strict';
/**
 * @author Elodie Bayet
 */

import Component from "../../../core/component.js";
import Dorifor from "../../modules/dorifor.js";
import Selection from "../../modules/selection.js";

class DoriforComponent extends Component {

    static getDependencies(service) {
        return [
            {class: Dorifor, construct: [service.get('HTTPService')]},
            {class: Selection, construct: []}
        ];
    }

    constructor(dorifor, selection) {
        super();
        this._dorifor = dorifor;
        this._selection = selection;
        this._formation = {};
        this._h3 = {};
    }

    render() {
        return `<section>
        <h2>Listes des formations</h2>
        <h3>Par sous-domaines de formations</h3>
        <p>Domaine <strong>Informatique, ICT et Économie numérique</strong></p>
        ${this._selection.build()}
        <h3>Résultats : <span class="lighten" data-subdomain="true"></span></h3>
        <div id="formation"></div>
        </section>`;
    }

    enable() {
        this._formation = document.querySelector('#formation');
        this._h3 = document.querySelector('h3 span[data-subdomain]');
        
        (async () => {
            await this._dorifor.getSousDomaines();
            this._selection.active(this._dorifor.sousDomaines);
        })();
        
        this._selection.bindUpdate(this.updateFormations);
    }

    updateFormations = async (sousDomaine) => {
        await this._dorifor.getFormations(sousDomaine);
        let selected = this._dorifor.sousDomaines.find(subDomain => subDomain.id === sousDomaine);
        this._h3.innerHTML = selected.title;
        this._formation.innerHTML = this._dorifor.implementFormations(selected.title);
    }
}

export default DoriforComponent;