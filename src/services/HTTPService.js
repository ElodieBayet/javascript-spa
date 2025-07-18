'use strict';
/**
 * @author Elodie Bayet
 */

import { environment } from "../environments/environment.js";

class HTTPService {

    static isLocal(){
        return location.hostname === '127.0.0.1' || location.hostname === 'localhost';
    }

    static isProduction() {
        return environment.production;
    }

    static isDevelopment() {
        return (location.hostname === '127.0.0.1' || location.hostname === 'localhost') || !environment.production;
    }

    static getBaconIpsumUrl() {
        return environment.api.baconIpsum;
    }

    static getWeatherstackUrl() {
        // Weatherstack free plan unavailable for production due to token in url
        return environment.production ? environment.mock.weatherstack : environment.api.weatherstack;
    }

    static getDoriforUrl() {
        return environment.api.dorifor;
    }

    static async getTokens() {
        if (true === environment.production) {
            return {};
        }
        const security = await import('../security/tokens.js');
        return security.tokens;
    }
}

export default HTTPService;
