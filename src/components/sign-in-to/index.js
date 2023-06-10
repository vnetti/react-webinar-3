import {cn as bem} from '@bem-react/classname'
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {memo} from "react";
import './style.css'

function SignInTo({ability, paddingY, paddingX}) {

  const cn = bem('SingInTo')

  return (
    <div className={cn({paddingY, paddingX})}>
      <p>
        <Link to={'/login'} state={{ back: location.pathname }} >Войдите</Link>, чтобы иметь возможность {ability}
      </p>
    </div>
  )
}

SignInTo.propTypes = {
  ability: PropTypes.node,
  paddingY: PropTypes.oneOf(['small', 'medium']),
  paddingX: PropTypes.oneOf(['small', 'medium', 'big', 'very-big'])
}

SignInTo.defaultProps = {
  ability: 'продолжить',
}

export default memo(SignInTo)