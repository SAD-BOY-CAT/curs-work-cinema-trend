import { View } from "react-native";
import { styles } from "./space.styles";
import { memo } from "react";

export type SpaceProps = {
    variant: "ROW" | "COLUMN";
    space: number
}

const Space = ({ variant, space }: SpaceProps) => {
    return (
        <View style={styles({ variant, space }).space} />
    )
}

export default memo(Space);
