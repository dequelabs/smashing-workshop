import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RecipeModal from '../components/RecipeModal';

const invalidYumminess = input => {
  const value = input && input.value.trim();
  const number = value && Number(value);
  return !value || isNaN(number) || number > 50 || number < 0;
};
const defaultErrors = {
  ingredients: [],
  instructions: [],
  yumminess: false,
  insufficient: false
};

export default class RecipeModalContainer extends Component {
  static propTypes = {
    edit: PropTypes.bool,
    show: PropTypes.bool.isRequired,
    updateRecipe: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired
  };

  static defaultProps = {
    edit: false
  };

  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      errors: defaultErrors,
      greaseChecked: false,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    };
  }

  submitSuccess = () => {
    const { edit, updateRecipe, onClose, recipe } = this.props;
    const resetErrors = { errors: defaultErrors };
    const recipeUpdates = edit
      ? {
          ingredients: this.ingredients.filter(i => i).map(ing => ing.value),
          instructions: this.instructions.filter(i => i).map(inst => inst.value)
        }
      : {
          yumminess: Number(this.yumminess.value.trim()),
          greaseFireCount:
            recipe.greaseFireCount + (this.state.greaseChecked ? 1 : 0),
          cookCount: recipe.cookCount + 1
        };
    const newState = edit ? { ...resetErrors, ...recipeUpdates } : resetErrors;

    this.setState(newState);
    updateRecipe(recipeUpdates);
    onClose();
  };

  validateEditModal = () => {
    /**
     * TODO: Exercise 2c
     *
     * If there are errors, set the error state.
     * _see `defaultErrors` above for the shape of the error state object_
     *
     * Useful information:
     * - `state.errors.ingredients` and `state.errors.instructions` should
     *   be set as array of erroneous input indicies (within `this.ingredients`
     *   and `this.instructions`).
     * - `this.ingredients` and `this.instructions` are arrays of text field
     *    element references
     *
     * Example:
     * Let's pretent the first and third ingredient inputs (`this.ingredients[0]`
     * and `this.ingredients[2]`) are empty and that the second instruction textarea
     * (`this.instructions[1]`) is empty.
     *
     * ```js
     * this.setState({
     *   errors: {
     *     ingredients: [0, 2],
     *     instructions: [1]
     *   }
     * });
     * // Remember to focus the first erroneous input!
     * ```
     * NOTE: If there are no errors, call this.submitSuccess()
     */
  };

  validateViewModal = () => {
    const isErroneous = invalidYumminess(this.yumminess);

    if (!isErroneous) {
      return this.submitSuccess();
    }

    this.setState(
      {
        errors: {
          ...this.state.errors,
          yumminess: true
        }
      },
      () => {
        this.yumminess.focus();
      }
    );
  };

  validate = e => {
    e.preventDefault();
    const { edit } = this.props;

    if (edit) {
      return this.validateEditModal();
    }

    this.validateViewModal();
  };

  onGreaseChange = () => {
    this.setState({
      greaseChecked: !this.state.greaseChecked
    });
  };

  add = type => {
    this.setState(
      {
        [type]: this.state[type].concat('')
      },
      () => {
        const items = this[type];
        items[items.length - 1].focus();
      }
    );
  };

  onDelete = (index, type) => {
    const items = [...this.state[type]];
    const focusTarget =
      type === 'ingredients'
        ? this.ingredientsWrapper
        : this.instructionsWrapper;
    // remove the specified index from items
    items.splice(index, 1);
    this.setState({
      [type]: items
    });

    if (focusTarget) {
      focusTarget.focus();
    }
  };

  onClose = () => {
    const {
      recipe: { ingredients, instructions },
      onClose
    } = this.props;
    this.setState({
      ingredients,
      instructions,
      errors: defaultErrors,
      greaseChecked: false
    });
    onClose();
  };

  setItemRef = (type, index, el) => {
    if (el) {
      this[type][index] = el;
    }
  };

  setWrapperRef = (type, el) => {
    if (el) {
      this[type] = el;
    }
  };

  render() {
    // reset input ref arrays
    this.ingredients = [];
    this.instructions = [];
    const { show, edit, recipe } = this.props;
    const { errors, instructions, ingredients } = this.state;
    const recipeData = {
      ...recipe,
      instructions,
      ingredients
    };
    return (
      <RecipeModal
        edit={edit}
        recipe={recipeData}
        show={show}
        errors={errors}
        validate={this.validate}
        onDelete={this.onDelete}
        onClose={this.onClose}
        onGreaseChange={this.onGreaseChange}
        add={this.add}
        setItemRef={this.setItemRef}
        setWrapperRef={this.setWrapperRef}
      />
    );
  }
}
