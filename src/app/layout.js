'use strict';
/**
 * @author Elodie Bayet
 */

import Template from "../../core/template.js";

class Layout extends Template {

    constructor(service, headerManager) {
        super(service);
        this._headerManager = new headerManager(
            document.querySelector('#uihead'),
            document.querySelector('#uihead button'),
            document.querySelector('#uihead .navigation')
        );
    }
    
    enable() {
        const guiService = this._service.get('GUIService');
        guiService.delayedResizer(this._headerManager.autoCompute);
    }

    update(route) { 
        const title = document.title.substring(document.title.indexOf('|'));
        document.title = `${route.title} ${title}`;
        this._h1.innerHTML = route.title;
        
        const url = `${location.href}`;
        this._menuElements.forEach((a) => {
            a.classList.remove('selected');
            if (a.href === url || ('' === location.hash && a.href.endsWith('/#/'))) {
                a.classList.add('selected');
            }
        });
    }
}

export default Layout;