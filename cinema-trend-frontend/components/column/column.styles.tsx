import { StyleSheet } from "react-native";
import { ColumnProps } from "./column";

export const styles = (props: ColumnProps) => StyleSheet.create({
    column: {
        display: "flex",
        flexDirection: "column",
        width: props.width,
        justifyContent: props.horizontal ? props.horizontal : "flex-start",
        alignItems: props.vertical ? props.vertical : "flex-start",
        height: props.heigth,
        paddingHorizontal: props.paddingHorizontal,
        position: "relative",
    }
})