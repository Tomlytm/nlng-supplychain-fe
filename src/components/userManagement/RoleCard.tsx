import { IRole } from "@/models/user.model";
import { Dispatch, SetStateAction } from "react";
import { RxDividerVertical } from "react-icons/rx";

type roleCardProps = {
  role: IRole;
  openEdit: () => void;
  setSelected: Dispatch<SetStateAction<IRole | undefined>>;
};
export default function RoleCard({
  role,
  openEdit,
  setSelected,
}: roleCardProps) {
  return (
    <div className="h-[150px] border-l-[3px] hover:shadow-md cursor-pointer rounded-lg p-2 border-secondary bg-[#FAFAFACC] flex flex-col justify-between">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="15" fill="white" />
        <g clip-path="url(#clip0_32_6282)">
          <path
            d="M11.783 10.826L20 9L28.217 10.826C28.4391 10.8754 28.6377 10.999 28.78 11.1764C28.9224 11.3538 29 11.5745 29 11.802V21.789C28.9999 22.7767 28.756 23.7492 28.2899 24.62C27.8238 25.4908 27.1499 26.2331 26.328 26.781L20 31L13.672 26.781C12.8503 26.2332 12.1765 25.4911 11.7103 24.6205C11.2442 23.7498 11.0002 22.7776 11 21.79V11.802C11 11.5745 11.0776 11.3538 11.22 11.1764C11.3623 10.999 11.5609 10.8754 11.783 10.826ZM13 12.604V21.789C13 22.4475 13.1626 23.0957 13.4733 23.6763C13.7839 24.2568 14.2332 24.7517 14.781 25.117L20 28.597L25.219 25.117C25.7667 24.7518 26.2158 24.2571 26.5265 23.6767C26.8372 23.0964 26.9998 22.4483 27 21.79V12.604L20 11.05L13 12.604ZM20 19C19.337 19 18.7011 18.7366 18.2322 18.2678C17.7634 17.7989 17.5 17.163 17.5 16.5C17.5 15.837 17.7634 15.2011 18.2322 14.7322C18.7011 14.2634 19.337 14 20 14C20.663 14 21.2989 14.2634 21.7678 14.7322C22.2366 15.2011 22.5 15.837 22.5 16.5C22.5 17.163 22.2366 17.7989 21.7678 18.2678C21.2989 18.7366 20.663 19 20 19ZM15.527 24C15.6482 22.8984 16.1717 21.8803 16.9971 21.1407C17.8225 20.4012 18.8918 19.9922 20 19.9922C21.1082 19.9922 22.1775 20.4012 23.0029 21.1407C23.8283 21.8803 24.3518 22.8984 24.473 24H15.527Z"
            fill="#00338D"
          />
        </g>
        <defs>
          <clipPath id="clip0_32_6282">
            <rect
              width="24"
              height="24"
              fill="white"
              transform="translate(8 8)"
            />
          </clipPath>
        </defs>
      </svg>
      <p className="text-[#474A57] font-[500] max-w-[200px] text-nowrap text-ellipsis overflow-hidden">
        {role?.roleName}
      </p>
      <div className="flex items-center gap-1">
        <p className="text-xs text-[#757575]">
          Users <span className="text-[#474A57] font-semibold"></span>
        </p>
        <RxDividerVertical className="text-[#D5D5D5]" />
        <p className="text-xs text-[#757575]">
          Permissions{" "}
          <span className="text-[#474A57] font-semibold">
            {role.policies.length}
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-xs text-secondary border-b-[1px] border-primary"
          onClick={() => {
            openEdit();
            setSelected(role);
          }}
        >
          Edit
        </button>
        <RxDividerVertical className="text-[#D5D5D5]" />
        <button
          className="text-xs text-secondary border-b-[1px] border-primary"
          onClick={() => {
            // openEdit();
            setSelected(role);
          }}
        >
          Disable
        </button>
      </div>
    </div>
  );
}
