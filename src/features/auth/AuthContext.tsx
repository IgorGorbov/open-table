"use client";

import React, { PropsWithChildren, useReducer } from "react";

interface User {
  id: never;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface AuthState {
  loading: boolean;
  user: User | null;
  error: string | null;
}

interface LoadingAction {
  type: "loading";
}

interface SetErrorAction {
  type: "error";
  payload: {
    error: string;
  };
}

interface SetUserAction {
  type: "user";
  payload: {
    user: User;
  };
}

interface ResetAction {
  type: "reset";
}

type Action = LoadingAction | SetErrorAction | SetUserAction | ResetAction;

const initValue: AuthState = { loading: false, user: null, error: null };

export const AuthContext = React.createContext<AuthState>(initValue);

export const AuthDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {}
);

function reducer(state: AuthState, action: Action): AuthState {
  if (action.type === "loading") {
    return {
      ...state,
      error: null,
      loading: true,
    };
  }

  if (action.type === "error") {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    };
  }

  if (action.type === "user") {
    return {
      ...state,
      loading: false,
      error: null,
      user: action.payload.user,
    };
  }

  if (action.type === "reset") {
    return initValue;
  }

  return state;
}

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initValue);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export function useAuthState() {
  const state = React.useContext(AuthContext);

  if (!state) {
    throw new Error("AuthContext is undefined");
  }

  return state;
}

export function useAuthDispatch() {
  const dispatch = React.useContext(AuthDispatchContext);

  if (!dispatch) {
    throw new Error("AuthDispatchContext is undefined");
  }

  return dispatch;
}
