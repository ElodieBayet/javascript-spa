'use strict';
/**
 * @author :: Elodie Bayet
 */

class Dorifor {

    constructor(HTTPService) {
        this._HTTPService = HTTPService;
        this._formations = [];
        this._sousDomaines = [];
    }

    get sousDomaines() {
        return this._sousDomaines;
    }

    async getSousDomaines() {
        let query = `sous_domaines`;
        const data = await fetch(`${this._HTTPService.getDoriforUrl()}${query}`)
            .then(result => result.json())
            .then(data => data.data)
            .catch(error => {
                console.error(error);
                return [];
            });
        this._sousDomaines = data.filter(sousDomaine => sousDomaine.domaine.endsWith('9'));
    }

    async getFormations(sousDomaine) {
        this._formations = [];
        let currentYear = new Date().getFullYear();
        let query = `formations?createdAt[after]=${currentYear}-01-01&sousDomaine=${sousDomaine}`; 
        this._formations = await fetch(`${this._HTTPService.getDoriforUrl()}${query}`)
            .then(result => result.json())
            .then(data => data.data)
            .catch(error => {
                console.error(error);
                return [];
            });
    }

    implementFormations(title) {
        if (this._formations.length === 0) {
            return `<p class="nothing">Aucune formation trouvée pour le sous-domaine <strong>${title}</strong></p>`;
        }

        let formations = ``;
        this._formations.forEach(formation => {
            let date = formation.updatedAt.slice(0, formation.updatedAt.indexOf('T'));
            formations += `<div class="divided">
                <h4 class="lighten">${formation.formation}</h4>
                <p>Mise-à-jour : <time datetime="${date}" class="light">${date.split('-').reverse().join('/')}</time></p>
                <p>${formation.brief}</p>
                <div><a href="${formation.url}" class="tab" target="_blank" title="La fiche complète">Découvrir</a></div>
            </div>`;
        });

        return formations;
    }
}

export default Dorifor;