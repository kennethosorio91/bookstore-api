# Online Bookstore API

Online Bookstore API to perform the following:
GET a list of books
POST a new book entry
PUT to update book details
DELETE a book from the list

The API is available at 'https://bookstore-api-cs23.onrender.com/'

## Endpoints ##

### Get all books ###

GET `/api/books`

Fetches the book list of the API.

### Get a single book ###

GET `/api/books/:bookId`

Retrieve detailed information about a book.


### Update a Book ###

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


### Update an order ###

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

### Delete an order ###

DELETE `/api/books/:bookID`

Delete an existing book. 
```
DELETE /api/book/2

{
    "message": "Book deleted successfully",
    "bookId": 2
}
```

