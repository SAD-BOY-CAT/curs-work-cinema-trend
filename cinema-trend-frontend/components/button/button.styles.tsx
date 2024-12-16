import { DimensionValue, StyleSheet } from "react-native";
import { CustomButtonProps } from "./button";
import { colors } from "@/constants/colors";

export const styles = (props: {
    width?: DimensionValue;
    height?: DimensionValue;
    borderRadius?: number;
}) => StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: props.width,
        height: props.height,
        borderRadius: props.borderRadius,
        backgroundColor: colors.dark.primary,
        fontSize: 20,
        color: colors.dark.backgroud,
    }
})