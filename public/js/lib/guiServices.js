'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.04 + 2021.09
 * @origin :: Belgium, EU
 */

/**
 * Provides GUI Services
 */
class GUIServices {

    /**
     * Avoid overcall of function when window is resizing. Function is called 500 ms after resizing ends.
     * @param {Function} callback Function to call when resize delay ends
     * @returns callback
     */
    delayedResizer(callback){
        let timer;
        const windowResize = () => {
            timer = setTimeout(windowReset, 500);
            window.removeEventListener('resize', windowResize);
        }
        const windowReset = () => {
            clearTimeout(timer);
            this.delayedResizer(callback);
        }
        window.addEventListener('resize', windowResize);
        return callback();
    }

    /**
     * Display error message
     * @param {String} name Name of the module that crashed
     * @param {(Object|Null)} container HTML element where insert info. Will be `header main` if omitted
     */
    moduleError = (name, container = null) => {
        if (container) {
            container.insertAdjacentHTML('beforebegin', `<p class="nothing">Le module <strong>${name}</strong> a rencontré un problème.</p>`);
        } else {
            const place = document.querySelector('main > header');
            place.insertAdjacentHTML('afterend', `<div class='nomodule'><samp>Info : Le module <strong>${name}</strong> a rencontré un problème.</samp></div>`);
        }
    }
}

export default new GUIServices;