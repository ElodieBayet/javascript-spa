# JavaScript SPA :: Exemple de développement SPA en JS

Date | Reviewed | Purpose | Discipline | Example
---- | -------- | ------- | ---------- | -------
2020.02 | 2022.01 | Pedagogy | JavaScript | [JavaScript-SPA](https://demo.elodiebayet.com/javascript-spa)


## **Avant-propos**

Le but n'est pas de fournir publiquement un _modèle_ ou un _template_ intégrable, mais bien de montrer **comment développer quelque chose de similaire** en se servant de ce projet comme exemple de départ. Il n'y aura pas de _versions ultérieures_, ce projet ne va pas _évoluer_ – sauf corrections bugs, erreurs, coquilles laissés par mégarde.

---

## Sommaire 
0. [Présentation](#0---presentation)
    * [0.0 - Objectifs](#00---objectifs)
    * [0.1 - Évolution](#01---évolution)
    * [0.2 - Utilisation](#03---utilisation)
1. [Démarrage](#1---démarrage)
    * [1.0 - Prérequis](#10---prérequis)
    * [1.1 - Configuration](#11---configuration)
2. [Structure](#2---structure)
    * [2.0 - Architecture SEO](#20---architecture-seo)
    * [2.1 - Dossiers et fichiers](#21---dossiers-et-fichiers)
    * [2.2 - Base de données](#22---base-de-données)
3. [Méthodologie](#3---méthodologie)
    * [3.0 - Développement](#30---développement)
    * [3.1 - Optimisation](#31---optimisation)
4. [Remarques](#4---remarques)

---

## 0 - Présentation

Exemple de développement d'application Web _Single-Page_ en JavaScript pure en **Orienté Objets**.


### 0.0 - Objectifs

- Apprendre la résolution _Single-Page_
- Découvrir l'organisation d'appels vers des APIs
- Observer une structure et une organisation de fichiers pertinentes


### 0.1 - Contenu

Il n'y a pas de thématique particulière, mais uniquement le résultat des appels API qui concernent du faux texte “Lorem Ipsum”, et des données météo accessibles gratuitement. 
1. [Bacon Ipsum](https://baconipsum.com/json-api/) pour le “faux texte”.
2. [WeatherStack](https://weatherstack.com/) pour les données météo. Une clé d'authentification est requise. Pour utiliser ce projet, il faudra inscrire cette clé dans le fichier `js/lib/_tokens.js`


### 0.2 - Évolution

Sauf un quelconque défaut laissé par mégarde, ce projet ne doit pas évoluer vers une modélisation plus avancée. Il constitue **une ressource pédagogique** de base destinée à l'apprentissage de concepts parfois obscurs pour des néophytes.


### 0.3 - Utilisation

Ce projet n'est utilisable que dans un cadre d'apprentissage individuel et privé. Il ne convient pas pour une utilisation publique ou professionnelle.

#### Images

Certaines images employées dans ce projet – sauf celles listées dans **"Exceptions"** – sont soumises aux droits d'auteur et protégées par la [Sofam](https://www.sofam.be/) – auteure n° 72/55. Aucune reproduction, communication publique, réutilisation partielle ou entière des images **n'est autorisée**.

#### Exceptions

* les logos des technologies employés sur la page _Informations_.

---

## 1 - Démarrage

Ce projet ne requiert aucune installation ni _configuration spéciale_ pour fonctionner. Il est toutefois possible d'exploiter le chargement des données météo en temps réel en opérant quelques modification.


### 1.0 - Prérequis

* un compte utilisateur gratuit sur [WeatherStack](https://weatherstack.com/) pour obtenir une clé d'accès privée. 


### 1.1 - Configuration

Le fichier `lib/_tokens.js` contient une constante-objet qui renvoie la clé d'accès à l'API **WeatherStack**. La valeur `null` doit être remplacée. Cette clé est exploité par la classe `modules/WeatherStack`.
```js
export const ACCESS_KEY = {
    get: () => null
}
```

---

## 2 - Structure


### 2.0 - Architecture SEO

#### URIs

* Paragraphes :: `/`
* Météo par ville :: `/weather-by-city`
* Météo géolocalisée :: `/weather-by-location`
* Informations :: `/info`


#### Schéma

![Website Tree](/assets/fig/architecture_seo.jpg)


### 2.1 - Dossiers et fichiers

Il n'y a aucune _librairie tierce_ dans ce projet.

* `assets/`
* `public/`
    - `js/`
        - `components/` pages entendues en tant que 'component' car en SPA il n'y a pas de 'pages'
            - `common/`
            - `error/`
            - `textWithBacon/`
            - `weatherByCity/`
            - `weatherByLocation/`
        - `modules/` modules applicatifs
        - `lib/` services globaux pour l'application
        - `constants.js` 
        - `main.js`
    - `css/`
* `data/` données statiques en .json alternatives aux API 
    - `weather-stack/`
    - `bacon-ipsum/`
* `_manifest.json` en guise d'exemple (optionnel), à préfixer avec le nom de l'application
* `index.html`

---

## 3 - Méthodologie

Cet exemple répond à un développement basique d'une application _Single-Page_ en **vanilla JavaScript**. Le principe est donc de construire _virtuellement_ une interface à l'aide du DOM, d'appeler et d'afficher un contenu différent pour chaque "page", et d'exécuter les modules s'y référent.

Dans cet exemple, certains traitements ont été volontairement écarté sans quoi ce projet serait beaucoup trop volumineux. Entre autres, les traitements suivants :
* création et gestion de Proxy pour la sécurisation des appels sur API privées au moyen d'un token
* décomposition des _component-pages_ en sous-pages


### 3.0 - Développement

Le but d'une _Single-Page Application_ est de détourner les habituelles requêtes de navigation du serveur pour n'effectuer que des _requêtes de données_ par moyens **asynchrones**.C'est-à-dire que la page toute entière ne se recharge pas contrairement aux "sites web traditionnels" : _Inutile de reconstruire ce qui a déjà été construit et qui ne change pas_ ; mais aussi _Inutile de recharger des ressources externes si elles ne changent pas_. Seuls les _données_ changent, ou seule une petite fraction de la page change.

Il y a 2 étapes de traitement :
1. celle qui s'opère **au chargement de l'application**
2. et celle qui s'opère **au changement de page**

La première est résolue par le déclenchement de l'événement `load` accroché sur l'objet `window`. Sa tâche consiste à **construire le layout global** – navigation principale, en-tête et pied de page, etc. – et à activer les modules d'interaction constants tels que l'ouverture/la fermeture du menu, le rafraichissement des boutons du menu, etc. En toute logique, ce déclenchement ne s'opère qu'une fois : lorsqu'on _charge_ l'application dans le navigateur. 

La deuxième est résolue par le déclenchement de l'événement `hashchange`, toujours sur l'objet `window`. Sa tâche comporte la résolution de la route sur base de la valeur _hash_ de l'url, à **construire le contenu** de la page associée à cette route – ou a construire celle d'erreur en cas d'échec –, puis à activer les modules utiles. Ce déclenchement s'opère autant de fois que l'on change de page.

#### Décomposition

Le principe basique _une classe = un fichier_ en **programmation orienté objets** est respécté. Néanmoins leurs modes opératoires diffèrent légèrement.

1. Les classes auto-instanciées, présentes dans les dossiers `components/` et `lib/`, s'utilisent de manière _unique_. Ce qui est exporté c'est **une instance de la classe** et non pas la classe elle-même. Soit elles ont pour but de fournir un "service" – dossier `lib/` – de routage, de gestion de l'interface, etc. Soit elle représente _la page_ demandée – dossier `components/` – et est exploité par **chargement dynamique** à travers le service de routage.
2. Les classes instanciables, présentes dans le dossier `modules/`, avec une exception pour l'interface `Page` dans `lib/`, et s'utilisent _normalement_, autant de fois que des instances sont créées.


### 3.1 - Optimisation

Compte tenu de la décomposition des 2 traitements sus-mentionnés, l'application observe déjà une forme d'optimisation dans **le chargement et l'exécution de ressources** – un seul fichier `index.html`, un seul chargement des css, des images de logo, etc. 

Mais pour pousser l'optimisation, et surtout, l'économie des traitements et des chargements, le principe de la fonction `import()` – imports dynamiques – complète et renchérit le processus. Il faut bien distinguer la différence entre **l'instruction** `import {} from '...'` et la **fonction** `import('...')`. **L'instruction** `import {} from '...'` permet au navigateur de vérifier si le module a déjà été importer ou pas, et évite donc de le refaire une seconde fois. _Ordinairement_, tous les modules ou les components sont importés de cette manière, et ne sont exécutés que si c'est nécessaire... Le différence est là : ils sont chargés même si on ne doit pas les exécuter. La résolution du routage débouche sur un **chargement dynamique** `import('...')`. En d'autre termes et en guise d'exemple : on ne chargera le component `WeatherByLocation` **et** ses modules associés **que** si on visite la page "Météo Géolocalisée".

Pour un mini-site comme ce projet, ça ne représente pas _grand chose_ en terme d'économie, mais la même "logique" peut-être appliquée à des applications plus volumineuses.

---

## 4 - Remarques 

(R.A.S)