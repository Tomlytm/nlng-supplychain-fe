import { MdAdd } from "react-icons/md";
import { EmptyState } from "../utils";
import { IRole } from "@/models/user.model";
import RoleCard from "./RoleCard";
import { Skeleton, useDisclosure } from "@chakra-ui/react";
import EditRole from "../modals/userManagement/editRole";
import { useState } from "react";
type rolesViewProps = {
  roles: IRole[];
  openRoleModal: () => void;
  onRoleUpdated: () => void;
  loading: boolean;
};
export default function RolesView({
  roles,
  openRoleModal,
  onRoleUpdated,
  loading,
}: rolesViewProps) {
  const {
    isOpen: isChangeOpen,
    onClose: onChangeClose,
    onOpen: onChangeOpen,
  } = useDisclosure();
  const [role, setSelectedRole] = useState<IRole>();

  

  return (
    <div className="h-full">
      {loading ? (
        <div className="grid grid-cols-4 gap-5">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Skeleton
              height={200}
              width={"100%"}
              borderRadius={12}
              key={index}
            />
          ))}
        </div>
      ) : roles.length < 1 ? (
        <EmptyState
          heading="No Roles Found"
          subText="Start by creating a new role"
          buttonText="New Role"
          icon={<MdAdd />}
          onClick={() => {
            openRoleModal();
          }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-5">
            {roles.map((item, index) => (
              <RoleCard
                role={item}
                openEdit={onChangeOpen}
                setSelected={setSelectedRole}
                key={index}
              />
            ))}
          </div>
        </div>
      )}
      <EditRole
        isOpen={isChangeOpen}
        onClose={onChangeClose}
        role={role as IRole}
        onRoleUpdated={onRoleUpdated}
      />
    </div>
  );
}
