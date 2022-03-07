'use strict';
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

/**
 * Create and Manage Pagination
 */
class Paginate {

    constructor() {
        this._index = 0;
        this._itemsPage = 1;
        this._anchors = undefined;
    }
    
    // Getters --

    get index() {
        return this._index;
    }
    get itemsPage() {
        return this._itemsPage;
    }
    
    // Setters --
    
    set setIndex(val) {
        if (val >= 0) this._index = val;
    }
    set setItemsPage(val) {
        if (val > 0) this._itemsPage = val;
    }

    /**
     * Build container for pagination anchors
     * @param {Number} quantity Total of items
     * @returns {String} HTML for render
     */
    async render(quantity) {

        let pagination = `<div id="pagination">`;

        if (quantity > 0) {
            let pages = Math.ceil(quantity/this._itemsPage);
            pagination += '<ul class="listitem center">';
            for (let i = 1; i <= pages; i++) {
                pagination += `<li><a href="${location.hash}" class="button">${i}</a></li>`;
            }
        } else {
            pagination += `<p class="nothing">Construction de pagination impossible : <strong>${quantity}</strong></p>`;
        }

        pagination += '</div>';

        return pagination;
    }

    /**
     * Active events and references
     */
    async enable() {

        // Limit DOM query to one
        this._anchors = document.querySelectorAll('#pagination a');

        this._anchors.forEach( anchor => {
            
            if (Number(anchor.textContent.trim()) === this._index / this._itemsPage + 1) anchor.classList.add('selected');
            
            anchor.addEventListener('click', this.handlePagination);
        });
    }

    /**
     * Exchanges current page with targeted one and triggers new render
     * @param {Object} evt 
     */
    handlePagination = evt => {

        evt.preventDefault();

        this._anchors.forEach( anchor => { anchor.classList.remove('selected') });
        evt.target.classList.add('selected');

        const page = Number(evt.target.textContent.trim());
        this._index = (page - 1) * this._itemsPage; 

        this.renderChange();
    }

    /**
     * Bind internal call with external Function
     * @param {Function} callback External action to trigger
     */
    bindRenderChange(callback) {
        this.renderChange = callback;
    }
}

export default Paginate;