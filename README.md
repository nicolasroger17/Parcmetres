## Présentation

Projet portant sur une application permettant de payer son parcmètre depuis son téléphone

### Contenu

Ce projet contient un site web et deux applications

## Technologies utilisées

### Serveur : NodeJS

La partie serveur est utilise le NodeJS

Nous avons utilisé le framework express, la gestion de la base de données
se fait en utilisant l'ORM de NodeJS : node-orm2
https://github.com/dresende/node-orm2

### Clients : Html, Javascript/Jquery, Css

Le site web ainsi que les applications sont basés sur l'html, le javascript en utilisant le framework
Jquery et le css.

### Applications

Les applications sont générées à partir de Cordova
Cordova permet de compiler des applications pour la plupart des OS de smartphone.

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

## Identifiant par défaut

login : test@isep.fr

password : 123456

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

Les applications sont présentes dans Parcmetres\[application||police]\platforms\[platforms]

Exemple pour l'application android : Parcmetres\application\platforms\android\ant-build\Parcmetres-debug.apk

## Fonctionnalités non implémentées

Le projet portant sur l'utilisation du nodeJS, la gestion du crédit qui aurait nécessité l'utilisation d'une API telle
que PayPal n'a pas été développé.

La géolocalisation à partir d'un code présent sur le parcmètre en cas de problème de localisation n'a pas été développé
car sa conception requiert une étude très poussée.
