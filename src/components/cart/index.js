import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Information from "../information";
import List from "../list";
import CartFooter from "./cart-footer";
import CartItem from "./cart-item";

function Cart(props){

  const cn = bem('Cart')

  return (
    <div className={cn()}>
      <Information/>
      <List list={props.cart} onDeleteItem={props.onDeleteItemFromCart}>
        <CartItem/>
      </List>
      {!props.isEmptyCart && <CartFooter totalPrice={props.totalPrice}/>}
    </div>
  )
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteItemFromCart: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  isEmptyCart: PropTypes.bool,
};

Cart.defaultProps = {
  isEmptyCart: true
}

export default React.memo(Cart);
