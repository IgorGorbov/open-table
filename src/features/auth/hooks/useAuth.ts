import { useCallback, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { api, isAxiosError, ErrorResponseData } from "@/shared/api";

import { useAuthDispatch } from "../AuthContext";

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  email: string;
  password: string;
}

export function useAuth() {
  const dispatch = useAuthDispatch();

  const signIn = useCallback(
    async (data: SignInData) => {
      dispatch({ type: "loading" });

      try {
        const response = await api.post("api/auth/signin", data);

        dispatch({ type: "user", payload: { user: response.data } });
      } catch (error) {
        dispatch({ type: "error", payload: { error: `${error}` } });
      }
    },
    [dispatch]
  );

  const signUp = useCallback(
    async (data: SignUpData) => {
      dispatch({ type: "loading" });

      try {
        const response = await api.post("api/auth/signup", data);

        dispatch({ type: "user", payload: { user: response.data } });
      } catch (error) {
        if (isAxiosError<ErrorResponseData>(error)) {
          const errorMessage = error.response?.data?.errorMessage || `${error}`;

          return dispatch({
            type: "error",
            payload: { error: errorMessage },
          });
        }

        dispatch({ type: "error", payload: { error: `${error}` } });
      }
    },
    [dispatch]
  );

  const signOut = useCallback(() => {
    deleteCookie("jwt");
    dispatch({ type: "reset" });
  }, [dispatch]);

  const fetchUser = useCallback(async () => {
    dispatch({ type: "loading" });

    try {
      const jwt = getCookie("jwt");

      if (jwt) {
        const { data } = await api.post("api/auth/me");

        return dispatch({ type: "user", payload: { user: data } });
      }

      dispatch({ type: "reset" });
    } catch (error) {
      console.warn(error);
      dispatch({ type: "reset" });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { signIn, signUp, signOut };
}
