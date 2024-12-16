import { RootStackParamList } from "@/app/_layout";
import { useGetMovieByIdMutation, useGetMovieBySearchQuery, useMainMovieQuery } from "@/store/api/service/movie";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo } from "react";
import { useWatchedMovie } from "./watched.hook";
import { useCreateWatchedMovieMutation } from "@/store/api/service/watched";



export const useMovieMain = () => {
    const { data, isLoading } = useMainMovieQuery({});


    const { watchedMovies, onWatched } = useWatchedMovie();

    const newMovies = useMemo(() => {
        return data === undefined ? [] : data.newMovies;
    }, [data])

    const topMovies = useMemo(() => {
        return data === undefined ? [] : data.topMovies;
    }, [data])



    return ({
        newMovies: newMovies,
        topMovies: topMovies,
        watchedMovies: watchedMovies,
        onWatched: onWatched,
    })
}

export type MovieNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Movie'>;


export const useMovie = () => {

    const navigation = useNavigation<MovieNavigationProp>();
    const [getMovieById] = useGetMovieByIdMutation({});

    const [onWatched] = useCreateWatchedMovieMutation();

    const selectMovie = async (id: number) => {
        const movie = await getMovieById({ id: id })
        if (movie.data) navigation.navigate('Movie', { movie: movie.data });
    }

    return ({
        selectMovie: selectMovie,
        onWatched: onWatched,
    })
}