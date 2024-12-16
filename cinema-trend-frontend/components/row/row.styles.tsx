import { StyleSheet } from "react-native";
import { RowProps } from "./row";

export const styles = (props: RowProps) => StyleSheet.create({
    row: {
        display: "flex",
        flexDirection: "row",
        width: props.width,
        justifyContent: props.horizontal ? props.horizontal : "flex-start",
        alignItems: props.vertical ? props.vertical : "flex-start",
        paddingHorizontal: props.paddingHorizontal,
    }
})