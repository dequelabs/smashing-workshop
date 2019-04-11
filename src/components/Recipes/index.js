import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'cauldron-react';
import RecipeModal from '../../containers/RecipeModal';
import './index.css';

const Recipes = ({ recipes, updateRecipe }) => {
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
            updateRecipe={data => updateRecipe(index, data)}
            onClose={() => setModalState({ edit: null })}
            recipe={recipe}
          />
          <RecipeModal
            show={modalState.view === recipe.name}
            updateRecipe={data => updateRecipe(index, data)}
            onClose={() => setModalState({ view: null })}
            recipe={recipe}
          />
        </Fragment>
      ))}
    </div>
  );
};

Recipes.displayName = 'Recipes';
Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  updateRecipe: PropTypes.func.isRequired
};
export default Recipes;
