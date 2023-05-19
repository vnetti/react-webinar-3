import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {formatToCurrency} from "../../../utils";
import './style.css';

function CartItem(props){

  const cn = bem('CartItem');

  const callbacks = {
    onDelete: () => {
      props.onDeleteItem(props.item.code)
    }
  }

  return (
    <div className={cn()}>
      <div className={cn('code')}>{props.item.code}</div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('info')}>
        <span>{formatToCurrency(props.item.price)}</span>
        <span>{props.item.count} шт</span>
      </div>
      <div className={cn('actions')}>
        <button onClick={callbacks.onDelete}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number
  }).isRequired,
  onDeleteItem: PropTypes.func
};

CartItem.defaultProps = {
  onDeleteItem: () => {},
}

export default React.memo(CartItem);
