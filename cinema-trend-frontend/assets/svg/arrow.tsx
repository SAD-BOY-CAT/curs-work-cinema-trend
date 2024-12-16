import Svg, { Path } from "react-native-svg";

const ArrowSVG = (props: any) => (
  <Svg
    width={13}
    height={20}
    viewBox="0 0 13 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 1L2 10L12 19"
      stroke="#E1E3E6"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
export default ArrowSVG;
