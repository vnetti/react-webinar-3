import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import {formatToCurrency} from "../../../utils";

function CartFooter({totalPrice}){

  const cn = bem('CartFooter')

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
  totalPrice: PropTypes.number.isRequired,
};

export default CartFooter;
