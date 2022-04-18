# hypnos
## Prerequis
Pour le deploiement en local de cette application, il vous faudra plusieurs prérequis logiciel: 
- nodejs (j'utilise la version V16.13.2) pour le backend
- wampserver afin d'heberger la base de données SQL

## installation des packages
le depot contient 2 dossiers principaux **back** et **client**. Lancer la commande dans l'invite de commande "cd back && yarn"
pour installer les packages du backend (si vous n'utilisez pas yarn mais plutot npm alors saisissez "cd back && npm install"). 
Revenez au dossier initial avec "cd .." puis la commande "cd client && yarn" ou "cd client && npm install" pour installer les 
packages client.

## lancement de l'application en local
Une fois nodejs , wampserver (il faut que l'application soit lancée) et les différents packages installés, lancez la commande "yarn back" ou placez vous dans le dossier
"back" et saisissez "yarn start" ou "npm start". ouvrez un nouveau terminal puis lancez la commande "yarn client" ou placez vous dans le dossier
"client" et saisissez "yarn start" ou "npm start".
Logiquement, le terminal back vous indique que le serveur tourne sur le port 7000 et que different user / etablissement on été créé. Il peut etre necessaire de relancer la
commande yarn back pour que cela fonctionne. Il faut cependant garder à l'esprit que toutes les modifications seront effacées. Sinon il faudrait dans app.js du dossier back 
changer à la ligne 46 		"db.sequelize.sync({ force: true }).then(() => {"
en 		"db.sequelize.sync().then(() => {"
pour garder les modifs à chaque redémarrage du serveur


Le terminal client lance automatiquement votre navigateur sur l'adresse http://localhost:3000/
enjoy!
