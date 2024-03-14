const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Get all jobs
router.get('/', (req, res) => {

    db.query('SELECT * FROM jobs', (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving jobs');
        } else {
            res.setHeader('Content-Range', result.rows.length);
            res.json(result.rows);
        }
    });
});

// Get a single job by ID
router.get('/:id', (req, res) => {
    const jobId = req.params.id;
    db.query('SELECT * FROM jobs WHERE id = $1', [jobId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving job');
        } else if (result.rows.length === 0) {
            res.status(404).send('Job not found');
        } else {
            res.json(result.rows[0]);
        }
    });
});

// Get jobs by person ID
router.get('/person/:id', (req, res) => {
    const personId = req.params.id;
    db.query('SELECT * FROM jobs WHERE people_id = $1', [personId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error retrieving jobs');
        } else {
            res.json(result.rows);
        }
    });
});

// Create a new job
router.post('/', (req, res) => {
    const { company, title, salary, description, start_date, end_date, logo, people_id } = req.body;
    db.query(
        'INSERT INTO jobs (company, title, salary, description, start_date, end_date, logo, people_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [company, title, salary, description, start_date, end_date, logo, people_id],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error creating job');
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});

// Update a job by ID
router.put('/:id', (req, res) => {
    const jobId = req.params.id;
    const { company, title, salary, description, start_date, end_date, logo, people_id } = req.body;
    const updateFields = [];
    const updateValues = [];

    if (company !== undefined) {
        updateFields.push('company');
        updateValues.push(company);
    }
    if (title !== undefined) {
        updateFields.push('title');
        updateValues.push(title);
    }
    if (salary !== undefined) {
        updateFields.push('salary');
        updateValues.push(salary);
    }
    if (description !== undefined) {
        updateFields.push('description');
        updateValues.push(description);
    }
    if (start_date !== undefined) {
        updateFields.push('start_date');
        updateValues.push(start_date);
    }
    if (end_date !== undefined) {
        updateFields.push('end_date');
        updateValues.push(end_date);
    }
    if (logo !== undefined) {
        updateFields.push('logo');
        updateValues.push(logo);
    }
    if (people_id !== undefined) {
        updateFields.push('people_id');
        updateValues.push(people_id);
    }

    if (updateFields.length === 0) {
        return res.status(400).json({ error: 'No fields to update' });
    }

    const updateQuery = `UPDATE jobs SET ${updateFields.map((field, index) => `${field} = $${index + 1}`).join(', ')} WHERE id = $${updateFields.length + 1} RETURNING *`;
    db.query(
        updateQuery,
        [...updateValues, jobId],
        (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error updating job');
            } else if (result.rows.length === 0) {
                res.status(404).send('Job not found');
            } else {
                res.json(result.rows[0]);
            }
        }
    );
});

// Delete a job by ID
router.delete('/:id', (req, res) => {
    const jobId = req.params.id;
    db.query('DELETE FROM jobs WHERE id = $1', [jobId], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting job');
        } else if (result.rowCount === 0) {
            res.status(404).send('Job not found');
        } else {
            res.sendStatus(204);
        }
    });
});

module.exports = router;