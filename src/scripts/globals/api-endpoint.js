import CONFIG from './config';

const API_ENDPOINT = {
  LIST_RESTAURANT: `${CONFIG.BASE_URL}/list`,
  SEARCH_RESTAURANT: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  CUSTOMER_REVIEWS: (id) => `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;
