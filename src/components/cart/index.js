import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Popup from "../popup";
import Head from "../head";
import Information from "../information";
import List from "../list";
import CartFooter from "./cartFooter";

function Cart(props){

  const cn = bem('Cart')

  const title = <>Корзина<button className={cn('button')} onClick={props.onClose}>Закрыть</button></>

  return (
    <Popup isOpened={props.isOpened} onClose={props.onClose}>
      <div className={cn()}>
        <Head title={title}/>
        <Information/>
        <List list={props.cart} onclickItem={props.onDeleteItemFromCart}/>
        <CartFooter isEmpty={props.cart.length > 0} totalPrice={props.totalPrice}/>
      </div>
    </Popup>
  )
}

Cart.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    code: PropTypes.number,
    count: PropTypes.number,
    price: PropTypes.number
  })).isRequired,
  onDeleteItemFromCart: PropTypes.func,
  totalPrice: PropTypes.number
};

Cart.defaultProps = {
  isOpened: false,
  onClose: () => {},
  onDeleteItemFromCart: () => {},
  totalPrice: 0,
}

export default React.memo(Cart);
