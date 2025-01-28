import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Select,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { Button, Input } from "@/components/utils";
import { useOnboarding } from "@/context/OnboardingContext";
import { SignInDto } from "@/models/onboarding.model";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { CreateUser, IRole } from "@/models/user.model";
type NewCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onRoleOpen: () => void;
};

export default function NewUser({
  isOpen,
  onClose,
  onRoleOpen,
}: NewCategoryModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [roles, setRoles] = useState<IRole[]>([]);
  const toast = useToast();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");

  const { setApiErrorMessage, user } = useOnboarding();
  const initialValues = {
    name: "",
    jobTitle: "",
    officeEmail: "",
    officePhoneNumber: "",
    createdBy: "",
    password: "",
    roleIds: "",
  };
  useEffect(() => {
    setLoading(false);
    getAllRoles();
  }, []);

  const getAllRoles = async () => {
    try {
      const res = await OnboardingServices.getAllRoles();
      setRoles(res.data.roles);
    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      // setApiErrorMessage(errorMessage, "error");
      return;
    }
  };

  function validate(values: any) {
    // setErrorMessage("");
    const errors: any = {};
    if (!values.officeEmail) {
      errors.email = "This field is required";
    }
    if (!values.name) {
      errors.name = "This field is required";
    }

    // const reg = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!values.role) {
      errors.role = "This field is required";
    }
    if (!values.officePhoneNumber) {
      errors.officePhoneNumber = "This field is required";
    }
    if (!values.password) {
      errors.password = "This field is required";
    }
    if (!values.jobTitle) {
      errors.jobTitle = "This field is required";
    }
    //

    return errors;
  }

  async function onSubmit(values: any, actions: any) {
    setLoading(true);
    try {
      const Data: CreateUser = {
        officeEmail: values.officeEmail,
        roleIds: [parseInt(values.role)],
        name: values.name,
        jobTitle: values.jobTitle,
        officePhoneNumber: values.officePhoneNumber,
        createdBy: user?.name as string,
        password: values.password,
      };

      const res = await OnboardingServices.CreateUser(Data);
      if (res.status === "OK") {
        actions.setSubmitting(false);
        toast({
          status: "success",
          description: `User ${res.data.name} has been added successfully`,
          position: "bottom-right",
        });
        onClose();
      }
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="">
          <div className="flex flex-col ">
            <p className="text-[24px] font-bold">New User</p>
            <p className="text-[16px] text-[#757575]">
              A mail will be sent to the user to complete their account setup
            </p>
          </div>
        </ModalHeader>
        <ModalCloseButton
          position="absolute"
          top="28px"
          right="30px"
          size="sm"
          _hover={{ bg: "gray.200" }}
          sx={{
            borderRadius: "full",
            border: "2px solid gray",
            borderColor: "gray.700",
          }}
        />
        <ModalBody className="w-full rounded-lg bg-white">
          <div className=" rounded-xl flex flex-col gap-3  ">
            <div className="w-full">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={validate}
              >
                {(props) => (
                  <Form>
                    <Field name="officeEmail">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={
                            form.errors.officeEmail && form.touched.officeEmail
                          }
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Email Address
                          </FormLabel>
                          <Input
                            // secondaryElement
                            type="text"
                            placeholder="Your email address ( .....@.....)"
                            field={{ ...field }}
                          />

                          <FormErrorMessage>
                            {form.errors.officeEmail}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="name">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Name of User
                          </FormLabel>
                          <Input
                            // secondaryElement
                            type="text"
                            placeholder="Your name (Jane Foster)"
                            field={{ ...field }}
                          />

                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="jobTitle">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={
                            form.errors.jobTitle && form.touched.jobTitle
                          }
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Job Title
                          </FormLabel>
                          <Input
                            // secondaryElement
                            type="text"
                            placeholder="Your name (Jane Foster)"
                            field={{ ...field }}
                          />

                          <FormErrorMessage>
                            {form.errors.jobTitle}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="officePhoneNumber">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={
                            form.errors.officePhoneNumber &&
                            form.touched.officePhoneNumber
                          }
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Phone number
                          </FormLabel>
                          <Input
                            // secondaryElement
                            type="text"
                            placeholder="Enter Phone number"
                            field={{ ...field }}
                          />

                          <FormErrorMessage>
                            {form.errors.officePhoneNumber}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Password
                          </FormLabel>
                          <Input
                            // secondaryElement
                            type="text"
                            placeholder="Insert Password"
                            field={{ ...field }}
                            secondaryElement
                          />

                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="role">
                      {({ field, form }: { field: any; form: any }) => (
                        <FormControl
                          mt={3}
                          isInvalid={form.errors.role && form.touched.role}
                        >
                          <FormLabel fontSize="14px" fontWeight={500} mb={1}>
                            Role
                          </FormLabel>
                          <select
                            // type="text"
                            // placeholder="Assign a role to the user"
                            {...field}
                            className="p-2 w-full rounded-lg border"
                          >
                            <option value="">Assign a role to the user</option>
                            {roles.map((item, index) => (
                              <option value={item.id} key={index}>
                                {item.roleName}
                              </option>
                            ))}
                          </select>

                          <FormErrorMessage>
                            {form.errors.role}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    {/* <div
                      className="mt-2 flex items-center cursor-pointer gap-2"
                      onClick={onRoleOpen}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 9H5V11H9V15H11V11H15V9H11V5H9V9Z"
                          fill="#0085C8"
                        />
                      </svg>
                      <p className="text-[#474A57]">
                        Can’t find the role? Create a user role
                      </p>
                    </div> */}

                    <div className="my-5 flex gap-2 items-center justify-end">
                      <button
                        className="bg-[#F5F5F5] w-fit h-fit px-5 py-2 rounded-lg text-[#474A57]"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Cancel
                      </button>
                      <Button
                        Type="submit"
                        className="font-semibold"
                        text="Add User"
                        type="fit"
                        onClick={() => {}}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
