import React, { Component } from 'react';
import App from '../components/App';
import data from '../data';
import egg from '../img/icons/egg.svg';
import fire from '../img/icons/fire.svg';
import recipe from '../img/icons/recipe.svg';

const STORAGE_KEY = 'smashing-recipes';

export default class AppContainer extends Component {
  constructor() {
    super();
    const recipes = this.getData();
    this.state = {
      recipes,
      stats: this.getStats(recipes)
    };
  }

  /**
   * Gets the recipe data from localStorage
   * if set, otherwise from the data file
   */
  getData = () => {
    const storageData = localStorage.getItem(STORAGE_KEY);
    return storageData ? JSON.parse(storageData) : data;
  };

  /**
   * Generates an array of recipe stats
   *
   * @param {Array} recipes
   * @returns {Array} array of object containing: label, value, and icon(optional)
   */
  getStats = recipes => {
    const recipeCount = recipes.length;
    const recipesMade = recipes.reduce((count, recipe) => {
      return count + recipe.cookCount;
    }, 0);
    const averageYumminess =
      recipes.reduce((acc, recipe) => {
        return acc + recipe.yumminess;
      }, 0) / recipeCount;
    const eggCount = recipes.reduce((acc, recipe) => {
      const recipeEggCount = recipe.ingredients.reduce(
        (totalEggs, ingredient) => {
          const match = ingredient.match(/(\d+)\s+egg/);
          if (match && match[1]) {
            return totalEggs + Number(match[1]);
          }

          return totalEggs;
        },
        0
      );

      return acc + recipeEggCount;
    }, 0);
    const greaseFireCount = recipes.reduce((acc, recipe) => {
      const causedFire = recipe.causedGreaseFire;
      if (causedFire) {
        return acc + 1;
      }
      return acc;
    }, 0);

    return [
      {
        label: 'Eggs used',
        value: eggCount,
        icon: egg
      },
      {
        label: 'Recipes made',
        value: recipesMade,
        icon: recipe
      },
      {
        label: 'Grease fires',
        value: greaseFireCount,
        icon: fire
      },
      {
        label: 'Yumminess',
        value: `${averageYumminess.toFixed(2)}`,
        histogram: true
      }
    ];
  };

  /**
   * Updates the recipe data (based on edits made in the app)
   */
  setData = updated => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  /**
   * Updates a recipe, specified by index and
   * saves it to local storage (our pseudo-db)
   */
  updateRecipe = (index, updates) => {
    const recipes = [...this.state.recipes];
    recipes[index] = {
      ...recipes[index],
      ...updates
    };
    this.setState({
      recipes,
      stats: this.getStats(recipes)
    });
    this.setData(recipes);
  };

  render() {
    const { recipes, stats } = this.state;
    return (
      <App recipes={recipes} stats={stats} updateRecipe={this.updateRecipe} />
    );
  }
}
