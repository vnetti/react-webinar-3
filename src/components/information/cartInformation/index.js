import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {formatToCurrency, plural} from "../../../utils";

function CartInformation({cart, totalPrice}){

  const cn = bem('CartInformation')

  const count = cart.reduce((acc, item) => acc + item.count, 0)

  return (
      <div className={cn()}>
        В корзине:
        <span>
          {cart.length > 0 ?
            `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'}, 'ru-RU')} / ${formatToCurrency(totalPrice)}` :
            'пусто'}
        </span>
      </div>
  )
}

CartInformation.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    price: PropTypes.number
  })).isRequired,
  totalPrice: PropTypes.number
};

CartInformation.defaultProps = {
  cart: [],
  totalPrice: 0,
}

export default React.memo(CartInformation);
