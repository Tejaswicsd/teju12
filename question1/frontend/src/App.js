

import React,{ useState } from 'react';


function App() {
 const[products, setProducts] = useState([]);
const[loading, setLoading] = useState(false);
const[error, setError] = useState('');
const[formData, setFormData] = useState({ name: '', price: '' });
const [searchQuery, setSearchQuery] = useState('');
const[searchResults, setSearchResults] = useState([]);
const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/products');
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(`http://localhost:3000/products/search?q=${searchQuery}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;
    try {
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const newProduct = await response.json();
      setProducts([...products, newProduct]);
      setFormData({ name: '', price: '' });
    } catch (error) {
      setError(error.message);
    }
  };              
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
 
    
 const updateProduct = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const updatedProduct = await response.json();
      setProducts(products.map(product => (product.id === id ? updatedProduct : product)));
    } catch (error) {
      setError(error.message);
    }
  };                
  return(
    <div className="App">
      <h1>Product Management</h1>
      <button onClick={fetchProducts}>Fetch Products</button>
      <input
        type="text"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {(searchResults.length > 0 ? searchResults : products).map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <button onClick={() => updateProduct(product.id, { name: product.name, price: product.price })}>Update</button>
          </li>
        ))}
      </ul>
      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>                                

  )
   
}
  
 
export default App;
