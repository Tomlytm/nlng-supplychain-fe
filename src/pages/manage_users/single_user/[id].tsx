const Layout = dynamic(() => import("../../../components/Layout/Layout"), {
  ssr: false,
});
import NewRole from "@/components/modals/userManagement/addNewRole";
import ChangeUserRoleModal from "@/components/modals/userManagement/changeUserRole";
import DeleteUserModal from "@/components/modals/userManagement/deleteUser";
import PermissionCard from "@/components/userManagement/permissionCard";
import { useOnboarding } from "@/context/OnboardingContext";
import { IUser } from "@/models/user.model";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { Skeleton, useDisclosure, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuTrash } from "react-icons/lu";

export default function ManageUsers() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<IUser>();
  const { setApiErrorMessage } = useOnboarding();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    isOpen: isRoleOpen,
    onOpen: onRoleOpen,
    onClose: onRoleClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const getUser = async (id: number) => {
    setLoading(true);
    try {
      const res = await OnboardingServices.getUserById(id);
      setUser(res.data);
      setLoading(false);
    } catch (error: any) {
      console.log(error);

      const errorMessage = error?.response?.data?.message;

      setApiErrorMessage(errorMessage, "error");
      return;
    }
  };
  useEffect(() => {
    if (id) {
      getUser(parseInt(id as string));
    }
  }, [id]);
  return (
    <Layout >
      <div className="flex flex-col gap-8 h-full w-full">
        <button
          className="w-fit h-fit px-5 py-2 flex items-center gap-2 text-[#757575] bg-[#fafafafa] rounded-full"
          onClick={() => router.back()}
        >
          <FaArrowLeftLong /> All users
        </button>
        {loading ? (
          <div className="flex justify-between gap-8">
            <div className="flex flex-col gap-5 w-[30%]">
              <Skeleton height={200} width={"100%"} borderRadius={12} />
            </div>
            <div className="flex flex-col gap-5 w-[70%]">
              {" "}
              <Skeleton height={100} width={"100%"} borderRadius={12} />
              <Skeleton height={100} width={"100%"} borderRadius={12} />
              <Skeleton height={100} width={"100%"} borderRadius={12} />
              <Skeleton height={100} width={"100%"} borderRadius={12} />
              <Skeleton height={100} width={"100%"} borderRadius={12} />
              <Skeleton height={100} width={"100%"} borderRadius={12} />
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="flex flex-col gap-5 w-[30%]">
              <div className="flex items-center gap-2">
                <div className="w-[30px] h-[30px] bg-light-grey rounded-lg flex items-center text-[#052113] justify-center font-semibold ">
                  {user?.name.charAt(0)}
                </div>
                <div className="flex flex-col ">
                  <p className="text-sm text-left text-[#757575]">
                    {user?.name}
                  </p>
                  <p className="text-xs text-mid-grey">
                    Last seen 12/9/2024 13:57
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#757575]">Email Address</p>
                <p className="text-[#474A57]">{user?.officeEmail}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#757575]">Account Status</p>
                <div
                  className={`w-fit h-fit px-3 text-sm py-1 border-[1px] text-sm rounded-full ${
                    user?.onboardingCompleted && !user?.deleted
                      ? "text-success border-success"
                      : "text-mid-grey border-mid-grey"
                  }`}
                >
                  {user?.onboardingCompleted && !user?.deleted
                    ? "Active"
                    : "Inactive"}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[#757575]">Assigned Role</p>
                <p className="text-[#474A57] font-semibold">
                  {user?.roles[0]?.roleName}
                </p>
              </div>
              <div className="flex items-center gap-3 justify-between">
                <button
                  className="w-[90%] py-2 font-semibold text-center bg-secondaryBg text-secondary rounded-lg"
                  onClick={onOpen}
                >
                  Change Role
                </button>
                <div className="w-[10%]">
                  <LuTrash
                    className="text-error cursor-pointer"
                    onClick={onDeleteOpen}
                  />
                </div>
              </div>
            </div>
            <div className="w-[60%] flex flex-col gap-2">
              <p className="text-[#757575]">USER PERMISSIONS</p>
              <PermissionCard />
              <PermissionCard />
              <PermissionCard />
              <PermissionCard />
              <PermissionCard />
            </div>
          </div>
        )}
        <DeleteUserModal
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          users={[user as IUser]}
        />
        <ChangeUserRoleModal
          isOpen={isOpen}
          onClose={onClose}
          users={[user as IUser]}
          onRoleOpen={onRoleOpen} departments={[]}        />

        <NewRole isOpen={isRoleOpen} onClose={onRoleClose} />
      </div>
    </Layout>
  );
}
