import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';

function Product({description, price, edition, category, madeIn, onAdd}) {
  return (
    <div className={'Product'}>
      <p className={'p'}>{description}</p>
      <p className={'p'}>Страна производитель: <span className={'span'}>{madeIn.title} ({madeIn.code})</span></p>
      <p className={'p'}>Категория: <span className={'span'}>{category}</span></p>
      <p className={'p'}>Год выпуска: <span className={'span'}>{edition}</span></p>
      <p className={'p'}>Цена:  <span>{price}</span> ₽</p>
      <button className={'button'} onClick={onAdd}>Добавить</button>
    </div>
  )
}

Product.propTypes = {
  description: PropTypes.string, 
  price: PropTypes.number, 
  edition: PropTypes.number, 
  category: PropTypes.string, 
  madeIn: PropTypes.object, 
  onAdd: PropTypes.func
};

Product.defaultProps = {
  description: '', 
  price: 0, 
  edition: 0, 
  category: '', 
  madeIn: '', 
  onAdd: () => {}
}

export default memo(Product);
