'use strict';
/**
 * @author Elodie Bayet
 */

import App from "../core/app.js";
import { config } from "./app/config.js";

const app = new App(config);

/** Window listening */
window.addEventListener('load', app.build);
window.addEventListener('hashchange', app.component);

/** Remove class '.nojs' */
document.documentElement.removeAttribute('class');
