const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const doge = document.querySelector('.doge-ready-img');
const searchBox = document.querySelector('.search-box');
const search = doge.addEventListener('click', function () {
  showRecipe(searchBox.value);
});
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const showRecipe = async function (cocktailName) {
  try {
    const searchUrl =
      cocktailName === ''
        ? 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
        : `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`;
    // const cocktailIndex =
    //   cocktailName === '' ? Math.trunc(Math.random() * 25) : 0;
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data);
    // console.log(cocktailIndex);
    console.log(cocktailName);
    if (data.drinks === null) throw new Error(`Doge could not find this. 🐶`);
    // if (!response.ok) throw new Error(`${data.message} (${response.status})`);
    let cocktail = data.drinks[0];
    cocktail = {
      isAlcoholic: cocktail.strAlcoholic,
      category: cocktail.strCategory,
      cocktailName: cocktail.strDrink,
      image: cocktail.strDrinkThumb,
      imagePreview: cocktail.strDrinkThumb + '/preview',
      imageSource: cocktail.strImageSource,
      glass: cocktail.strGlass,
      ing1: cocktail.strIngredient1,
      ing2: cocktail.strIngredient2,
      ing3: cocktail.strIngredient3,
      ing4: cocktail.strIngredient4,
      ing5: cocktail.strIngredient5,
      ing6: cocktail.strIngredient6,
      ing7: cocktail.strIngredient7,
      ing8: cocktail.strIngredient8,
      ing9: cocktail.strIngredient9,
      ing10: cocktail.strIngredient10,
      ing11: cocktail.strIngredient11,
      ing12: cocktail.strIngredient12,
      ing13: cocktail.strIngredient13,
      ing14: cocktail.strIngredient14,
      ing15: cocktail.strIngredient15,
      ingMeasure1: cocktail.strMeasure1,
      ingMeasure2: cocktail.strMeasure2,
      ingMeasure3: cocktail.strMeasure3,
      ingMeasure4: cocktail.strMeasure4,
      ingMeasure5: cocktail.strMeasure5,
      ingMeasure6: cocktail.strMeasure6,
      ingMeasure7: cocktail.strMeasure7,
      ingMeasure8: cocktail.strMeasure8,
      ingMeasure9: cocktail.strMeasure9,
      ingMeasure10: cocktail.strMeasure10,
      ingMeasure11: cocktail.strMeasure11,
      ingMeasure12: cocktail.strMeasure12,
      ingMeasure13: cocktail.strMeasure13,
      ingMeasure14: cocktail.strMeasure14,
      ingMeasure15: cocktail.strMeasure15,
      tags: cocktail.strTags,
      instructions: cocktail.strInstructions,
    };
    console.log(cocktail);
    // loading

    // rendering
    renderCocktail(cocktail);
    // error handling
  } catch (err) {
    console.error(err);
  }
};

//showRecipe();

const renderCocktail = function (data) {
  document.querySelector('.cocktail')?.remove();
  let lastIngredient = false;
  let ingredientList = '';
  let measurementList = '';
  let ingredientCount = 1;
  while (!lastIngredient) {
    const ingVer = `ing${ingredientCount}`;
    const ingMeasureVer = `ingMeasure${ingredientCount}`;
    const ingIcon = ingredientCount % 2 === 0 ? '💧' : '🩸';
    const newListItem =
      data[ingVer] == null || data[ingVer] == ''
        ? ''
        : `<li>${ingIcon} ${data[ingVer]}</li>`;
    const newMeasureItem =
      data[ingVer] == null || data[ingVer] == ''
        ? ''
        : `<li>🧪 ${
            data[ingMeasureVer] === null ? 'Optional' : data[ingMeasureVer]
          }</li>`;

    ingredientList += newListItem;
    measurementList += newMeasureItem;

    ingredientCount++;
    if (newListItem === '') lastIngredient = true;
    if (ingredientCount > 15) lastIngredient = true;
  }
  const html = `    <figure class="cocktail">
  <div class="cocktail__hero">
    <img
      src="${data.image}"
      alt="cocktail"
      class="cocktail__img"
    />
  </div>
  <div class="info-side">
    <div class="cocktail__category">${data.category}</div>
    <div class="cocktail__content">
      <h1 class="cocktail__heading">${data.cocktailName} 👌🏻</h1>
      <p class="cocktail__description">
        ${data.instructions}
      </p>
      <div class="cocktail__ingredients">
        <div class="cocktail__ingredients--ingredient">
          <ul>
            ${ingredientList}
          </ul>
        </div>
        <div class="cocktail__ingredients--measure">
          <ul>
          ${measurementList}
          </ul>
        </div>
      </div>
      <div class="cocktail__details">
        <p class="cocktail__detail">
          <span class="emoji">🍸</span>${data.glass}
        </p>
        <p class="cocktail__detail">
          <span class="emoji">⛽</span>${data.isAlcoholic}
        </p>
      </div>
    </div>
  </div>
</figure>`;
  document.querySelector('body').insertAdjacentHTML('beforeend', html);
};
