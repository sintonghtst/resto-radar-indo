import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const ListRestaurant = {
  async render() {
    return `
        <div class="restaurant">
            <h1 class="restaurant_label">List Restaurant</h1>
                <div id="search-container" class="search-container">
                    <input placeholder="Cari berdasarkan nama atau kota" id="searchElement" type="search">
                    <button id="searchButtonElement" type="submit" class="search-button">Search</button>
                </div>
                <div class="card_list" id="restaurantlist">
            </div>
        </div>
      `;
  },

  async afterRender() {
    const restaurants = await RestaurantDbSource.listRestaurant();
    this._renderRestaurants(restaurants);

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

  async _searchRestaurants(query) {
    const restaurants = await RestaurantDbSource.listRestaurant();
    const filteredRestaurants = restaurants.filter((restaurant) => {
      const nameMatch = restaurant.name.toLowerCase().includes(query);
      const cityMatch = restaurant.city.toLowerCase().includes(query);
      return nameMatch || cityMatch;
    });
    return filteredRestaurants;
  },

  async _renderRestaurants(restaurants) {
    const restaurantsContainer = document.querySelector('#restaurantlist');
    restaurantsContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default ListRestaurant;
