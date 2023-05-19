import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import Portal from "../portal";

function Popup({children, isOpened, onClose}){

  const cn = bem('Popup')

  if (!isOpened) return null

  return (
    <Portal>
      <div className={cn()}>
        <div className={cn('overlay')} onClick={onClose}/>
        <div className={cn('content')}>{children}</div>
      </div>
    </Portal>
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
