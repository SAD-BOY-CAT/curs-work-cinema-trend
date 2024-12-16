import { useCreateWatchedMovieMutation, useGetWatchedMoviesQuery } from "@/store/api/service/watched"
import { useCallback, useMemo } from "react";

export const useWatchedMovie = () => {
    const { data } = useGetWatchedMoviesQuery({});
    const [createWatched] = useCreateWatchedMovieMutation();

    const watchedMovies = useMemo(() => !data ? [] : data, [data]);

    const onWatched = useCallback((id: number) => {
        createWatched({ movieId: id });
    }, [createWatched]);


    return {
        watchedMovies: watchedMovies,
        onWatched: onWatched,
    }

}