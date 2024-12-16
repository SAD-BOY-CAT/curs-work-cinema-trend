import { DimensionValue, TouchableOpacity } from "react-native"
import { styles } from "./button.styles";
import { colors } from "@/constants/colors";
import { memo } from "react";
import { Font, fonts } from "@/constants/font";
import Text from "../text/text";

export type CustomButtonProps = {
    onPress: () => void;
    title: string;
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
    font?: Font;
    color?: string;
}

export const CustomButton = memo(({ onPress, title, width, height, borderRadius, font = fonts.ht1, color = colors.dark.backgroud }: CustomButtonProps) => {
    return (
        <TouchableOpacity style={styles({ width: width, height: height, borderRadius: borderRadius, }).button} onPress={onPress}>
            <Text color={color} font={font}>{title}</Text>
        </TouchableOpacity>
    )
});