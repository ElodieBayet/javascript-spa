'use strict';
/**
 * @author Elodie Bayet
 */

import Component from "../../../core/component.js";

class NotFoundComponent extends Component {

    constructor() {
        super();
    }

    render() {
        return `<section>
        <h2>Contenu non trouvé</h2>
        <p class="nothing">L'adresse a probablement changé ou le contenu a été supprimé de l'application.</p>
        </section>`;
    }
}

export default NotFoundComponent;