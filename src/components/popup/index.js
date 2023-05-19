import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';

function Popup({children, isOpened, onClose}){

  const cn = bem('Popup')

  if (!isOpened) return null

  return (
    <div className={cn()}>
      <div className={cn('overlay')} onClick={onClose}/>
      <div className={cn('content')}>{children}</div>
    </div>
  )
}

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

Popup.defaultProps = {
  children: <div>Не передан компонент!</div>,
  isOpened: false,
  onClose: () => {},
}

export default Popup;
