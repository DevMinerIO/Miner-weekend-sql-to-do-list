const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to-do-list"ORDER BY "importance" ASC;';
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error getting tasks in GET / Router', error);
        res.sendStatus(500); 
    });
})

router.post('/', (req, res) => {
    let newTask = req.body;
    console.log('adding new task in Router POST', newTask);
    let queryText = `INSERT INTO "to-do-list" ("task", "importance")
        VALUES ($1, $2);`;
        pool.query(queryText, [newTask.task, newTask.importance])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`Error adding new book`, error);
        res.sendStatus(500);
    });
})













// router export at the bottom
module.exports = router;