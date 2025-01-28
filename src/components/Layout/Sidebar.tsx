"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/sidebar_logo.svg";
import { useRouter } from "next/router";
import { FaRegBell } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import { FiFileText, FiLayers, FiSliders } from "react-icons/fi";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { TbLogout2 } from "react-icons/tb";
import { GoFileDirectory } from "react-icons/go";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useLogout } from "@/hooks/useLocalStorage";
import { useOnboarding } from "@/context/OnboardingContext";
import { IoChatbubbleOutline } from "react-icons/io5";

const Sidebar = () => {
  const logout = useLogout();
  const { user } = useOnboarding();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Define all links
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      sublinks: [],
      icon: <BiHomeAlt size={17} />,
    },
    {
      label: "Demand Plans",
      href: 
      user?.roles[0]?.roleType === "cp_focal" ? "/cp_demand_plans": "/demand-plan",
      sublinks: [],
      icon: <FiFileText size={17} />,
    },
    {
      label: "MESC Directory",
      href: "/mesc-directory",
      sublinks: [],
      icon: <GoFileDirectory size={17} />,
    },
    {
      label: "Drafts",
      href: "/drafts",
      sublinks: [],
      icon: <FiLayers size={17} />,
    },
    {
      label: "Chat",
      href: "/chat",
      sublinks: [],
      icon: <IoChatbubbleOutline size={17} />

    },
    {
      label: "Report",
      href: "/report",
      sublinks: [],
      icon: <FiSliders size={17} />,
    },
    {
      label: "Manage Users",
      href: "/manage_users",
      sublinks: [],
      icon: <MdOutlineManageAccounts size={17} />,
    },
  ];
  console.log(user)

  // Filter links based on user role
  const filteredLinks =
    user?.roles[0]?.roleType === "cp_focal"
      ? links.filter(
        (link) =>
          link.label === "Dashboard" ||
          link.label === "Demand Plans" ||
          link.label === "Report" ||
          link.label === "Chat"
      )
      : links;

  useEffect(() => {
    // Ensure this runs only on the client side
    setIsClient(true);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {!isSidebarOpen && (
        <div className="md:hidden border-b border-[#E4E7EC] fixed p-4 h-16 z-20 shadow-lg">
          <HiOutlineBars3BottomRight
            onClick={toggleSidebar}
            className="text-2xl cursor-pointer"
          />
        </div>
      )}
      <div
        className={`fixed w-[257px] overflow-y-auto py-4 px-3 pt-5 z-20 h-screen border-r border-[#E4E7EC] bg-white transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        {isSidebarOpen && (
          <div className="md:hidden absolute top-4 right-4 z-20">
            <LiaTimesSolid
              onClick={toggleSidebar}
              className="text-2xl cursor-pointer"
            />
          </div>
        )}
        <div className="max-h-[90%] overflow-y-auto">
          {/* Logo */}
          <div>
            <Image
              src={"/images/logonew.svg"}
              alt="logo"
              width={70}
              height={50}
              className=""
            />
          </div>
          {/* Navigation */}
          <nav>
            <ul className=" h-full  mt-3 max-h-[50vh] overflow-y-auto">
              {filteredLinks.map((link, id) => (
                <li key={id} className="mb-1">
                  <Link href={link.href}>
                    <span
                      className={`text-[#363636] text-sm p-3 flex gap-3 items-center rounded-lg ${router.pathname.includes(link.href)
                          ? "bg-[#006A20] text-white font-semibold"
                          : "focus:bg-[#006A20] focus:text-[#101928]"
                        }`}
                    >
                      {link.icon} {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* Footer Section */}
        {user?.roles[0]?.roleType === 'business_focal' ? (
          <div className="fixed pb-2 px-3 left-0 bottom-0 w-full">
            <div className="flex justify-between items-center px-3 mb-5">
              <div className="flex gap-3 items-center text-sm">
                <FaRegBell size={20} />
                Notifications
              </div>
              <div className="bg-[#BFB2FF] text-[#363636] rounded-[4px] text-xs py-[1px] px-2 font-medium">
                12
              </div>
            </div>
            <div
              className="flex gap-3 items-center text-sm text-red-500 cursor-pointer px-3 mb-5"
              onClick={logout}
            >
              <TbLogout2 color="red" size={20} />
              Log out
            </div>
            {isClient && user && (
              <div className="flex gap-5 items-center py-3 px-4 mb-5 bg-[#363636] text-white rounded-lg">
                <img src="/images/avatar.svg" alt="avatar" />
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-[10px]">{user.officeEmail}</p>
                  <p className="text-[#808080] text-xs">
                    ({user?.department?.abbreviation}/{user?.department?.id})
                  </p>
                </div>
              </div>
            )}
          </div>

        ) : (
          <div
            className="flex gap-3 items-center text-sm text-red-500 cursor-pointer px-3 mb-5 absolute bottom-0"
            onClick={logout}
          >
            <TbLogout2 color="red" size={20} />
            Log out
          </div>
        )}
      </div>
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;
