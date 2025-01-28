import { MdAdd } from "react-icons/md";
import { EmptyState, Table } from "../utils";
import { IDept, IMockUser, IUser } from "@/models/user.model";
import { Checkbox, Skeleton, useDisclosure } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { RiEyeLine } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { LuTrash } from "react-icons/lu";
import DeleteUserModal from "../modals/userManagement/deleteUser";
import ChangeUserRoleModal from "../modals/userManagement/changeUserRole";
import { useRouter } from "next/router";
type usersViewProps = {
  users: IUser[];
  departments: IDept[];
  openUserModal: () => void;
  openRoleModal: () => void;
  loading: boolean;
};

export default function UsersView({
  users,
  departments,
  openUserModal,
  openRoleModal,
  loading,
}: usersViewProps) {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);
  const [allChecked, setAllChecked] = useState<boolean>(false);
  const {
    isOpen: isDeleteOpen,
    onClose: onDeleteClose,
    onOpen: onDeleteOpen,
  } = useDisclosure();
  const {
    isOpen: isChangeOpen,
    onClose: onChangeClose,
    onOpen: onChangeOpen,

  } = useDisclosure();
  const handleSelectedUsers = (
    e: ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    console.log(departments)
    const { checked, name } = e.target;
    if (name === "all") {
      setAllChecked(checked);
      if (checked) {
        setSelectedUsers(users); // Select all users
      } else {
        setSelectedUsers([]); // Deselect all users
      }
    } else if (index !== undefined) {
      const user = users[index];
      const isSelected = selectedUsers.some(
        (selectedUser) => selectedUser.id === user.id
      );

      if (checked && !isSelected) {
        // Add user to selectedUsers
        setSelectedUsers([...selectedUsers, user]);
      } else if (!checked && isSelected) {
        // Remove user from selectedUsers
        setSelectedUsers(
          selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
        );
      }
    }
  };

  return (
    <div className="h-full">
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <Skeleton
              height={10}
              width={"100%"}
              borderRadius={12}
              key={index}
            />
          ))}
        </div>
      ) : users.length < 1 ? (
        <EmptyState
          heading="No Users Found"
          subText="Start by creating a new user"
          buttonText="New User"
          icon={<MdAdd />}
          onClick={() => {
            openUserModal();
          }}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {selectedUsers?.length > 0 ? (
            <div className="flex items-center gap-2">
              <p className="text-[#474A57]">
                {selectedUsers?.length} items Selected
              </p>
              <button
                className="w-fit h-fit rounded-full bg-secondaryBg px-5 py-2 text-secondary"
                onClick={() => {
                  onChangeOpen();
                }}
              >
                Update Role
              </button>
              <button
                className="w-fit h-fit rounded-full bg-secondaryBg px-5 py-2 text-secondary"
                onClick={() => {
                  onDeleteOpen();
                }}
              >
                Remove
              </button>
              <button
                className="w-fit h-fit flex items-center gap-2 px-5 py-2 text-[#757575]"
                onClick={() => setSelectedUsers([])}
              >
                <RxCross1 />
                Dismiss
              </button>
            </div>
          ) : null}
          <Table>
            <Table.Header>
              <Table.Heading className="  text-dark-grey">
                <Checkbox
                  name="all"
                  isChecked={allChecked}
                  onChange={handleSelectedUsers}
                />
              </Table.Heading>
              <Table.Heading className=" text-dark-grey">
                FULL NAME
              </Table.Heading>
              <Table.Heading className="text-dark-grey">EMAIL</Table.Heading>
              <Table.Heading className="text-dark-grey">ROLE</Table.Heading>
              <Table.Heading className="text-dark-grey">STATUS</Table.Heading>
              <Table.Heading className="text-dark-grey">DEPARTMENT</Table.Heading>
              <Table.Heading className="text-dark-grey">OPTIONS</Table.Heading>
            </Table.Header>
            <Table.Body
              data={users}
              render={(item: IUser, index: number) => (
                <tr key={index}>
                  <th className="text-left px-6">
                    <Checkbox
                      name={`user-${index}`}
                      isChecked={selectedUsers.some(
                        (selectedUser) => selectedUser.id === item.id
                      )}
                      onChange={(e) => handleSelectedUsers(e, index)}
                    />
                  </th>
                  <th className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="w-[30px] h-[30px] bg-light-grey rounded-lg flex items-center text-[#052113] justify-center font-semibold ">
                        {item.name.charAt(0)}
                      </div>
                      <div className="flex flex-col ">
                        <p className="text-sm text-left text-[#757575]">
                          {item.name}
                        </p>
                        {/* <p className="text-xs text-mid-grey">
                          Last seen 12/9/2024 13:57
                        </p> */}
                      </div>
                    </div>
                  </th>
                  <th className="p-2">
                    <p className="text-sm text-left">{item.officeEmail}</p>
                  </th>
                  <th className="p-2">
                    <p className="text-sm font-semibold text-left">
                      {item.roles[0]?.roleName}
                    </p>
                  </th>
                  <th className="p-2">
                    <div
                      className={`w-fit h-fit px-3 py-1 border-[1px] text-sm rounded-full ${item.onboardingCompleted && !item.deleted
                        ? "text-success border-success"
                        : "text-mid-grey border-mid-grey"
                        }`}
                    >
                      {item.onboardingCompleted && !item.deleted
                        ? "Active"
                        : "Inactive"}
                    </div>
                  </th>
                  <th className="p-2">
                    <p className="text-sm font-semibold text-left">
                      {item?.department?.departmentName}
                    </p>
                  </th>
                  <th className="p-2">
                    <div className="flex items-center gap-2">
                      <RiEyeLine
                        className="cursor-pointer hover:text-secondary"
                        onClick={() =>
                          router.push(`/manage_users/single_user/${item.id}`)
                        }
                      />
                      <CiEdit
                        className="cursor-pointer hover:text-secondary"
                        onClick={() => {
                          setSelectedUsers([item]);
                          onChangeOpen();
                        }}
                      />
                      <LuTrash
                        className="cursor-pointer hover:text-secondary"
                        onClick={() => {
                          setSelectedUsers([item]);
                          onDeleteOpen();
                        }}
                      />
                    </div>
                  </th>
                </tr>
              )}
            ></Table.Body>
          </Table>
          <DeleteUserModal
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            users={selectedUsers}
          />
          <ChangeUserRoleModal
            // getUsers={getUsers}
            departments={departments}
            isOpen={isChangeOpen}
            onClose={onChangeClose}
            users={selectedUsers}
            onRoleOpen={openRoleModal}
          />
        </div>
      )}
    </div>
  );
}
