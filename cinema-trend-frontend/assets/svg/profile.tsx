import { FC } from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

export type ProfileIconProps = SvgProps & {

}

export const ProfileIcon: FC<ProfileIconProps> = ({ ...props }) => {
    return (
        <Svg
            width={26}
            height={26}
            viewBox="0 0 28 28"
            fill="none"
            {...props}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.28 22.686A11.965 11.965 0 0026 14c0-6.627-5.373-12-12-12S2 7.373 2 14c0 3.384 1.4 6.441 3.654 8.623.137-.859.41-1.767.927-2.611 1.183-1.934 3.466-3.279 7.429-3.279 4.003 0 6.237 1.489 7.384 3.469.474.818.739 1.684.886 2.483zm.187 2.465A13.978 13.978 0 0028 14c0-7.732-6.268-14-14-14S0 6.268 0 14c0 4.564 2.184 8.618 5.564 11.174l.007.095.11-.008A13.937 13.937 0 0014 28c3.152 0 6.061-1.042 8.401-2.8h.066v-.033-.016zm-2.026-1.024c-.056-.911-.231-1.98-.777-2.923-.721-1.244-2.216-2.47-5.654-2.47-3.48 0-5.002 1.143-5.723 2.321-.573.938-.739 2.05-.752 3.056A11.944 11.944 0 0014 26c2.37 0 4.58-.687 6.44-1.873zM14 13.867a2.667 2.667 0 100-5.334 2.667 2.667 0 000 5.334zm0 2a4.667 4.667 0 100-9.334 4.667 4.667 0 000 9.334z"
                fill="#FFFFFF"
            />
        </Svg>
    )
}