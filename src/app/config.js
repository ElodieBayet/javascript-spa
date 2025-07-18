'use strict';
/**
 * @author Elodie Bayet
 */

import HeaderManager from "https://demo.elodiebayet.com/neptune/assets/js/lib/headerManager.js";
import { routes } from "./routes.js";
import Layout from "./layout.js";

export const config = {
    routes: routes,
    layout: Layout,
    modules: [
        HeaderManager
    ]
};