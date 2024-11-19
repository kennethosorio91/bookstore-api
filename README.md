# Online Bookstore API

Online Bookstore API to perform the following:
GET a list of books
POST a new book entry
PUT to update book details
DELETE a book from the list

The API is available at https://bookstore-api-cs23.onrender.com/

## Endpoints ##

### Get all books ###

GET `/api/books`

Fetches the book list of the API.

### Get a single book ###

GET `/api/books/:bookId`

Retrieve detailed information about a book.


### Insert a New Book ###

POST `/api/books`

Allows you to submit a new book.

The request body needs to be in JSON format and include the following properties:

Example
```
POST /api/books

{
  "name": "Meditations",
  "author": "Marcus Aurelius",
  "type": "Non-Fiction"
}

Response
{
    "message": "Book added successfully",
    "book": {
        "id": 2,
        "name": "Meditations",
        "author": "Marcus Aurelius",
        "type": "Non-Fiction"
    }
}
```


### Update a Book ###

PATCH `/api/books/:bookID`

Update an existing book. 

 Example
```
PUT /api/books/2

{
  "name": "Atomic Habits",
  "author": "James Clear",
  "type": "Non-Fiction"
}

Updates Book #2 entry with the following new information.

Result
{
    "message": "Book updated successfully",
    "book": {
        "id": 2,
        "name": "Atomic Habits",
        "author": "James Clear",
        "type": "Non-Fiction"
    }
}
```

### Delete a Book ###

DELETE `/api/books/:bookID`

Delete an existing book. 
```
DELETE /api/book/2

{
    "message": "Book deleted successfully",
    "bookId": 2
}
```
### Generate an Authorization Token ###

POST `/api-clients`

Generate a token to access the API
```
Insert the clientName and clientEmail in JSON format in the request body.

{
    "clientName": "Kenneth P. Osorio",
    "clientEmail": "osoriokenneth91@gmail.com"
}

{
    "token": "bb585d8f42a79ccb701c4392bebaa36c"
}
```

