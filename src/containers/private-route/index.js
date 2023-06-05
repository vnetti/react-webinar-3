import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

function PrivateRoute({isAuth, children}) {

  const location = useLocation()

  if (isAuth === false) return <Navigate to={'/login'} state={{from: location}}/>

  return children
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  isAuth: null
}

export default PrivateRoute