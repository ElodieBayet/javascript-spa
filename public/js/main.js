'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

import App from './lib/app.js';

/** Remove class '.nojs' */
document.documentElement.removeAttribute('class');

/** Window listening */
window.addEventListener('hashchange', App.component);
window.addEventListener('load', App.interface);