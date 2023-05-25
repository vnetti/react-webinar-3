import "./style.css";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function PaginationItem(props) {

  const cn = bem('PaginationItem');

    return (
      <>
        {props.gap.before && <li className={cn('gap')}>{props.gap.before}</li>}
        <li className={cn()}>
          <button disabled={props.isDisabled}
                  onClick={() => props.onClick(props.item)}>{props.item}</button>
        </li>
        {props.gap.after && <li className={cn('gap')}>{props.gap.after}</li>}
      </>
    )
}

PaginationItem.propTypes = {
  item: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  gap: PropTypes.shape({
    before: PropTypes.node,
    after: PropTypes.node
  })
}

PaginationItem.defaultProps = {
  gap: {
    before: '',
    after: ''
  }
}

export default PaginationItem