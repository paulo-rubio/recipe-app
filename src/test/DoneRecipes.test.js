import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './RenderWith';
import App from '../App';

const mockLocalDoneRecipes = [
  { id: '52771', type: 'food', nationality: 'Italian', category: 'Vegetarian', alcoholicOrNot: '', name: 'Spicy Arrabiata Penne', image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg', doneDate: '23/06/2020', tags: ['Pasta', 'Curry'],
  },
  { id: '178319', type: 'drink', nationality: '', category: 'Cocktail', alcoholicOrNot: 'Alcoholic', name: 'Aquamarine', image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg', doneDate: '23/06/2020', tags: [],
  },
];

const done = '/done-recipes';

describe('Testa a tela de Done-Recipes', () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: () => { },
    },
  });
  it('Verifica se é renderizado três botões na tela', async () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    const btnFood = await screen.findByTestId('filter-by-food-btn');
    expect(btnFood).toBeDefined();
    userEvent.click(btnFood);
    const img = screen.getAllByTestId(/horizontal-image/i);
    expect(img).toHaveLength(1);

    const btnAll = await screen.findByTestId('filter-by-all-btn');
    expect(btnAll).toBeDefined();
    userEvent.click(btnAll);
    const text = screen.getAllByTestId(/horizontal-top-text/i);
    expect(text).toHaveLength(2);

    const btnDrink = await screen.findByTestId('filter-by-drink-btn');
    expect(btnDrink).toBeDefined();
    userEvent.click(btnDrink);
    const date = screen.getAllByTestId(/horizontal-done-date/i);
    expect(date).toHaveLength(1);
  });

  it('Verifica se é renderizado as informações da receita', async () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    const img = screen.getAllByTestId(/horizontal-image/i);
    expect(img).toHaveLength(2);

    const text = screen.getAllByTestId(/horizontal-top-text/i);
    expect(text).toHaveLength(2);

    const name = screen.getAllByTestId(/horizontal-name/i);
    expect(name).toHaveLength(2);

    const date = screen.getAllByTestId(/horizontal-done-date/i);
    expect(date).toHaveLength(2);

    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    expect(btnShare).toBeDefined();
  });

  it('Verifica funcionalidade do clipboard ', async () => {
    localStorage.clear();
    localStorage.setItem('doneRecipes', JSON.stringify(mockLocalDoneRecipes));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push(done);

    jest.spyOn(navigator.clipboard, 'writeText');
    const btnShare = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(btnShare);

    expect(screen.getByText(/link copied!/i)).toBeDefined();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost/foods/52771');
  });
});
