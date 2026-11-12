import React, { useMemo, useState } from 'react';
import RestaurantList from './components/RestaurantList';
import Menu from './components/Menu';
import Cart from './components/Cart';
const restaurants = [
  { id: 1, name: 'Pizza Palace', cuisine: 'Italian · Pizza', menu: [{ id: 1, name: 'Margherita Pizza', price: 249 }, { id: 2, name: 'Farmhouse Pizza', price: 329 }, { id: 3, name: 'Garlic Bread', price: 119 }] },
  { id: 2, name: 'Burger Barn', cuisine: 'Burgers · Fast food', menu: [{ id: 4, name: 'Classic Veg Burger', price: 149 }, { id: 5, name: 'Cheese Burger', price: 199 }, { id: 6, name: 'French Fries', price: 99 }] },
  { id: 3, name: 'Curry Corner', cuisine: 'Indian · Meals', menu: [{ id: 7, name: 'Paneer Butter Masala', price: 229 }, { id: 8, name: 'Veg Biryani', price: 189 }, { id: 9, name: 'Butter Naan', price: 45 }] }
];
export default function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [notice, setNotice] = useState('');
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const addToCart = (item) => { setCart((current) => { const existing = current.find((entry) => entry.id === item.id); return existing ? current.map((entry) => entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...current, { ...item, quantity: 1 }]; }); setNotice(`${item.name} added to cart.`); };
  const updateQuantity = (id, quantity) => setCart((current) => quantity <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, quantity } : item));
  const placeOrder = () => { if (!cart.length) return; setNotice(`Order placed successfully. Total: ₹${subtotal.toFixed(2)} (demo only).`); setCart([]); };
  return <main className="food-app"><header className="food-header"><p className="eyebrow">CS1510 · EXPERIMENT 6</p><h1>Food Delivery</h1><p>Find something delicious today.</p></header>
    {notice && <p className="notice" role="status">{notice}<button className="dismiss" onClick={() => setNotice('')} aria-label="Dismiss message">×</button></p>}
    <div className="content-grid"><section className="panel">{selectedRestaurant ? <><button className="back-button" onClick={() => setSelectedRestaurant(null)}>← Back to restaurants</button><Menu restaurant={selectedRestaurant} onAddToCart={addToCart} /></> : <RestaurantList restaurants={restaurants} onSelect={setSelectedRestaurant} />}</section><Cart items={cart} subtotal={subtotal} onUpdateQuantity={updateQuantity} onPlaceOrder={placeOrder} /></div>
  </main>;
}
