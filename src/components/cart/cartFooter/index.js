import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {formatToCurrency} from "../../../utils";

function CartFooter({totalPrice, isEmpty}){

  const cn = bem('CartFooter')

  if (!isEmpty) return null
  return (
    <div className={cn()}>
      <div className={cn('information')}>
        <span>Итого</span>
        <span>{formatToCurrency(totalPrice)}</span>
      </div>
    </div>
  )
}

CartFooter.propTypes = {
  totalPrice: PropTypes.number,
  isEmpty: PropTypes.bool
};

CartFooter.defaultProps = {
  totalPrice: 0,
  isEmpty: true,
}

export default CartFooter;
