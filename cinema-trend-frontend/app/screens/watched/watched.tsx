import Header from "@/components/header/header";
import { colors } from "@/constants/colors";
import { useNavigation } from "@react-navigation/native";
import { FC, useMemo } from "react"
import { View } from "react-native"
import { HomeNavigationProps } from "../movie/movie.props";
import { useGetWatchedMoviesQuery } from "@/store/api/service/watched";
import { useMovie } from "@/hooks/movie.hook";
import Space from "@/components/space/space";
import FlatContainer from "@/app/view/flat-container";
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from "@/store/api/service/favorite";

export type WatchedScreenProps = {

}

export const WatchedScreen: FC<WatchedScreenProps> = () => {
    const navigation = useNavigation<HomeNavigationProps>();
    const onBack = () => {
        navigation.navigate('Home');
    }

    const { data } = useGetWatchedMoviesQuery({});
    const { selectMovie, onWatched } = useMovie();

    const movies = useMemo(() => data ? data : [], [data])

    const onClickCard = async (id: number) => {
        await onWatched({ movieId: id });
        await selectMovie(id);
    }

    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFavorite] = useDeleteFavoriteMutation();

    const onFavorite = async (movieId: number, isFavorite: boolean) => {
        if(isFavorite)  await deleteFavorite({ movieId: movieId });
        else await addFavorite({ movieId: movieId })   
    }
    
    return (
        <View style={{ flex: 1, backgroundColor: colors.dark.backgroud, paddingHorizontal: 16, paddingTop: 12 }}>
        <Header title="Просмотренные" onBack={onBack} />
        <Space variant="COLUMN" space={10} />
        <FlatContainer onFavorite={onFavorite} movies={movies} onClickCard={onClickCard} />
    </View>
    );
}