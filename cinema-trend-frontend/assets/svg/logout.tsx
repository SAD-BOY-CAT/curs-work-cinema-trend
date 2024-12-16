import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"


export type LogOutSvgProps = SvgProps & {

}

const LogOutSvg : React.FC<LogOutSvgProps> = (props) => {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      {...props}
    >
      <Path
        d="M14.964 16.125V22.7c0 .767-.46 2.301-2.3 2.301h-9.2C2.643 24.89 1 24.277 1 22.7V3.141c.164-.712.854-2.137 2.3-2.137h9.036c.876-.055 2.628.296 2.628 2.137V9.88m-9.528 3.123H24m0 0l-5.093-4.93M24 13.002l-5.093 4.93"
        stroke="#E1E3E6"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default LogOutSvg
