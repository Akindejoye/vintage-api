import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

//Database setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test',
});


app.use(express.json());
app.use(cors({
  origin: '*'
}));



//Backend index page
app.get('/', (req, res) => {
  res.json('Welcome to the Backend...')
});

//Fetching books from the database
app.get('/books', (req, res) => {
  const q = "SELECT * FROM books"
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data);
  })
});

//Post or create a book to the database
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully");
  })
})

//Delete A Book
app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return  res.json(err);
    return res.json("Book has been deleted successfully.");
  });
});

//Update a Book
app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title` = ?, `desc`= ?, `price` = ?, `cover` = ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ]

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return  res.json(err);
    return res.json("Book has been updated successfully.");
  });
});

app.listen(8800, () => {
  console.log("Connected to backend...");
});