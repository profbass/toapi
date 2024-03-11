const fs = require('fs').promises;
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'tyler',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'tylerolmsted',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, '/certs/rds-combined-ca-bundle.pem')).toString(),
  },
});

const runSqlFile = async (filePath) => {
  const absolutePath = path.join(__dirname, filePath);
  
  try {
    const sql = await fs.readFile(absolutePath, { encoding: 'UTF-8' });
    const statements = sql.split(';').map(statement => statement.trim()).filter(Boolean);

    for (const statement of statements) {
      try {
        await pool.query(statement);
      } catch (err) {
        console.error('Error executing the SQL:', err);
        throw err;  // Add this line
      }
    }

    console.log('Seed script executed successfully:', filePath);
  } catch (err) {
    console.error('Error reading the SQL file:', err);
    throw err;  // Add this line
  }
};

const runSeedScripts = async () => {
  await runSqlFile('../sql_scripts/seed-people.sql');
  await runSqlFile('../sql_scripts/seed-jobs.sql');
  await runSqlFile('../sql_scripts/seed-social-links.sql');
};

runSeedScripts();