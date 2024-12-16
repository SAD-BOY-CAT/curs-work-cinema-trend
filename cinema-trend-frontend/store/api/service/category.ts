import { Gener } from "@/constants/categorys";
import { api } from "../api";

export type Category = {
    id: number;
    name: Gener;
}

export const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategory: build.query<Category[], void>({
        query: () => {
            return ({
                url: 'category',
                method: 'GET'
            })
        }
    })
  })
})

export const { useGetCategoryQuery } = categoryApi;