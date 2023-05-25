import "./style.css";
import {cn as bem} from "@bem-react/classname";

function ProductCardSkeleton({}) {

  const cn = bem('ProductCardSkeleton');

    return (
      <div className={cn()}>
        <svg
          role="img"
          width="100%"
          aria-labelledby="loading-aria"
          viewBox="0 0 1024 300"
          preserveAspectRatio="none">
          <title id="loading-aria">Loading...</title>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            clipPath="url(#clip-path)"
            style={{fill: 'url("#fill")'}}/>
          <defs>
            <clipPath id="clip-path">
              <rect x="0" y="0" width="150" height="20" />
              <rect x="160" y="0" width="115" height="20" />
              <rect x="285" y="0" width="155" height="20" />
              <rect x="450" y="0" width="240" height="20" />
              <rect x="700" y="0" width="25" height="20" />
              <rect x="735" y="0" width="85" height="20" />
              <rect x="830" y="0" width="100" height="20" />
              <rect x="940" y="0" width="80" height="20" />
              <rect x="0" y="30" width="220" height="20" />
              <rect x="230" y="30" width="115" height="20" />
              <rect x="355" y="30" width="155" height="20" />
              <rect x="520" y="30" width="245" height="20" />
              <rect x="775" y="30" width="40" height="20" />
              <rect x="825" y="30" width="60" height="20" />
              <rect x="895" y="30" width="125" height="20" />
              <rect x="0" y="60" width="40" height="20" />
              <rect x="50" y="60" width="110" height="20" />
              <rect x="170" y="60" width="115" height="20" />
              <rect x="295" y="60" width="155" height="20" />
              <rect x="460" y="60" width="245" height="20" />
              <rect x="715" y="60" width="155" height="20" />
              <rect x="0" y="100" width="185" height="20" />
              <rect x="195" y="100" width="160" height="20" />
              <rect x="365" y="100" width="25" height="20" />
              <rect x="0" y="140" width="100" height="20" />
              <rect x="120" y="140" width="210" height="20" />
              <rect x="0" y="180" width="130" height="20" />
              <rect x="140" y="180" width="60" height="20" />
              <rect x="0" y="220" width="85" height="30" />
              <rect x="95" y="220" width="125" height="30" />
              <rect x="0" y="270" width="100" height="20" />
            </clipPath>
            <linearGradient id="fill">
              <stop
                offset="0.599964"
                stopColor="#e0e0e0"
                stopOpacity="1">
                <animate
                  attributeName="offset"
                  values="-2; -2; 1"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"/>
              </stop>
              <stop
                offset="1.59996"
                stopColor="#ffffff"
                stopOpacity="1">
                <animate
                  attributeName="offset"
                  values="-1; -1; 2"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"/>
              </stop>
              <stop
                offset="2.59996"
                stopColor="#e0e0e0"
                stopOpacity="1">
                <animate
                  attributeName="offset"
                  values="0; 0; 3"
                  keyTimes="0; 0.25; 1"
                  dur="2s"
                  repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
}

ProductCardSkeleton.propTypes = {
  
}

ProductCardSkeleton.defaultProps = {

}

export default ProductCardSkeleton