import { colors } from "@/constants/colors";
import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export type SearchIconProps = SvgProps & {
    color?: string;
}

export const SearchIcon: FC<SearchIconProps> = ({ color = colors.dark.gray, ...props }) => {
    return (
        <Svg
            width={21}
            height={20}
            viewBox="0 0 21 20"
            fill="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.018 7.85c0 3.194-2.653 5.85-6.01 5.85C4.653 13.7 2 11.045 2 7.85 2 4.657 4.652 2 8.009 2c3.356 0 6.009 2.657 6.009 5.85zm-1.252 6.317A8.08 8.08 0 018.009 15.7C3.586 15.7 0 12.186 0 7.85 0 3.514 3.586 0 8.009 0s8.009 3.515 8.009 7.85a7.723 7.723 0 01-1.791 4.948l5.59 5.48a1 1 0 01-1.4 1.429l-5.651-5.54z"
                fill="#E1E3E6"
            />
        </Svg>
    )
}