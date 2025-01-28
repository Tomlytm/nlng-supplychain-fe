import { useOnboarding } from "@/context/OnboardingContext";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode | React.ReactNode[];
};
const toastProps: UseToastOptions = {
  description: "",
  status: "error",
  duration: 3000,
  isClosable: true,
  position: "bottom-right",
};
export default function OnboardingLayout({ children }: LayoutProps) {
  const toast = useToast();
  const router = useRouter();
  const { setApiErrorMessage, errorMessage, errorStatus, layout } =
    useOnboarding();

  useEffect(() => {
    if (errorMessage) {
      const status = errorStatus;
      toast({ ...toastProps, description: errorMessage, status });
    }
    return () => {
      // setApiErrorMessage(null);
    };
  }, [errorMessage, errorStatus, setApiErrorMessage, toast]);
  // useEffect(() => {
  //   const handleOffline = (event: any) => {
  //     const status = "warning";
  //     const message = "No internet connection";
  //     setApiErrorMessage(message, status);
  //   };
  //   window.addEventListener("offline", handleOffline);

  //   return () => {
  //     window.removeEventListener("offline", handleOffline);
  //   };
  // }, [setApiErrorMessage]);
  return <div className="onboardingBg">{children}</div>;
}
