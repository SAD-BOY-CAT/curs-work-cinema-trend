import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";

export type StyledMovieCard = {
    direction: "row" | "column"
}
export const styles = (props: StyledMovieCard) => StyleSheet.create({
    container: {
        display: "flex",
        paddingVertical: 6,
        paddingHorizontal: 6,
        flexDirection: props.direction,
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
        backgroundColor: colors.dark.foregound,
        borderRadius: 15,
        width: props.direction === "row" ? 185 : 140,
        height: props.direction === "row" ? 120 : 250,
    },
    image: {
        width: props.direction === "column" ? "100%" : 74,
        height: props.direction === "column" ? 147 : 110,
        borderRadius: 10,
    }
})