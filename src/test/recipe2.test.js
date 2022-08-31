import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import { Carousel } from 'react-bootstrap';
import { renderWithRouterAndRedux } from './RenderWith';
import carrossel from './__mockCarrossel';
import App from '../App';

const drinkPath = '/drinks/15997';

describe('', () => {
  it('Verifica se o carrossel esta na pagina', async () => {
    jest.fn(carrossel);
    const { history } = renderWithRouterAndRedux(<App />);
    await waitFor(() => history.push(drinkPath));

    carrossel.forEach((e, i) => {
      expect(screen.findByTestId(`${i}-recomendation-card`)).toBeDefined();
      expect(screen.findByAltText(`${e.strMealThumb}`)).toBeDefined();
    });
  });
});
