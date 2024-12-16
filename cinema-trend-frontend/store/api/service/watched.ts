import { api } from "../api";
import { Movie } from "./movie";

export type CreateWatchedDTO = {
    id: number;
    movieId: number;
    userId: number;
    watchedAt: string;
}

export const watchedApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getWatchedMovies: builder.query<Movie[], {}>({
            query: () => {
                return ({
                    url: 'watched',
                    method: 'GET'
                })
            },
            providesTags: ['Watched', 'Favorite'],
        }),
        createWatchedMovie: builder.mutation<CreateWatchedDTO, { movieId: number }>({
            query: (data) => {
                return ({
                   url: 'watched',
                   method: 'POST',
                   body: {
                    movieId: data.movieId,
                   }
                })
            },
            invalidatesTags: ['Watched'],
        })
    })
})

export const { useGetWatchedMoviesQuery, useCreateWatchedMovieMutation } = watchedApi