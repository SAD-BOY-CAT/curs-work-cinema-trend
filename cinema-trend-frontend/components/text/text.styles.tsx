import { StyleSheet } from "react-native";
import text, { TextProps } from "./text";



export const styles = (props: TextProps) => StyleSheet.create({
   text: {
    fontFamily: props.font?.fontFamily,
    fontSize: props.font?.fontSize,
    fontWeight: props.font?.weight,
    color: props.color,
    textTransform: props.transform,
    position: props.position,
    maxWidth: props.maxWidth,
    maxHeight: props.maxHeight,
    lineHeight: props.lineHeight,
    overflow: "hidden",
    height: props.height,
    textAlign: props.align,
    width: props.width,
    alignContent: props.verticalAlign,
    paddingTop: 2
   }
})