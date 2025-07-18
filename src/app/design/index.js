'use strict';
/**
 * @author Elodie Bayet
 */

import Component from "../../../core/component.js";

class DesignComponent extends Component {

    constructor() {
        super();
    }

    render() {
        return `<section>
            <h2>Application monopage <span class="light">— SPA</span></h2>
            <p><span class="light">En bref :</span> Ce type d'implémentation ne charge qu'un seul document web, puis modifie le corps de ce document via des API JavaScript lorsqu'un contenu différent doit être affiché.</p>
            <div class="grid md">
                <div class="col-50">
                    <h3>Approche</h3>
                    <p>Le but d'une “Single-Page Application” est de détourner le fonctionnement traditionel des requêtes serveur pour n'effectuer que des requêtes de données de façon <strong>asynchrone</strong>.</p>
                    <p>La page toute entière ne se recharge pas contrairement aux sites web développés entièrement en “Mono-Page”.</p>
                    <p>Il est inutile de reconstruire ce qui a déjà été construit et qui ne change pas ; mais aussi inutile de recharger des ressources externes si elles ne changent pas. Seules les données changent, ou seule une petite fraction de la page change.</p>
                    <p>Il y a 2 étapes de traitements :</p>
                    <ul class="list">
                        <li>les traitements qui s'opèrent <strong>au chargement de l'application</strong></li>
                        <li>les traitements qui s'opèrent <strong>au changement de page</strong></li>
                    </ul>
                </div>
                <figure class="col-50">
                    <img src="../assets/img/schema_spa.jpg">
                    <figcaption>Schéma d'une implémentation “Signle-Page”</span></figcaption>
                </figure>
            </div>
            <div>
                <p><em>Sources :</em> <a href="https://developer.mozilla.org/fr/docs/Glossary/SPA" target="_blank" rel="noreferer">MDN : Application monopage (SPA)</a></p>
            </div>
        </section>`;
    }
}

export default DesignComponent;
