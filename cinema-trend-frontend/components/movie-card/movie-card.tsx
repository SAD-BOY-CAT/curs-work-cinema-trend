import { memo } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { styles } from "./movie-card.styles";
import Column from "../column/column";
import Text from "../text/text";
import { fonts } from "@/constants/font";
import { colors } from "@/constants/colors";
import Row from "../row/row";
import Space from "../space/space";
import { getDurationFormat, getGanre } from "@/constants/categorys";
import StarSVG from "@/assets/svg/star";
import HearthSvg from "@/assets/svg/hearth";

export type MovieCardProps = {
    id: number;
    direction: "row" | "column";
    age: number;
    rate: number;
    title: string;
    ganre: string[];
    duration: number;
    picture: string;
    onClick: () => void;
    onFavorite: (movieId: number, isFavorite: boolean) => Promise<void>;
    favorite: boolean;
}

const MovieCard = ({ direction, age, rate, title, ganre, duration, picture, onClick, onFavorite, favorite, id }: MovieCardProps) => {
    const style = styles({ direction: direction });
    const ganreSliced = ganre.slice(0, 3).map((item) => getGanre(item));

    const time = getDurationFormat(duration);

    const onClickFavorite = async () => {
        await onFavorite(id, favorite);
    }

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={style.container}>
                <TouchableOpacity onPress={onClickFavorite} style={{ position: "absolute", zIndex: 10, left: 8, top: direction === "row" ? 8 : 12, }}>
                    <HearthSvg variant={favorite === true ? "FILL" : "UNFILL"} />
                </TouchableOpacity>
                <Image source={{
                    uri: picture
                }} style={style.image} />
                <Space variant={direction === "row" ? "ROW" : "COLUMN"} space={direction === "row" ? 10 : 0} />
                <Column heigth={direction === "column" ? "auto" : "100%"} width="auto" vertical="flex-start" horizontal="space-between">
                    <Text color={colors.dark.shadow} font={fonts.s}>{time}</Text>
                    <Column horizontal="center">
                        <Text verticalAlign="center" lineHeight={13} height={direction === "column" ? 35 : "auto"} width={direction === "row" ? 90 : 115} font={fonts.h3}>
                            {title.length > 15 ? title.slice(0, 15) + "..." : title}
                        </Text>
                        <Space variant="COLUMN" space={direction === "column" ? 0 : 3} />
                        <Text lineHeight={11} width={direction === "row" ? 90 : 115} font={fonts.s}>{ganreSliced.join(', ')}</Text>
                    </Column>
                    <Row vertical="center" horizontal="space-between">
                        <Row vertical="center">
                            <StarSVG width={12} heigth={12} />
                            <Space variant="ROW" space={2} />
                            <Text font={fonts.s}>{rate.toFixed(1)}</Text>
                        </Row>
                        <Space variant="ROW" space={direction === "row" ? 40 : 70} />
                        <Text font={fonts.s}>{age}+</Text>
                    </Row>
                </Column>
            </View>
        </TouchableOpacity>
    )
}

export default memo(MovieCard)