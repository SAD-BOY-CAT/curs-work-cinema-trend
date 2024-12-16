import { useNavigation } from "@react-navigation/native";
import { HomeNavigationProps } from "../movie/movie.props";
import { View } from "react-native";
import { useMovie } from "@/hooks/movie.hook";
import { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoritesQuery } from "@/store/api/service/favorite";
import { colors } from "@/constants/colors";
import Header from "@/components/header/header";
import React, { FC, useMemo } from "react";
import Space from "@/components/space/space";
import FlatContainer from "@/app/view/flat-container";

export type FavoriteScreenProps = {}

const FavoriteScreen : FC<FavoriteScreenProps> = () => {
    const navigation = useNavigation<HomeNavigationProps>();
    const onBack = () => {
        navigation.navigate('Home');
    }

    const { selectMovie, onWatched } = useMovie();

    const { data } = useGetFavoritesQuery({});

    const onClickCard = async (id: number) => {
        await onWatched({ movieId: id });
        await selectMovie(id);
    }

    const movies = useMemo(() => data ? data : [], [data])

    const [addFavorite] = useAddFavoriteMutation();
    const [deleteFavorite] = useDeleteFavoriteMutation();

    const onFavorite = async (movieId: number, isFavorite: boolean) => {
        if(isFavorite)  await deleteFavorite({ movieId: movieId });
        else await addFavorite({ movieId: movieId })   
    }


    return(
        <View style={{ flex: 1, backgroundColor: colors.dark.backgroud, paddingHorizontal: 16, paddingTop: 12 }}>
            <Header title="Избранные" onBack={onBack} />
            <Space variant="COLUMN" space={10} />
            <FlatContainer onFavorite={onFavorite} movies={movies} onClickCard={onClickCard} />
        </View>
    )
}

export default FavoriteScreen;