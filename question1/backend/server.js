const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
 let products = [
    { id: 1, name: 'Product 1', price: 100 },
     { id: 2, name: 'Product 2', price: 200 },
      { id: 3, name: 'Product 3', price: 300 }

 ];
app.get('/products', (req, res) => {
    res.json(products);
}
);
app.post('/products', (req, res) => {
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct);
    res.status(201).json(newProduct);
});
app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.json(products[index]);
    } else {
        res.status(404).send('Product not found');
    }
}
);
app.updatedProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedProduct = req.body;
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        res.json(products[index]);
    } else {
        res.status(404).send('Product not found');
    }
};

app.delete('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    products = products.filter(p => p.id !== id);
    res.status(204).send();
});
app.get('/products/search', (req, res) => {
    const query = req.query.q;
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
    res.json(filteredProducts);
}
);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
module.exports = app; // Export the app for testing purposes

