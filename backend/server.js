const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database("./inventory.db", (err) => {
    if (err) {
        console.error("Error connecting to SQLite:", err.message);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create tables if they don't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        stock INTEGER NOT NULL,
        price REAL NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER NOT NULL,
        total_price REAL,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(id)
    )`);
});

// Add a new product
app.post("/products", (req, res) => {
    const { name, stock, price } = req.body;
    const query = "INSERT INTO products (name, stock, price) VALUES (?, ?, ?)";
    db.run(query, [name, stock, price], function (err) {
        if (err) return res.status(500).json(err);
        res.json({ message: "Product added successfully!", id: this.lastID });
    });
});

// Fetch all products
app.get("/products", (req, res) => {
    db.all("SELECT * FROM products", (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

// Place an order
app.post("/orders", (req, res) => {
    const { product_id, quantity } = req.body;

    db.get("SELECT stock, price FROM products WHERE id = ?", [product_id], (err, product) => {
        if (err) return res.status(500).json(err);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock!" });
        }

        const total_price = quantity * product.price;

        db.run("INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)", 
            [product_id, quantity, total_price], 
            function (err) {
                if (err) return res.status(500).json(err);

                db.run("UPDATE products SET stock = stock - ? WHERE id = ?", 
                    [quantity, product_id], 
                    (err) => {
                        if (err) return res.status(500).json(err);
                        res.json({ message: "Order placed successfully!", order_id: this.lastID });
                });
        });
    });
});

// Check stock alert
app.get("/stock-alerts", (req, res) => {
    db.all("SELECT * FROM products WHERE stock < 5", (err, rows) => {
        if (err) return res.status(500).json(err);
        res.json(rows);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
