'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import GUIServices from '../../lib/guiServices.js';
import Opener from '../../modules/opener.js';

/**
 * Manage global interface of Application
 */
class Layout {
    
    constructor(guiServices, opener) {
        // Modules
        this._gui = guiServices;
        this._opener = opener;

        // DOM elements
        this._header = undefined;
        this._navigation = undefined;
        this._menuButton = undefined;
        this._menuItems = undefined;
    }

    async mainMenu() {
        return `<nav class="mainmenu">
            <ul>
                <li><a href="#/" title="Aller à la page">Paragraphes</a></li>
                <li><a href="#/weather-by-city" title="Aller à la page">Météo par ville</a></li>
                <li><a href="#/weather-by-location" title="Aller à la page">Météo GéoLocalisée</a></li>
                <li><a href="#/info" title="Aller à la page">Informations</a></li>
            </ul>
        </nav>`;
    }
   
    async render() {
        return `<header id="uihead" class="closed">
        <div class="inner">
            <div class="headline">
                <a href="#/" class="applogo" title="Retourner à l'accueil du site">
                    <span class="icon"><img src="./assets/trademark/javascriptspa_icon_wt.svg" alt="Icon JavaScript SPA"></span>
                    <span class="title">JavaScript-SPA</span>
                </a>
                <p>Exemple de développement SPA en JavaScript</p>
            </div>
            <div class="navigation">
                ${await this.mainMenu()}
            </div>
        </div>
        <div class="edge">&nbsp;</div>
        <div class="edge">&nbsp;</div>
        <button type="button"><span class="blind">Ouvrir le menu</span></button>
    </header>
    <main><header><h1>SPA in Vanilla</h1></header><section id="content"></section></main>
    <footer id="uifoot">
        <div class="headline">
            <div>
                <a href="#/" class="applogo" title="Retourner à l'accueil du site">
                    <span class="icon"><img src="./assets/trademark/javascriptspa_icon_wt.svg" alt="Icon JavaScript SPA"></span>
                    <span class="title">JavaScript-SPA</span>
                </a>
                <p>Exemple de développement SPA en JavaScript</p>
            </div>
        </div>
        <div class="navigation">
            ${await this.mainMenu()}
        </div>
        <div id="author"><p>Développé par <strong>Elodie Bayet © 2021</strong> — Tous droits réservés</p></div>
    </footer>`;
    }

    async enable() {
        // Avoid excessive DOM queries
        if (this._header === undefined) this._header = document.querySelector('#uihead');
        if (this._menuButton == undefined) this._menuButton = document.querySelector('#uihead button');
        if (this._navigation == undefined) this._navigation = document.querySelector('#uihead .navigation');
        if (this._menuItems == undefined) this._menuItems = document.querySelectorAll('.mainmenu a');
        
        // Enabling Modules
        const opener = new this._opener(this._header, this._menuButton, this._navigation);
        
        // GUI and local Services
        this._gui.delayedResizer( opener.autoCompute );
        this.toggleSelect();
        window.addEventListener('hashchange', evt => {
            this.toggleSelect();
            opener.autoClose();
        });
    }

    /**
     * Add or remove hightlightning on menu items
     */
    toggleSelect = () => {
        this._menuItems.forEach( item => {
            if (location.hash === item.getAttribute('href')) item.classList.add('selected');
            else item.classList.remove('selected');
        });
    }
}

export default new Layout(GUIServices, Opener);