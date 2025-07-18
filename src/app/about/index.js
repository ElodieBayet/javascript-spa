'use strict';
/**
 * @author Elodie Bayet
 */

import Component from "../../../core/component.js";

class AboutComponent extends Component {

    constructor() {
        super();
    }

    render() {
        return `<section>
            <h2>Projet “JavaScript &amp; SPA”</h2>
            <p><span class="light">En bref :</span> Ce projet sert d'exemple de développement en JavaScript à travers l'implémentation <strong>Single-Page-Application</strong> et le paradigme <strong>Orienté Objet</strong>.</p>
            <div class="grid md">
                <div class="col-50">
                    <h3>Objectifs andragogiques</h3>
                    <ul class="list">
                        <li>Résoudre un système de routage en JavaScript</li>
                        <li>Respecter l'implémentation <em>Single-Page</em></li>
                        <li>Exploiter les appels vers des APIs</li>
                        <li>Se préparer à l'utilisation du TypeScript</li>
                        <li>Se préprarer à l'apprentissage d'un Framework professionnel comme Angular</li>
                    </ul>
                </div>
                <div class="col-50">
                    <h3>Développement</h3>
                    <div class="grid sm">
                        <div class="col-33 badge">
                            <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_js.svg" alt=""></div>
                            <div class="title">
                                <p>JavaScript</p>
                            </div>
                        </div>
                        <div class="col-33 badge">
                            <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_ajax.svg" alt=""></div>
                            <div class="title">
                                <p>AJAX</p>
                            </div>
                        </div>
                        <div class="col-33 badge">
                            <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_json.svg" alt=""></div>
                            <div class="title">
                                <p>JSon</p>
                            </div>
                        </div>
                        <div class="col-33 badge">
                            <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_html.svg" alt=""></div>
                            <div class="title">
                                <p>HTML 5</p>
                            </div>
                        </div>
                        <div class="col-33 badge">
                            <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_git.svg" alt=""></div>
                            <div class="title">
                                <p>Git</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <hr>
        <section>
            <h2>Thématique</h2>
            <p><span class="light">En bref :</span> (en cours de rédaction)</p>
            <h3>Interface de programmation d'interface <span class="light">&mdash; API</span></h3>
            <div class="columns">
            <p>En cours de rédaction : Voir la théorie du cours.</p>
            </div>
        </section>`;
    }
}

export default AboutComponent;
