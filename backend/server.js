const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Dhruv@2981",
    database: "inventory_db"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// Add a new product
app.post("/products", (req, res) => {
    const { name, stock, price } = req.body;
    db.query("INSERT INTO products (name, stock, price) VALUES (?, ?, ?)", 
        [name, stock, price], 
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Product added successfully!" });
    });
});

// Fetch all products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Place an order
app.post("/orders", (req, res) => {
    const { product_id, quantity } = req.body;
    
    db.query("SELECT stock, price FROM products WHERE id = ?", [product_id], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "Product not found" });

        const stock = results[0].stock;
        const price = results[0].price;

        if (stock < quantity) {
            return res.status(400).json({ message: "Insufficient stock!" });
        }

        const total_price = quantity * price;

        db.query("INSERT INTO orders (product_id, quantity, total_price) VALUES (?, ?, ?)", 
            [product_id, quantity, total_price], 
            (err, orderResult) => {
                if (err) return res.status(500).json(err);

                db.query("UPDATE products SET stock = stock - ? WHERE id = ?", 
                    [quantity, product_id], 
                    (err, updateResult) => {
                        if (err) return res.status(500).json(err);
                        res.json({ message: "Order placed successfully!" });
                });
        });
    });
});

// Check stock alert
app.get("/stock-alerts", (req, res) => {
    db.query("SELECT * FROM products WHERE stock < 5", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
