import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "../button";
import './style.css';
import { formattedSum } from "../../utils";

function Item(props) {

  const callbacks = {
    onAdd: (e) => {
      e.stopPropagation();
      props.onAdd(props.item.code);
    }
  }

  return (
    <div className={'Item'}>
      <div className='Item-code'>{props.item.code}</div>
      <div className='Item-title'>
        {props.item.title}
      </div>
      <div className='Item-price'>{formattedSum(props.item.price)}</div>
      {props.item.quantity ? <div className="Item-quantity">{props.item.quantity} шт</div> : null}
      <div className='Item-actions'>
        <Button action={callbacks.onAdd} text={props.text} />
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number
  }).isRequired,
  onAdd: PropTypes.func
};

Item.defaultProps = {
  onAdd: () => {
  }
}

export default React.memo(Item);
