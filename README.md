# DM Backend pour Arkania

J'ai utilisé Node.js pour l'API, les libs mocha et chai pour les tests.

Pour avoir le projet sur la machine locale et lancer les tests unitaires :

```bash
git clone https://github.com/notnian/arkania-backend
# Utiliser npm, pnpm ou yarn au choix comme gestionnaire de paquets
pnpm install
# Pour lancer les tests
pnpm run test
# Pour lancer un serveur sur le port 8080
pnpm run dev
# Pour tester l'API avec curl
curl 'http://localhost:8080/fromRoman/XXVII'
curl 'http://localhost:8080/fromRoman/abce'
curl 'http://localhost:8080/toRoman/345'
curl 'http://localhost:8080/fromRoman/32000'
```