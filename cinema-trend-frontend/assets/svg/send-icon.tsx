import * as React from "react"
import Svg, { Rect, Path, SvgProps } from "react-native-svg"

export type SendIconProps = SvgProps & {

}

const SendIcon : React.FC<SendIconProps> = ({ ...rest }) => {
  return (
    <Svg
      width={42}
      height={30}
      viewBox="0 0 42 30"
      fill="none"
      {...rest}
    >
      <Rect width={42} height={30} rx={15} fill="#E0B9FA" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.59 7.47a.47.47 0 00-.058-.058.498.498 0 00-.5-.087l-14.404 5.04a.5.5 0 00-.038.93l6.31 2.804 2.805 6.311a.5.5 0 00.93-.038l5.041-14.405a.505.505 0 00-.086-.497zm-2.286 1.518l-11.156 3.905 5.02 2.231 6.136-6.136zm-5.428 6.843l6.136-6.135-3.905 11.156-2.231-5.02z"
        fill="#1A1A1A"
      />
    </Svg>
  )
}

export default SendIcon;
