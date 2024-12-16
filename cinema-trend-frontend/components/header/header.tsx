import { TouchableOpacity } from "react-native";
import Row from "../row/row";
import ArrowSVG from "@/assets/svg/arrow";
import Text from "../text/text";
import { fonts } from "@/constants/font";

type Header = {
    onBack: () => void;
    title: string;
}
const Header = ({ onBack, title }: Header) => {
    return (
        <Row vertical="center" horizontal="space-between" width="100%">
            <TouchableOpacity onPress={onBack}>
                <ArrowSVG />
            </TouchableOpacity>
            <Row vertical="center" horizontal="center">
                <Text font={fonts.h2}>{title}</Text>
            </Row>
            <TouchableOpacity></TouchableOpacity>
        </Row>
    )
}

export default Header