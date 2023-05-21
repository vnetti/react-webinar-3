import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {formatToCurrency} from "../../utils";

function Item(props){

  const cn = bem('Item');

  const callbacks = {
    onAddItemToCart: () => {
      props.onAddItemToCart(props.item.code)
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        {formatToCurrency(props.item.price)}
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onAddItemToCart}>
          Добавить
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onAddItemToCart: PropTypes.func.isRequired
};

Item.defaultProps = {
  onAddItemToCart: () => {},
}

export default React.memo(Item);
