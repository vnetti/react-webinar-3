import React, {useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function Portal({children}){

  const [container] = useState(() => document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    };
  }, []);

  return ReactDOM.createPortal(children, container)
}

Portal.propTypes = {
  children: PropTypes.node.isRequired
};

Portal.defaultProps = {
  children: <div>Не передан компонент!</div>
}

export default Portal;
