import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {formatToCurrency, plural} from "../../../utils";

function CartInformation({count, totalPrice}){

  const cn = bem('CartInformation')

  return (
      <div className={cn()}>
        В корзине:
        <span>
          {count > 0 ?
            `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров'}, 'ru-RU')} / ${formatToCurrency(totalPrice)}` :
            'пусто'}
        </span>
      </div>
  )
}

CartInformation.propTypes = {
  count: PropTypes.number,
  totalPrice: PropTypes.number
};

export default React.memo(CartInformation);
