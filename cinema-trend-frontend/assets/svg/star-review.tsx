import { FC } from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

type StarSVGProps = SvgProps & {
    width: number;
    height: number;
    color: string;
}
const ArrowReviewIcon : FC<StarSVGProps> = ({ width, color = "#D9D9D9", height, ...rest }) => {
  return (
    <Svg
      width={19}
      height={18}
      viewBox="0 0 19 18"
      fill="none"
      {...rest}
    >
      <Path
        d="M8.655 1.338a1 1 0 011.69 0l2.388 3.779a1 1 0 00.63.442l4.435.978a1 1 0 01.524 1.65l-2.933 3.218a1 1 0 00-.257.764l.391 4.29a1 1 0 01-1.37 1.018l-4.279-1.726a1 1 0 00-.748 0l-4.28 1.726a1 1 0 01-1.37-1.018l.392-4.29a1 1 0 00-.257-.764L.679 8.188a1 1 0 01.523-1.65l4.435-.979a1 1 0 00.63-.442l2.388-3.78z"
        fill={color}
      />
    </Svg>
  )
}

export default ArrowReviewIcon