import { api } from "../api";

export type Review = {
    id: number;
    rating: number;
    content: string;
    userId: number;
    movieId: number;
    createdAt: string;
    updatedAt: string;
    user: UserReview;
}

type UserReview = {
    id: number;
    username: string | null;
    picture: string | null;
}

export type ReviewDTO = {
    id: number;
}

type CreateReviewDTO = {
    rating: number;
    content: string;
    movieId: number;
}

export const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getReview: builder.query<Review[], ReviewDTO>({
            query: (data) => {
                return ({
                    url: '/review',
                    method: 'GET',
                    params: {
                        movieId: data.id,
                    }
                })
            },
            providesTags: ['Review', 'User']
        }),
        createReview: builder.mutation<Review, CreateReviewDTO>({
            query: (data) => {
                return ({
                    url: '/review/create',
                    method: 'POST',
                    body: {
                        rating: data.rating,
                        content: data.content,
                        movieId: data.movieId,
                    }
                })
            },
            invalidatesTags: ['Review'],
        }),
        deleteReview : builder.mutation<Review, { id: number }>({
            query: (data) => {
                return({
                    url: '/review/delete',
                    method: 'DELETE',
                    body : {
                        id: data.id
                    }
                })
            },
            invalidatesTags: ['Review'],
        })
    })
})


export const { useGetReviewQuery, useCreateReviewMutation, useDeleteReviewMutation } = reviewApi;