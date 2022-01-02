`use strict`;
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import Page from '../../lib/page.js';
import BaconIpsum from '../../modules/baconIpsum.js';
import Paginate from '../../modules/paginate.js';

/**
 * Manage TextWithBacon page
 * @param {BaconIpsum} baconipsum API for Ipsum Texts
 * @param {Paginate} paginate Module for paginate effect
 */
class TextWithBacon extends Page {

    constructor(baconipsum, paginate) {
        super();
        // Modules
        this._bacon = new baconipsum;
        this._paginate = new paginate;

        // Static values
        this.title = `API de faux paragraphes`;
        this.desc = `Page qui utilise l'API de contenu textuel Bacon Ipsum`;
        
        // DOM containers
        this._paras = undefined;

        // Settings for BaconIpsum : quantity of paragraphs desired
        this._bacon.setQty = 8;
        
        // Setting for Paginate : begining paragraph, quantity of paragraphs per Pagination 
        this._paginate.setIndex = 0;
        this._paginate.setItemsPage = 3;
    }

    async render() {
        return `<h2>Bacon Ipsum API <span class="light">:: Paragraphes</span></h2>
        <h4>${this._bacon.qty} paragraphes demandés : ${this._paginate.itemsPage} paragraphes par page</h4>
        <div id="paras">${await this._bacon.renderRange(this._paginate.index, this._paginate.itemsPage)}</div>
        ${await this._paginate.render(this._bacon.qty)}`;
    }

    async enable() {
        // Limit DOM query to one
        if (this._paras === undefined) this._paras = document.querySelector('#paras');

        // Bindind Events with module
        await this._paginate.enable();
        this._paginate.bindRenderChange(this.updateParas);
    }

    /**
     * Replace paras content with new paragraphs
     */
    updateParas = async () => {
        this._paras.innerHTML = await this._bacon.renderRange(this._paginate.index, this._paginate.itemsPage);
    }
}

export default new TextWithBacon(BaconIpsum, Paginate);