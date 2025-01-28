import OnboardingLayout from "@/components/Layout/onboardingLayout";
import { Button, Input } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { SignInDto } from "@/models/onboarding.model";
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
import { FaChevronLeft } from "react-icons/fa";

export default function VerifyLogin() {
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState<string>("");

  const { setApiErrorMessage, setUser } = useOnboarding();
  const initialValues = {
    loginCode: "",
  };

  function validate(values: any) {
    // setErrorMessage("");
    const errors: any = {};
    if (!values.loginCode) {
      errors.loginCode = "This field is required";
    }

    // const reg = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    // if (!values.password) {
    //   errors.password = "This field is required";
    // }
    // //

    return errors;
  }

  async function onSubmit(values: any, actions: any) {
    try {
      const loginData: SignInDto = {
        email: values.email,
        password: values.password,
      };

      //   const loginres = await OnboardingServices.signInUser(loginData);
      //   actions.setSubmitting(false);
      //   CookieManager.setCookie("jwt", loginres.data.jwt, 12);
      //   toast({
      //     status: "success",
      //     description: "Welcome",
      //     position: "bottom-right",
      //   });

      //   setUser(loginres.data.user);
      //   if (loginres.data.user.roles.some((r: Irole) => r.id === 1)) {
      //     router.push({
      //       pathname: "/api_discovery",
      //     });
      //     setUserType("webber");
      //   } else {
      //     router.push({
      //       pathname: "/admin_back_office/category_management",
      //     });
      //   }
    } catch (error: any) {
      console.log(error);
      actions.setSubmitting(false);

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
          <p className="text-[24px] font-bold">Verify Login</p>
          <p className="text-[16px] text-mid-grey">
            A login code has been sent to your email address{" "}
            <span className="font-semibold">bolajiper@nlng.com.ng</span> enter
            the code to continue
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
                      isInvalid={
                        form.errors.loginCode && form.touched.loginCode
                      }
                    >
                      <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                        Login Code
                      </FormLabel>
                      <Input
                        // secondaryElement
                        type="text"
                        placeholder="Enter Your login Code"
                        field={{ ...field }}
                      />

                      <FormErrorMessage>
                        {form.errors.loginCode}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <div className="my-5">
                  <Button
                    Type="submit"
                    text="CONTINUE"
                    className="font-semibold"
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
