import egg from '../img/icons/egg.svg';
import fire from '../img/icons/fire.svg';
import recipe from '../img/icons/recipe.svg';

/**
 * Generates an array of recipe stats
 *
 * @param {Array} recipes
 * @returns {Array} array of object containing: label, value, and icon(optional)
 */
export const getStats = recipes => {
  const recipeCount = recipes.length;
  const averageYumminess =
    recipes.reduce((acc, recipe) => {
      return acc + recipe.yumminess;
    }, 0) / recipeCount;
  const eggCount = recipes.reduce((acc, recipe) => {
    const eggIngredient = recipe.ingredients.find(
      i => i.endsWith('eggs') || i.endsWith('egg')
    );
    const number = eggIngredient && eggIngredient.match(/\d+/);

    if (number) {
      return acc + Number(number);
    }

    return acc;
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
      value: recipeCount,
      icon: recipe
    },
    {
      label: 'Grease fires',
      value: greaseFireCount,
      icon: fire
    },
    {
      label: 'Yumminess',
      value: `${averageYumminess.toFixed(2)}`
    }
  ];
};
