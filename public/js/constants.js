`use strict`;
/**
 * Routes definitions
 * @constant
 * @type {Array}
 * @global
 */
const ROUTES = [
    {
        path: '/',
        component: '../components/textWithBacon/index.js'
    },
    {
        path: '/weather-by-city',
        component: '../components/weatherByCity/index.js'
    },
    {
        path: '/weather-by-location',
        component: '../components/weatherByLocation/index.js'
    },
    {
        path: '/info',
        component: '../components/info/index.js'
    },
];

/**
 * Environment detection
 * @constant
 * @type {Object}
 * @global
 */
const ENV = {
    details: () => {
        return `Host : ${location.host} ; Hostname : ${location.hostname} ; Port : ${location.port}`
    },
    mode: () => {
        if (location) {
            if (ENV.isLocal()) return 'development';
            return 'production';
        } 
        return 'test';
    },
    isLocal: () => location.hostname === '127.0.0.1' || location.hostname === 'localhost'
}