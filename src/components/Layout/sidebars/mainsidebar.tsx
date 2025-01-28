import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BsFilePlay, BsSearch } from "react-icons/bs";
import {
  MdFolder,
  MdHomeFilled,
  MdInsertChartOutlined,
  MdOutlineMapsHomeWork,
  MdPhoneAndroid,
} from "react-icons/md";
import { FiFolder } from "react-icons/fi";
import { IoMenu } from "react-icons/io5";
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Show,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaFileSignature, FaFolder } from "react-icons/fa";
import { useApi } from "@/context/ApiDiscoveryContext";
import { useOnboarding } from "@/context/OnboardingContext";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { IoIosList, IoMdNotificationsOutline } from "react-icons/io";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";
import { useLogout } from "@/hooks/useLocalStorage";
export default function MainSidebar() {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { bookmarkedAPIs, libraryView, setLibraryView } = useApi();
  const { user } = useOnboarding();
  const logout = useLogout();
  const [activeItem, setActiveItem] = useState("saved");

  return (
    <>
      <div className="w-full flex flex-col h-full gap-2">
        <div className=" rounded p-3 h-full flex flex-col justify-between">
          <div className="flex flex-col gap-14">
            <div className="flex  items-center">
              <Image
                src={"/icons/logo.svg"}
                alt="logo"
                width={200}
                height={100}
                className="w-[30%] "
              />
              <IoMenu
                size={23}
                onClick={isOpen ? onClose : onOpen}
                className="flex md:hidden cursor-pointer z-[1600]"
              />
            </div>

            <Show breakpoint="(max-width: 768px)">
              <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerBody className="space-y-4 mt-16">
                    <div
                      className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                        router.asPath.includes("/dashboard")
                          ? "text-secondary bg-secondaryBg font-semibold"
                          : "text-dark-grey"
                      }`}
                      // onClick={() => router.push("/api_discovery")}
                    >
                      <MdOutlineMapsHomeWork />
                      <p className="">Home</p>
                    </div>

                    <div
                      className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                        router.asPath.includes("/manage_users")
                          ? "text-secondary bg-secondaryBg font-semibold"
                          : "text-dark-grey"
                      }`}
                      // onClick={() => router.push("/api_discovery")}
                    >
                      <MdInsertChartOutlined />
                      <p className="">Reports</p>
                    </div>
                    <div
                      className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                        router.asPath.includes("/manage_users")
                          ? "text-secondary bg-secondaryBg font-semibold"
                          : "text-dark-grey"
                      }`}
                      // onClick={() => router.push("/api_discovery")}
                    >
                      <FaFileSignature />
                      <p className="">Delivery Plans</p>
                    </div>
                    <div
                      className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                        router.asPath.includes("/manage_users")
                          ? "text-secondary bg-secondaryBg font-semibold"
                          : "text-dark-grey"
                      }`}
                      // onClick={() => router.push("/api_discovery")}
                    >
                      <IoIosList />
                      <p className="">Change Log</p>
                    </div>
                    <div
                      className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                        router.asPath.includes("/manage_users")
                          ? "text-secondary bg-secondaryBg font-semibold"
                          : "text-dark-grey"
                      }`}
                      onClick={() => router.push("/manage_users")}
                    >
                      <RiUserSettingsLine />
                      <p className="">Manage Users</p>
                    </div>
                    <div
                      className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                        router.asPath == "/api_discovery"
                          ? "text-secondary bg-secondaryBg font-semibold"
                          : "text-dark-grey"
                      }`}
                      // onClick={() => router.push("/api_discovery")}
                    >
                      <IoMdNotificationsOutline />
                      <p className="">Notifications</p>
                    </div>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Show>
            <div className="flex flex-col gap-4">
              <div
                className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                  router.asPath.includes("/dashboard")
                    ? "text-secondary bg-secondaryBg font-semibold"
                    : "text-dark-grey"
                }`}
                onClick={() => router.push("/dashboard")}
              >
                <MdOutlineMapsHomeWork />
                <p className="">Home</p>
              </div>

              <div
                className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                  router.asPath.includes("/gg")
                    ? "text-secondary bg-secondaryBg font-semibold"
                    : "text-dark-grey"
                }`}
                // onClick={() => router.push("/api_discovery")}
              >
                <MdInsertChartOutlined />
                <p className="">Reports</p>
              </div>
              <div
                className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                  router.asPath.includes("/gg")
                    ? "text-secondary bg-secondaryBg font-semibold"
                    : "text-dark-grey"
                }`}
                // onClick={() => router.push("/api_discovery")}
              >
                <FaFileSignature />
                <p className="">Delivery Plans</p>
              </div>
              <div
                className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                  router.asPath.includes("/gg")
                    ? "text-secondary bg-secondaryBg font-semibold"
                    : "text-dark-grey"
                }`}
                // onClick={() => router.push("/api_discovery")}
              >
                <IoIosList />
                <p className="">Change Log</p>
              </div>
              <div
                className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                  router.asPath.includes("/manage_users")
                    ? "text-secondary bg-secondaryBg font-semibold"
                    : "text-dark-grey"
                }`}
                onClick={() => router.push("/manage_users")}
              >
                <RiUserSettingsLine />
                <p className="">Manage Users</p>
              </div>
              <div
                className={`px-5 py-1 rounded-xl flex items-center cursor-pointer ease-in-out duration-700 hover:text-secondary hover:bg-secondaryBg gap-3 w-full ${
                  router.asPath.includes("/gg")
                    ? "text-secondary bg-secondaryBg font-semibold"
                    : "text-dark-grey"
                }`}
                // onClick={() => router.push("/api_discovery")}
              >
                <IoMdNotificationsOutline />
                <p className="">Notifications</p>
              </div>
            </div>
          </div>
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center gap-2">
              <AiOutlineUser className="text-secondary text-xl" />
              <div className="flex text-sm flex-col">
                <p className="font-semibold">{user?.name}</p>
                <p className="text-mid-grey">{user?.roles[0].roleName}</p>
              </div>
            </div>
            <Menu>
              <MenuButton>
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  cursor={"pointer"}
                >
                  <path
                    d="M4.99957 1.25L1.30957 5.25"
                    stroke="#959595"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 1.25L8.69 5.25"
                    stroke="#959595"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4.99957 14.75L1.30957 10.75"
                    stroke="#959595"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 14.75L8.69 10.75"
                    stroke="#959595"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
}
