const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, name: "The Great Gatsby", author: "F. Scott Fitzgerald", type: "Fiction"},
  { id: 2, name: "To Kill a Mockingbird", author: "Harper Lee", type: "Fiction"}
];

// GET - Retrieve a list of books
app.get('/api/books', (req, res) => {
  res.json({ books });
});

// POST - Add a new book
app.post('/api/books', (req, res) => {
  const { name, author, type} = req.body;
  const newBook = {
    id: books.length + 1,
    name,
    author,
    type,
    
  };
  books.push(newBook);
  res.json({ message: "Book added successfully", book: newBook });
});

// PUT - Update book details
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { name, author, type} = req.body;
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.name = name;
    book.author = author;
    book.type = type;
    res.json({ message: "Book updated successfully", book });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE - Remove a book
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    // Reassign IDs to ensure they remain sequential
    books = books.map((book, index) => ({ ...book, id: index + 1 }));
    res.json({ message: "Book deleted successfully", bookId });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
