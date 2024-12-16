import { memo } from "react"
import { DimensionValue, View, ViewProps } from "react-native";
import { styles } from "./column.styles";


export type ColumnProps = {
    horizontal?: "flex-start" | "center" | "flex-end" | "space-between";
    vertical?: "flex-start" | "center" | "flex-end";
    heigth?: DimensionValue;
    width?: DimensionValue;
    paddingHorizontal?: number;
} & ViewProps;

const Column = ({ horizontal, heigth, vertical, width="100%", paddingHorizontal, ...rest }: ColumnProps) => {
    return (
        <View style={styles({ horizontal: horizontal, vertical: vertical, heigth: heigth, paddingHorizontal: paddingHorizontal }).column}>
            {rest.children}
        </View>
    )
}

export default memo(Column)