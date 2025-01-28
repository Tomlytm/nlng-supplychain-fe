import { useLocalStorage } from "@/hooks/useLocalStorage";
import { ErrorStatusEnum, OnboardingInitials } from "@/models/onboarding.model";
import { IUser } from "@/models/user.model";
import { layout } from "@chakra-ui/react";
import constate from "constate";
import { useCallback, useEffect, useMemo, useReducer } from "react";

export const initialState: OnboardingInitials = {
  progress: 0,
  stage: 0,
  layout: 0,
  errorMessage: "",
  errorStatus: "error",
  user: null,
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_PROGRESS":
      return {
        ...state,
        progress: action.payload,
      };
    case "SET_STAGE":
      return {
        ...state,
        stage: action.payload,
      };
    case "SET_LAYOUT":
      return {
        ...state,
        layout: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        errorStatus: action.errorStatus,
        errorMessage: action.errorMessage,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        apiCategory: action.payload,
      };
  }
};

const useOnboardingContext = () => {
  const [data, setData] = useLocalStorage("onb", initialState);
  const [state, dispatch] = useReducer(reducer, data);
  useEffect(() => {
    setData(state);
  }, [state, setData]);
  const { progress, stage, layout, errorMessage, errorStatus, user } =
    state as OnboardingInitials;

  const setProgress = useCallback((progress: number) => {
    dispatch({
      type: "SET_PROGRESS",
      payload: progress,
    });
  }, []);

  const setStage = useCallback((stage: number) => {
    dispatch({
      type: "SET_STAGE",
      payload: stage,
    });
  }, []);

  const setLayout = useCallback((layout: number) => {
    dispatch({
      type: "SET_LAYOUT",
      payload: layout,
    });
  }, []);
  const setUser = useCallback((user: IUser | null) => {
    dispatch({
      type: "SET_USER",
      payload: user,
    });
  }, []);
  const setApiErrorMessage = useCallback(
    (errorMessage: string | null, errorStatus: ErrorStatusEnum = "error") => {
      dispatch({
        type: "SET_ERROR_MESSAGE",
        errorMessage,
        errorStatus,
      });
    },
    [dispatch]
  );

  return useMemo(
    () => ({
      progress,
      stage,
      layout,

      setProgress,
      user,
      setStage,
      setLayout,
      errorMessage,
      errorStatus,
      setApiErrorMessage,
      setUser,
    }),
    [
      user,
      progress,

      setProgress,
      stage,
      setStage,
      layout,
      setLayout,

      errorMessage,
      errorStatus,
      setApiErrorMessage,
      setUser,
    ]
  );
};

export const [OnboardingProvider, useOnboarding] =
  constate(useOnboardingContext);
