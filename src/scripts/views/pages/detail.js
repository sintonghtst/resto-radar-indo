import UrlParser from '../../routes/url-parser';
import RestaurantDbSource from '../../data/restaurantdb-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-presenter';

const Detail = {
  async render() {
    return `
      <div id="detailrestaurant" class="detail-restaurant"></div>
      <div id="addReviewForm" class="review">
        <input type="text" id="reviewName" class="reviewName" placeholder="Your Name">
        <textarea id="reviewText" class="reviewText" placeholder="Your Review"></textarea>
        <button id="submitReviewButton" class="submitReviewButton" disabled>Submit Review</button>
      </div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async submitReview(review) {
    await RestaurantDbSource.postReview(review);
    location.reload();
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantDbSource.detailRestaurant(url.id);
    const restaurantContainer = document.querySelector('#detailrestaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        city: restaurant.city,
        pictureId: restaurant.pictureId,
        rating: restaurant.rating,
        description: restaurant.description,
      },
    });

    const submitReviewButton = document.getElementById('submitReviewButton');
    const reviewNameInput = document.getElementById('reviewName');
    const reviewTextInput = document.getElementById('reviewText');

    function checkInputs() {
      if (reviewNameInput.value.trim() !== '' && reviewTextInput.value.trim() !== '') {
        submitReviewButton.disabled = false;
      } else {
        submitReviewButton.disabled = true;
      }
    }

    reviewNameInput.addEventListener('input', checkInputs);
    reviewTextInput.addEventListener('input', checkInputs);

    submitReviewButton.addEventListener('click', async () => {
      const name = reviewNameInput.value;
      const reviewText = reviewTextInput.value;

      const review = {
        id: url.id,
        name,
        review: reviewText,
      };

      await this.submitReview(review);
    });
  },
};

export default Detail;
