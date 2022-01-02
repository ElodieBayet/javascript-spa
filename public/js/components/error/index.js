`use strict`;
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import Page from '../../lib/page.js';

/**
 * Manage the Errors 
 */
class Error extends Page {

    constructor() {
        super();
        this.title = `Contenu introuvable`;
        this.desc = `Impossible de fournir un contenu pour cette page`;
    }

    async render() {
        return `<h2>Un problème est survenu</h2><p>Le contenu demandé n'existe pas.</p>`;
    }

}

export default new Error;