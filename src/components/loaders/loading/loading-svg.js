import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

function LoadingSvg({color}) {

  const cn = bem('Loading')

  return (
    <div className={cn('svg')}>
      <svg xmlns="http://www.w3.org/2000/svg"
           xmlnsXlink="http://www.w3.org/1999/xlink"
           style={{background: "transparent", shapeRendering: "auto", display: 'flex', alignItems: 'flex-end'}}
           viewBox="0 0 100 100"
           width={'35px'}
           preserveAspectRatio="xMidYMid">
        <circle cx="84" cy="70" r="10" fill={color}>
          <animate attributeName="r" repeatCount="indefinite" dur="0.5s" calcMode="spline" keyTimes="0;1" values="10;0"
                   keySplines="0 0.5 0.5 1" begin="0s">
          </animate>
          <animate attributeName="fill" repeatCount="indefinite" dur="2s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1"
                   values="#edcdcf;#d8deca;#e2d6c9;#e6d1cc;#edcdcf" begin="0s">
          </animate>
        </circle>
        <circle cx="16" cy="70" r="10" fill={color}>
          <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="0s">
          </animate>
          <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="0s">
          </animate>
        </circle>
        <circle cx="50" cy="70" r="10" fill={color}>
          <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="-0.5s"></animate>
          <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="-0.5s">
          </animate>
        </circle>
        <circle cx="84" cy="70" r="10" fill={color}>
          <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="-1s">
          </animate>
          <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="-1s">
          </animate>
        </circle>
        <circle cx="16" cy="70" r="10" fill={color}>
          <animate attributeName="r" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="-1.5s">
          </animate>
          <animate attributeName="cx" repeatCount="indefinite" dur="2s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1"
                   values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
                   begin="-1.5s">
          </animate>
        </circle>
      </svg>
    </div>
  )
}

LoadingSvg.propTypes = {
  color: PropTypes.string
}

LoadingSvg.defaultProps = {
  color: '#404040'
}

export default LoadingSvg