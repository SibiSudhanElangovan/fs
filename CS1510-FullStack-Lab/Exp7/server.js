'use strict';
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const users = new Map();
const products = [
  { id: 1, name: 'Laptop', description: 'Everyday productivity laptop', price: 50000 },
  { id: 2, name: 'Headphones', description: 'Wireless over-ear headphones', price: 2500 },
  { id: 3, name: 'Keyboard', description: 'Compact mechanical keyboard', price: 3200 },
  { id: 4, name: 'Mouse', description: 'Ergonomic wireless mouse', price: 1200 }
];
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  name: 'cs1510.sid',
  secret: process.env.SESSION_SECRET || 'change-this-development-secret-before-deployment',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 1000 }
}));
function requireLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: 'Please log in first.' });
  next();
}
app.get('/', (_req, res) => res.redirect('/login'));
app.get('/login', (_req, res) => res.sendFile(path.join(__dirname, 'views/login.html')));
app.get('/register', (_req, res) => res.sendFile(path.join(__dirname, 'views/register.html')));
app.get('/catalogue', requireLogin, (_req, res) => res.sendFile(path.join(__dirname, 'views/catalogue.html')));
app.get('/cart', requireLogin, (_req, res) => res.sendFile(path.join(__dirname, 'views/cart.html')));
app.post('/register', (req, res) => {
  const username = String(req.body.username || '').trim();
  const password = String(req.body.password || '');
  if (username.length < 3 || password.length < 6) return res.status(400).send('Username must have at least 3 characters and password at least 6 characters.');
  if (users.has(username.toLowerCase())) return res.status(409).send('User already exists. Please choose another username.');
  // Demonstration only: replace this in-memory/plain-text store with a database and password hashing in real systems.
  users.set(username.toLowerCase(), { username, password, cart: [] });
  res.redirect('/login?registered=1');
});
app.post('/login', (req, res) => {
  const username = String(req.body.username || '').trim();
  const user = users.get(username.toLowerCase());
  if (!user || user.password !== String(req.body.password || '')) return res.status(401).send('Invalid username or password. <a href="/login">Try again</a>');
  req.session.regenerate((error) => {
    if (error) return res.status(500).send('Could not start session.');
    req.session.user = user.username;
    res.redirect('/catalogue');
  });
});
app.post('/logout', (req, res) => req.session.destroy(() => res.redirect('/login')));
app.get('/products', requireLogin, (_req, res) => res.json(products));
app.post('/add-to-cart', requireLogin, (req, res) => {
  const productId = Number(req.body.productId);
  const product = products.find((item) => item.id === productId);
  if (!product) return res.status(404).json({ message: 'Product not found.' });
  const user = users.get(req.session.user.toLowerCase());
  const existing = user.cart.find((item) => item.id === product.id);
  if (existing) existing.quantity += 1;
  else user.cart.push({ ...product, quantity: 1 });
  res.json({ message: 'Added to cart.', cartCount: user.cart.reduce((sum, item) => sum + item.quantity, 0) });
});
app.get('/cart-items', requireLogin, (req, res) => {
  const user = users.get(req.session.user.toLowerCase());
  res.json(user ? user.cart : []);
});
app.delete('/cart-items/:productId', requireLogin, (req, res) => {
  const user = users.get(req.session.user.toLowerCase());
  const id = Number(req.params.productId);
  user.cart = user.cart.filter((item) => item.id !== id);
  res.json(user.cart);
});
app.use((error, _req, res, _next) => { console.error(error); res.status(500).json({ message: 'Unexpected server error.' }); });
app.listen(PORT, () => console.log(`Shopping cart running at http://localhost:${PORT}`));
