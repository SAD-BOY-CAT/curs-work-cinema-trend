import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

export type StarSVGProps = SvgProps & {
    width: number;
    heigth: number;
}

const StarSVG: FC<StarSVGProps> = ({ width, heigth, ...rest }) => (
    <Svg
        width={width}
        height={heigth}
        viewBox="0 0 20 19"
        fill="none"
        {...rest}
    >
        <Path
            d="M10 0L13.2328 5.55041L19.5106 6.90983L15.2308 11.6996L15.8779 18.0902L10 15.5L4.12215 18.0902L4.76919 11.6996L0.489435 6.90983L6.76718 5.55041L10 0Z"
            fill="#BD37F3"
        />
    </Svg>
);
export default StarSVG;
