'use strict';
/**
 * @author Elodie Bayet
 */

class Router {

    _routes = [];
    _notFound = {};

    static load(routes) {
        if (Array.isArray(routes)) {
            Router._routes = routes.filter(route => route.path !== '**');
            Router._notFound = routes.find(route => route.path === '**');
        }

        return Router;
    }

    static getRoutes() {
        return Router._routes;
    }

    static getNotFound() {
        return Router._notFound;
    }

    /**
     * Find current route
     * @returns {?object} Matched route or not found
     */
    static getCurrentRoute() {
        let pattern = new RegExp(Router._parsePath());
        return Router._routes.find(route => pattern.test(route.path)) ?? Router._notFound;
    };

    /**
     * Extract the path from URI
     * @returns {string} Path sliced at hash or root path
     */
    static _parsePath () {
        return location.hash.slice(1).toLocaleLowerCase() || '/';
    }
}

export default Router;