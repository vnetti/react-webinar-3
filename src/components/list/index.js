import React from "react";
import PropTypes from 'prop-types';
import Item from "../item";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list, onclickItem}){

  const cn = bem('List')

  return (
    <div className={cn()}>{
      list.length > 0 ?
        list.map(item =>
          <div key={item.code} className={cn('item')}>
            <Item item={item} onClick={onclickItem}/>
          </div>
        ) :
        <div className={cn('empty')}>Товаров нет :(</div>}
    </div>
  )
}

List.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.number
  })).isRequired,
  onclickItem: PropTypes.func
};

List.defaultProps = {
  list: [],
  onclickItem: () => {},
}

export default React.memo(List);
