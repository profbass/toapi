# tylerolmsted.co api

REST API for tylerolmsted.co 

## Installation

This projct is setup using Express and PostgreSQL. The instalation instruction will go over setting up your local PostgreSQL database and dev enviroment.

### Install Dependencies

1. Clone the repository.
2. Install the dependencies using 
```sh
npm install
```

### PostgreSQL Setup
1. Open your terminal.
2. First, you need to install Homebrew if it's not already installed. You can do this by running the following command: 
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

3. Once Homebrew is installed, you can install PostgreSQL by running: 
```sh
brew install postgresql
```

4. After the installation is complete, you can start the PostgreSQL service by running: 
```sh
brew services start postgresql
```

5. You can check if PostgreSQL is running by executing: 
```sh
brew services list
```

### Create Database and User
1. You can access the PostgreSQL prompt with the following command: 
```sh
psql postgres
```
2. One you are logged in to pgsql create the datbase by running: 
```sql
CREATE DATABASE my-database;`
```
3. Next, create a DB user by running: 
```sql
CREATE USER your-username WITH PASSWORD 'your-password';
```

### Enviroment Configurations

Once your user is created, go into the root of your project and create a `.env` file with the following evn vars:
```js
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your-database
DB_USER=your-username
DB_PASSWORD=your-password
DB_SSL=false
```
### Create and Seed Tables

1. Create the database tables
```sh
npm run setup-db
```

2. If you so choose, you can seed the tables with test data
```sh
npm run seed-db
```

## Local Development
1. Start the server using 
```sh
npm start
```
2. Open your browser and navigate to `http://localhost:5000`.

## API Documentation

All documentation can be found in the `/docs` folder at the root of the project


## License

This project is not licensed and is provided as-is without any warranty. Feel free to use the code for personal or educational purposes, but please note that there is no licensing agreement in place.

## Contact

Questions or desire to contact can reach me at me@tylerolmsted.co
