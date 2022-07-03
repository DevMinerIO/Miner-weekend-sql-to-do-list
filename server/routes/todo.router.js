const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "to-do-list" ORDER BY "importance" DESC;';
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

router.put('/:id', (req, res) => {
    let taskId = Number(req.params.id);
    let complete = req.body.status;
    // if the comparison is true, then boolean true is saved. if false than false is saved
    let compareComplete = complete === 'true';
    console.log('value of compareComplete',compareComplete);
    console.log('check to see if id is saved in router', taskId);
    let queryText;
    if(compareComplete === false) {
        queryText = 'UPDATE "to-do-list" SET "isComplete" = true WHERE "id" = $1;';
    }else if (compareComplete === true) {
        queryText = 'UPDATE "to-do-list" SET "isComplete" = false WHERE "id" = $1;';
    }
    else {
        res.sendStatus(500);
        console.log('Router put did not work properly.');
    // remember to break out of request if 
    }
    pool.query(queryText, [taskId])
    .then((dbResponse) => {
    res.send(dbResponse.rows);
    })
    .catch((error) => {
    console.log(`ERROR UPDATing with query ${queryText} ${error}`);
    res.sendStatus(500);
    })
})











// router export at the bottom
module.exports = router;