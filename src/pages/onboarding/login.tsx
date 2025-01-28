import OnboardingLayout from "@/components/Layout/onboardingLayout";
import { Button, Input } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import CookieManager from "@/helper_utils/cookie_manager";
import { SignInDto } from "@/models/onboarding.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { errorMessage, setApiErrorMessage, setUser, setLayout } =
    useOnboarding();
  const initialValues = {
    email: "",
    password: "",
  };
  useEffect(() => {
    setLoading(false);
    console.log(errorMessage, "login");
  }, [errorMessage]);

  function validate(values: any) {
    // setErrorMessage("");
    const errors: any = {};
    if (!values.email) {
      errors.email = "This field is required";
    }

    const reg = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!values.password) {
      errors.password = "This field is required";
    }
    //

    return errors;
  }

  async function onSubmit(values: any, actions: any) {
    setLoading(true);
    try {
      const loginData: SignInDto = {
        email: values.email,
        password: values.password,
      };

      const loginres = await OnboardingServices.signInUser(loginData);
      actions.setSubmitting(false);
      CookieManager.setCookie("jwt", loginres.data.jwt, 12);
      toast({
        status: "success",
        description: "Welcome",
        position: "bottom-right",
      });

      setUser(loginres.data.user);
      router.push("/dashboard");
      setLayout(1);
    } catch (error: any) {
      console.log(error);
      actions.setSubmitting(false);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  }
  return (
    <OnboardingLayout>
      <div className="bg-white rounded-xl sm:w-[70%] md:w-[30%] flex flex-col gap-3 p-5 shadow-md">
        <Image
          src={"/icons/logo.svg"}
          alt="logo"
          width={500}
          height={500}
          className="w-[20%]"
        />

        <div className="flex flex-col ">
          <p className="text-[24px] font-bold">Welcome Back</p>
          <p className="text-[16px] text-mid-grey">
            Enter your email address continue
          </p>
        </div>
        <div className="w-full">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
          >
            {(props) => (
              <Form>
                <Field name="email">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      mt={3}
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                        Email Address
                      </FormLabel>
                      <Input
                        // secondaryElement
                        type="text"
                        placeholder="Enter Your Email"
                        field={{ ...field }}
                        onBlur={() => {
                          setApiErrorMessage(null);
                        }}
                      />
                      {errorMessage &&
                        errorMessage != "" &&
                        form.values.email === "" && (
                          <div className="bg-error-bg p-2 w-full">
                            <p className="text-sm text-error">{errorMessage}</p>
                          </div>
                        )}
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }: { field: any; form: any }) => (
                    <FormControl
                      mt={3}
                      isInvalid={form.errors.password && form.touched.password}
                    >
                      <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                        Password
                      </FormLabel>
                      <Input
                        secondaryElement
                        // type="text"
                        placeholder="ayz@corp.com"
                        field={{ ...field }}
                      />

                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <div className="my-5">
                  <Button
                    Type="submit"
                    className="font-semibold"
                    text="CONTINUE"
                    loading={loading}
                    type="full"
                    onClick={() => {}}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <p className="text-sm text-mid-grey font-[400]">
          Having issues logging in? Please contact your organization’s admin for
          help
        </p>
      </div>
    </OnboardingLayout>
  );
}
