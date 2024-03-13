const assert = require('assert');

Feature('Favorite Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.seeElement('#searchElement');

  I.see('Tidak ada film favorite', '.card_item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada film favorite', '.card_item__not__found');
  I.amOnPage('/');

  I.seeElement('.card_item_title a');
  const firstRestaurant = locate('.card_item_title a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.card_item');
  const favoritedRestaurantName = await I.grabTextFrom('.card_item_title');

  assert.strictEqual(firstRestaurantName, favoritedRestaurantName);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada film favorite', '.card_item__not__found');

  I.amOnPage('/');

  I.seeElement('.card_item_title a');

  const names = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.card_item_title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');

    names.push(await I.grabTextFrom('.restaurant_title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#searchElement');

  const visibleFavoritedRestaurants = await I.grabNumberOfVisibleElements('.card_item');
  assert.strictEqual(names.length, visibleFavoritedRestaurants);

  const searchQuery = names[1].substring(1, 3);
  I.fillField('#searchElement', searchQuery);
  I.pressKey('Enter');
  // mendapatkan daftar film yang sesuai dengan searchQuery
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);
  const visibleSearchedFavoritedRestaurants = await I.grabNumberOfVisibleElements('.card_item');
  assert.strictEqual(matchingRestaurants.length, visibleSearchedFavoritedRestaurants);
  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleName = await I.grabTextFrom(locate('.card_item_title').at(i + 1));
    assert.strictEqual(matchingRestaurants[i], visibleName);
  }
});

Scenario('add comment customer review', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.card_item_title a');
  const firstRestaurant = locate('.card_item_title a').first();
  I.click(firstRestaurant);

  const reviewNameInput = '#reviewName';
  const reviewTextInput = '#reviewText';

  I.waitForElement(reviewNameInput, 5);
  I.waitForElement(reviewTextInput, 5);

  I.fillField(reviewNameInput, 'scenario name');
  I.fillField(reviewTextInput, 'scenario description');

  I.click('#submitReviewButton');

  I.waitForNavigation();

  I.see('scenario name', '.customer_review_comment');
  I.see('scenario description', '.customer_review_comment');
});
