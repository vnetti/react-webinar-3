import React from "react";
import PropTypes from 'prop-types';
import PopupHead from "./popup-head";
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Popup(props){

  const cn = bem('Popup')

  if (!props.isOpened) return null

  return (
    <div className={cn()}>
      <div className={cn('overlay')} onClick={props.onClose}/>
      <div className={cn('content')}>
        <PopupHead title="Корзина" onClose={props.onClose}/>
        {props.children}
        {/* здесь может появиться футтер попапа */}
      </div>
    </div>
  )
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default React.memo(Popup);
