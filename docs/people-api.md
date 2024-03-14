# People API

## GET /people

Returns a list of all people in the database.

### Response

An array of people, each with the following fields:

- `id`: The person's ID
- `first_name`: The person's first name
- `last_name`: The person's last name
- `age`: The person's age
- `email`: The person's email
- `bio`: The person's bio

## GET /people/:id

Returns a single person by their ID.

### Parameters

- `id`: The ID of the person

### Response

A person object with the following fields:

- `id`: The person's ID
- `first_name`: The person's first name
- `last_name`: The person's last name
- `age`: The person's age
- `email`: The person's email
- `bio`: The person's bio
- `jobs`: An array of the person's jobs
- `social_links`: An array of the person's social links

## POST /people

Creates a new person.

### Request Body

- `first_name`: The person's first name
- `last_name`: The person's last name
- `age`: The person's age
- `email`: The person's email
- `bio`: The person's bio

### Response

The created person object.

## PUT /people/:id

Updates a person by their ID.

### Parameters

- `id`: The ID of the person

### Request Body

- `first_name`: The person's first name
- `last_name`: The person's last name
- `age`: The person's age
- `email`: The person's email
- `bio`: The person's bio

### Response

The updated person object.

## DELETE /people/:id

Deletes a person by their ID.

### Parameters

- `id`: The ID of the person

### Response

A message indicating the person was deleted.