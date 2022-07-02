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













// router export at the bottom
module.exports = router;