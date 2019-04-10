import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  TextField,
  Checkbox
} from 'cauldron-react';
import RecipeModalItem from '../RecipeModalItem';
import './index.css';

const defaultErrors = {
  ingredients: [],
  instructions: [],
  yumminess: false
};

export default class RecipeModal extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    recipe: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    updateRecipe: PropTypes.func,
    edit: PropTypes.bool
  };
  static defaultProps = {
    edit: false,
    updateRecipe: () => {}
  };

  constructor(props) {
    super(props);
    const { recipe } = this.props;
    this.state = {
      errors: defaultErrors,
      greaseChecked: recipe.causedGreaseFire,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions
    };
  }

  saveRecipe = () => {
    const erroneousInputs = [...this.ingredients, ...this.instructions].filter(
      input => input && !input.value.trim()
    );

    if (!erroneousInputs.length) {
      const updated = {
        ingredients: this.ingredients.map(ing => ing.value),
        instructions: this.instructions.map(inst => inst.value)
      };
      this.setState({
        errors: defaultErrors,
        ...updated
      });
      this.props.updateRecipe(updated);
      return this.props.onClose();
    }

    const errors = erroneousInputs.reduce(
      (acc, val) => {
        const ingredientIndex = this.ingredients.indexOf(val);
        if (ingredientIndex > -1) {
          acc.ingredients.push(ingredientIndex);
        } else {
          acc.instructions.push(this.instructions.indexOf(val));
        }

        return acc;
      },
      {
        ingredients: [],
        instructions: []
      }
    );

    this.setState({ errors }, () => {
      erroneousInputs[0].focus();
    });
  };

  validateYumminess = () => {
    const value = this.yumminess && this.yumminess.value.trim();
    const number = value && Number(value);
    const isErroneous = !value || isNaN(number) || number > 50 || number < 0;

    if (!isErroneous) {
      this.setState({ errors: defaultErrors });
      this.props.updateRecipe({
        yumminess: number,
        causedGreaseFire: this.state.greaseChecked
      });
      return this.props.onClose();
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

  handleGreaseCheckboxChange = () => {
    this.setState({
      greaseChecked: !this.state.greaseChecked
    });
  };

  addIngredient = () => {
    this.setState(
      {
        ingredients: this.state.ingredients.concat('')
      },
      () => {
        this.ingredients[this.ingredients.length - 1].focus();
      }
    );
  };

  addInstruction = () => {
    this.setState(
      {
        instructions: this.state.instructions.concat('')
      },
      () => {
        this.instructions[this.instructions.length - 1].focus();
      }
    );
  };

  onDelete = (index, type) => {
    const key = type === 'ingredient' ? 'ingredients' : 'instructions';

    const items = this.state[key];
    // remove the specified index from items
    items.splice(index, 1);
    this.setState({
      [key]: items
    });
  };

  render() {
    // reset input ref arrays
    this.ingredients = [];
    this.instructions = [];
    const { errors, ingredients, instructions } = this.state;
    const { show, recipe, onClose, edit } = this.props;
    const ingredientItems = ingredients.map((ingredient, i) => (
      <RecipeModalItem
        key={`${recipe.name}:${ingredient}`}
        error={
          errors.ingredients.includes(i) ? 'Ingredient must not be empty' : null
        }
        edit={edit}
        index={i}
        data={ingredient}
        type="ingredient"
        fieldRef={input => (this.ingredients[i] = input)}
        onDelete={this.onDelete}
      />
    ));
    const instructionItems = instructions.map((instruction, i) => (
      <RecipeModalItem
        edit={edit}
        error={
          errors.instructions.includes(i)
            ? 'Instruction must not be empty'
            : null
        }
        key={`${recipe.name}:${instruction}`}
        index={i}
        data={instruction}
        type="instruction"
        fieldRef={input => (this.instructions[i] = input)}
        onDelete={this.onDelete}
      />
    ));

    return (
      <Modal
        show={show}
        heading={{
          text: `${edit ? 'Edit' : 'Cooking'} ${recipe.name}`
        }}
        onClose={onClose}
        className="RecipeModal"
      >
        <ModalContent tabIndex={edit ? -1 : 0}>
          <h3>Ingredients</h3>
          {edit ? ingredientItems : <ul>{ingredientItems}</ul>}
          {edit && (
            <div className="RecipeModal__add-another">
              <button
                type="button"
                className="dqpl-link"
                onClick={this.addIngredient}
              >
                + Add another ingredient
              </button>
            </div>
          )}
          <h3>Instructions</h3>
          {edit ? instructionItems : <ol>{instructionItems}</ol>}
          {edit ? (
            <div className="RecipeModal__add-another">
              <button
                type="button"
                className="dqpl-link"
                onClick={this.addInstruction}
              >
                + Add another instruction
              </button>
            </div>
          ) : (
            <div className="RecipeModal__global">
              <TextField
                label="Rate the yumminess (0 - 50)"
                defaultValue={`${recipe.yumminess}`}
                error={
                  errors.yumminess
                    ? 'Yumminess must be a number between 0 and 50'
                    : null
                }
                type="number"
                min="0"
                max="50"
                fieldRef={el => (this.yumminess = el)}
              />
              <Checkbox
                checked={recipe.causedGreaseFire}
                value="true"
                id="grease-fire"
                name="grease-fire"
                label="I caused a grease fire making this"
                onChange={this.handleGreaseCheckboxChange}
              />
            </div>
          )}
        </ModalContent>
        <ModalFooter>
          <Button
            onClick={() => {
              if (!edit) {
                return this.validateYumminess();
              }

              this.saveRecipe();
            }}
          >
            {edit ? 'Save' : 'I cooked it'}
          </Button>
          <Button secondary onClick={onClose}>
            {edit ? 'Cancel' : 'Close'}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
