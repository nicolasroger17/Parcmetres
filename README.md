# Parcmetres

Application pour le génie logiciel


## Pré-requis

Node.js

Cordova

Apache

MySQL


## Installation

Récupérer le projet depuis un zip ou depuis github

Importer la base de donnée situé dans Parcemetres/web/parcmetres.sql

### Configurer le fichier d'accès à la base de données : 

Copier le fichier Parcmetres/web/conf.js dans le dossier Parcmetres/web/config

Modifier les paramètres en fonction de votre configuration

### Changer les adresses IP du serveur : 

Par défaut, l'adresse IP du serveur pour les applications sont localhost
Si cela ne correspond pas à votre configuration, modifier l'adresse du serveur dans les deux fichiers suivants : 

Parcmetres\application\www\js\index.js
Parcmetres\police\www\js\index.js

## Utilisation

### Site Web

Se déplacer dans le dossier Parcmetres/web

exécuter la commande : node app.js

Ceci lancera serveur sur localhost:8080

Le site web est alors disponible à cette adresse

### Applications

Se déplacer dans Parcmetres/application ou Parcmetres/police

Exécuter : cordova serve

Ceci permettra d'accéder à l'application dans un client web à l'adresse localhost:8000

Note : Les applications font des requêtes en ajax, cela va donc générer des erreurs : Allow-Control-Access-Origin

Pour pouvoir tout de même les utiliser depuis un ordinateur,
vous pouvez utiliser le navigateur chrome avec l'extension Allow-Control-Allow-Origin: *
https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi

Nous avons essayer de générer les applications mais une erreur avec Ant d'apache nous a empêcher de les 
re-compiler avec les dernières versions des applications. C'est pourquoi nous préconisons l'utilisations 
de cordova pour simuler les applications sur un navigateur.