import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Carousel } from 'react-bootstrap';
import { renderWithRouterAndRedux } from './RenderWith';
import carrossel from './__mockCarrossel';
import favIcon from '../images/blackHeartIcon.svg';
import notFavIcon from '../images/whiteHeartIcon.svg';

// import App from '../App';
// import { updateLocalStore } from '../LocalStore/LocalStore';

import App from '../App';
import { updateLocalStore } from '../LocalStore/LocalStore';

const foodPath = '/foods/52977';
const drinkPath = '/drinks/15997';
const drinkPathInProgress = '/drinks/15997/in-progress';
const foodPathInProgress = '/foods/52977/in-progress';

// const mockLocalDoneRecipes = [
//   {
//     id: '52977',
//     type: 'food',
//     nationality: 'Turkish',
//     category: 'Side',
//     alcoholicOrNot: '',
//     name: 'Corba',
//     image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
//   },
//   {
//     id: '17222',
//     type: 'drink',
//     nationality: '',
//     category: 'Cocktail',
//     alcoholicOrNot: 'Alcoholic',
//     name: 'A1',
//     image: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
//   },
// ];

const startRecipe = 'start-recipe-btn';

const favoriteLocal = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
];

afterEach(() => {
  jest.resetAllMocks();
});
const favorite = 'favorite-btn';

describe('Test Recipe Page', () => {
  it('testing if recipepage render components', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);
    const recipeName = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const recipeImg = await screen.findByTestId('recipe-photo');
    const recipeInstructions = await screen.findByTestId('instructions');
    const recipeIngredients = await screen.findByTestId('0-ingredient-name-and-measure');
    const recipeBtnFavorite = await screen.findByTestId(favorite);
    const recipeBtnShare = await screen.findByTestId('share-btn');
    const recipeVideo = await screen.findByTestId('video');

    expect(recipeName).toBeDefined();
    expect(recipeCategory).toBeDefined();
    expect(recipeImg).toBeDefined();
    expect(recipeInstructions).toBeDefined();
    expect(recipeIngredients).toBeDefined();
    expect(recipeBtnFavorite).toBeDefined();
    expect(recipeBtnShare).toBeDefined();
    expect(recipeVideo).toBeDefined();
  });

  it('testing if recipepage render components', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);
    const recipeName = await screen.findByTestId('recipe-title');
    const recipeCategory = await screen.findByTestId('recipe-category');
    const recipeImg = await screen.findByTestId('recipe-photo');
    const recipeInstructions = await screen.findByTestId('instructions');
    const recipeBtnFavorite = await screen.findByTestId(favorite);
    const recipeBtnShare = await screen.findByTestId('share-btn');

    expect(recipeName).toBeDefined();
    expect(recipeCategory).toBeDefined();
    expect(recipeImg).toBeDefined();
    expect(recipeInstructions).toBeDefined();
    expect(recipeBtnFavorite).toBeDefined();
    expect(recipeBtnShare).toBeDefined();
  });

  it('Verifica a funcionalidade do start recipe in Food', async () => {
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);

    const startRecipes = await screen.findByTestId(startRecipe);
    expect(startRecipes).toBeDefined();
    userEvent.click(startRecipes);
    history.push(foodPathInProgress);
  });

  it('Verifica a funcionalidade do continue recipe', async () => {
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);

    const continueRecipe = await screen.findByTestId(startRecipe);
    expect(continueRecipe).toBeDefined();
    userEvent.click(continueRecipe);
    history.push(foodPathInProgress);
  });

  it('Verifica a funcionalidade do start recipe in Drink', async () => {
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);

    const startRecipes = await screen.findByTestId(startRecipe);
    expect(startRecipes).toBeDefined();
    userEvent.click(startRecipes);
    history.push(drinkPathInProgress);
  });

  it('Verifica a funcionalidade do continue recipe in Drink', async () => {
    localStorage.clear();
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);

    const continueRecipe = await screen.findByTestId(startRecipe);
    expect(continueRecipe).toBeDefined();
    userEvent.click(continueRecipe);
    history.push(drinkPathInProgress);
  });

  it('Verifica funcionalidade do clipboard ', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { },
      },
    });
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(foodPath));

    jest.spyOn(navigator.clipboard, 'writeText');
    const btnShare = screen.getByTestId('share-btn');
    userEvent.click(btnShare);

    expect(screen.getByText(/link copied!/i)).toBeDefined();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/foods/52977');
  });

  it('Verifica se é salvo as comidas não favoritas no localStorage', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);

    const btnFavorite = await screen.findByTestId(favorite);
    userEvent.click(btnFavorite);
    expect(btnFavorite).toHaveAttribute('src', favIcon);
    userEvent.click(btnFavorite);
    expect(btnFavorite).toHaveAttribute('src', notFavIcon);
    expect(btnFavorite).toBeDefined();
  });

  it('Verifica se é salvo as comidas não favoritas no localStorage', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);

    const btnFavorite = await screen.findByTestId(favorite);
    userEvent.click(btnFavorite);
    updateLocalStore('favoriteRecipes', [{ id: '17203' }]);
    expect(btnFavorite).toHaveAttribute('src', favIcon);
    userEvent.click(btnFavorite);
    updateLocalStore('favoriteRecipes', []);
    expect(btnFavorite).toHaveAttribute('src', notFavIcon);
    expect(btnFavorite).toBeDefined();
  });

  it('Verifica se dar reload na tela o localStorage esta salvo', async () => {
    localStorage.clear();
    updateLocalStore('favoriteRecipes', []);
    const { history } = renderWithRouterAndRedux(<App />);

    history.push(foodPath);

    const favBtn = await screen.findByTestId(favorite);
    userEvent.click(favBtn);
    updateLocalStore('favoriteRecipes', [{ id: '52771' }]);
  });

  it('remove recipe of favorite', async () => {
    updateLocalStore('favoriteRecipes', [{ id: '17203' }]);
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/drinks/17203/in-progress');

    const favBtn = await screen.findByTestId(favorite);
    userEvent.click(favBtn);
    updateLocalStore('favoriteRecipes', []);
  });

  it('Verifica se é salvo as comidas não favoritas no localStoragee', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(foodPath);

    const btnFavorite = await screen.findByTestId(favorite);
    userEvent.click(btnFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocal));
    userEvent.click(btnFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    expect(btnFavorite).toBeDefined();
  });

  it('Verifica se é salvo as comidas não favoritas no localStoragee', async () => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(drinkPath);

    const btnFavorite = await screen.findByTestId(favorite);
    userEvent.click(btnFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteLocal));
    userEvent.click(btnFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    expect(btnFavorite).toBeDefined();
  });
});
