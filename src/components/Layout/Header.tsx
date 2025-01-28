import { usePathname } from "next/navigation";
import { FaRegBell } from "react-icons/fa";

// import { AiOutlineSearch } from 'react-icons/ai';
const Header = () => {
  const pathname = usePathname();
  return (
    <header className="flex justify-end h-16 px-8 capitalize text-[#5C5E64] font-bold text-[30px] bg-white gap-4 items-center  fixed top-0 left-14 md:left-[16rem] w-screen  md:w-[calc(100%-16rem)]">
      <FaRegBell size={20} />
      <img src="/images/avatar.svg" alt="avatar" />      
    </header>
  );
};

export default Header;
