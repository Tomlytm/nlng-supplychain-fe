import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ApiDiscoveryInititals, IMockApi } from "@/models/apidiscovery.model";
import { UserInititals } from "@/models/user.model";
import constate from "constate";
import { useEffect, useMemo, useReducer } from "react";

export const initialState: UserInititals = {
  userType: "webber",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_USER_TYPE":
      return {
        ...state,
        userType: action.payload,
      };
  }
};

const useUserContext = () => {
  const [data, setData] = useLocalStorage("user", initialState);
  const [state, dispatch] = useReducer(reducer, data);
  useEffect(() => {
    setData(state);
  }, [state, setData]);

  const { userType } = state as UserInititals;

  const setUserType = (usertype: string) => {
    dispatch({
      type: "SET_USER_TYPE",
      payload: usertype,
    });
  };

  return useMemo(
    () => ({
      userType,
      setUserType,
    }),
    [userType, setUserType]
  );
};

export const [UserProvider, useUser] = constate(useUserContext);
