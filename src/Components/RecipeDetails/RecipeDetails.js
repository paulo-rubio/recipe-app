import React, { useState } from 'react';
import './RecipeDetails.css';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import copy from 'clipboard-copy';
import { useParams } from 'react-router-dom';
import { getLocalStore, updateLocalStore } from '../../LocalStore/LocalStore';

const six = 6;

function RecipeDetails({ recipe, keys, endpoint, recomendacao }) {
  const { name, category, img } = keys;

  // useEffect(() => {
  //   console.log(recipe);
  // const fav = [{
  //   id: endpoint === 'foods' ? recipe.idMeal : recipe.idDrink,
  //   type: endpoint,
  //   nationality: recipe.strArea,
  //   category: recipe.strCategory,
  //   alcoholicOrNot: endpoint === 'foods' ? false : recipe.strAlcoholic,
  //   name: endpoint === 'foods' ? recipe.strMeal : recipe.strDrink,
  //   image: endpoint === 'foods' ? recipe.strMealThumb : recipe.strDrinkThumb,
  // }];
  // }, []);

  const recipesIncrements = () => {
    const allRecipes = [];
    const vinteIngredientes = 20;
    for (let i = 1; i <= vinteIngredientes; i += 1) {
      if (recipe[`strIngredient${i}`]) {
        allRecipes.push(
          <li
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
            key={ i }
          >
            { recipe[`strMeasure${i}`] }
            { recipe[`strIngredient${i}`] }
          </li>,
        );
      }
    }
    return <ul>{allRecipes}</ul>;
  };

  const { id } = useParams();

  const seisReceitas = recomendacao.filter((e, i) => i < six);
  // para fazer o carrossel utilizei esse link//https://react-bootstrap.github.io/components/carousel/
  const [msg, setMsg] = useState(false);

  const MSG_TIMEOUT = 3000;

  const shareRecipe = (type) => {
    copy(`${window.location.origin}/${type}/${id}`);
    setMsg(true);
    setTimeout(() => setMsg(false), MSG_TIMEOUT);
  };

  const saveInFavorite = () => {
    const favorites = getLocalStore('favoriteRecipes') || [];
    const fav = {
      id: endpoint === 'foods' ? recipe.idMeal : recipe.idDrink,
      type: endpoint === 'foods' ? 'food' : 'drink',
      nationality: recipe.strArea ? recipe.strArea : '',
      category: recipe.strCategory,
      alcoholicOrNot: endpoint === 'foods' ? '' : recipe.strAlcoholic,
      name: endpoint === 'foods' ? recipe.strMeal : recipe.strDrink,
      image: endpoint === 'foods' ? recipe.strMealThumb : recipe.strDrinkThumb,
    };
    console.log(fav);
    const addItem = [...favorites, fav];

    updateLocalStore('favoriteRecipes', addItem);
  };

  return (
    <div
      className="details_content"
    >
      <h1
        className="recipeContent"
        data-testid="recipe-title"
      >
        { recipe[name] }

      </h1>
      <img
        data-testid="recipe-photo"
        className="imgRecipe"
        style={ { width: '100px' } }
        src={ recipe[img] }
        alt={ recipe.strTags }
      />
      <p data-testid="recipe-category">
        {recipe[category]}
      </p>

      <p data-testid="instructions">{recipe.strInstructions}</p>
      { recipesIncrements() }
      {recipe.strYoutube && <iframe
        width="350"
        data-testid="video"
        height="100"
        src={ recipe.strYoutube }
        frameBorder="0"
        title="videos "
      />}
      {msg && <p>Link copied!</p>}

      <button
        onClick={ () => shareRecipe(endpoint) }
        type="button"
        className="shareBtn"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        onClick={ saveInFavorite }
        type="button"
        className="favoriteBtn"
        data-testid="favorite-btn"
      >
        Favorite
      </button>
      <Carousel>
        { seisReceitas.map((receitas, i) => {
          const { strDrink, strDrinkThumb, strMeal, strMealThumb } = receitas;
          return (
            endpoint === 'foods' ? (
              <Carousel.Item
                key={ strDrink }
                data-testid={ `${i}-recomendation-card` }
              >
                <img
                  width="360px"
                  alt={ strDrink }
                  src={ strDrinkThumb }
                />
                <Carousel.Caption>
                  <span data-testid={ `${i}-recomendation-title` }>{ strDrink }</span>
                </Carousel.Caption>
              </Carousel.Item>
            ) : (
              <Carousel.Item
                data-testid={ `${i}-recomendation-card` }
              >
                <img
                  width="360px"
                  alt={ strMeal }
                  src={ strMealThumb }
                />
                <Carousel.Caption>
                  <span data-testid={ `${i}-recomendation-title` }>{ strMeal }</span>
                </Carousel.Caption>
              </Carousel.Item>
            )
          );
        })}
      </Carousel>
    </div>
  );
}

export default RecipeDetails;

RecipeDetails.propTypes = {
  recipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strSource: PropTypes.string,
    strTags: PropTypes.string,
    strMeal: PropTypes.string,
    strYoutube: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strArea: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  keys: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    img: PropTypes.string,
  }).isRequired,
  endpoint: PropTypes.string.isRequired,
  recomendacao: PropTypes.arrayOf(PropTypes.object).isRequired,
};
