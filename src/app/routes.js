'use strict';
/**
 * @author Elodie Bayet
 */

import AppError from '../../core/appError.js';

export const routes = [
    {
        path: '/',
        component: () => import('./baconIpsum/index.js').then(({default: BaconIpsumComponent}) => BaconIpsumComponent).catch((error) => AppError),
        title: "Accueil",
    },
    {
        path: '/weatherstack',
        component: () => import('./weatherStack/index.js').then(({default: WeatherStackComponent}) => WeatherStackComponent).catch((error) => AppError),
        title: "Weatherstack API",
    },
    {
        path: '/dorifor',
        component: () => import('./dorifor/index.js').then(({default: DoriforComponent}) => DoriforComponent).catch((error) => AppError),
        title: 'Dorifor API',
    },
    {
        path: '/a-propos',
        component: () => import('./about/index.js').then(({default: AboutComponent}) => AboutComponent).catch((error) => AppError),
        title: "À propos",
        second: true
    },
    {
        path: '/conception',
        component: () => import('./design/index.js').then(({default: DesignComponent}) => DesignComponent).catch((error) => AppError),
        title: "Conception",
        second: true
    },
    {
        path: '**',
        component: () => import('./notFound/index.js').then(({default: NotFoundComponent}) => NotFoundComponent).catch((error) => AppError),
        title: "Non trouvé"
    }
];