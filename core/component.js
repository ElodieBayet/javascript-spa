'use strict';
/**
 * @author Elodie Bayet
 */

class Component {

    static getDependencies(service) {
        return [
            service
        ];
    }

    constructor() {}

    render() {
        return `<section>
        <h2>Component non-implémenté</h2>
        <p class="nothing">Aucun contenu implémenté.</p>
        </section>`;
    }

    enable() {}
}

export default Component;