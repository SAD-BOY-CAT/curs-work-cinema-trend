import { colors } from "@/constants/colors";
import { fonts } from "@/constants/font";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inputName : {
        width: "100%",
        height: 30,
        borderRadius: 20,
        backgroundColor: colors.dark.foregound,
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: fonts.ht2.fontFamily,
        color: colors.dark.white,
        borderColor: "transperent"
    }
})