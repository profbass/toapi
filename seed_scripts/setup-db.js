const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'tyler',
  host: 'localhost',
  database: 'tylerolmsted',
  password: 'Angelica423!',
  port: 5432,
});

const runSqlFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const absolutePath = path.join(__dirname, filePath);

    fs.readFile(absolutePath, { encoding: 'UTF-8' }, (err, sql) => {
      if (err) {
        console.error('Error reading the SQL file:', err);
        reject(err);
        return;
      }

      const tableName = path.basename(filePath, '.sql');
      const checkTableQuery = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = '${tableName}')`;

      pool.query(checkTableQuery, (err, res) => {
        if (err) {
          console.error('Error checking if table exists:', err);
          reject(err);
          return;
        }

        const tableExists = res.rows[0].exists;

        if (tableExists) {
          console.log('Table already exists:', tableName);
          resolve();
          return;
        }

        pool.query(sql, (err, res) => {
          if (err) {
            console.error('Error executing the SQL:', err);
            reject(err);
          } else {
            console.log('SQL script executed successfully:', filePath);
            resolve();
          }
        });
      });
    });
  });
};

const runSeedScripts = async () => {
  await runSqlFile('../sql_scripts/create-people-table.sql');
  await runSqlFile('../sql_scripts/create-jobs-table.sql');
  await runSqlFile('../sql_scripts/create-social-links-table.sql');
};

runSeedScripts();
