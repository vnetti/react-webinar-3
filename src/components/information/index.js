import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import CartInformation from "./cart-information";

function Information(props){

  const cn = bem('Information')

  return (
    <div className={cn()}>
      <CartInformation count={props.countCartItems} totalPrice={props.totalPriceCart}/>
      <button onClick={props.onOpenCart}>Перейти</button>
    </div>
  )
}

Information.propTypes = {
  countCartItems: PropTypes.number,
  totalPriceCart: PropTypes.number,
  onOpenCart: PropTypes.func
};

Information.defaultProps = {
  onOpenCart() {}
}

export default React.memo(Information);
