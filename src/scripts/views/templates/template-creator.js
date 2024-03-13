import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant_title">${restaurant.name}</h2>
  <img class="restaurant_poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}"/>
  <div class="restaurant_info">
    <h3>Address</h3>
    <p>${restaurant.address}, ${restaurant.city}</p>
    <div class="menu">
      <div>
        <h4>Menu Food</h4>
        <ul>
          ${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join('')}
        </ul>
      </div>
      <div>
        <h4>Menu Drink</h4>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>
  <div class="restaurant_overview">
    <h3>Description</h3>
    <p>${restaurant.description}</p><br>
    <h3>Customer Reviews</h3>
    <ul>
      ${restaurant.customerReviews.map((review) => `<li class="customer_review_comment">${review.name}: ${review.review}</li>`).join('')}
    </ul>
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => {
  const { rating } = restaurant;
  const voteAverage = Number.isInteger(rating) ? rating.toFixed(0) : rating.toFixed(1);
  const ratingText = `${voteAverage}/5`;
  const progressBar = `<div class="circle-fill"><div class="circle-progress" style="--percentage: ${(rating * 20).toFixed(1)}%;"><div class="progress-bar"><div class="progress-fill">${ratingText}</div></div></div></div>`;

  return `
    <article class="card_item">
      <div class="card_item_picture">
          <h2 class="card_item_city">Kota.${restaurant.city}</h2>
          <img class="card_item_thumbnail lazyload" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="restoran ${restaurant.name || '-'}, Kota ${restaurant.city}"/>
      </div>
      <div class="card_item_content">${progressBar}
          <h1 class="card_item_title"><a href="${`/#/detail/${restaurant.id}`}" aria-label="${restaurant.name}, Kota${restaurant.city}, dengan rating ${ratingText}, ${restaurant.description}">${restaurant.name || '-'}</a></h1>
          <p class="card_item_description">${restaurant.description}</p>
      </div>
    </article>
  `;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
