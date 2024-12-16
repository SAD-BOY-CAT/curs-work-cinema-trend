import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "flex-start",
        backgroundColor: colors.dark.backgroud,
        paddingTop: 15,
        paddingHorizontal: 16,
        flexDirection: "column",
    },
    line: {
        position: "absolute",
        width: 50,
        height: 1,
        left: -25,
        backgroundColor: colors.dark.shadow,
    }
})