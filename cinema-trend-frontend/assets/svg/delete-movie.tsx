import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

type Props = {
  color: string;
  size: number;
} & SvgProps;

export const DeleteSvg: React.FC<Props> = ({ color, size, ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none" {...props}>
      <G clipPath="url(#clip0_284_15)">
        <Path
          d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_284_15">
          <Path fill="#fff" d="M0 0H48V48H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
