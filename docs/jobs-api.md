# Jobs API

## Introduction
The Jobs API allows you to perform CRUD operations on job resources.

## Base URL
The base URL for all API endpoints is: `{{URL}}/jobs`

## Endpoints

### Create a Job
- Method: `POST`
- Endpoint: `/jobs`
- Description: Creates a new job resource.
- Request Body:
    ```json
    {
        "company": "Acme Inc.",
        "title": "Software Engineer",
        "salary": 100000.00,
        "description": "We are looking for a skilled software engineer...",
        "start_date": "2022-01-01",
        "end_date": "2022-12-31",
        "logo": "https://example.com/logo.png",
        "people_id": 123
    }
    ```
- Response:
    - Status Code: `201 Created`
    - Body:
        ```json
        {
            "id": 123,
            "company": "Acme Inc.",
            "title": "Software Engineer",
            "salary": 100000.00,
            "description": "We are looking for a skilled software engineer...",
            "start_date": "2022-01-01",
            "end_date": "2022-12-31",
            "logo": "https://example.com/logo.png",
            "people_id": 123,
            "created_at": "2022-01-01T00:00:00Z",
            "updated_at": "2022-01-01T00:00:00Z"
        }
        ```

### Get a Job
- Method: `GET`
- Endpoint: `/jobs/{id}`
- Description: Retrieves a specific job resource by its ID.
- Response:
    - Status Code: `200 OK`
    - Body:
        ```json
        {
            "id": 123,
            "company": "Acme Inc.",
            "title": "Software Engineer",
            "salary": 100000.00,
            "description": "We are looking for a skilled software engineer...",
            "start_date": "2022-01-01",
            "end_date": "2022-12-31",
            "logo": "https://example.com/logo.png",
            "people_id": 123,
            "created_at": "2022-01-01T00:00:00Z",
            "updated_at": "2022-01-01T00:00:00Z"
        }
        ```

### Get Jobs by Person


### Update a Job
- Method: `PUT`
- Endpoint: `/jobs/{id}`
- Description: Updates an existing job resource.
- Request Body:
    ```json
    {
        "company": "Acme Inc.",
        "title": "Senior Software Engineer",
        "salary": 120000.00,
        "description": "We are looking for an experienced software engineer...",
        "start_date": "2022-01-01",
        "end_date": "2022-12-31",
        "logo": "https://example.com/logo.png",
        "people_id": 123
    }
    ```
- Response:
    - Status Code: `200 OK`
    - Body:
        ```json
        {
            "id": 123,
            "company": "Acme Inc.",
            "title": "Senior Software Engineer",
            "salary": 120000.00,
            "description": "We are looking for an experienced software engineer...",
            "start_date": "2022-01-01",
            "end_date": "2022-12-31",
            "logo": "https://example.com/logo.png",
            "people_id": 123,
            "created_at": "2022-01-01T00:00:00Z",
            "updated_at": "2022-01-01T00:00:00Z"
        }
        ```

### Delete a Job
- Method: `DELETE`
- Endpoint: `/jobs/{id}`
- Description: Deletes a specific job resource by its ID.
- Response:
    - Status Code: `204 No Content`