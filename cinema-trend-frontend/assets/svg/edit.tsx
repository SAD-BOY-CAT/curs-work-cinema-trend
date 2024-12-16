import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

type Props = {
  size?: number;
} & SvgProps;

export const EditSvg: React.FC<Props> = ({ size = 52, ...props }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 52 52" fill="none" {...props}>
      <G clipPath="url(#clip0_292_9)" fill="#fff">
        <Path d="M7.583 52h32.5a7.605 7.605 0 007.584-7.611v-16.33a2.167 2.167 0 00-4.334 0v16.33a3.267 3.267 0 01-3.25 3.278h-32.5a3.267 3.267 0 01-3.25-3.279V11.946a3.267 3.267 0 013.25-3.278h16.25a2.167 2.167 0 100-4.334H7.583A7.605 7.605 0 000 11.945v32.444A7.605 7.605 0 007.583 52z" />
        <Path d="M20.486 22.845l-1.71 7.83a2.168 2.168 0 00.587 1.996 2.249 2.249 0 001.994.583l7.813-1.714c.405-.089.777-.293 1.07-.587l19.747-19.747a6.5 6.5 0 000-9.193 6.652 6.652 0 00-9.19 0L21.08 21.779a2.167 2.167 0 00-.594 1.066zM43.86 5.08a2.215 2.215 0 013.063 0 2.186 2.186 0 010 3.061l-1.531 1.532-3.064-3.064 1.532-1.53zM24.576 24.392L39.255 9.678l3.033 3.049-14.684 14.718-3.889.854.863-3.907z" />
      </G>
      <Defs>
        <ClipPath id="clip0_292_9">
          <Path fill="#fff" d="M0 0H52V52H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
