import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type Props = {
  size: number;
} & SvgProps;

export const AddFilmSvg: React.FC<Props> = ({ size = 29, ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 29 29" fill="none" {...props}>
      <Path
        d="M14.5 27.071c-6.893 0-12.5-5.607-12.5-12.5s5.607-12.5 12.5-12.5S27 7.678 27 14.571s-5.607 12.5-12.5 12.5zm0-23c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5S25 20.36 25 14.571s-4.71-10.5-10.5-10.5z"
        fill="#fff"
      />
      <Path
        d="M14.5 21.571a1 1 0 01-1-1v-12a1 1 0 012 0v12a1 1 0 01-1 1z"
        fill="#fff"
      />
      <Path d="M20.5 15.571h-12a1 1 0 110-2h12a1 1 0 010 2z" fill="#fff" />
    </Svg>
  );
};
