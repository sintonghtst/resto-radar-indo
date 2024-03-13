import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
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
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('search-container').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }
    document.getElementById('restaurants_favorite').innerHTML = html;

    document.getElementById('restaurants_favorite').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada film untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
