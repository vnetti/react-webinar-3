import React, {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function SideLayout({children, ...props}) {

  const {side, padding, paddingX, paddingY, gap, border, borderB, borderColor} = props

  const cn = bem('SideLayout');
  return (
    <div className={cn({side, padding, paddingX, paddingY, gap, border, borderB, borderColor})}>
      {React.Children.map(children, (child) => (
        <div key={child.key}>{child}</div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
  paddingX: PropTypes.oneOf(['small', 'medium']),
  paddingY: PropTypes.oneOf(['small', 'medium']),
  gap: PropTypes.oneOf(['small', 'medium']),
  border: PropTypes.oneOf(['solid']),
  borderB: PropTypes.oneOf(['1']),
  borderColor: PropTypes.oneOf(['gainsboro']),
}

SideLayout.defaultProps = {};

export default memo(SideLayout);
