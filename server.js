const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 10.99, genre: "Fiction", published: "1925-04-10" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", price: 7.99, genre: "Fiction", published: "1960-07-11" }
];

// GET - Retrieve a list of books
app.get('/api/books', (req, res) => {
  res.json({ books });
});

// POST - Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, price, genre, published } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    price,
    genre,
    published
  };
  books.push(newBook);
  res.json({ message: "Book added successfully", book: newBook });
});

// PUT - Update book details
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, price, genre, published } = req.body;
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.title = title;
    book.author = author;
    book.price = price;
    book.genre = genre;
    book.published = published;
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
    res.json({ message: "Book deleted successfully", bookId });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
