'use strict';
/**
 * @author Elodie Bayet
 */

class Template {

    constructor(service) {
        this._service = service;
        this._menuElements = [];
        this._h1 = document.querySelector('main h1'); 
        this._content = document.querySelector('[data-component="content"]');
        this._mainmenu = document.querySelector('[data-component="mainmenu"]');
        this._secondmenu = document.querySelector('[data-component="secondmenu"]');
    }

    set content(content) {
        this._content.innerHTML = content;
    }

    build(routes) {
        this._content.innerHTML = "";

        if (routes.length > 0) {
            const domService = this._service.get('DOMService');
            
            this._mainmenu.innerHTML = '';
            this._secondmenu.innerHTML = '';
            let hasSecond = false;

            routes.forEach(route => {
                const aTag = domService.nodeBuilder('a', route.title, {href:`#${route.path}`});
                if (undefined !== route['second']) {
                    hasSecond = true;
                    this._secondmenu.appendChild(domService.nodeBuilder('li', aTag, null));
                } else {
                    this._mainmenu.appendChild(domService.nodeBuilder('li', aTag, null));
                }
                this._menuElements.push(aTag);
            });

            if (false === hasSecond) {
                const parentSecond = this._secondmenu.parentElement;
                parentSecond.parentElement.removeChild(parentSecond);
            }
        }
    }
}

export default Template;