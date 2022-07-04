// boilerplate imports that are needed on all projects
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// get request orders by importance. 
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
// post request adds new task. Data is sanitized to keep info from the user on line 21-22
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
// put is used to mark the task as complete or incomplete. Switching the vaule of "isComplete"
router.put('/:id', (req, res) => {
    let taskId = Number(req.params.id);
    let complete = req.body.status;
    // if the comparison is true, then boolean true is saved. if false than false is saved
    let compareComplete = complete === 'true';
    console.log('value of compareComplete',compareComplete);
    console.log('check to see if id is saved in router', taskId);
    let queryText;
    // false check to change the "isComplete" value to true
    if(compareComplete === false) {
        queryText = 'UPDATE "to-do-list" SET "isComplete" = true WHERE "id" = $1;';
    // false check to change the "isComplete" value to false
    }else if (compareComplete === true) {
        queryText = 'UPDATE "to-do-list" SET "isComplete" = false WHERE "id" = $1;';
    }
    else {
        res.sendStatus(500);
        console.log('Router put did not work properly.');
    // remember to break out of request if there is an error. so the pool query doesn't run. 
        return;
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

// deletes by id on line 68 WHERE id is matching
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log(`DELETE request sent for id, ${reqId}`);
    let queryText = `DELETE FROM "to-do-list" WHERE id = $1;`;
    pool.query(queryText, [reqId])
    .then(() => {
        console.log('Task deleted!');
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log(`Error deleting with query ${queryText}: ${error}`);
        res.sendStatus(500); // good server always responds
    })
})

// router export at the bottom
module.exports = router;