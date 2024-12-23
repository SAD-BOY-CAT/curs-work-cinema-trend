import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

type Props = {
  color: string;
} & SvgProps;

export const CloseSvg: React.FC<Props> = ({ color, ...props }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M6.4 19L5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19z"
        fill={color}
      />
    </Svg>
  );
};
