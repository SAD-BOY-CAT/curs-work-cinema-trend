import { User } from "@/store/reducers/user/userSlice";
import { api } from "../api";

export enum Gender {
    MALE = 'MALE',
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export enum Role {
    USER = 'USER',
    MODERATOR= 'MODERATOR'
}

export type UpdateUserRequest = {
    picture?: string;
    username: string;
    gender: Gender;
    date: Date;
}

export type UpdateUserResponse = {
    picture: string;
    username: string;
    role: Role;
    gender: Gender;
    date: Date;
}

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.mutation<User, {}>({
            query: () => {
                return {
                    url: 'user',
                    method: 'GET',
                }
            }
        }),
        updateUser: build.mutation<UpdateUserResponse, UpdateUserRequest>({
            query: (data) => {
                return {
                    url: 'user',
                    method: 'PUT',
                    body: data,
                };
            },
            invalidatesTags: ['User']
        })
    })
})

export const { useGetUserMutation, useUpdateUserMutation } = userApi;