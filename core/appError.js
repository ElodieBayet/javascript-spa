'use strict';
/**
 * @author Elodie Bayet
 */

import Component from "./component.js";

class AppError extends Component {

    render() {
        return `<section>
        <h2>Erreur</h2>
        <p class="nothing">Cette page ne fonctionne pas.</p>
        </section>`;
    }
}

export default AppError;