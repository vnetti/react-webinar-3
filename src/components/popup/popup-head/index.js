import React from "react";
import PropTypes from "prop-types";
import './style.css';

function PopupHead({title, onClose}){

  return (
    <div className='PopupHead'>
      <h1>{title}</h1>
      <button onClick={onClose}>Закрыть</button>
    </div>
  )
}

PopupHead.propTypes = {
  title: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default React.memo(PopupHead);
