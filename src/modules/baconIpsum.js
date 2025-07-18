'use strict';
/**
 * @author Elodie Bayet
 */

class BaconIpsum {

    constructor(HTTPService, quantity) {
        this._HTTPService = HTTPService;
        this._quantity = quantity > 0 ? quantity : 1;
        this._paragraphs = [];
    }

    get quantity() {
        return this._quantity;
    }

    get paragraphs() {
        return this._paragraphs;
    }

    async loadParagraphs () {
        let query = `?type=meat-and-filler&paras=${this._quantity}`;
        this._paragraphs = await fetch(`${this._HTTPService.getBaconIpsumUrl()}${query}`)
            .then(result => result.json())
            .catch(error => {
                console.error(error);
                return [];
            });
    }

    implementParagraphs(index, step) {
        if (this._paragraphs.length === 0) {
            return ``;
        }
        
        let paragraphs = ``;
        let range = index + step;
        let limit = range > this._paragraphs.length ? this._paragraphs.length : range;

        for (let i = index ; i < limit ; i++) {
            paragraphs += `<p class="divided"><span class="light">§${i + 1} ::</span> ${this._paragraphs[i]}</p>`;
        }

        return paragraphs;
    }
}

export default BaconIpsum;