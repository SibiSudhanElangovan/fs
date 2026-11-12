# Experiment 7 — Session-based Shopping Cart

1. Run `npm install` and `npm start` in `Exp7`.
2. Open `http://localhost:3000`, register a username/password, then log in.
3. Add catalogue items and open the cart.

Users/products/cart are held in memory and are reset when the server restarts. The simple plaintext password store is only for demonstrating the requested session and route flow; it is not suitable for real users. Set a strong `SESSION_SECRET` in the environment before any shared demo.
