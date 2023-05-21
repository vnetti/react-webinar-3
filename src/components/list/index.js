import React, {cloneElement} from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function List({list, children, ...props}){

  const cn = bem('List')

  return (
    <div className={cn()}>{
      list.length > 0 ?
        list.map(item =>
          <div key={item.code} className={cn('item')}>
            {cloneElement(children, {item, ...props})}
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
  children: PropTypes.node.isRequired
};

export default React.memo(List);
