import { Image, TextInput } from "react-native"
import { styles } from "./search.styles"
import { memo } from "react"
import Row from "../row/row"
import { Font, fonts } from "@/constants/font"
import { colors } from "@/constants/colors"
import { InputEvents } from "@/app/types"
import { SearchIcon } from "@/assets/svg/search-icon"


export type SearchProps = {
    font?: Font;
    value: string;
    onChange: (e: InputEvents) => void;
}

const Search = ({ font = fonts.ht2, value, onChange }: SearchProps) => {
    return (
        <Row style={{ position: "relative" }} width="100%" horizontal="center" vertical="center">
            <SearchIcon style={{ position: "absolute", left: 8, zIndex: 10 }}  />
            <TextInput
                defaultValue={value}
                onChange={onChange}
                placeholder="Search..."
                placeholderTextColor={colors.dark.gray}
                style={styles({ font }).input}
            />
        </Row>
    )
}


export default memo(Search);