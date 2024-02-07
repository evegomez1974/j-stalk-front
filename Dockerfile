# Utilisez une image de base avec Node.js
FROM node:lts-alpine

# Créez le répertoire de travail
WORKDIR /app

# Copiez les fichiers nécessaires dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste des fichiers dans le conteneur
COPY . .

# Exposez le port sur lequel votre application Vue.js sera en cours d'exécution
EXPOSE 8080

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
