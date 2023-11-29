import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import List from "../list";
import { getSum } from "../../utils";
import Button from "../button";

function Cart({isOpen, onHideCart, onDeleteItem, cartItems}) {
  
  if (!isOpen) {
    return null;
  }

  return (
    <div className="Modal-wrapper">
      <div className="Modal">
        <div className="Modal-header">
          <h2 className="Header-title">Корзина</h2>
          <Button action={onHideCart} text={'Закрыть'} />
        </div>
        {cartItems.length == 0 ? 
          <div className="Empty-cart">В корзине пока нет товаров</div> :
          <List list={cartItems}
                action={onDeleteItem}
                text={'Удалить'}/>}
        <div className="Modal-footer">
          <div className="Footer-title">Итого</div>
          <div className="Cart-sum">{getSum(cartItems)} ₽</div>
        </div>
      </div>
    </div>
    
  )
}

Cart.propTypes = {
  onHideCart: PropTypes.func,
  onDeleteItem: PropTypes.func,
  isOpen: PropTypes.bool,
  cartItems: PropTypes.array
};

Cart.defaultProps = {
  onHideCart: () => {},
  onDeleteItem: () => {},
  isOpen: false,
  cartItems: []
}

export default React.memo(Cart);
