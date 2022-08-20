import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import DoneRecipe from './pages/DoneRecipe/DoneRecipe';
import Foods from './pages/Foods/Foods';
import Drinks from './pages/Drinks/Drinks';
import FoodRecipe from './pages/FoodRecipe/FoodRecipe';
import DrinkRecipe from './pages/DrinkRecipe/DrinkRecipe';
import profile from './pages/Profile/profile';
import FavoriteRecipe from './pages/FavoriteRecipe/FavoriteRecipe';
import ProgressFood from './pages/ProgressFood/ProgressFood';
import DrinkProgress from './pages/DrinkProgress/DrinkProgress';

const id = 'id-da-receita';

function App() {
  return (
    <main className="meals">
      <Switch>
        <Route component={ Login } path="/" exact />
        <Route component={ Foods } path="/foods" exact />
        <Route component={ Drinks } path="/drinks" exact />
        <Route component={ FoodRecipe } path={ `/foods/${id}` } exact />
        <Route component={ DrinkRecipe } path={ `/drinks/${id}` } exact />
        <Route
          component={ ProgressFood }
          path={ `/foods/${id}in-progress` }
          exact
        />
        <Route
          component={ DrinkProgress }
          path={ `/drinks/${id}in-progress` }
          exact
        />
        <Route component={ profile } path="/profile" exact />
        <Route component={ DoneRecipe } path="/done-recipes" exact />
        <Route component={ FavoriteRecipe } path="/favorite-recipes" exact />
      </Switch>
    </main>
  );
}

export default App;
