import { colors } from "@/constants/colors";
import { FC } from "react";
import Svg, { Circle, Path, SvgProps } from "react-native-svg";

export type WatchedIconProps = SvgProps & {
    color?: string;
}

export const WatchedIcon: FC<WatchedIconProps> = ({ color = colors.dark.white, ...props }) => {
    return (
        <Svg
            width={32}
            height={19}
            viewBox="0 0 32 19"
            fill="none"
            {...props}
        >
            <Path
                d="M1.224 9.442C2.684 6.58 7.722.892 16.205 1.026c8.483.135 13.297 5.667 14.644 8.416"
                stroke={color}
            />
            <Path
                d="M1.224 9.271c1.46 2.862 6.498 8.722 14.981 8.587 8.483-.135 13.297-5.838 14.644-8.587"
                stroke={color}
            />
            <Circle cx={16.0365} cy={9.4396} r={7.91604} stroke={color} />
            <Circle
                cx={16.0366}
                cy={9.43953}
                r={1.51985}
                fill={color}
                stroke={color}
            />
        </Svg>
    )
}