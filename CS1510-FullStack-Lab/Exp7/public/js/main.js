'use strict';
document.addEventListener('DOMContentLoaded', () => {
  if (location.pathname === '/catalogue') loadProducts();
  if (location.pathname === '/cart') loadCart();
});
async function request(url, options = {}) {
  const response = await fetch(url, { credentials: 'same-origin', ...options });
  if (!response.ok) { const message = await response.text(); throw new Error(message || `Request failed (${response.status})`); }
  const contentType = response.headers.get('content-type') || '';
  return contentType.includes('application/json') ? response.json() : response.text();
}
async function loadProducts() {
  const list = document.getElementById('product-list');
  try {
    const products = await request('/products'); list.replaceChildren();
    products.forEach((product) => {
      const card = document.createElement('article'); card.className = 'product-card';
      const title = document.createElement('h2'); title.textContent = product.name;
      const description = document.createElement('p'); description.textContent = product.description;
      const price = document.createElement('strong'); price.textContent = `₹${product.price.toLocaleString('en-IN')}`;
      const button = document.createElement('button'); button.textContent = 'Add to Cart'; button.addEventListener('click', () => addToCart(product.id));
      card.append(title, description, price, button); list.appendChild(card);
    });
  } catch (error) { list.textContent = error.message; }
}
async function addToCart(productId) {
  const message = document.getElementById('page-message');
  try { const result = await request('/add-to-cart', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) }); message.textContent = result.message; document.getElementById('cart-count').textContent = result.cartCount; }
  catch (error) { message.textContent = error.message; }
}
async function loadCart() {
  const list = document.getElementById('cart-list'); const totalElement = document.getElementById('cart-total');
  try {
    const items = await request('/cart-items'); list.replaceChildren();
    if (!items.length) { list.textContent = 'Your cart is empty.'; totalElement.textContent = ''; return; }
    let total = 0;
    items.forEach((item) => {
      total += item.price * item.quantity;
      const row = document.createElement('article'); row.className = 'cart-row';
      const label = document.createElement('span'); label.textContent = `${item.name} × ${item.quantity}`;
      const price = document.createElement('strong'); price.textContent = `₹${(item.price * item.quantity).toLocaleString('en-IN')}`;
      const remove = document.createElement('button'); remove.className = 'remove-button'; remove.textContent = 'Remove'; remove.addEventListener('click', () => removeFromCart(item.id));
      row.append(label, price, remove); list.appendChild(row);
    });
    totalElement.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
  } catch (error) { list.textContent = error.message; }
}
async function removeFromCart(productId) {
  try { await request(`/cart-items/${productId}`, { method: 'DELETE' }); await loadCart(); }
  catch (error) { document.getElementById('cart-list').textContent = error.message; }
}
