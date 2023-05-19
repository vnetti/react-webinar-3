import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import CartInformation from "./cartInformation";

function Information(props){

  const cn = bem('Information')

  return (
    <div className={cn()}>
      <CartInformation totalPrice={props.totalPriceCart} cart={props.cart}/>
      <button onClick={props.onOpenCart}>Перейти</button>
    </div>
  )
}

Information.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    count: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  totalPriceCart: PropTypes.number,
  onOpenCart: PropTypes.func
};

Information.defaultProps = {
  cart: [],
  totalPriceCart: 0,
  onOpenCart: () => {},
}

export default React.memo(Information);
