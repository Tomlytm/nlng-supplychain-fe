export default function PermissionCard() {
  return (
    <div className="flex text-[#474A57] rounded-xl flex-col gap-1 p-3 bg-[#F5F5F5]">
      <p className="font-[500]">User Management</p>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="w-fit h-fit rounded-full px-3 py-1 bg-white text-sm font-[400]">
          <p>Add User</p>
        </div>
        <div className="w-fit h-fit rounded-full px-3 py-1 bg-white text-sm font-[400]">
          <p>Remove User</p>
        </div>
        <div className="w-fit h-fit rounded-full px-3 py-1 bg-white text-sm font-[400]">
          <p>Edit User</p>
        </div>
      </div>
    </div>
  );
}
