import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';

function List({list, action, text}) {
  return (
    <div className='List'>{
      list.map(item =>
        <div key={item.code} className='List-item'>
          <Item item={item} onAdd={action} text={text}/>
        </div>
      )}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  action: () => {},
  text: PropTypes.string
};

List.defaultProps = {
  action: () => {},
  text: ''
}

export default React.memo(List);
