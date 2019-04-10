import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, TextField } from 'cauldron-react';
import './index.css';

const RecipeModalItem = ({ edit, data, index, type, onDelete, ...other }) => {
  const Wrapper = edit ? 'div' : 'li';
  const text = type === 'instruction' ? 'Instruction' : 'Ingredient';
  return (
    <Wrapper className="RecipeModalItem">
      {edit ? (
        <Fragment>
          <TextField
            required
            multiline={type === 'instruction'}
            label={`${text} ${index + 1}`}
            defaultValue={data}
            {...other}
          />
          <button
            type="button"
            className="RecipeModal__ingredient-delete"
            aria-label={`Remove ${text} ${index + 1}`}
            onClick={() => onDelete(index, type)}
          >
            <Icon type="fa-trash" />
          </button>
        </Fragment>
      ) : (
        data
      )}
    </Wrapper>
  );
};

RecipeModalItem.propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string
};

RecipeModalItem.defaultProps = {
  edit: false,
  type: 'ingredient'
};
RecipeModalItem.displayName = 'RecipeModalItem';
export default RecipeModalItem;
