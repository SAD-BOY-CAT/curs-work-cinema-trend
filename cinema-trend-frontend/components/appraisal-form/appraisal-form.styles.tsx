import { colors } from "@/constants/colors";
import { fonts } from "@/constants/font";
import { DimensionValue, StyleSheet } from "react-native";

export const styles = (props: { height: number, width: DimensionValue }) => StyleSheet.create({
    textarea: {
        width: props.width,
        fontFamily: fonts.ht2.fontFamily,
        fontSize: fonts.ht2.fontSize,
        color: colors.dark.text,
        borderRadius: 40,
        height: props.height,
        paddingLeft: 15,
        paddingRight: 5,
        paddingTop: 6,
        backgroundColor: colors.dark.foregound
    }
})