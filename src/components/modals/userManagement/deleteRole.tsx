import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { Button } from "../../utils";
import { IApi } from "@/models/api.model";
import { useRouter } from "next/router";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";
import { IMockUser, IRole, IUser } from "@/models/user.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
type addEndpointModalProps = {
  isOpen: boolean;
  onClose: () => void;
  role: IRole;
};
export default function DeleteUserModal({
  isOpen,
  onClose,
  role,
}: addEndpointModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { setApiErrorMessage } = useOnboarding();
  const toast = useToast();
  const deleteUser = async (id: number) => {
    setLoading(true);
    try {
      const res = await OnboardingServices.deleteUserById(id);
      if (res.status === "OK") {
        toast({
          status: "success",
          description: `user ${role.roleName} has been deleted`,
          position: "bottom-right",
        });
      }
      setLoading(false);
      router.reload();
    } catch (error: any) {
      console.log(error);
      setLoading(false);
      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };

  const isSingleUSer = (users: IUser[]) => {
    if (users.length > 1) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent className="p-2 ">
        {/* <ModalHeader className="text-mid-grey font-semibold">
            Delete API
          </ModalHeader> */}
        <ModalCloseButton />
        <ModalBody className="w-full  rounded-lg bg-white">
          <div className="flex flex-col gap-5">
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M66.7174 96H29.2828C28.5368 96 27.8214 95.7038 27.2942 95.1761L0.823875 68.706C0.29625 68.1786 0 67.4632 0 66.7174V29.2826C0 28.5367 0.29625 27.8214 0.823875 27.294L27.294 0.823875C27.8214 0.29625 28.5368 0 29.2828 0H66.7174C67.4634 0 68.1787 0.296438 68.706 0.823875L95.1761 27.294C95.7036 27.8214 96 28.5367 96 29.2826V66.7172C96 67.4631 95.7038 68.1784 95.1761 68.7058L68.7062 95.1761C68.1787 95.7036 67.4634 96 66.7174 96Z"
                fill="url(#paint0_linear_32_6999)"
              />
              <path
                d="M48 56.4375C43.3476 56.4375 39.5625 52.6524 39.5625 48V25.5C39.5625 20.8476 43.3476 17.0625 48 17.0625C52.6524 17.0625 56.4375 20.8476 56.4375 25.5V48C56.4375 52.6524 52.6524 56.4375 48 56.4375Z"
                fill="url(#paint1_linear_32_6999)"
              />
              <path
                d="M48 78.9375C43.3476 78.9375 39.5625 75.1524 39.5625 70.5C39.5625 65.8476 43.3476 62.0625 48 62.0625C52.6524 62.0625 56.4375 65.8476 56.4375 70.5C56.4375 75.1524 52.6524 78.9375 48 78.9375Z"
                fill="url(#paint2_linear_32_6999)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_32_6999"
                  x1="48"
                  y1="96"
                  x2="48"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E60000" />
                  <stop offset="1" stop-color="#FFC2CC" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_32_6999"
                  x1="48"
                  y1="56.4375"
                  x2="48"
                  y2="17.0625"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFC2CC" />
                  <stop offset="1" stop-color="#FFF2F4" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_32_6999"
                  x1="48"
                  y1="78.9375"
                  x2="48"
                  y2="62.0625"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#FFC2CC" />
                  <stop offset="1" stop-color="#FFF2F4" />
                </linearGradient>
              </defs>
            </svg>

            <p className="text-[#474A57]">
              You are about to remove the user{" "}
              <span className="font-semibold text-dark-grey">
                {" "}
                {role.roleName}{" "}
              </span>
              . If you continue, all configurations on this role would be lost.
            </p>
            <p className="text-[#474A57]">Do you want to continue?</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="w-full flex justify-end gap-3">
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-[#F5F5F5] text-[#474A57] font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="w-fit h-fit rounded-lg px-4 py-1 bg-error-bg text-error font-semibold"
              onClick={() => {}}
            >
              {loading ? <Spinner size={"sm"} /> : "Yes, Remove"}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
