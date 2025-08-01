# **JavaScript & SPA**

Version | Objectif | Cadre | Démo
------- | -------- | ----- | ----
2.0 | Andragogie | Labo JavaScript | [JavaScript & SPA](https://demo.elodiebayet.com/javascript-spa)


---


## Présentation

Ce projet est un support de cours qui sert d'exemple de développement en JavaScript à travers l'implémentation **Single-Page-Application** et le paradigme **Orienté Objet**.


### Objectifs

- Résoudre un système de routage en JavaScript
- Respecter l'implémentation _Single-Page_
- Consommer des APIs en asyncrone
- Se préparer à l'utilisation du TypeScript
- Se préparer à l'apprentissage d'un Framework professionnel comme Vue.js


### Exploitation

Ce projet peut être utilisé dans un cadre d'apprentissage individuel et privé. Il ne convient pas pour une utilisation publique ou professionnelle.


---


## Description


### Sitemap

```sh
├── "Accueil"
├── "Weatherstack API"
├── "Dorifor API"
├── "À propos"
├── "Conception"
```


---


## Installation

Clônez ce _repository_ dans un répertoire local sur votre machine.

Ce projet ne requiert aucune installation pour fonctionner. Il est toutefois possible d'exploiter le chargement des données météo en temps réel en opérant quelques modification.


### Prérequis

* un compte gratuit sur [WeatherStack](https://weatherstack.com/) pour obtenir une clé d'accès privée.
* l'extension VS Code [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) ou équivalent selon votre IDE


### Configuration

#### Environement

Dupliquez le fichier `environment.template.js` et renommez-le en `environment.js`. Adaptez les URLs des versions "mockées" avec des valeurs adéquantes pour votre utilisation.

Les APIs Bacon Ipsum et Dorifor fonctionnent tant en local qu'en ligne.


#### Token Weather Stack

Après avoir obtenu votre clé sur [WeatherStack](https://weatherstack.com/), créez un sous-dossier `security/` dans `src/`, et placez-y un fichier JavaScript dans laquelle inscrire votre clé. 
```js
// ./src/security/tokens.js
export const tokens = {
    weatherstack: 'YOUR-WEATHER-STACK-TOKEN-HERE'
};
```

**Attention** : ne divulguez jamais vos clés d'API publiquement.

---


## Remarques 

### Ressources

Les ressources externes **CSS** et **JavaScript** sont à votre disposition gracieusement et **leur utilisation est autorisée**. Mais notez bien que ces ressources sont **susceptibles d'évoluer sans préavis** car elles ne font pas l'objet d'une librairie publique.

En revanche, l'utilisation des ressources externes `.png`, `.jpg`, `.svg` figurant dans `/trademark` **est formellement interdite**. Si vous souhaitez utiliser et publier ce projet, **veuillez replacer ces images par vos logos et icônes**.


### Références

- [JavaScript : Info](https://javascript.info/)
- [JavaScript : Référence](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference)
