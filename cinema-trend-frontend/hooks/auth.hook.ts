import { useAppDispatch, useTypedSelector } from "@/store";
import {
  useLoginMutation,
  useRegistrationMutation,
} from "@/store/api/service/auth";
import { authSlice } from "@/store/reducers/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useUser } from "./user.hook";
import { userSlice } from "@/store/reducers/user/userSlice";

export const useAuth = () => {
  const { authToken } = useTypedSelector((state) => state.auth);
  const { getUser, user } = useUser();

  const dispatch = useAppDispatch();

  const [login, { isError }] = useLoginMutation();

  const [state, setState] = useState<"LOADING" | "SUCCESS">("LOADING");

  const onLogin = async (email: string, password: string) => {
    const responce = await login({ email, password });
    if (!responce.data?.token) return;

    await AsyncStorage.setItem("token", responce.data.token);
    dispatch(authSlice.actions.setToken(responce.data.token));
    await getUser();
  };

  const [registration, { isSuccess, isError: registrationError }] =
    useRegistrationMutation();

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      dispatch(userSlice.actions.clear());
      return;
    }

    dispatch(authSlice.actions.setToken(token));
    await getUser();
    setState("SUCCESS");
  };

  useEffect(() => {
    checkToken();
  }, []);

  return {
    login: onLogin,
    state: state,
    userToken: authToken,
    registration,
    regSuccess: isSuccess,
    isError,
    registrationError,
  };
};
