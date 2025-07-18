'use strict';
/**
 * @author Elodie Bayet
 */

import DOMService from "https://demo.elodiebayet.com/neptune/assets/js/lib/domService.js";
import GUIService from "https://demo.elodiebayet.com/neptune/assets/js/lib/guiService.js";
import HTTPService from "../src/services/HTTPService.js";
import Router from "./router.js";
import Service from "./service.js";

class App {

    constructor(config) {
        this._router = Router.load(config.routes);
        this._service = Service.set([DOMService, GUIService, HTTPService]);
        this._layout = Reflect.construct(config.layout, [this._service, ...config.modules]);
    }

    /**
     * Reminder :
     * * arrowed syntax avoid loosing `this` (the app instance context) when called as `node.addEventListener('event', instance.build)` 
     */
    build = () => {
        this._layout.build(this._router.getRoutes());
        this._layout.enable();
        this.component();
    }

    component = async () => {
        const currentRoute = this._router.getCurrentRoute();
        this._layout.update(currentRoute);

        const component = await currentRoute.component();
        const parameters = Reflect.apply(component.getDependencies, component, [this._service]);
        const instance = Reflect.construct(component, parameters.map(parameter => {
            if(parameter instanceof Object && 'class' in parameter) {
                return new parameter.class(...parameter.construct);
            }
            return parameter;
        }));
        this._layout.content = instance.render();
        instance.enable();
    }
}

export default App;