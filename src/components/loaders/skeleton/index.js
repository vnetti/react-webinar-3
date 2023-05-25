function Skeleton({bgColor}) {
  return (
    <div>
      <svg
        role="img"
        width="270"
        height="40"
        aria-labelledby="loading-aria"
        viewBox="0 0 270 40"
        preserveAspectRatio="none"
      >
        <title id="loading-aria">Loading...</title>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath="url(#clip-path)"
          style={{fill: 'url("#fill")'}}
        ></rect>
        <defs>
          <clipPath id="clip-path">
            <rect x="0" y="0" rx="0" ry="0" width="270" height="40" />
          </clipPath>
          <linearGradient id="fill">
            <stop
              offset="0.599964"
              stopColor={bgColor}
              stopOpacity="1"
            >
              <animate
                attributeName="offset"
                values="-2; -2; 1"
                keyTimes="0; 0.25; 1"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
            <stop
              offset="1.59996"
              stopColor="#ffffff"
              stopOpacity="1"
            >
              <animate
                attributeName="offset"
                values="-1; -1; 2"
                keyTimes="0; 0.25; 1"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
            <stop
              offset="2.59996"
              stopColor={bgColor}
              stopOpacity="1"
            >
              <animate
                attributeName="offset"
                values="0; 0; 3"
                keyTimes="0; 0.25; 1"
                dur="2s"
                repeatCount="indefinite"
              ></animate>
            </stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Skeleton