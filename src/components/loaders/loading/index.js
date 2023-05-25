import {cn as bem} from '@bem-react/classname'
import LoadingSvg from "./loading-svg";
import './style.css'
import PropTypes from "prop-types";

function Loading({inscription, color}) {

  const cn = bem('Loading')

  return (
    <div className={cn('')} style={{color: color}}>
      {inscription}
      <LoadingSvg color={'black'}/>
    </div>
  )
}

Loading.propsTypes = {
  inscription: PropTypes.string.isRequired,
  color: PropTypes.string
}

Loading.defaultProps = {
  color: '#404040'
}

export default Loading