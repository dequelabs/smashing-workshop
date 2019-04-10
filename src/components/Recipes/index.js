import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'cauldron-react';
import RecipeModal from '../RecipeModal';
import { updateRecipe } from '../../data';
import './index.css';

const Recipes = ({ recipes, refresh, ...other }) => {
  const [modalState, setModalState] = useState({
    edit: null,
    view: null
  });
  return (
    <div className="Recipes">
      {recipes.map((recipe, index) => (
        <Fragment key={recipe.name}>
          <div className="Recipes__card">
            <div className="Recipes__card-head">
              <button
                type="button"
                aria-label={`Edit ${recipe.name}`}
                onClick={() => {
                  setModalState({ edit: recipe.name });
                }}
              >
                <Icon type="fa-pencil" />
              </button>
              <img src={recipe.image} alt="" role="presentation" />
            </div>
            <div className="Recipes__card-content">
              <h3>{recipe.name}</h3>
              <dl>
                <dt>Prep time</dt>
                <dd>{recipe.prepTime}</dd>
                <dt>Cook time</dt>
                <dd>{recipe.cookTime}</dd>
                <dt>Difficulty</dt>
                <dd>{recipe.difficulty}</dd>
              </dl>
            </div>
            <div className="Recipes__card-foot">
              <Button onClick={() => setModalState({ view: recipe.name })}>
                <span className="BracketLeft" aria-hidden="true">
                  [
                </span>
                <span>{`Cook ${recipe.name}`}</span>
                <span className="BracketRight" aria-hidden="true">
                  ]
                </span>
              </Button>
            </div>
          </div>
          <RecipeModal
            edit
            show={modalState.edit === recipe.name}
            updateRecipe={data => {
              updateRecipe(index, data);
              refresh();
            }}
            recipe={recipe}
            onClose={() => setModalState({ edit: null })}
            {...other}
          />
          <RecipeModal
            show={modalState.view === recipe.name}
            updateRecipe={data => {
              updateRecipe(index, data);
              refresh();
            }}
            recipe={recipe}
            onClose={() => setModalState({ view: null })}
            {...other}
          />
        </Fragment>
      ))}
    </div>
  );
};

Recipes.displayName = 'Recipes';
Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  refresh: PropTypes.func.isRequired
};
export default Recipes;
