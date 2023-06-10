import useSelector from "../../hooks/use-selector";
import PropTypes from "prop-types";
import {memo} from "react";

function ProtectedPart({children, element}) {
  const session = useSelector(state => ({
    exists: state.session.exists,
    waiting: state.session.waiting
  }))

  if (session.waiting) return <div>Ждём...</div>
  else if (!session.exists) return element
  else return children
}

ProtectedPart.propTypes = {
  children: PropTypes.node,
  element: PropTypes.node,
}

ProtectedPart.defaultProps = {
  element: <div>Войдите, чтобы продолжить</div>
}

export default memo(ProtectedPart)