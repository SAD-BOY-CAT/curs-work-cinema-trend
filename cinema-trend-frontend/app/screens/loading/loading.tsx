import Row from "@/components/row/row"
import Space from "@/components/space/space"
import Text from "@/components/text/text"
import { colors } from "@/constants/colors"
import { fonts } from "@/constants/font"
import { View } from "react-native"

const Loading = () => {
    return (
        <View style={{ flex: 1, backgroundColor: colors.dark.backgroud, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Row vertical="center" horizontal="center" width="100%">
                <Text font={fonts.h1}>КИНО</Text>
                <Space variant="ROW" space={5} />
                <Text color={colors.dark.shadow} font={fonts.h1}>ТРЕНД</Text>
            </Row>
        </View>
    )
}

export default Loading;