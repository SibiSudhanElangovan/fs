import React from 'react';
export default function Menu({ restaurant, onAddToCart }) {
  return <><h2>{restaurant.name} Menu</h2><p className="muted">Choose an item to add it to your cart.</p>{restaurant.menu.map((item) => <article className="menu-item" key={item.id}><div><strong>{item.name}</strong><p>₹{item.price.toFixed(2)}</p></div><button onClick={() => onAddToCart(item)}>Add to Cart</button></article>)}</>;
}
