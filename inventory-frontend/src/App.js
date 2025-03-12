import React, { useState, useEffect } from "react";
import { getProducts, addProduct, placeOrder, getStockAlerts } from "./api";
import "./App.css";  // Import the CSS file

const App = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [stockAlerts, setStockAlerts] = useState([]);

    useEffect(() => {
        fetchProducts();
        fetchStockAlerts();
    }, []);

    const fetchProducts = async () => {
        const res = await getProducts();
        setProducts(res.data);
    };

    const fetchStockAlerts = async () => {
        const res = await getStockAlerts();
        setStockAlerts(res.data);
    };

    const handleAddProduct = async () => {
        await addProduct({ name, stock, price });
        fetchProducts();
    };

    const handlePlaceOrder = async () => {
        await placeOrder({ product_id: productId, quantity });
        fetchProducts();
        fetchStockAlerts();
    };

    return (
        <div className="container">
            <h2>Inventory Management</h2>

            <h3>Add Product</h3>
            <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <button onClick={handleAddProduct}>Add Product</button>

            <h3>Place Order</h3>
            <select onChange={(e) => setProductId(e.target.value)}>
                <option>Select Product</option>
                {products.map(p => <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>)}
            </select>
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button onClick={handlePlaceOrder}>Place Order</button>

            <h3>Stock Alerts</h3>
            {stockAlerts.length === 0 ? (
                <p>No low stock products</p>
            ) : (
                <ul>
                    {stockAlerts.map(p => <li key={p.id} className="stock-alert">{p.name} (Stock: {p.stock})</li>)}
                </ul>
            )}

            <h3>Inventory</h3>
            <ul>
                {products.map(p => <li key={p.id}>{p.name} - Stock: {p.stock} - ₹{p.price}</li>)}
            </ul>
        </div>
    );
};

export default App;
