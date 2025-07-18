'use strict';
/**
 * @author Elodie Bayet
 */

import Component from "../../../core/component.js";
import BaconIpsum from "../../modules/baconIpsum.js";
import Pagination from "../../modules/pagination.js";

class BaconIpsumComponent extends Component {

    static getDependencies(service) {
        return [
            {class: BaconIpsum, construct: [service.get('HTTPService'), 8]},
            {class: Pagination, construct: [0, 3]}
        ];
    }

    constructor(baconIpsum, pagination) {
        super();
        this._baconIpsum = baconIpsum;
        this._pagination = pagination;
        this._paragraph = {};
    }

    render() {
        return `<section>
        <h2>Faux paragraphes avec Bacon Ipsum</h2>
        <h3>${this._baconIpsum.quantity} paragraphes demandés : ${this._pagination.itemsPerPage} paragraphes par page</h3>
        <div id="paragraph" class="onload">
            <hr>
            <p>Chargement des paragraphes depuis “Bacon Ipsum”</p>
            <div class="spin">&nbsp;</div>
            <hr>
        </div>
        ${this._pagination.build(this._baconIpsum.quantity)}
        </section>`;
    }

    enable() {
        this._paragraph = document.querySelector('#paragraph');
        
        (async () => {
            await this._baconIpsum.loadParagraphs();
            this.updateParagraphs();
        })();

        this._pagination.active();
        this._pagination.bindUpdate(this.updateParagraphs);
    }

    updateParagraphs = () => {
        this._paragraph.innerHTML = this._baconIpsum.implementParagraphs(this._pagination.index, this._pagination.itemsPerPage);
        this._paragraph.removeAttribute("class");
    }
}

export default BaconIpsumComponent;