const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

let books = [
  { id: 1, name: "The 48 Laws of Power", author: "Robert Greene", type: "Self-help Book", addedBy: "Felicity B. Rabago" },
  { id: 2, name: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", type: "Non-Fiction", addedBy: "Felicity B. Rabago" },
  { id: 3, name: "I Want to Die but I Want to Eat Tteokbokki", author: "Baek Sehee", type: "Non-Fiction", addedBy: "Felicity B. Rabago" },
  { id: 4, name: "I Know Why the Caged Bird Sings", author: "Maya Angelou", type: "Non-Fiction", addedBy: "Felicity B. Rabago" },
  { id: 5, name: "Nuclear War: A Scenario", author: "Annie Jacobsen", type: "Non-Fiction", addedBy: "Felicity B. Rabago" },
  { id: 6, name: "The Alchemist", author: "Paulo Coelho", type: "Non-Fiction", addedBy: "Kenneth P. Osorio" },
  { id: 7, name: "Meditations", author: "Marcus Aurelius", type: "Philosophy", addedBy: "Kenneth P. Osorio" },
  { id: 8, name: "Crime and Punishment", author: "Fyodor Dostoevsky", type: "Fiction", addedBy: "Kenneth P. Osorio" },
  { id: 9, name: "The Stranger", author: "Albert Camus", type: "Fiction", addedBy: "Kenneth P. Osorio" },
  { id: 10, name: "White Nights", author: "Fyodor Dostoevsky", type: "Fiction", addedBy: "Kenneth P. Osorio" },
  { id: 11, name: "Before the Coffee Gets Cold", author: "Toshikazu Kawaguchi", type: "Novel", addedBy: "Chelsy Kai Paralejas" },
  { id: 12, name: "Sweet Bean Paste", author: "Tetsuya Akikawa", type: "Literary Fiction", addedBy: "Chelsy Kai Paralejas" },
  { id: 13, name: "The Kamogawa Food Detectives", author: "Hisashi Kashiwai", type: "Urban Fiction", addedBy: "Chelsy Kai Paralejas" },
  { id: 14, name: "Ego is the Enemy", author: "Ryan Holiday", type: "Self-help Book", addedBy: "Chelsy Kai Paralejas" },
  { id: 15, name: "Deep Work", author: "Cal Newport", type: "Self-help Book", addedBy: "Chelsy Kai Paralejas" }
];

let clients = [];

// Generate a new access token
function generateToken() {
  return crypto.randomBytes(16).toString('hex');
}

// Register a new API client
app.post('/api-clients', (req, res) => {
  const { clientName, clientEmail } = req.body;
  const existingClient = clients.find(client => client.clientEmail === clientEmail);
  if (existingClient) {
    return res.status(409).json({ message: "API client already registered." });
  }
  const token = generateToken();
  clients.push({ clientName, clientEmail, token });
  res.json({ token });
});

// Authentication middleware
function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  const client = clients.find(client => client.token === token);
  if (client) {
    req.client = client;
    next();
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

// GET - Retrieve a list of books
app.get('/api/books', authenticate, (req, res) => {
  res.json({ books });
});

// POST - Add a new book
app.post('/api/books', authenticate, (req, res) => {
  const { name, author, type } = req.body;
  const newBook = {
    id: books.length + 1,
    name,
    author,
    type,
    addedBy: req.client.clientName
  };
  books.push(newBook);
  res.json({ message: "Book added successfully", book: newBook });
});

// PUT - Update book details
app.put('/api/books/:id', authenticate, (req, res) => {
  const bookId = parseInt(req.params.id);
  const { name, author, type } = req.body;
  const book = books.find(b => b.id === bookId);
  if (book) {
    book.name = name;
    book.author = author;
    book.type = type;
    book.addedBy = req.client.clientName;
    res.json({ message: "Book updated successfully", book });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// DELETE - Remove a book
app.delete('/api/books/:id', authenticate, (req, res) => {
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
