'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import Layout from '../components/common/layout.js';
import Router from './router.js';

/**
 * General Representation of the Application's processus
 * @param {Layout} layout Common layout for application
 * @param {Router} router Routing services 
 */
class App {
    
   constructor(layout, router) {
       this._layout = layout;
       this._router = router;
   }

    set setBody(_body) {
        document.body.innerHTML = _body;
    }

    set setTitle(_title) {
        document.title = `${_title} | JavaScript SPA`;
        document.querySelector('h1').innerHTML = _title;
    }

    set setDesc(_desc) {
        document.querySelector('meta[name="description"]').setAttribute('content', _desc);
    }

    set setContent(_content) {
        document.querySelector('#content').innerHTML = _content;
    }

    /**
     * Build common layout and enable common modules
     */
    interface = async () => {
        this.setBody = await this._layout.render();
        await this._layout.enable();
        this.component();
    }

    /**
     * Build page component and enable commponent's modules
     * @requires ROUTES constant in /js/constants.js
     */
    component = async () => {
        const page = await this._router.getComponent(ROUTES);
        this.setTitle = page.title;
        this.setDesc = page.desc;
        this.setContent = await page.render();
        page.enable();
    }
}

export default new App(Layout, Router);