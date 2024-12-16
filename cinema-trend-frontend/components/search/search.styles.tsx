import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { Font } from "@/constants/font";

export type StyledSearchProps = {
    font: Font;
}
export const styles = (props: StyledSearchProps) => StyleSheet.create({
    input: {
        width: "100%",
        height: 30,
        borderRadius: 40,
        backgroundColor: colors.dark.foregound,
        paddingVertical: 5,
        paddingLeft: 40,
        paddingRight: 5,
        fontFamily: props.font?.fontFamily,
        fontSize: props.font?.fontSize,
        fontWeight: "bold",
        color: colors.dark.white
    },
    placeholderStyle: {

    }
})