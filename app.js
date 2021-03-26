const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const router = require('./routes');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


// FAIRE DES WORKERS THREADS POUR LACCES A LA BASE DE DONNEES
// UK SE PASSE QUOI SI LA BDD EST PAS ACCESSIBLE 
//Récuperation de toutes les tâches
/*
	IMPLEMENTER UNE AVEC LOWDB ET AVEC UNE AUTRE BASE DE DONN2ES ET DEFINIR UNE VARIABLE DENVIRONNEMENT
	POUR LE FONCTIONNEMENT EN PROD OU EN DEV
	PROCESS.ENV
	METTRE LES VARIABLES DANS UN FICHIER .ENV AVEC LA LIBRAIRIE DOTENV
	RECUPERATION DES TACHES PAR MOT CLEF, (LES REGEX PRENNENT DU TEMPS DUCOUP IL FAUDRAIT FAIRE UN WORKER DEDIE A ça)
	LES TAGS SONT DISSOCIES
*/

app.use('/', router);
/*app.use("/task", routerTasks);
app.use("/tag", routerTags);
*/
app.listen(port, () => {
  console.log(`API launch on http://localhost:${port}`)
});

