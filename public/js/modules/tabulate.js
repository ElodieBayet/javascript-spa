`use strict`;
/**
 * @author :: Elodie Bayet
 *   @role :: Fullstack Web Developer
 *   @date :: 2020.01 + 2021.10
 * @origin :: Belgium, EU
 */

/**
 * Create and Manage Tabs
 */
class Tabulate {
    
    constructor () {
        this._index = ''
        this._cities = [];
        this._tabs = undefined;
    }

    // Getters --
    get index(){
        return this._index;
    }
    get cities(){
        return this._cities;
    }

    // Setters --
    
    set setIndex(val){
        this._index = val; // ! control string
    }
    set setCities(val){
        this._cities = val // ! control array
    }

    /**
     * Build container for tabulation buttons
     * @param {Array} tabs List with string values for tabs to build
     * @returns {String} HTML for render
     */
    async render(tabs) {

        let tabulation = '<div id="tabulation">';

        if (Array.isArray(tabs)) {
            for (let i = 0; i < tabs.length; i++) {
                tabulation += `<button class="tab" type="button">${tabs[i]}</button>`;
            }
        } else {
            tabulation += `<p class="nothing">Construction de tabulation impossible</p>`;
        }
        
        tabulation += '</div';

        return tabulation;  
    }
    
    /**
     * Active events and references
     */
    async enable() {
        
        // Limit DOM query to one
        if (this._tabs === undefined) this._tabs = document.querySelectorAll('#tabulation button');

        this._tabs.forEach( tab => {
            tab.addEventListener('click', this.handlePagination);
        });
    }

    /**
     * Exchange current tab with targeted one and triggers new render
     * @param {Object} evt 
     */
     handlePagination = evt => {
    
        this._tabs.forEach( tab => { tab.classList.remove('selected') });
        evt.target.classList.add('selected');

        const tab = evt.target.textContent.trim();

        this.renderChange(tab);
    }

    /**
     * Bind internal call with external Function
     * @param {Function} callback External action to trigger
     */
    bindRenderChange(callback) {
        this.renderChange = callback;
    }
}

export default Tabulate;