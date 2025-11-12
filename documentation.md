# **Documentation Technique – Student Course API**

## Présentation du projet

**Student-Course-API** est une application **Node.js / Express** permettant de gérer des **étudiants**, des **cours**, et les **inscriptions** entre eux.
Ce projet est une API sans base de données, toutes les données sont stockées en mémoire via un module interne `storage.js`.

L’objectif du projet :

* Manipuler les bases d’**Express.js** et du **RESTful design**
* Gérer des **tests unitaires et d’intégration** avec **Jest + Supertest**
* Maintenir une **qualité de code** avec **ESLint**, **Prettier** et **Codacy**
* Mettre en place une **intégration continue** avec GitHub Actions
* Documenter les endpoints via **Swagger**

## **Stack technique**

 -Node.js  
 -Express.js  
 -Jest  
 -Supertest  
 -Swagger  
 -ESLint / Prettier  
 -Codacy  
 -GitHub Actions  

## **Structure du projet**

```
student-course-api/
│
├── src/
│   ├── app.js                    # Point d’entrée de l’application Express
│   ├── controllers/
│   │   ├── studentsController.js # Logique pour les étudiants
│   │   └── coursesController.js  # Logique pour les cours
│   ├── routes/
│   │   ├── students.js           # Routes pour /students
│   │   └── courses.js            # Routes pour /courses
│   ├── services/
│   │   └── storage.js            # "Base de données" en mémoire
│   ├── swagger.json              # Swagger
│   └── swaggerDef.js             # Configuration Swagger
│
├── tests/
│   ├── integration/              # Tests d’intégration (via Supertest)
│   │   ├── app.test.js
│   │   ├── studentsController.test.js
│   │   └── coursesController.test.js
│   └── unit/
│       └── storage.test.js       # Tests unitaires du module de stockage
│
├── .github/
│   ├── workflows/
│   │   └── ci.yml            # CI GitHub + Codacy
│   └── pull_request_template.md  # Template PR
│
├── .eslintrc.json                # Configuration ESLint
├── .prettierrc                   # Configuration Prettier
├── package.json
└── DOCUMENTATION_TECHNIQUE.md    # Documentation technique
```

## **Architecture logique**

L’API est organisée selon une architecture **MVC simplifiée** :

* **Controllers** : contiennent la logique métier.
* **Routes** : mappent les endpoints aux fonctions des controllers.
* **Services** : contiennent la logique de persistance (ici, stockage mémoire).

## **Fonctionnalités principales**

### Étudiants

* **Lister les étudiants** : `GET /students`
* **Récupérer un étudiant** : `GET /students/:id`
* **Créer un étudiant** : `POST /students`
* **Mettre à jour un étudiant** : `PUT /students/:id`
* **Supprimer un étudiant** : `DELETE /students/:id`

### Cours

* **Lister les cours** : `GET /courses`
* **Récupérer un cours** : `GET /courses/:id`
* **Créer un cours** : `POST /courses`
* **Mettre à jour un cours** : `PUT /courses/:id`
* **Supprimer un cours** : `DELETE /courses/:id`

### Inscriptions

* **Inscrire un étudiant à un cours** : `POST /courses/:courseId/students/:studentId`
* **Désinscrire un étudiant d’un cours** : `DELETE /courses/:courseId/students/:studentId`

## **Documentation Swagger**

L’API est documentée à l’aide de **Swagger UI**.
Elle est accessible à l’adresse :
[`http://localhost:3001/api-docs`](http://localhost:3001/api-docs)

Les définitions Swagger sont basées sur les **annotations JSDoc** présentes dans :

* `src/controllers/studentsController.js`
* `src/controllers/coursesController.js`

### Exemple d’un schéma Swagger  

```yaml
Course:
  type: object
  properties:
    id:
      type: integer
      example: 1
    title:
      type: string
      example: Math
    teacher:
      type: string
      example: Mr. Smith
```

---

## **Tests**

Les tests sont gérés avec **Jest** et **Supertest**.

### 🔹 Tests unitaires

Situés dans `tests/unit/storage.test.js`, ils vérifient :

* La création d’un étudiant / cours
* La gestion des doublons (emails, titres)
* L’inscription d’étudiants à un cours

### 🔹 Tests d’intégration

Situés dans `tests/integration/`, ils testent :

* Les endpoints `/students` et `/courses`
* Les statuts HTTP attendus (200, 201, 400, 404)
* Les comportements réels de l’API

### Exécution des tests  

```bash
npm run test
```

### Rapport de couverture  

```bash
npm run test -- --coverage
```

## **Qualité du code**

### 🔹 ESLint & Prettier

Vérifient la qualité et le style du code :

```bash
npm run lint
npm run lint -- --fix
```

### 🔹 Codacy

* Analyse statique automatisée à chaque *push*
* Mesure de la complexité, duplication, et couverture de test

Exemple :

```markdown
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/5d2106e7cc954869a32cfc65ab1ecdc8)](https://app.codacy.com/gh/mgokryy/student-course-api/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
```

## **CI/CD – GitHub Actions**

Fichier : `.github/workflows/ci.yml`

Chaque *push* ou *pull request* :

* Exécute les tests Jest
* Lance le linting ESLint
* Envoie le rapport de couverture à Codacy

Principales méthodes :

* `list(collection)`
* `get(collection, id)`
* `create(collection, payload)`
* `remove(collection, id)`
* `enroll(studentId, courseId)`
* `unenroll(studentId, courseId)`
* `seed()` → Initialise les données de base

## **Démarrage du projet**  

### Installation  

```bash
npm install
```

### Lancement du serveur  

```bash
npm start
```

### Serveur par défaut  

```
http://localhost:3001
```

## **Auteur**

**Nom :** OKRY Marie-Grâce  
**Projet :** Student-Course-API  
**Année :** 2025