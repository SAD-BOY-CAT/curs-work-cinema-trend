import { FC, useCallback, useMemo, useState } from "react"
import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "./profile.styles";
import Row from "@/components/row/row";
import Text from "@/components/text/text";
import { fonts } from "@/constants/font";
import ArrowSVG from "@/assets/svg/arrow";
import LogOutSvg from "@/assets/svg/logout";
import Column from "@/components/column/column";
import Space from "@/components/space/space";
import { useUser } from "@/hooks/user.hook";
import { CustomButton } from "@/components/button/button";
import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProps } from "../movie/movie.props";
import HearthSvg from "@/assets/svg/hearth";
import { colors } from "@/constants/colors";
import { WatchedIcon } from "@/assets/svg/watched-icon";
import FlatContainer from "@/app/view/flat-container";
import { useMovie } from "@/hooks/movie.hook";
import { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoritesQuery } from "@/store/api/service/favorite";
import { useGetWatchedMoviesQuery } from "@/store/api/service/watched";
import { EditProfileNavigationProps } from "../edit-profile/edit-profile.props";

export type ProfileProps = {

}
export const ProfileScreen: FC<ProfileProps> = () => {

    const { user, logout } = useUser();
    const navigation = useNavigation<HomeNavigationProps | EditProfileNavigationProps>();

    const onBack = useCallback(() => {
        navigation.navigate('Home');
    }, [])

    const onLogOut = useCallback(() => {
        logout();
    }, [])

    const onEditProfile = useCallback(() => {
        navigation.navigate('EditProfile');
    }, [])

    const [tabs, setTabs] = useState<"FAVORITE" | "WATCHED">("FAVORITE");
    const onTab = () => {
        setTabs(prev => prev === "FAVORITE" ? "WATCHED" : "FAVORITE");
    }

    const { data: watched } = useGetWatchedMoviesQuery({});
    const { data: favorite } = useGetFavoritesQuery({});

    const { selectMovie, onWatched } = useMovie();

    const watcheds = useMemo(() => watched ? watched : [], [watched])
    const favorites = useMemo(() => favorite ? favorite : [], [favorite]);

    const onClickCard = async (id: number) => {
        await onWatched({ movieId: id });
        await selectMovie(id);
    }

    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFavorite] = useDeleteFavoriteMutation();

    const onFavorite = async (movieId: number, isFavorite: boolean) => {
        if (isFavorite) await deleteFavorite({ movieId: movieId });
        else await addFavorite({ movieId: movieId })
    }

    return (
        <View style={styles.container}>
            <Header onBack={onBack} onLogOut={onLogOut} />
            <Space variant="COLUMN" space={20} />
            <ProfileContent
                onEditProfile={onEditProfile}
                username={user?.username || 'user' + (user?.id || 0)}
                mail={user?.email || ''}
                picture={user?.picture}
            />
            <Space variant="COLUMN" space={30} />
            <Tabs onClick={onTab} tabs={tabs} />
            <Space variant="COLUMN" space={30} />
            <FlatContainer movies={tabs === "FAVORITE" ? favorites : watcheds} onClickCard={onClickCard} onFavorite={onFavorite} />
        </View>
    )
}

type Header = {
    onBack: () => void;
    onLogOut: () => void;
}
const Header = ({ onBack, onLogOut }: Header) => {
    return (
        <Row vertical="center" horizontal="space-between" width="100%">
            <TouchableOpacity onPress={onBack}>
                <ArrowSVG />
            </TouchableOpacity>
            <Row vertical="center" horizontal="center">
                <Text font={fonts.h2}>Профиль</Text>
            </Row>
            <TouchableOpacity onPress={onLogOut}>
                <LogOutSvg />
            </TouchableOpacity>
        </Row>
    )
}

type ProfileContentProps = {
    mail: string;
    username: string;
    picture?: string | null;
    onEditProfile: () => void;
}
const ProfileContent: FC<ProfileContentProps> = ({ username, mail, picture, onEditProfile }) => {
    return (
        <Column horizontal="flex-start" vertical="flex-start">
            <Row vertical="center" style={{ width: "100%" }}>
                {picture ?
                    <Image style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        borderColor: colors.dark.primary,
                        borderWidth: 1
                    }} source={{ uri: picture }} /> : <Image style={{
                        width: 70,
                        height: 70,
                    }} source={require('../../../assets/images/defualt-user-icon.png')} />}
                <Space variant="ROW" space={20} />
                <Column vertical="flex-start">
                    <Text font={fonts.h2}>{username}</Text>
                    <Text font={fonts.ht1}>{mail}</Text>
                </Column>
            </Row>
            <Space variant="COLUMN" space={20} />
            <CustomButton
                onPress={onEditProfile}
                height={27}
                borderRadius={20}
                font={fonts.ht2}
                width="100%"
                title="Редактировать профиль"
            />
        </Column>
    )
}


type TabsProps = {
    tabs: "FAVORITE" | "WATCHED";
    onClick: () => void;
}

const Tabs: FC<TabsProps> = ({ tabs, onClick }) => {
    return (
        <Row vertical="center" horizontal="space-evenly" width="100%">
            <Column horizontal="center" vertical="center">
                <TouchableOpacity onPress={onClick}>
                    <HearthSvg color={tabs === "FAVORITE" ? colors.dark.shadow : colors.dark.white} width={20} height={20} variant="UNFILL" />
                </TouchableOpacity>
                <Space space={10} variant="COLUMN" />
                {tabs === "FAVORITE" && <View><View style={styles.line} /></View>}
            </Column>
            <Space space={50} variant="ROW" />
            <Column horizontal="center" vertical="center">
                <TouchableOpacity onPress={onClick}>
                    <WatchedIcon color={tabs === "WATCHED" ? colors.dark.shadow : colors.dark.white} />
                </TouchableOpacity>
                <Space space={10} variant="COLUMN" />
                {tabs === "WATCHED" && <View><View style={styles.line} /></View>}
            </Column>
        </Row>
    )
}
