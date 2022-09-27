import '../css/main.min.css';

const cocktailsList = document.querySelector('.gallery__cards');
console.log(cocktailsList);

createCardsMarkup();

async function fetchRundomCockteil() {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/random.php`
  );
  if (!response.ok) {
    throw new Error('no data loaded!');
  }
  return await response.json();
}

function getRundomCoctailData() {
  fetchRundomCockteil()
    .then(data => {
      createCardMarkup(data.drinks);
    })
    .catch(err => {
      console.log('error');
    });
}

function createCardsMarkup() {
  for (let i = 0; i < 9; i++) {
    getRundomCoctailData();
  }
}

function createCardMarkup(drinksArr) {
  const markup = drinksArr
    .map(
      ({ strDrinkThumb, strDrink }) => `<li class='gallery__card'>
      <img src=${strDrinkThumb} class='gallery__card-img'>
      <div class='gallery__card_thumb'>
      <h3 class='gallery__card-name'>${strDrink}</h3>
      <button class='gallery__btn-load-more'>Learn more</button>
       <button class='gallery__btn-add-to-fav'>Add to</button>
      </div>
      </li>`
    )
    .join('');

  cocktailsList.insertAdjacentHTML('beforeend', markup);
}
