import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'cauldron-react';
import RecipeModal from '../../containers/RecipeModal';
import pencil from '../../img/icons/pencil.png';
import './index.css';

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/alt-text */
const Recipes = ({
  recipes,
  updateRecipe,
  updateModalState,
  modalState: { edit, view }
}) => {
  const modalIsShowing = edit || view;
  const buttonTabIndex = modalIsShowing ? -1 : 0;
  return (
    <div className="Recipes">
      {recipes.map((recipe, index) => (
        <Fragment key={recipe.name}>
          <div className="Recipes__card">
            <div className="Recipes__card-head">
              <div
                onClick={() => {
                  updateModalState({ edit: recipe.name });
                }}
                tabIndex={-1}
              >
                <img src={pencil} className="edit" alt="Edit" />
              </div>
              <img src={recipe.image} />
            </div>
            <div className="Recipes__card-content">
              <div className="Heading">{recipe.name}</div>
              <dl>
                <dt>Prep time</dt>
                <dd>{recipe.prepTime}</dd>
                <dt>Cook time</dt>
                <dd>{recipe.cookTime}</dd>
                <dt>Difficulty</dt>
                <dd className={recipe.difficulty}>{recipe.difficulty}</dd>
              </dl>
            </div>
            <div className="Recipes__card-foot">
              <Button
                onClick={() => updateModalState({ view: recipe.name })}
                tabIndex={buttonTabIndex}
              >
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
            show={edit === recipe.name}
            updateRecipe={data => updateRecipe(index, data)}
            onClose={() => updateModalState({ edit: null })}
            recipe={recipe}
          />
          <RecipeModal
            show={view === recipe.name}
            updateRecipe={data => updateRecipe(index, data)}
            onClose={() => updateModalState({ view: null })}
            recipe={recipe}
          />
        </Fragment>
      ))}
    </div>
  );
};
/* eslint-enable jsx-a11y/click-events-have-key-events */
/* eslint-enable jsx-a11y/no-static-element-interactions */
Recipes.displayName = 'Recipes';
Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  updateModalState: PropTypes.func.isRequired,
  modalState: PropTypes.object.isRequired
};
export default Recipes;
