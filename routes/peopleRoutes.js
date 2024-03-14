const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all people
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM people ORDER BY id ASC');
    const totalItems = result.rows.length;
    res.set('Content-Range', `people 0-${totalItems}/${totalItems}`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a person by id (using a route parameter)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('SELECT * FROM people WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    const person = result.rows[0];
    const jobsResult = await db.query('SELECT * FROM jobs WHERE people_id = $1', [id]);
    const socialLinksResult = await db.query('SELECT * FROM social_links WHERE people_id = $1', [id]);
    person.jobs = jobsResult.rows;
    person.social_links = socialLinksResult.rows;
    res.json(person);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new person
router.post('/', async (req, res) => {
  const { first_name, last_name, age, email, bio } = req.body;
  const created_at = new Date();
  const updated_at = new Date();
  try {
    const result = await db.query(
      'INSERT INTO people (first_name, last_name, age, email, bio, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [first_name, last_name, age, email, bio, created_at, updated_at]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT (update) a person by id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age, email, bio } = req.body;
  const updateFields = [];
  const updateValues = [];

  if (first_name) {
    updateFields.push('first_name');
    updateValues.push(first_name);
  }
  if (last_name) {
    updateFields.push('last_name');
    updateValues.push(last_name);
  }
  if (age) {
    updateFields.push('age');
    updateValues.push(age);
  }
  if (email) {
    updateFields.push('email');
    updateValues.push(email);
  }
  if (bio) {
    updateFields.push('bio');
    updateValues.push(bio);
  }

  try {
    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    const updateQuery = `UPDATE people SET ${updateFields.map((field, index) => `${field} = $${index + 1}`).join(', ')} WHERE id = $${updateFields.length + 1} RETURNING *`;
    const result = await db.query(
      updateQuery,
      [...updateValues, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a person by id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM people WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
