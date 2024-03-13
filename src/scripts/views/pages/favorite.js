import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
        <div class="restaurant">
            <h1 class="restaurant_label">Favorite Restaurant</h1>
                <div id="search-container" class="search-container">
                    <input placeholder="Cari berdasarkan nama atau kota" id="searchElement" type="search">
                    <button id="searchButtonElement" type="submit" class="search-button">Search</button>
                </div>
                <div class="card_list" id="restaurants_favorite">
            </div>
        </div>
    `;
  },

  async afterRender() {
    this._renderFavoriteRestaurants();

    const searchElement = document.querySelector('#searchElement');
    const searchButtonElement = document.querySelector('#searchButtonElement');

    searchButtonElement.addEventListener('click', async () => {
      const query = searchElement.value.toLowerCase();
      const searchResults = await this._searchRestaurants(query);
      this._renderRestaurants(searchResults);
    });
    searchElement.addEventListener('keyup', async (event) => {
      if (event.key === 'Enter') {
        const query = searchElement.value.toLowerCase();
        const searchResults = await this._searchRestaurants(query);
        this._renderRestaurants(searchResults);
      }
    });
  },

  async _renderFavoriteRestaurants() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    if (restaurants.length === 0) {
      const restaurantsContainer = document.querySelector('#restaurants_favorite');
      restaurantsContainer.innerHTML = '<div class="card_item__not__found">Tidak ada film favorite</div>';
    } else {
      this._renderRestaurants(restaurants);
    }
  },

  async _searchRestaurants(query) {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const filteredRestaurants = restaurants.filter((restaurant) => {
      const nameMatch = restaurant.name.toLowerCase().includes(query);
      const cityMatch = restaurant.city.toLowerCase().includes(query);
      return nameMatch || cityMatch;
    });
    return filteredRestaurants;
  },

  async _renderRestaurants(restaurants) {
    const restaurantsContainer = document.querySelector('#restaurants_favorite');
    restaurantsContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Favorite;
