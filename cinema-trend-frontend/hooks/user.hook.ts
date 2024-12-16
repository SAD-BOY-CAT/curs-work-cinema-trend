import { useAppDispatch, useTypedSelector } from "@/store";
import { useGetUserMutation, useUpdateUserMutation } from "@/store/api/service/user";
import { authSlice } from "@/store/reducers/auth/authSlice";
import { userSlice } from "@/store/reducers/user/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const useUser = () => {
    const { user, state } = useTypedSelector(state => state.user);
    const dispatch = useAppDispatch();

    const [getUser] = useGetUserMutation();
    const [updateUser, { data, isLoading }] = useUpdateUserMutation();

    const getUserByToken = async () => {
        await getUser({});
    }

    const clear = async () => {
        dispatch(userSlice.actions.clear());
        dispatch(authSlice.actions.clear());
        await AsyncStorage.removeItem("token");
    }

    const logout = async () => {
        clear();
    }

    useEffect(() => {
       if(state === "ERROR") clear();
    }, [state, clear]);

    return {
        state: state,
        user: user,
        getUser: getUserByToken,
        logout: logout,
        updateUser
    }
}