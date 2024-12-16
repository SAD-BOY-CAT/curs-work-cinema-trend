import { DimensionValue, View, ViewProps } from "react-native";
import { styles } from "./row.styles";
import { memo } from "react";

export type RowProps = {
  horizontal?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-evenly";
  vertical?: "flex-start" | "center" | "flex-end";
  width?: DimensionValue;
  paddingHorizontal?: number;
} & ViewProps;

const Row = ({
  horizontal,
  width,
  vertical,
  paddingHorizontal,
  ...rest
}: RowProps) => {
  return (
    <View
      style={[
        styles({ horizontal, vertical, paddingHorizontal, width }).row,
        rest.style,
      ]}
    >
      {rest.children}
    </View>
  );
};

export default memo(Row);
