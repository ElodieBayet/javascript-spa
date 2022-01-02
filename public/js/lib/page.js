'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

/**
 * Abstract class for all Pages with 'fallback' properties and methods
 */
 class Page {

    constructor() {
        // Default static values
        this.title = `Aucun titre implémenté`;
        this.desc = `Aucune description implémentée`;
    }

    /**
     * Create HTML content
     * @returns {String} Content to display
     */
    async render() {
        return '<p class="nothing">Aucun contenu implémenté</p>';
    }

    /**
     * Enables binding events with Sub-Components if so
     */
    async enable() {
        console.info(`(!) - Aucune liaison implémentée`);
    }
}

export default Page;