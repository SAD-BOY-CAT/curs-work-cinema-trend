import { api } from "../api";
import { Movie } from "./movie";

export type CreateFavoriteDto = {
    movieId: number;
}

export type DeleteFavoriteDto = {
    movieId: number;
}

export type Favorite = {
    id: number;
    userId: number;
    movieId: number;
    favoritedAt: string;
}

export const favoriteApi = api.injectEndpoints({
    endpoints: (build) => ({
        addFavorite: build.mutation<Favorite, CreateFavoriteDto>({
            query: (data) => {
                return ({
                   url: 'favorite',
                   method: "POST",
                   body : {
                    movieId: data.movieId
                   }
                })
            },
            invalidatesTags: ['Favorite']
        }),
        deleteFavorite: build.mutation<boolean, DeleteFavoriteDto>({
            query: (data) => {
                return ({
                    url: 'favorite',
                    method: 'DELETE',
                    params: {
                        movieId: data.movieId,
                    }
                })
            },
            invalidatesTags: ['Favorite']
        }),
        getFavorites: build.query<Movie[], {}>({
            query: () => {
                return({
                    url: 'favorite',
                    method: 'GET'
                })
            },
            providesTags: ['Favorite']
        })
    })
});

export const { useAddFavoriteMutation, useDeleteFavoriteMutation, useGetFavoritesQuery } = favoriteApi;