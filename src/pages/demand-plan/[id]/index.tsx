import Back from '@/components/Back';
import ViewDemandPlan from '@/components/modals/dashboard/viewDemandPlan';
import PageHeader from '@/components/PageHeader'
import DemandPlanServices from '@/services/demand_plan_services';
import { useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
  
const formatDate = (isoString: string): string => {
    const date = new Date(isoString);

    // Extract date components
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    // Extract time components
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // Convert to 12-hour format

    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};

const App: React.FC = () => {
    const timestamp = "2024-12-03T13:18:06.175485";

    return <div>{formatDate(timestamp)}</div>;
};
function PlanDetails() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [plans, setPlans] = useState<any[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const { id } = router.query
    async function getVersions(dpId: number) {
        setLoading(true);
        try {
            const res = await DemandPlanServices.getPlanVersions(dpId);
            console.log(res?.data?.demandplanversions);
            setPlans(res?.data?.demandplanversions);
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
    async function getPlanTemplate(dpId: number) {
        setLoading(true);
        try {
            const res = await DemandPlanServices.getPlanTemplate(dpId, false);
            console.log(res);
            if (res) {

                setFile(res)
                onOpen();
            }
            // actions.setSubmitting(false);

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
    useEffect(() => {
        if (id) {
            getVersions(Number(id))
        }
    }, [id])
    const handleView = (id: number) => {
        getPlanTemplate(id)
    }
    return (
        <div>
            <PageHeader title='Activities' />
            <Back onBack={()=> router.push('/demand-plan')}/>
            <div className='mt-5 rounded-3xl border bg-white p-8'>
                <div className='flex gap-5 border-s ps-7'>
                    {/* <div className='flex'>
                        <svg width="16" className='h-full ' viewBox="0 0 16 789" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="8.5" y1="-2.18557e-08" x2="8.50003" y2="789" stroke="#D5D5D5" />
                            <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" stroke="#959595" />
                        </svg>
                    </div> */}
                    <div className='space-y-9'>

                        {
                            plans?.map((item, i) => (
                                <div key={i}>
                                    <div className='flex items-center gap-3 mb-3'>
                                        <div className='bg-[#E3F1F9]  rounded-lg px-3 py-2 text-[#0085C8] font-bold text-sm'>
                                            T
                                        </div>
                                        <div>
                                            <p className='text-xs text-[#959595] font-medium'>{formatDate(item.demand?.updatedAt)}</p>
                                            <p className='text-gray-700 text-sm'>{item.userFullName}</p>
                                        </div>

                                    </div>
                                    <div className='rounded-2xl bg-[#F5F5F5] p-4 ms-10 w-[570px]'>
                                        <div>
                                            <div className='rounded-lg bg-white flex items-center py-3 px-4 justify-between'>
                                                <div className='flex gap-3'>
                                                    <svg className='rounded-lg bg-[#F5F5F5]' width="41" height="40" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                                        <p className='text-sm'>{`DM_${item.demand?.year}. v${item.demand?.version}`}</p>
                                                        <p className='text-xs text-[#959595] font-medium'>last updated &nbsp; 
                                                        {timeAgo(item.demand?.updatedAt)}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center gap-3'>
                                                    <div className='text-xs'>
                                                        ● {item.demand?.status == "Inreview" ? "In Review": null}
                                                    </div>

                                                    <div onClick={() => handleView(item.demand?.id)} className='bg-[#E3F1F9] cursor-pointer rounded-lg px-3 py-2 text-[#0085C8] font-bold text-sm'>
                                                        View
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
            <ViewDemandPlan download file={file} cycleYear={2025} isOpen={isOpen} onClose={onClose} />

        </div>
    )
}

export default PlanDetails

function toast(arg0: { status: string; description: string; position: string; }) {
    // throw new Error('Function not implemented.');
}
