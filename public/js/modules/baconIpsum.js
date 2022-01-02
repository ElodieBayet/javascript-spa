'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

/**
 * Manage BaconIpsum API. Data loaded and stored once.
 * @requires ENV constant in /js/constants.js
 */
class BaconIpsum {
    
    constructor() {
        this._data = [];
        this._qty = 3;
    }
    
    // Getters --
    
    get qty() {
        return this._qty;
    }

    get total() {
        return this._data.length;
    }

    // Setters --

    set setQty(val) {
        if (val > 0) this._qty = val;
    }

    /**
     * Calls API
     * @returns {Promise} Parsed JSon data or Error
     */
    async getData(){
        // 
        let url = ENV.mode() === 'production' ? `https://baconipsum.com/api/?type=meat-and-filler&paras=${this._qty}`:`http://localhost:5500/data/bacon-ipsum/bacon-data-8.json`;

        return fetch(url).then(res => res.json()).catch(err => err);
    }

    /**
     * Build HTML of all paragraphs
     * @returns {String} - HTML with every paragraph in a <p>
     */
    async renderAll() {

        let paragraphs = '';

        if (this._data.length === 0) this._data = await this.getData();

        for (let i = 0 ; i < this.total ; i++) {
            paragraphs += `<p class="divided"><span class="light">§${i+1} ::</span>${this._data[i]}</p>`;
        }

        return paragraphs;
    }

    /**
     * Build HTML of single paragraph
     * @param {Number} index - Human understanding number of paragraph, i.e. desired §3 means getting data[2]
     * @returns {String} - HTML with targeted paragraph or error information in <p>
     */
    async renderOne(index) {
        
        if (this._data.length === 0) this._data = await this.getData(); 
        
        if ( index < 1 || index > this._data.length) return `<p class="nothing">Aucun paragraphe référencé à cette position : ${index}</p>`;

        return `<p><span class="light">§${index} ::</span> ${this._data[index-1]}</p>`;
    }

    /**
     * Build HTML of paragraphs at given index and for a given quantity
     * @param {Number} index - Begining position of paragraphs
     * @param {Number} qty - Quantity of paragraphs
     * @returns {String} - HTML with range of paragraphs each in a <p>
     */
    async renderRange(index, qty) {
        
        let list = '';
        if (index < 0 || isNaN(qty)) {
            list = `<p class="nothing">Plage de sélection invalide : ${index}, ${qty}</p>`;
        } else {
            
            let i = 0;

            if (this._data.length === 0) this._data = await this.getData(); 

            while (i < qty && this._data[index+i] !== undefined) {
                list += `<p class="divided"><span class="light">§${index+i+1} ::</span> ${this._data[index+i]}</p>`;
                i++;
            }
        }
        
        return list;
    }
}

export default BaconIpsum;