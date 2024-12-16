import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../reducers";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4200",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.authToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Review", "Watched", "Favorite", "User", "Movie"],
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
