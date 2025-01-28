import Back from "@/components/Back";
import ViewDemandPlan from "@/components/modals/dashboard/viewDemandPlan";
import MessageModal from "@/components/modals/messaging";
import DemandPlanServices from "@/services/demand_plan_services";
import { Modal, ModalContent, useToast, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
const DemandPlanPage = () => {
    const router = useRouter();
    const toast = useToast();
    const { department, year, id } = router?.query;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
    const {
        isOpen: isSecondModalOpen,
        onOpen: onSecondModalOpen,
        onClose: onSecondModalClose,
    } = useDisclosure();
    const [file, setFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<any[]>([]);
    const [download, setDownload] = useState<boolean>(false);
    // console.log(id)
    const [plan, setPlan] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [activeTab, setActiveTab] = useState("Materials");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerData, setDrawerData] = useState<any>(null);
    // const [type, setType]=useState<string>("Materials")
    async function getPlans(deptId: number, year: number, type: string) {
        setLoading(true);
        try {
            const res = await DemandPlanServices.getPlanByYearType(deptId, year, type);
            console.log(res)
            console.log(res.status)
            if (res?.status === true) {
                setPlan(res?.data);
            } else {
                setPlan(null)
            }
            //   toast({
            //     status: "success",
            //     description: "Welcome",
            //     position: "bottom-right",
            //   });

        } catch (error: any) {
            console.log(error);
            setPlan(null)
            setLoading(false);
            // const errorMessage = error?.response?.data?.message;
            //   toast({
            //     status: "error",
            //     description: "error occured, try again later",
            //     position: "bottom-right",
            //   });
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
    async function getActivityPlanTemplate(download: boolean) {
        setLoading(true);
        try {
            const res = await DemandPlanServices.getFinalPlanTemplate(download);
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
    async function getFlaggedRows(dpId: number) {
        setLoading(true);
        try {
            const res = await DemandPlanServices.getFlaggedRows(dpId);
            setErrors(res?.data);
            // toast({
            //     status: "success",
            //     description: "Welcome",
            //     position: "bottom-right",
            // });

        } catch (error: any) {
            console.log(error);

            setLoading(false);
            // const errorMessage = error?.response?.data?.message;
            toast({
                status: "error",
                description: "error occured, try again later",
                position: "bottom-right",
            });
            // setApiErrorMessage(errorMessage, "error");
            return;
        }
    }
    async function Approve(dpId: number) {
        setLoading(true);
        try {
            const res = await DemandPlanServices.ApprovePlan(dpId);
            // setErrors(res?.data);
            console.log(res)
            toast({
                status: "success",
                description: res?.message,
                position: "top-right",
            });
            if (res) {

                onClose1();
                router.push('/cp_demand_plans')
            }
        } catch (error: any) {
            console.log(error);

            setLoading(false);
            // const errorMessage = error?.response?.data?.message;
            toast({
                status: "error",
                description: 'an error occured',
                position: "bottom-right",
            });
            // setApiErrorMessage(errorMessage, "error");
            return;
        }
    }
    const handleView = (id: number) => {
        if (activeTab === "Materials") {
            getPlanTemplate(id, false);
            getFlaggedRows(id);
        } else {
            getActivityPlanTemplate(false);
        }

    };
    useEffect(() => {
        getPlans(Number(id), Number(year), activeTab)
    }, [activeTab, id, year])
    useEffect(() => {
        console.log(plan)

    }, [plan])
    // Dummy data from the image
    const openDrawer = (data: any) => {
        setDrawerData(data);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setDrawerData(null);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Back onBack={() => router.push('/cp_demand_plans')} />
            <header className="mb-6">
                <p className="text-gray-500 text-sm mb-2"><span className=" font-semibold">Demand plan cycles</span> › {year} › <span className="font-semibold text-black">{department}</span></p>
                <h1 className="text-3xl font-semibold text-[#5C5E64] py-2">Consolidated {year} {department} Demand Plan</h1>
            </header>

            <div className="bg-white shadow rounded-lg p-4">
                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab("Materials")}
                        className={`px-4 py-2 font-medium ${activeTab === "Materials"
                            ? "border-b-2 border-[#0085C8] text-[#0085C8]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Material List
                    </button>
                    <button
                        onClick={() => setActiveTab("Activities")}
                        className={`px-4 py-2 font-medium ${activeTab === "Activities"
                            ? "border-b-2 border-[#0085C8] text-[#0085C8]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Activities List
                    </button>
                </div>

                {/* Content for Material List */}
                {plan && (
                    <div className="mt-4">
                        {/* Warning Banner */}
                        {plan?.flaggedleadTimeoverRos && (
                            <div className="bg-[#FFEBEE]  border border-l-4 border-l-[#F44336] border-red-200 rounded-md p-4 mb-4">
                                <div className="flex items-start">
                                    <span className="material-icons text-xl mr-2"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM9 13V15H11V13H9ZM9 5V11H11V5H9Z" fill="#F44336" />
                                    </svg>
                                    </span>
                                    <div>
                                        <p className=" mb-1 font-medium">Warning! Potential delay flagged.</p>
                                        <p className="text-xs text-[#546E7A] font-light">Lead Time is greater than the Required on Site (RoS) Date</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <table className="w-full text-left text-sm text-gray-500">
                            <thead className="bg-[#F5F5F5] text-[#959595] text-xs font-bold">
                                <tr>
                                    <th className="ps-4 pe-9 py-3 font-medium">NAME</th>
                                    <th className="px-4 py-2 font-medium">DEPT</th>
                                    {/* <th className="px-4 py-2 font-medium"></th> */}
                                    <th className="px-4 py-2 font-medium">STATUS</th>
                                    <th className="px-4 py-2 font-medium">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plan?.demandPlan?.templates?.map((item: any) => (
                                    <tr key={item.id} className="border-b">
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
                                                <p className="font-semibold text-[#474A57]">DM_PMN_01. v1.1</p>
                                                <p className="text-xs text-[#757575]">last updated {timeAgo(item.updatedAt)}</p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-xs">{department}</td>
                                        <td className="py-2 text-xs">
                                            <span className="bg-[#FFF8B0] font-medium uppercase text-gray-700 py-2 px-3 rounded-full text-[10px]">
                                                {/* {item.status == "Inreview" ? "In Review" : null} */}
                                                In review
                                            </span>
                                        </td>
                                        <td className="flex items-center py-2 space-x-6">
                                            <button onClick={() => { handleView(item.id); setDownload(true) }} className="text-[#0085C8] bg-[#E3F1F9] py-2 px-3 rounded-full flex items-center" >
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
                                                <span className="ml-1 text-xs font-bold" onClick={() => openDrawer(item)}>Open</span>
                                            </button>
                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.52148 14V16C1.52148 16.5304 1.7322 17.0391 2.10727 17.4142C2.48234 17.7893 2.99105 18 3.52148 18H15.5215C16.0519 18 16.5606 17.7893 16.9357 17.4142C17.3108 17.0391 17.5215 16.5304 17.5215 16V14M4.52148 8L9.52148 13M9.52148 13L14.5215 8M9.52148 13V1" stroke="#959595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                            <MessageModal />

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end items-center mb-4 mt-9">
                            <button
                                onClick={() => onOpen1()}
                                className="bg-[#006A20] rounded-lg text-white px-4 text-sm py-2 font-semibold hover:bg-green-700"
                            >
                                Submit plan for Approval
                            </button>
                        </div>
                    </div>
                )}
                {isDrawerOpen && (<></>
                    // <>
                    //     <div
                    //         className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
                    //         onClick={closeDrawer} // Close the drawer when backdrop is clicked
                    //     ></div>

                    //     <div className="fixed top-0 right-0 w-2/5 h-full bg-white shadow-lg p-6 overflow-y-auto z-50">

                    //         <div className="flex justify-between items-center mb-4 ">
                    //             <h2 className="text-lg font-semibold flex items-center gap-2">
                    //                 <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //                     <path d="M0.992188 3.13453C2.19387 1.95664 3.80949 1.29688 5.49219 1.29688C7.17488 1.29688 8.7905 1.95664 9.99219 3.13453C11.1939 4.31242 12.8095 4.97218 14.4922 4.97218C16.1749 4.97218 17.7905 4.31242 18.9922 3.13453V14.706C17.7905 15.8838 16.1749 16.5436 14.4922 16.5436C12.8095 16.5436 11.1939 15.8838 9.99219 14.706C8.7905 13.5281 7.17488 12.8683 5.49219 12.8683C3.80949 12.8683 2.19387 13.5281 0.992188 14.706V3.13453Z" fill="#FF4343" />
                    //                     <path d="M0.992188 23.7065V14.706V23.7065Z" fill="#FF4343" />
                    //                     <path d="M0.992188 14.706C2.19387 13.5281 3.80949 12.8683 5.49219 12.8683C7.17488 12.8683 8.7905 13.5281 9.99219 14.706C11.1939 15.8838 12.8095 16.5436 14.4922 16.5436C16.1749 16.5436 17.7905 15.8838 18.9922 14.706V3.13453C17.7905 4.31242 16.1749 4.97218 14.4922 4.97218C12.8095 4.97218 11.1939 4.31242 9.99219 3.13453C8.7905 1.95664 7.17488 1.29688 5.49219 1.29688C3.80949 1.29688 2.19387 1.95664 0.992188 3.13453V14.706ZM0.992188 14.706V23.7065" stroke="#FF4343" stroke-linecap="round" stroke-linejoin="round" />
                    //                 </svg>
                    //                 Display material for {drawerData?.id}
                    //             </h2>
                    //             <div className="flex items-center gap-5">
                    //                 <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //                     <path d="M1.00586 17.5212L2.30586 13.6212C-0.0181403 10.1842 0.879859 5.74921 4.40586 3.24721C7.93186 0.746207 12.9959 0.951206 16.2509 3.72721C19.5059 6.50421 19.9459 10.9932 17.2799 14.2282C14.6139 17.4632 9.66486 18.4432 5.70586 16.5212L1.00586 17.5212Z" stroke="#959595" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    //                 </svg>

                    //                 <button
                    //                     className="text-gray-600 hover:text-gray-900"
                    //                     onClick={closeDrawer}
                    //                 >
                    //                     ✕
                    //                 </button>
                    //             </div>
                    //         </div>
                    //         <p className="text-sm mb-2">
                    //             <span className="text-[#5C5E64] py-2">Status</span>
                    //             {/* {drawerData?.status} */}
                    //         </p>
                    //         <p className="mb-3">
                    //             <svg width="90" height="33" viewBox="0 0 90 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    //                 <rect x="-0.0078125" y="0.5" width="90" height="32" rx="8" fill="#FBF2CB" />
                    //                 <path d="M19.9522 21.5V12.86H21.3982V21.5H19.9522ZM27.6775 21.5V18.38C27.6775 18.176 27.6635 17.95 27.6355 17.702C27.6075 17.454 27.5415 17.216 27.4375 16.988C27.3375 16.756 27.1855 16.566 26.9815 16.418C26.7815 16.27 26.5095 16.196 26.1655 16.196C25.9815 16.196 25.7995 16.226 25.6195 16.286C25.4395 16.346 25.2755 16.45 25.1275 16.598C24.9835 16.742 24.8675 16.942 24.7795 17.198C24.6915 17.45 24.6475 17.774 24.6475 18.17L23.7895 17.804C23.7895 17.252 23.8955 16.752 24.1075 16.304C24.3235 15.856 24.6395 15.5 25.0555 15.236C25.4715 14.968 25.9835 14.834 26.5915 14.834C27.0715 14.834 27.4675 14.914 27.7795 15.074C28.0915 15.234 28.3395 15.438 28.5235 15.686C28.7075 15.934 28.8435 16.198 28.9315 16.478C29.0195 16.758 29.0755 17.024 29.0995 17.276C29.1275 17.524 29.1415 17.726 29.1415 17.882V21.5H27.6775ZM23.1835 21.5V15.02H24.4735V17.03H24.6475V21.5H23.1835ZM33.1095 21.5V15.02H34.3875V16.598L34.2315 16.394C34.3115 16.178 34.4175 15.982 34.5495 15.806C34.6855 15.626 34.8475 15.478 35.0355 15.362C35.1955 15.254 35.3715 15.17 35.5635 15.11C35.7595 15.046 35.9595 15.008 36.1635 14.996C36.3675 14.98 36.5655 14.988 36.7575 15.02V16.37C36.5655 16.314 36.3435 16.296 36.0915 16.316C35.8435 16.336 35.6195 16.406 35.4195 16.526C35.2195 16.634 35.0555 16.772 34.9275 16.94C34.8035 17.108 34.7115 17.3 34.6515 17.516C34.5915 17.728 34.5615 17.958 34.5615 18.206V21.5H33.1095ZM40.7313 21.68C40.0753 21.68 39.4993 21.538 39.0033 21.254C38.5073 20.97 38.1193 20.576 37.8393 20.072C37.5633 19.568 37.4253 18.988 37.4253 18.332C37.4253 17.624 37.5613 17.01 37.8333 16.49C38.1053 15.966 38.4833 15.56 38.9673 15.272C39.4513 14.984 40.0113 14.84 40.6473 14.84C41.3193 14.84 41.8893 14.998 42.3573 15.314C42.8293 15.626 43.1793 16.068 43.4073 16.64C43.6353 17.212 43.7213 17.886 43.6653 18.662H42.2313V18.134C42.2273 17.43 42.1033 16.916 41.8593 16.592C41.6153 16.268 41.2313 16.106 40.7073 16.106C40.1153 16.106 39.6753 16.29 39.3873 16.658C39.0993 17.022 38.9553 17.556 38.9553 18.26C38.9553 18.916 39.0993 19.424 39.3873 19.784C39.6753 20.144 40.0953 20.324 40.6473 20.324C41.0033 20.324 41.3093 20.246 41.5653 20.09C41.8253 19.93 42.0253 19.7 42.1653 19.4L43.5933 19.832C43.3453 20.416 42.9613 20.87 42.4413 21.194C41.9253 21.518 41.3553 21.68 40.7313 21.68ZM38.4993 18.662V17.57H42.9573V18.662H38.4993ZM46.5217 21.5L44.1697 15.02H45.6157L47.2477 19.718L48.8737 15.02H50.3257L47.9737 21.5H46.5217ZM51.5225 14.036V12.71H52.9685V14.036H51.5225ZM51.5225 21.5V15.02H52.9685V21.5H51.5225ZM57.7118 21.68C57.0558 21.68 56.4798 21.538 55.9838 21.254C55.4878 20.97 55.0998 20.576 54.8198 20.072C54.5438 19.568 54.4058 18.988 54.4058 18.332C54.4058 17.624 54.5418 17.01 54.8138 16.49C55.0858 15.966 55.4638 15.56 55.9478 15.272C56.4318 14.984 56.9918 14.84 57.6278 14.84C58.2998 14.84 58.8698 14.998 59.3378 15.314C59.8098 15.626 60.1598 16.068 60.3878 16.64C60.6158 17.212 60.7018 17.886 60.6458 18.662H59.2118V18.134C59.2078 17.43 59.0838 16.916 58.8398 16.592C58.5958 16.268 58.2118 16.106 57.6878 16.106C57.0958 16.106 56.6558 16.29 56.3678 16.658C56.0798 17.022 55.9358 17.556 55.9358 18.26C55.9358 18.916 56.0798 19.424 56.3678 19.784C56.6558 20.144 57.0758 20.324 57.6278 20.324C57.9838 20.324 58.2898 20.246 58.5458 20.09C58.8058 19.93 59.0058 19.7 59.1458 19.4L60.5738 19.832C60.3258 20.416 59.9418 20.87 59.4218 21.194C58.9058 21.518 58.3358 21.68 57.7118 21.68ZM55.4798 18.662V17.57H59.9378V18.662H55.4798ZM63.1302 21.5L61.1502 15.008L62.5662 15.02L63.8322 19.178L65.1162 15.02H66.3342L67.6122 19.178L68.8842 15.02H70.3002L68.3202 21.5H67.1922L65.7222 17.042L64.2582 21.5H63.1302Z" fill="#C8811A" />
                    //             </svg>

                    //         </p>
                    //         <h3 className="text-md font-medium mb-2 border-t border-b py-3 border-gray-200">General data</h3>
                    //         <table className="w-full text-xs">
                    //             <tbody className="">
                    //                 <tr className="">
                    //                     <td className="text-[#5C5E64] py-2">Work Order Number / MESC number:</td>
                    //                     <td className="font-medium">{drawerData?.workOrder}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Selected year:</td>
                    //                     <td className="font-medium">{drawerData?.year}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Description:</td>
                    //                     <td className="font-medium">{drawerData?.description}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Unit:</td>
                    //                     <td className="font-medium">{drawerData?.unit}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Department:</td>
                    //                     <td className="font-medium">{drawerData?.department}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">UOM:</td>
                    //                     <td className="font-medium">{drawerData?.uom}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">(Capex/Minor Capex/OPEX):</td>
                    //                     <td className="font-medium">{drawerData?.capexType}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">(IAPS/Non-IAPS):</td>
                    //                     <td className="font-medium">{drawerData?.iaps}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Value Drivers:</td>
                    //                     <td className="font-medium">{drawerData?.valueDrivers}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Stock Item (Yes/No):</td>
                    //                     <td className="font-medium">{drawerData?.stockItem}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">RoS (Month):</td>
                    //                     <td className="font-medium">{drawerData?.ros}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Lead Time:</td>
                    //                     <td className="font-medium">{drawerData?.leadTime}</td>
                    //                 </tr>
                    //             </tbody>
                    //         </table>
                    //         <h3 className="text-md font-semibold mt-4 mb-2">Additional data</h3>
                    //         <table className="w-3/4 text-xs">
                    //             <tbody>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Budget Unit Price ($):</td>
                    //                     <td className="font-medium">{drawerData?.budgetPrice}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Target Quantity:</td>
                    //                     <td className="font-medium">{drawerData?.targetQuantity}</td>
                    //                 </tr>
                    //                 <tr>
                    //                     <td className="text-[#5C5E64] py-2">Total:</td>
                    //                     <td className="font-medium">{drawerData?.total}</td>
                    //                 </tr>
                    //             </tbody>
                    //         </table>
                    //     </div>
                    // </>
                )}
            </div>
            <ViewDemandPlan download={download} errors={errors || []} file={file} cycleYear={2025} isOpen={isOpen} onClose={onClose} />

            <Modal isOpen={isOpen1} onClose={onClose1} isCentered>
                <ModalOverlay />
                <ModalContent className="p-6 rounded-lg shadow-lg">
                    <div className="flex gap-3">
                        <div className="bg-[#F5F5F5] rounded-lg"><svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.0007 39.6673C31.2223 39.6673 34.139 38.3615 36.2502 36.2502C38.3615 34.139 39.6673 31.2223 39.6673 28.0007C39.6673 24.779 38.3615 21.8624 36.2502 19.7511C34.139 17.6398 31.2223 16.334 28.0007 16.334C24.779 16.334 21.8624 17.6398 19.7511 19.7511C17.6398 21.8624 16.334 24.779 16.334 28.0007C16.334 31.2223 17.6398 34.139 19.7511 36.2502C21.8624 38.3615 24.779 39.6673 28.0007 39.6673Z" fill="#F5F5F5" stroke="#4F4F4F" stroke-width="2" stroke-linejoin="round" />
                            <path d="M23.334 28L26.834 31.5L33.834 24.5" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-[#5C5E64]">Sure you want to submit?</p>
                            <p className=" text-[#B5B5C3] font-light">
                                Are you sure you want to submit?</p>
                        </div>
                    </div>
                    {/* <ModalHeader className="text-lg font-semibold text-center">Sure you want to submit?</ModalHeader> */}
                    {/* <ModalBody className="text-center text-gray-600">
                  Are you sure you want to submit?
                </ModalBody> */}
                    <div className="flex justify-between py-4 gap-4">
                        <div
                            onClick={onClose1}
                            className="bg-white border w-full cursor-pointer text-center text-sm border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
                        >
                            No, cancel
                        </div>
                        <div
                            onClick={() => {
                                Approve(Number(plan?.demandPlan?.id));
                            }}
                            className="bg-[#5C5E64] flex justify-center gap-3 cursor-pointer w-full text-white px-4 py-2 text-center text-sm rounded-lg hover:bg-gray-700"
                        >
                            {/* {loading && (
                                <Spinner />)} */}
                            Yes, confirm
                        </div>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default DemandPlanPage;
function toast(arg0: { status: string; description: string; position: string; }) {
    // throw new Error("Function not implemented.");
}

