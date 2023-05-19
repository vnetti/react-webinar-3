import React, {useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Cart from "../cart";
import CartInformation from "./cartInformation";

function Information({cart, totalPriceCart, onDeleteItemFromCart}){

  const cn = bem('Information')

  const [isOpened, setIsOpened] = useState(false)

  const callbacks = {
    onCloseCart() {
      setIsOpened(false)
    },
    onOpenCart() {
      setIsOpened(true)
    }
  }

  return (
    <div className={cn()}>
      <CartInformation totalPrice={totalPriceCart} cart={cart}/>
      <button onClick={callbacks.onOpenCart}>Перейти</button>
      {isOpened && <Cart cart={cart}
                         isOpened={isOpened}
                         onClose={callbacks.onCloseCart}
                         totalPrice={totalPriceCart}
                         onDeleteItemFromCart={onDeleteItemFromCart}/>}
    </div>
  )
}

Information.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    count: PropTypes.number,
    price: PropTypes.number
  })).isRequired,
  onClose: PropTypes.func,
  isOpened: PropTypes.bool,
  onDeleteItemFromCart: PropTypes.func,
  totalPriceCart: PropTypes.number
};

Information.defaultProps = {
  cart: [],
  onClose: () => {},
  isOpened: false,
  // onDeleteItemFromCart: () => {},
  totalPriceCart: 0,
}

export default React.memo(Information);
