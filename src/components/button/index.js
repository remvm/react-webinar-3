// Button.js
import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Button({ action, text, stopPropagation }) {
  const handleClick = (e) => {
    if (stopPropagation && action) {
      e.stopPropagation();
    }
    if (action) {
      action(e);
    }
  };

  return (
    <button className='Button' onClick={handleClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  action: PropTypes.func,
  text: PropTypes.string.isRequired,
  stopPropagation: PropTypes.bool.isRequired,
};

Button.defaultProps = {
  action: null,
  stopPropagation: false,
};

export default Button;
