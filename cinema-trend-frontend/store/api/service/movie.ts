import { api } from "../api";

export type MainMove = {
  newMovies: Movie[];
  topMovies: Movie[];
  watchedMovies: Movie[];
};

type Gener =
  | "Action"
  | "Adventure"
  | "Animation"
  | "Comedy"
  | "Drama"
  | "Fantasy"
  | "Horror"
  | "Romance"
  | "Science Fiction"
  | "Thriller"
  | "Documentary";

export type Movie = {
  id: number;
  title: string;
  picture: string;
  description: string;
  releaseDate: string;
  averageRating: number;
  categories: string[];
  review: Review[];
  rating: number;
  duration: number;
  country: string;
  favorite: boolean;
};

export type Categorie = {
  name: string;
  id: number;
};

export type Review = {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateMovieDto = {
  title: string;
  picture: string;
  description: string;
  releaseDate: Date;
  rating: number;
  duration: number;
  country: string;
  genres: Categorie[];
};

export type UpdateMovieDto = {
  id: number;
  title: string;
  picture: string;
  description: string;
  releaseDate: Date;
  rating: number;
  duration: number;
  country: string;
  genres: Categorie[];
};

export const movieApi = api.injectEndpoints({
  endpoints: (build) => ({
    mainMovie: build.query<MainMove, {}>({
      query: () => {
        return {
          url: "/movie/main",
          method: "GET",
        };
      },
      providesTags: ["Review", "Favorite", "Movie"],
    }),
    getMovieById: build.mutation<Movie, { id: number }>({
      query: (data) => {
        return {
          url: "/movie",
          method: "GET",
          params: {
            id: data.id,
          },
        };
      },
    }),
    getMovieBySearch: build.query<Movie[], { keyword: string }>({
      query: (data) => {
        return {
          url: "/movie/search",
          method: "GET",
          params: {
            keyword: data.keyword,
          },
        };
      },
      providesTags: ["Favorite"],
    }),
    getMovieByGenre: build.query<Movie[], { genre: Gener }>({
      query: (data) => {
        return {
          url: "movie/genre",
          method: "GET",
          params: {
            genre: data.genre,
          },
        };
      },
      providesTags: ["Favorite"],
    }),
    createMovie: build.mutation<Movie, CreateMovieDto>({
      query: (data) => {
        return {
          url: "movie/create",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Movie"],
    }),
    deleteMovie: build.mutation<void, number>({
      query: (id) => ({
        url: `movie`,
        method: "DELETE",
        params: {
          id,
        },
      }),
      invalidatesTags: ["Movie", "Favorite", "Watched"],
    }),
    updateMovie: build.mutation<void, UpdateMovieDto>({
      query: (data) => ({
        url: "movie",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Movie", "Favorite", "Watched"],
    }),
  }),
});

export const {
  useMainMovieQuery,
  useGetMovieByIdMutation,
  useGetMovieBySearchQuery,
  useGetMovieByGenreQuery,
  useCreateMovieMutation,
  useDeleteMovieMutation,
  useUpdateMovieMutation,
} = movieApi;
