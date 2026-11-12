import React from 'react';
export default function RestaurantList({ restaurants, onSelect }) {
  return <><h2>Restaurants</h2><div className="restaurant-grid">{restaurants.map((restaurant) => <article className="restaurant-card" key={restaurant.id}><div className="restaurant-icon">{restaurant.name.split(' ').map((word) => word[0]).join('')}</div><h3>{restaurant.name}</h3><p>{restaurant.cuisine}</p><button onClick={() => onSelect(restaurant)}>View Menu</button></article>)}</div></>;
}
