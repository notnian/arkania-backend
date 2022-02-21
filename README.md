# DM Backend pour Arkania

J'ai utilisé Node.js pour l'API, les libs mocha et chai pour les tests et mongodb pour la question 2.

Public API endpoint -> `https://arkania-backend.herokuapp.com`

Pour avoir le projet sur la machine locale et lancer les tests unitaires :

Avant de lancer les commandes, penser à copier le fichier .env_example en .env et le remplir comme il convient

```bash
git clone https://github.com/notnian/arkania-backend

# Utiliser npm, pnpm ou yarn au choix comme gestionnaire de paquets
pnpm install
# Pour lancer les tests
pnpm run test
# Pour lancer un serveur sur le port 8080
pnpm run dev

# Pour tester l'API avec curl (Q1)
curl 'http://localhost:8080/fromRoman/XXVII' #Good
curl 'http://localhost:8080/fromRoman/abce' #Bad
curl 'http://localhost:8080/toRoman/345' #Good
curl 'http://localhost:8080/toRoman/32000' #Bad

# Pour tester l'API avec curl (Q2)
curl 'http://localhost:8080/archive/http%3A%2F%2Fnytimes.com' #Good
curl 'http://localhost:8080/archive/http%3A%2F%2Fnytimes..com' #Bad
curl 'http://localhost:8080/view/1645132720/http%3A%2F%2Fnytimes.com' #Good
curl 'http://localhost:8080/view/0000000000/http%3A%2F%2Fnytimes.com' #Bad
curl 'http://localhost:8080/view/1645132720/http%3A%2F%2Fnytimes..com' #Bad
```