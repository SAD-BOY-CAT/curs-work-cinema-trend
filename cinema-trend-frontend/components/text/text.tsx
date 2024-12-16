import { Font, fonts } from "@/constants/font";
import { FunctionComponent, memo } from "react"
import { Text as BaseText, TextProps as BaseTextProps, DimensionValue } from "react-native";
import { styles } from "./text.styles";
import { colors } from "@/constants/colors";

export type TextProps = {
    font?: Font;
    color?: string;
    transform?: "none" | "capitalize" | "uppercase" | "lowercase";
    position?: "absolute" | "relative" | "static";
    maxWidth?: number;
    maxHeight?: number;
    height?: DimensionValue;
    align?: "auto" | "left" | "right" | "center" | "justify";
    lineHeight?: number;
    width?: DimensionValue;
    verticalAlign? : "center" | "flex-start" | "flex-end" | "stretch" | "space-between" | "space-around" | "space-evenly";
} & BaseTextProps;

const Text: FunctionComponent<TextProps> = ({ font = fonts.ht1, align, width, color = colors.dark.text, position, verticalAlign, transform = "none", maxWidth, lineHeight, height, maxHeight, ...rest }) => {
    return (
        <BaseText style={styles({ font, color, transform, position, maxWidth, maxHeight, lineHeight, height, align, width, verticalAlign }).text} {...rest}>
            {rest.children}
        </BaseText>
    )
}


export default memo(Text);