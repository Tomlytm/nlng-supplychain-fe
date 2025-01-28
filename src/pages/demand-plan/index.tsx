import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PageHeader from "@/components/PageHeader";
import DemandPlanServices from "@/services/demand_plan_services";
import { useOnboarding } from "@/context/OnboardingContext";
import { motion } from 'framer-motion';
import ViewDemandPlan from "@/components/modals/dashboard/viewDemandPlan";
import { Menu, MenuButton, MenuItem, MenuList, useDisclosure } from "@chakra-ui/react";
function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return "just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }
}

const Plans = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const [download, setDownload] = useState<boolean>(false);
  const [errors, setErrors] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<string>()
  const router = useRouter();
  const { user } = useOnboarding();
  const [plans, setPlans] = useState<any[]>([]);

  const handleNewPlan = () => {
    router.push('/demand-plan/createplan')
    console.log("New Plan button clicked");
  };

  async function getInreviewPlan(deptId: number) {
    setLoading(true);
    try {
      const res = await DemandPlanServices.getDemandPlan("Inreview", deptId);
      console.log(res?.data?.data);
      setPlans(res?.data?.data);
      // actions.setSubmitting(false);
      toast({
        status: "success",
        description: "Welcome",
        position: "bottom-right",
      });

    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      toast({
        status: "error",
        description: "error occured, try again later",
        position: "bottom-right",
      });
      // setApiErrorMessage(errorMessage, "error");
      return;
    }
  }
  async function getPlanById(dpId: number) {
    setLoading(true);
    try {
      const res = await DemandPlanServices.getDemandPlanByid(dpId);
      console.log(res?.data?.data);
      // actions.setSubmitting(false);
      toast({
        status: "success",
        description: "Welcome",
        position: "bottom-right",
      });

    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      toast({
        status: "error",
        description: "error occured, try again later",
        position: "bottom-right",
      });
      // setApiErrorMessage(errorMessage, "error");
      return;
    }
  }
  async function getPlanTemplate(dpId: number, download: boolean) {
    setLoading(true);
    try {
      const res = await DemandPlanServices.getPlanTemplate(dpId, download);
      //   console.log(res?.data?.data);
      // actions.setSubmitting(false);
      if (res) {
        setFile(res)
        onOpen();
      }

    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.message;
      toast({
        status: "error",
        description: "error occured, try again later",
        position: "bottom-right",
      });
      // setApiErrorMessage(errorMessage, "error");
      return;
    }
  }
  const handleView = (id: number, type: string) => {
    getPlanTemplate(id, false)
    setCurrentType(type)
  }
  useEffect(() => {
    if (user && user.department) {
      getInreviewPlan(user.department.id);
    }
  }, [])


  return (
    <>
      <PageHeader title="Demand Plans" />
      <div className="text-gray-500 mb-3">List of all the Demand plans</div>
      {plans?.length > 0 ? (
        <div className="max-w-7xl mx-auto bg-white shadow-md rounded-3xl p-6">
          <div className="flex justify-end items-center mb-4">
            {/* <button
              onClick={handleNewPlan}
              className="bg-[#006A20] rounded-lg text-white px-4 text-sm py-2 font-semibold hover:bg-green-700"
            >
              New Plan
            </button> */}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-[#F5F5F5] text-[#959595] text-xs font-bold">
                <tr>
                  <th className="ps-4 pe-9 py-3 font-medium">NAME</th>
                  <th className="px-4 py-2 font-medium"></th>
                  <th className="px-4 py-2 font-medium">YEAR</th>
                  <th className="px-4 py-2 font-medium">STATUS</th>
                  <th className="px-4 py-2 font-medium">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                {plans?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="ps-4 pe-9 py-2 flex items-center space-x-3">
                      <svg width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.473145" width="40" height="40" rx="10" fill="#F5F5F5" />
                        <g clip-path="url(#clip0_843_27739)">
                          <path d="M11.3322 10.8762L23.9022 9.08124C23.9731 9.07106 24.0454 9.07625 24.1142 9.09646C24.1829 9.11667 24.2465 9.15143 24.3007 9.19837C24.3548 9.24531 24.3983 9.30335 24.428 9.36855C24.4578 9.43374 24.4732 9.50457 24.4732 9.57624V30.4222C24.4732 30.4938 24.4578 30.5645 24.4281 30.6297C24.3984 30.6948 24.355 30.7528 24.301 30.7997C24.247 30.8466 24.1835 30.8814 24.1149 30.9017C24.0462 30.9219 23.974 30.9273 23.9032 30.9172L11.3312 29.1222C11.0928 29.0883 10.8747 28.9695 10.7169 28.7876C10.5591 28.6057 10.4722 28.373 10.4722 28.1322V11.8662C10.4722 11.6255 10.5591 11.3928 10.7169 11.2109C10.8747 11.029 11.0928 10.9102 11.3312 10.8762H11.3322ZM12.4732 12.7342V27.2642L22.4732 28.6932V11.3052L12.4732 12.7342ZM25.4732 26.9992H28.4732V12.9992H25.4732V10.9992H29.4732C29.7384 10.9992 29.9927 11.1046 30.1803 11.2921C30.3678 11.4797 30.4732 11.734 30.4732 11.9992V27.9992C30.4732 28.2645 30.3678 28.5188 30.1803 28.7063C29.9927 28.8939 29.7384 28.9992 29.4732 28.9992H25.4732V26.9992ZM18.6732 19.9992L21.4732 23.9992H19.0732L17.4732 21.7132L15.8732 23.9992H13.4732L16.2732 19.9992L13.4732 15.9992H15.8732L17.4732 18.2852L19.0732 15.9992H21.4732L18.6732 19.9992Z" fill="#007A3D" />
                        </g>
                        <defs>
                          <clipPath id="clip0_843_27739">
                            <rect width="24" height="24" fill="white" transform="translate(8.47314 8)" />
                          </clipPath>
                        </defs>
                      </svg>

                      <div>
                        <p className="font-semibold text-[#474A57]">DM_AC_01. v1.1</p>
                        <p className="text-xs text-[#757575]">last updated {timeAgo(item.updatedAt)}</p>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-xs"></td>
                    <td className="px-4 py-2 text-xs">{item.year}</td>
                    <td className="py-2 text-xs">
                      <span className={`${item.status === "Inreview" ? "bg-[#FFF8B0]" : "bg-green-100 text-green-800"} font-medium uppercase text-gray-700 py-2 px-3 rounded-full text-[10px]`}>
                        {item.status == "Inreview" ? "In Review" : "Submitted"}
                      </span>
                    </td>
                    <td className="flex items-center py-2 justify-around">
                      <motion.button
                        whileTap={{ scale: 1.1 }}
                        whileHover={{ scale: 1.1 }} className="text-[#0085C8] bg-[#E3F1F9] py-2 px-3 rounded-full flex items-center" onClick={() => { handleView(item.id, item.type); setDownload(true) }}>
                        <span className="material-icons"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_842_27211)">
                            <path d="M11.9997 3C17.3917 3 21.8777 6.88 22.8187 12C21.8787 17.12 17.3917 21 11.9997 21C6.60766 21 2.12166 17.12 1.18066 12C2.12066 6.88 6.60766 3 11.9997 3ZM11.9997 19C14.0391 18.9996 16.0181 18.3068 17.6125 17.0352C19.207 15.7635 20.3226 13.9883 20.7767 12C20.3209 10.0133 19.2046 8.24 17.6103 6.97003C16.016 5.70005 14.038 5.00853 11.9997 5.00853C9.96136 5.00853 7.98335 5.70005 6.38904 6.97003C4.79473 8.24 3.67843 10.0133 3.22266 12C3.67676 13.9883 4.79234 15.7635 6.38681 17.0352C7.98128 18.3068 9.9602 18.9996 11.9997 19ZM11.9997 16.5C10.8062 16.5 9.6616 16.0259 8.81768 15.182C7.97377 14.3381 7.49966 13.1935 7.49966 12C7.49966 10.8065 7.97377 9.66193 8.81768 8.81802C9.6616 7.97411 10.8062 7.5 11.9997 7.5C13.1931 7.5 14.3377 7.97411 15.1816 8.81802C16.0256 9.66193 16.4997 10.8065 16.4997 12C16.4997 13.1935 16.0256 14.3381 15.1816 15.182C14.3377 16.0259 13.1931 16.5 11.9997 16.5ZM11.9997 14.5C12.6627 14.5 13.2986 14.2366 13.7674 13.7678C14.2363 13.2989 14.4997 12.663 14.4997 12C14.4997 11.337 14.2363 10.7011 13.7674 10.2322C13.2986 9.76339 12.6627 9.5 11.9997 9.5C11.3366 9.5 10.7007 9.76339 10.2319 10.2322C9.76306 10.7011 9.49966 11.337 9.49966 12C9.49966 12.663 9.76306 13.2989 10.2319 13.7678C10.7007 14.2366 11.3366 14.5 11.9997 14.5Z" fill="#0085C8" />
                          </g>
                          <defs>
                            <clipPath id="clip0_842_27211">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        </span>
                        <span className="ml-1 text-xs font-bold">Open</span>
                      </motion.button>
                      <motion.svg className="cursor-pointer"
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.3 }}
                        onClick={() => getPlanTemplate(item.id, true)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 17V19C4 19.5304 4.21071 20.0391 4.58579 20.4142C4.96086 20.7893 5.46957 21 6 21H18C18.5304 21 19.0391 20.7893 19.4142 20.4142C19.7893 20.0391 20 19.5304 20 19V17M7 11L12 16M12 16L17 11M12 16V4" stroke="#D5D5D5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </motion.svg>
                      <motion.svg
                        className={'cursor-pointer'}
                        whileTap={{ scale: 1.2 }}
                        whileHover={{ scale: 1.3 }} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z" fill="#D5D5D5" />
                      </motion.svg>
                      <Menu>
                        <MenuButton as="button">
                          <motion.svg
                            className="cursor-pointer"
                            whileTap={{ scale: 1.2 }}
                            whileHover={{ scale: 1.3 }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="#D5D5D5"
                            viewBox="0 0 16 16"
                          >
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                          </motion.svg>
                        </MenuButton>
                        <MenuList
                        >
                          <MenuItem onClick={() => router.push(`/demand-plan/${item.id}`)} className="text-xs font-semibold">View versions</MenuItem>
                          {/* <MenuItem onClick={() => console.log('Option 2')}>Option 2</MenuItem> */}
                          {/* <MenuItem onClick={() => console.log('Option 3')}>Option 3</MenuItem> */}
                        </MenuList>
                      </Menu>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-600">Page 1 of 10</p>
            <div className="space-x-2">
              <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300">
                Previous
              </button>
              <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-md hover:bg-gray-300">
                Next
              </button>
            </div>
          </div>
        </div >
      ) : (
        <div className="h-[80vh] bg-white rounded-2xl shadow-sm flex justify-center items-center">
          <div className="text-center flex flex-col gap-3 justify-center items-center w-[352px]">

            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.5" y="4.5" width="48" height="48" rx="24" fill="#F4EBFF" />
              <rect x="4.5" y="4.5" width="48" height="48" rx="24" stroke="#F9F5FF" stroke-width="8" />
              <path d="M37.5 37.5L33.15 33.15M35.5 27.5C35.5 31.9183 31.9183 35.5 27.5 35.5C23.0817 35.5 19.5 31.9183 19.5 27.5C19.5 23.0817 23.0817 19.5 27.5 19.5C31.9183 19.5 35.5 23.0817 35.5 27.5Z" stroke="#006A20" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p className="text-[#101828]">No demand plan found</p>
            <p className="text-[#667085] text-sm">You don’t have any demand plan. Please try again or create add a new plan.</p>
            <div
              onClick={handleNewPlan} className="bg-[#006A20] w-full justify-center text-white font-medium text-sm rounded-lg p-2 cursor-pointer flex gap-2 items-center">
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.5V15.5M1 8.5H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Create demand plan
            </div>
          </div>

        </div>
      )}

      <ViewDemandPlan isActivity={currentType === "Activities"}  hasImport errors={errors || []} file={file} cycleYear={2025} isOpen={isOpen} onClose={onClose} />

    </>
  );
};

export default Plans;
function toast(arg0: { status: string; description: string; position: string; }) {
  // throw new Error("Function not implemented.");
}

