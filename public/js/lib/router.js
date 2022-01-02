'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

/**
 * Provides routing services
 */
class Router {
    
    /**
     * Extract the path from URI
     * @returns {String} The path sliced at hash if so or return '/'
     */
    parsePath = () => location.hash.slice(1).toLocaleLowerCase() || '/';

    /**
     * Find appropriate page by pathname
     * @param {String} path Path of URI
     * @param {Array} routes Collection of routes Object
     * @returns {?Object} Matched route object or null of nothing matches
     */
    matchPage = (path, routes) => routes.find(route => route.path === path ) || null;

    /**
     * Find and import component
     * @returns {Object} Required component or default Error component
     */
    getComponent = async routes => {
        
        const path = this.parsePath();
        const page = this.matchPage(path, routes) || '';
        
        try {
            const {default: Component} = await import(page.component);
            return Component;
        } catch (error) {
            const {default: Error} = await import('../components/error/index.js');
            return Error;
        }
    }
}

export default new Router;