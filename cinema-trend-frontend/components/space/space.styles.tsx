import { StyleSheet } from "react-native";
import { SpaceProps } from "./space";

export const styles = (props: SpaceProps) => StyleSheet.create({
    space: {
        marginTop: props.variant === "COLUMN" ? props.space : 0,
        marginLeft: props.variant === "ROW" ? props.space : 0,
    }
})