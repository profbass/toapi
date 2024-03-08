CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2),
    desctiption TEXT,
    start_date DATE,
    end_date DATE,
    logo VARCHAR(255),
    people_id INT REFERENCES people(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);