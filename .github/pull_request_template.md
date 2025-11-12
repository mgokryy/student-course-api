# Pull Request – Student Course API

## Description

Décris brièvement les changements apportés dans cette Pull Request.

Exemples :  

- Ajout d’une nouvelle route `/courses/:courseId/students/:studentId`  
- Amélioration du contrôleur `studentsController`
- Mise à jour du Swagger (`swagger.json` / `swaggerDef.js`)
- Ajout ou correction de tests d’intégration (`app.test.js`)
- Amélioration du linting ou configuration ESLint / Prettier

## Contexte

Explique **pourquoi** ces changements ont été faits.  
Exemples :

- Mise à jour du comportement suite à un test échoué
- Ajout de documentation Swagger manquante
- Correction d’un bug sur l’inscription d’un étudiant à un cours
- Intégration de Codacy comme outil d’analyse statique

## Tests effectués

Décris comment tu as validé ton code avant de soumettre la pull request :

- [ ] Tests unitaires (`npm test`)
- [ ] Tests d’intégration (`app.test.js`, `studentsController.test.js`, `coursesController.test.js`)
- [ ] Vérification ESLint (`npm run lint`)
- [ ] Documentation Swagger testée sur `/api-docs`
- [ ] Analyse Codacy vérifiée (aucune erreur critique)
- [ ] Application testée avec Postman (routes CRUD vérifiées)

## Checklist avant validation

Merci de t’assurer que tous les points suivants sont respectés avant la revue :

- [ ] Le code respecte les règles ESLint et Prettier
- [ ] Les commits ont des messages clairs et significatifs
- [ ] Tous les tests Jest passent sans erreur
- [ ] Aucun `console.log` inutile
- [ ] Le Swagger est à jour et cohérent avec les routes
- [ ] Le coverage des tests est suffisant
- [ ] Aucune duplication de code détectée par Codacy
- [ ] La PR ne casse pas les fonctionnalités existantes

## Liens associés

Issue liée : # (si applicable)  
Autres PR associées :  
Documentation Swagger : `/api-docs`

## Notes supplémentaires

Ajoute ici toute information technique ou de contexte utile à la relecture.

Exemples :

- Modifications sur `storage.js`
- Nouveau test ajouté pour gérer les doublons d’email
- Ajustement du comportement des erreurs 404 / 400
- Nettoyage du code avant livraison finale
