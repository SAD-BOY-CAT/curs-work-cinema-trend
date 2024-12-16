import { Gender, Role, UpdateUserResponse, userApi } from "@/store/api/service/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserInfo = {
   user: User | null;
   state: "LOADING" | "IDLE" | "SUCCESS" | "ERROR" | "UNAUTORIZATION";
}

export type User = {
   id: number;
   email: string;
   username: string | null;
   picture: string | null;
   password: string;
   date: Date | null;
   gender: Gender | null;
   role: Role;
}

const initialData: UserInfo = {
   user: null,
   state: "IDLE",
}

export const userSlice = createSlice({
   name: 'user',
   initialState: initialData,
   reducers: {
      clear(state) {
         state.state = "UNAUTORIZATION";
         state.user = null;
      }
   },
   extraReducers: (builder) => {
      builder.addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action: PayloadAction<User>) => {
         state.user = action.payload;
         state.state = "SUCCESS";
      }),
         builder.addMatcher(userApi.endpoints.getUser.matchPending, (state) => {
            state.state = "LOADING";
         }),
         builder.addMatcher(userApi.endpoints.getUser.matchRejected, (state) => {
            state.user = null;
            state.state = "ERROR";
         })
      builder.addMatcher(userApi.endpoints.updateUser.matchFulfilled, (state, action: PayloadAction<UpdateUserResponse>) => {
         if (state.user) {
            state.user.date = action.payload.date;
            state.user.gender = action.payload.gender;
            state.user.username = action.payload.username;
            state.user.picture = action.payload.picture
         }
      })
   }
})

export default userSlice.reducer;