# Utiliser l'image officielle Node.js comme image de base.
FROM node:16

# Définir le répertoire de travail dans le conteneur.
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json dans le conteneur.
COPY Interface/API/package*.json ./

# Installer les dépendances.
RUN npm install

# Copier le reste du dossier Interface/API dans le conteneur.
COPY Interface/API/ ./

# Exposer le port que votre API utilise.
EXPOSE 3000

# Définir la commande pour démarrer votre application Node.js.
CMD ["node", "index.js"]
