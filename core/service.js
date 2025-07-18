'use strict';
/**
 * @author Elodie Bayet
 */

class Service {

    static get(service) {
        if (Service.prototype.hasOwnProperty(service)) {
            return Service.prototype[service];
        }
        return null;
    }

    static set(insert) {
        if (Array.isArray(insert)) {
            insert.forEach((item) => {
                Service.prototype[item.name] = item;
            });
        }
        Service.prototype[insert.name] = insert;
        return Service;
    }
}

export default Service;