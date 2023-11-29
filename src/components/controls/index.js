import React from "react";
import PropTypes from 'prop-types';
import {getSum, plural} from '../../utils.js';
import Button from "../button/index.js";
import './style.css';

function Controls({cart, onShowCart}) {
  return (
    <div className='Controls'>
      <div className="Controls-title">В корзине:</div>
      <div className="Controls-count">
        {cart.length > 0 ? `${cart.length} ${plural(cart.length, {
          one: 'товар',
          few: 'товара',
          many: 'товаров'
        })} / ${getSum(cart)} ₽` : `пусто`}
      </div>
      <Button action={onShowCart} text={'Перейти'} />
    </div>
  )
}

Controls.propTypes = {
  onShowCart: PropTypes.func
};

Controls.defaultProps = {
  onShowCart: () => {}
}

export default React.memo(Controls);
