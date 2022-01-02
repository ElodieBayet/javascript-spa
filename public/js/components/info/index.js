'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import Page from '../../lib/page.js';

class Info extends Page {

    constructor() {
        super();
        this.title = `Informations`;
        this.desc = `Renseignements sur l'application, son fonctionnement et son contenu`;
    }

    async render() {
        return `<h2>Description de “JavaScript-SPA”</h2>
        <div class="grid md">
            <div class="col-50">
                <h3>Projet</h3>
                <p>Cette application est un exemple de développement d'application Web <em>Single-Page</em> en JavaScript pure en <strong>Orienté Objets</strong>.</p>
                <h4>Objectifs</h4>
                <ul class="list">
                    <li>Apprendre la résolution <em>Single-Page</em></li>
                    <li>Découvrir l'organisation <strong>d'appels vers des APIs</strong></li>
                    <li>Observer une structure et une organisation de fichiers pertinentes</li>
                </ul>
            </div>
            <div class="col-50">
                <h3>Contenu</h3>
                <p>Il n'y a pas de thématique particulière. Seul le résultat des appels API qui concernent du faux texte “Lorem Ipsum”, et des données météo accessibles gratuitement.</p> 
                <h4>API</h4>
                <p>Deux APIs sont utilisées</p>
                <ul class="list">
                    <li><a href="https://baconipsum.com/json-api/" title="Aller sur le site" target="_blank" rel="noreferer">Bacon Ipsum</a>, pour le “faux texte”</li>
                    <li><a href="https://weatherstack.com/" title="Aller sur le site" target="_blank" rel="noreferer">WeatherStack</a> pour les données météo.</li>
                </ul>
            </div>
        </div>
        <div class="grid md">
            <div class="col-50">
                <h3>Étude</h3>
                <p>Le but d'une <em>Single-Page Application</em> est de détourner les habituelles requêtes de navigation du serveur pour n'effectuer que des <em>requêtes de données</em> par moyens <strong>asynchrones</strong>.</p>
                <p>En d'autres termes, la page toute entière ne se recharge pas contrairement aux "sites web traditionnels" : <em>Inutile de reconstruire ce qui a déjà été construit et qui ne change pas</em> ; mais aussi <em>Inutile de recharger des ressources externes si elles ne changent pas</em>.</p>
            </div>
            <div class="col-50">
                <h3>Technologies</h3>
                <div class="grid sm">
                    <div class="col-33 badge">
                        <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_js.svg" alt="JavaScript Logo"></div>
                        <div class="title">
                            <p>JavaScript</p>
                        </div>
                    </div>
                    <div class="col-33 badge">
                        <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_html.svg" alt="HTML 5 Logo"></div>
                        <div class="title">
                            <p>HTML 5</p>
                        </div>
                    </div>
                    <div class="col-33 badge">
                        <div class="icon"><img src="https://www.elodiebayet.com/store/icons/icon_git.svg" alt="GIT Logo"></div>
                        <div class="title">
                            <p>Git</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }
}

export default new Info;