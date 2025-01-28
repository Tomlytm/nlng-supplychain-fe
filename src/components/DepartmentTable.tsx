import React, { useEffect, useState } from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Skeleton, Stack,
    Spinner
} from '@chakra-ui/react';
import DemandPlanServices from '@/services/demand_plan_services';
import TableSkeletonStack from './TableSkeletonStack';
import { setValue } from '@syncfusion/ej2-react-spreadsheet';
import { CiEdit } from 'react-icons/ci';
import { IoCheckmarkDoneSharp } from 'react-icons/io5';
import { MdOutlineCancel } from 'react-icons/md';

// Extend MaintenanceRecord type with all fields shown in the image
type MaintenanceRecord = {
    id: string;
    planId: string;
    description: string;
    itemNumber: number;
    maintenanceItemDescription: string;
    plannedDate: string;
    callStatus: string;
    functionalLocation: string;
    changedOn: string;
    createdOn: string;
    orderType: string;
    createdBy: string;
    locationDescription: string;
    group: string;
    groupCounter: number;
    room: string;
    wbsElement: string;
    plannerGroup: number;
    controlKey: string;
    priority: string;
    planningPlant: string;
    taskListDescription: string;
    maintenanceItemNumber: string;
    sortField: string;
    maintenanceStrategy: string;
};
type tableProp = {
    handleAddMaterials: () => void;
}
function formatTimestampToDate(timestamp: string): string {
    return new Date(timestamp).toISOString().split('T')[0];
}
const DepartmentTable: React.FC<tableProp> = ({ handleAddMaterials }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedRecord, setSelectedRecord] = useState<MaintenanceRecord | null>(null);
    const [expandedRow, setExpandedRow] = React.useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [loading1, setLoading1] = useState<boolean>(false);
    const [loading2, setLoading2] = useState<boolean>(false);
    const [loading3, setLoadin3] = useState<boolean>(false);
    const [activities, setActivities] = useState<any>();
    const [activityDetails, setActivityDetails] = useState<any>();
    const [activityContracts, setActivityContracts] = useState<any[]>([]);
    const [firstId, setFirstId] = useState<any>();
    const [lastId, setLastId] = useState<any>();
    const [edit, setEdit] = useState<any>();
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [contractResult, setContractResult] = useState<any[]>([]);
    const [contractResult1, setContractResult1] = useState<any[]>([]);
    const [contractNameResult, setContractNameResult] = useState<any[]>([]);
    const [contractNameResult1, setContractNameResult1] = useState<any[]>([]);
    const [canEdit, setCanEdit] = useState<any>(false);
    const [editVal, setEditVal] = useState<any>();
    const [updatedRecordId, setUpdatedRecordId] = useState()
    const [edit1, setEdit1] = useState<any>();
    const [canEdit1, setCanEdit1] = useState<any>(false);
    const [editVal1, setEditVal1] = useState<any>('');

    const [edit2, setEdit2] = useState<any>();
    const [canEdit2, setCanEdit2] = useState<any>(false);
    const [editVal2, setEditVal2] = useState<any>();

    const [edit3, setEdit3] = useState<any>();
    const [canEdit3, setCanEdit3] = useState<any>(false);
    const [editVal3, setEditVal3] = useState<any>();

    const [isFocused, setIsFocused] = useState(false);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [isFocused3, setIsFocused3] = useState(false);
    // Toggle accordion

    // Sample data with 7 records
    const [data, setData] = useState<MaintenanceRecord[]>([
        {
            id: '1',
            planId: 'F8X2HGZ',
            description: '3M CSS DSP ROUTINE MTCE',
            itemNumber: 1,
            maintenanceItemDescription: 'LHF_520UZ000-M3I - INS LOOP SIF TEST',
            plannedDate: '7/4/2024',
            callStatus: 'ScheduledHold (Maintenance Order)',
            functionalLocation: 'LHF_520UZ000M3I',
            changedOn: '1/8/2024',
            createdOn: '1/5/2024',
            orderType: 'MO03',
            createdBy: 'IOSHEVIRE',
            locationDescription: '5-U2000 3M IPF TEST GRP; GENL I/P',
            group: 'R03MARBI',
            groupCounter: 5,
            room: 'U2000CSS',
            wbsElement: 'M-STAST.ARC/5-2000',
            plannerGroup: 197,
            controlKey: 'PM01',
            priority: 'High',
            planningPlant: 'Plant A',
            taskListDescription: 'Routine Maintenance',
            maintenanceItemNumber: 'MI-001',
            sortField: '001',
            maintenanceStrategy: 'Strategy 1',
        },
        {
            id: '2',
            planId: 'G7Y3KUZ',
            description: 'Monthly Generator Maintenance',
            itemNumber: 2,
            maintenanceItemDescription: 'GEN_340GY-MNT - Monthly Engine Check',
            plannedDate: '7/10/2024',
            callStatus: 'In Progress',
            functionalLocation: 'GEN_340GY-MNT',
            changedOn: '7/3/2024',
            createdOn: '7/1/2024',
            orderType: 'MO01',
            createdBy: 'JDoe',
            locationDescription: 'Main Building - Generator Room',
            group: 'GEN_MAINT',
            groupCounter: 10,
            room: 'GEN-RM1',
            wbsElement: 'GEN-PROJ1',
            plannerGroup: 201,
            controlKey: 'PM02',
            priority: 'Medium',
            planningPlant: 'Plant B',
            taskListDescription: 'Monthly Check-up',
            maintenanceItemNumber: 'MI-002',
            sortField: '002',
            maintenanceStrategy: 'Strategy 2',
        },
        {
            id: '3',
            planId: 'H4W6LKD',
            description: 'Quarterly HVAC Inspection',
            itemNumber: 3,
            maintenanceItemDescription: 'HVAC_3300-QT - Duct Cleaning',
            plannedDate: '8/15/2024',
            callStatus: 'Pending Approval',
            functionalLocation: 'HVAC_3300',
            changedOn: '8/5/2024',
            createdOn: '8/1/2024',
            orderType: 'MO05',
            createdBy: 'LSmith',
            locationDescription: 'North Wing - HVAC Unit 3300',
            group: 'HVAC_TEAM',
            groupCounter: 3,
            room: 'NW-HVAC',
            wbsElement: 'HVAC-PROJ-Q1',
            plannerGroup: 105,
            controlKey: 'PM03',
            priority: 'Low',
            planningPlant: 'Plant C',
            taskListDescription: 'Quarterly HVAC Maintenance',
            maintenanceItemNumber: 'MI-003',
            sortField: '003',
            maintenanceStrategy: 'Strategy 3',
        },
        {
            id: '4',
            planId: 'J5R8TLP',
            description: 'Annual Safety Inspection',
            itemNumber: 4,
            maintenanceItemDescription: 'SAFE_4400-AN - Safety Drill Check',
            plannedDate: '9/20/2024',
            callStatus: 'Scheduled',
            functionalLocation: 'SAFE_4400',
            changedOn: '9/10/2024',
            createdOn: '9/1/2024',
            orderType: 'MO07',
            createdBy: 'BWilliams',
            locationDescription: 'Building 4 - Safety Room',
            group: 'SAFETY_INSPECTION',
            groupCounter: 7,
            room: 'BLDG4_SAFE',
            wbsElement: 'SAFE-PROJ-AN',
            plannerGroup: 250,
            controlKey: 'PM04',
            priority: 'High',
            planningPlant: 'Plant D',
            taskListDescription: 'Annual Safety Check',
            maintenanceItemNumber: 'MI-004',
            sortField: '004',
            maintenanceStrategy: 'Strategy 1',
        },
        {
            id: '5',
            planId: 'M9X2VGB',
            description: 'Weekly Water Treatment Check',
            itemNumber: 5,
            maintenanceItemDescription: 'WAT_5200-WK - pH and Chlorine Test',
            plannedDate: '10/1/2024',
            callStatus: 'Completed',
            functionalLocation: 'WAT_5200',
            changedOn: '9/25/2024',
            createdOn: '9/20/2024',
            orderType: 'MO02',
            createdBy: 'TJohnson',
            locationDescription: 'Water Treatment Plant',
            group: 'WATER_TREATMENT',
            groupCounter: 12,
            room: 'WTP-LAB',
            wbsElement: 'WAT-PROJ-WK',
            plannerGroup: 130,
            controlKey: 'PM05',
            priority: 'Medium',
            planningPlant: 'Plant E',
            taskListDescription: 'Water Treatment Check',
            maintenanceItemNumber: 'MI-005',
            sortField: '005',
            maintenanceStrategy: 'Strategy 2',
        },
        {
            id: '6',
            planId: 'P2Z7LDQ',
            description: 'Bi-Annual Electrical Testing',
            itemNumber: 6,
            maintenanceItemDescription: 'ELEC_6700-BA - Circuit Breaker Check',
            plannedDate: '10/15/2024',
            callStatus: 'Scheduled',
            functionalLocation: 'ELEC_6700',
            changedOn: '10/5/2024',
            createdOn: '10/1/2024',
            orderType: 'MO04',
            createdBy: 'AKim',
            locationDescription: 'Electrical Room 6700',
            group: 'ELEC_TEST',
            groupCounter: 6,
            room: 'ELC-6700',
            wbsElement: 'ELEC-PROJ-BA',
            plannerGroup: 210,
            controlKey: 'PM06',
            priority: 'High',
            planningPlant: 'Plant F',
            taskListDescription: 'Electrical Circuit Test',
            maintenanceItemNumber: 'MI-006',
            sortField: '006',
            maintenanceStrategy: 'Strategy 1',
        },
        {
            id: '7',
            planId: 'T3D8RMX',
            description: 'Monthly Fire Alarm Test',
            itemNumber: 7,
            maintenanceItemDescription: 'FIRE_1200-MN - Alarm and Sensor Check',
            plannedDate: '11/5/2024',
            callStatus: 'In Progress',
            functionalLocation: 'FIRE_1200',
            changedOn: '10/25/2024',
            createdOn: '10/20/2024',
            orderType: 'MO06',
            createdBy: 'SCarter',
            locationDescription: 'Building 1 - Fire Alarm Control Room',
            group: 'FIRE_SAFETY',
            groupCounter: 9,
            room: 'FIRE-CTRL',
            wbsElement: 'FIRE-PROJ-MN',
            plannerGroup: 110,
            controlKey: 'PM07',
            priority: 'Medium',
            planningPlant: 'Plant G',
            taskListDescription: 'Monthly Fire System Test',
            maintenanceItemNumber: 'MI-007',
            sortField: '007',
            maintenanceStrategy: 'Strategy 3',
        }
    ]);

    async function getPlanActivity(acId: number | null, size: number, direction: string) {
        setLoading(true);
        try {
            const res = await DemandPlanServices.getActivity(acId, size, direction);
            console.log(res)
            if (res) {
                const resultsArray = res.data.activity
                setLoading(false)
                setActivities(res.data)
                setLastId(resultsArray[resultsArray.length - 1].projectId)
                setFirstId(resultsArray[0].projectId)
                // onOpen();
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
    async function getPlanActivityById(acId: number) {
        // setLoading(true);
        try {
            const res = await DemandPlanServices.getActivityContract(acId);
            console.log(res)
            if (res) {
                // setLoading(false)
                setActivityDetails(res.data)
                onOpen();
            }

        } catch (error: any) {
            console.log(error);

            // setLoading(false);
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
    async function getPlanActivityContracts(acId: number) {
        // setLoading1(true);
        try {
            const res = await DemandPlanServices.getActivityContracts(acId);
            console.log(res)
            if (res) {
                // setLoading1(false)
                setActivityContracts(res.data)
            }

        } catch (error: any) {
            console.log(error);

            // setLoading1(false);
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
    async function findContract(keyword: string) {
        // setLoading(true);
        setSearchKeyword(keyword);
        try {
            const loginres = await DemandPlanServices.contractNoSearch(keyword);
            setContractResult(loginres.data.activity);
            console.log(loginres.data)
            //   setLoading(false);
        } catch (error: any) {
            //   setLoading(false);
            const errorMessage = error?.response?.data?.data[0].Message;
            toast({
                status: "error",
                description: errorMessage || "Failed to fetch data.",
                position: "bottom-right",
            });
        }
    }
    async function findContractName(keyword: string) {
        // setLoading(true);
        setSearchKeyword(keyword);
        try {
            const loginres = await DemandPlanServices.contractNameSearch(keyword);
            setContractNameResult(loginres.data.activity);
            console.log(loginres.data)
            //   setLoading(false);
        } catch (error: any) {
            //   setLoading(false);
            const errorMessage = error?.response?.data?.data[0].Message;
            toast({
                status: "error",
                description: errorMessage || "Failed to fetch data.",
                position: "bottom-right",
            });
        }
    }
    async function UpdateActivity(id: number, contractNumber: string, contractName: string) {
        setLoading1(true);
        // setSearchKeyword(keyword);
        const data = {
            contractNumber,
            contractName
        }
        try {
            const loginres = await DemandPlanServices.UpdateActivity(id, data);
            // setContractResult(loginres.data.activity);
            setCanEdit(false);
            setCanEdit1(false);
            // getPlanActivity(null, 10, "next")
            if (updatedRecordId) {
                getPlanActivityContracts(updatedRecordId)
            }
            console.log(loginres.data)
            setLoading1(false);
        } catch (error: any) {
            setLoading1(false);
            const errorMessage = error?.response?.data?.data[0].Message;
            toast({
                status: "error",
                description: errorMessage || "Failed to fetch data.",
                position: "bottom-right",
            });
        }
    }
    async function UpdateProject(id: number, contractNumber: string, contractName: string) {
        setLoading1(true);
        // setSearchKeyword(keyword);
        const data = {
            contractNumber,
            contractName
        }
        try {
            const loginres = await DemandPlanServices.UpdateProject(id, data);
            // setContractResult(loginres.data.activity);
            setCanEdit2(false);
            setCanEdit3(false);
            getPlanActivity(null, 10, "next")
            // if (updatedRecordId) {
            //     getPlanActivityContracts(updatedRecordId)
            // }
            console.log(loginres.data)
            setLoading1(false);
        } catch (error: any) {
            setLoading1(false);
            const errorMessage = error?.response?.data?.data[0].Message;
            toast({
                status: "error",
                description: errorMessage || "Failed to fetch data.",
                position: "bottom-right",
            });
        }
    }

    const toggleAccordion = (id: any) => {
        if (expandedRow !== id) {
            getPlanActivityContracts(id)
            setUpdatedRecordId(id)
        }
        setExpandedRow((prev) => (prev === id ? null : id));
    };

    useEffect(() => {
        getPlanActivity(null, 10, "next")
    }, [])
    const handleOpenDrawer = (record: MaintenanceRecord) => {
        setSelectedRecord(record);
        onOpen();
    };
    const handleCellChange = (id: string, field: keyof MaintenanceRecord, value: string | number) => {
        setData((prevData) =>
            prevData.map((record) =>
                record.id === id ? { ...record, [field]: value } : record
            )
        );
    };

    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleFocus1 = () => {
        setIsFocused1(true);
    };
    const handleFocus2 = () => {
        setIsFocused2(true);
    };
    const handleFocus3 = () => {
        setIsFocused3(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };
    return (
        <div className="overflow-x-auto">
            {loading ? <TableSkeletonStack /> :
                (
                    <>
                        <table className="w-full bg-white border border-gray-200 rounded-md">
                            <thead className="bg-[#F5F5F5]">
                                <tr>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border-r border-gray-300 bg-white">
                                        {/* <input title='check' type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" /> */}

                                    </th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border-r border-gray-300">
                                        Project ID
                                    </th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border-r border-gray-300">
                                        Activity Name
                                    </th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border-r border-gray-300">
                                        Contract Number
                                    </th>
                                    <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 border-r border-gray-300">
                                        Contract Name
                                    </th>
                                    <th className="px-4 py-3 flex justify-center items-center text-xs font-medium text-gray-700"><svg width="21" height="5" viewBox="0 0 21 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2.76758" cy="2.20703" r="2" fill="black" fill-opacity="0.7" />
                                        <circle cx="10.7676" cy="2.20703" r="2" fill="black" fill-opacity="0.7" />
                                        <circle cx="18.7676" cy="2.20703" r="2" fill="black" fill-opacity="0.7" />
                                    </svg>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {activities?.activity?.map((record: any, index: number) => (
                                    <React.Fragment key={record.projectId}>
                                        <tr className={`${expandedRow  === record.projectId ? 'bg-green-100 shadow-sm':''} border-t border-gray-200  ${index % 2 === 0 ? 'bg-[#E3F1F999]' : ''
                                            }`}>
                                            <td className={`${expandedRow  === record.projectId ? 'bg-green-100 ':''} px-4 py-2 border-r border-gray-300 text-xs text-center text-gray-800 bg-[#F5F5F5]`}>
                                                <svg
                                                    onClick={() => toggleAccordion(record.projectId)} className={`duration-500 ${expandedRow  === record.projectId ?"rotate-180 ":""} cursor-pointer`} width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.8837 0.929688C14.7357 0.929688 15.1807 1.91569 14.6667 2.55269L14.5907 2.63669L8.59074 8.63669C8.41855 8.80887 8.18945 8.91229 7.94642 8.92758C7.7034 8.94286 7.46315 8.86894 7.27074 8.71969L7.17674 8.63669L1.17674 2.63669L1.09374 2.54269L1.03974 2.46569L0.985743 2.36969L0.968742 2.33369L0.941742 2.26669L0.909742 2.15869L0.899742 2.10569L0.889742 2.04569L0.885742 1.98869V1.87069L0.890742 1.81269L0.899742 1.75269L0.909742 1.70069L0.941742 1.59269L0.968742 1.52569L1.03874 1.39369L1.10374 1.30369L1.17674 1.22269L1.27074 1.13969L1.34774 1.08569L1.44374 1.03169L1.47974 1.01469L1.54674 0.987687L1.65474 0.955688L1.70774 0.945687L1.76774 0.935687L1.82474 0.931687L13.8837 0.929688Z" fill="black" />
                                                </svg>

                                            </td>
                                            <td className="px-4 py-2 border-r border-gray-300 text-xs text-center text-gray-800">{record.projectId}

                                            </td>
                                            <td className="px-4 py-2 border-r border-gray-300 text-xs text-center text-gray-800">{record.activityName}</td>
                                            <td className="px-4 py-2 border-r border-gray-300 text-xs text-center text-gray-800 relative">
                                                {/* {record.contractNumber} */}
                                                {
                                                    edit2 === record.projectId && canEdit2 ? (
                                                        <>
                                                            <div className='flex justify-between items-center px-2'>
                                                                <input
                                                                    title='input'
                                                                    className=" border-none bg-transparent outline-none rounded py-1 text-gray-800"
                                                                    value={editVal2}
                                                                    placeholder='Type here'
                                                                    onChange={(e) => {
                                                                        setEdit2(record.projectId);
                                                                        findContract(e.target.value);
                                                                        setEditVal2(e.target.value);
                                                                    }}
                                                                    onFocus={handleFocus2}
                                                                // onBlur={handleBlur}
                                                                />
                                                                {loading1 ? <Spinner /> :
                                                                    <div className='flex items-center gap-2'>
                                                                        <MdOutlineCancel title='Cancel' className=' h-5 w-5 cursor-pointer text-red-800' onClick={() => setCanEdit2(false)} />
                                                                        <IoCheckmarkDoneSharp title='Done' className='cursor-pointer w-5 h-5 text-green-800' onClick={() => { UpdateProject(record.projectId, editVal2, record.contractName) }} />
                                                                    </div>
                                                                }
                                                            </div>
                                                            {
                                                                isFocused2 && (
                                                                    <div className="absolute bg-white border rounded mt-1 w-[250px] max-h-40 overflow-y-auto shadow-lg z-10">
                                                                        {
                                                                            contractResult.length > 0 ? contractResult.map((item) => (
                                                                                <div className='py-2 border-b cursor-pointer' onClick={() => { setEditVal2(item.contractNumber); setEditVal3(item.contractName); setIsFocused2(false) }} key={item.id}>
                                                                                    {item.contractNumber}
                                                                                </div>
                                                                            )) : <span className='text-xs text-gray-400 py-4'>not found</span>
                                                                        }
                                                                    </div>
                                                                )
                                                            }

                                                        </>

                                                    ) : (

                                                        <div className='flex justify-between items-center px-2'>
                                                            <div>{record.contractNumber}</div>
                                                            <CiEdit title='Edit' className='cursor-pointer h-5 w-5 text-purple-700' onClick={() => { setEdit2(record.projectId); setCanEdit2(true); setEditVal2(record.contractNumber) }} />
                                                        </div>
                                                    )
                                                }
                                            </td>
                                            <td className="relative px-4 py-2 border-r border-gray-300 text-xs text-center text-gray-800">
                                                {
                                                    edit3 === record.projectId && canEdit3 ? (
                                                        <>
                                                            <div className='flex justify-between items-center px-2'>
                                                                <input
                                                                    title='input'
                                                                    className=" border-none bg-transparent outline-none rounded py-1 text-gray-800"
                                                                    value={editVal3}
                                                                    placeholder='Type here'
                                                                    onChange={(e) => {
                                                                        setEdit3(record.projectId);
                                                                        findContractName(e.target.value);
                                                                        setEditVal3(e.target.value);
                                                                    }}
                                                                    onFocus={handleFocus3}
                                                                // onBlur={handleBlur}
                                                                />
                                                                {loading1 ? <Spinner /> :
                                                                    <div className='flex items-center gap-2'>
                                                                        <MdOutlineCancel title='Cancel' className=' h-5 w-5 cursor-pointer text-red-800' onClick={() => setCanEdit3(false)} />
                                                                        <IoCheckmarkDoneSharp title='Done' className='cursor-pointer w-5 h-5 text-green-800' onClick={() => { UpdateProject(record.projectId, record.contractNumber, editVal3) }} />
                                                                    </div>
                                                                }
                                                            </div>
                                                            {
                                                                isFocused3 && (
                                                                    <div className="absolute bg-white border rounded mt-1 w-[250px] max-h-40 overflow-y-auto shadow-lg z-10">
                                                                        {
                                                                            contractNameResult.length > 0 ? contractNameResult.map((item) => (
                                                                                <div className='py-2 border-b cursor-pointer' onClick={() => { setEditVal2(item.contractNumber); setEditVal3(item.contractName); setIsFocused3(false) }} key={item.id}>
                                                                                    {item.contractName}
                                                                                </div>
                                                                            )) : <span className='text-xs text-gray-400 py-4'>not found</span>
                                                                        }
                                                                    </div>
                                                                )
                                                            }

                                                        </>

                                                    ) : (

                                                        <div className='flex justify-between items-center px-2'>
                                                            <div>{record.contractName}</div>
                                                            <CiEdit title='Edit' className='cursor-pointer h-5 w-5 text-purple-700' onClick={() => { setEdit3(record.projectId); setCanEdit3(true); setEditVal3(record.contractName) }} />
                                                        </div>
                                                    )
                                                }

                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <button onClick={() => getPlanActivityById(record.projectId)} title='btn' className="p-2 text-blue-600 hover:text-blue-800 focus:outline-none">
                                                    <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.7676 0.220703C15.7514 0.220703 19.8978 3.80699 20.7676 8.5394C19.8987 13.2718 15.7514 16.8581 10.7676 16.8581C5.78375 16.8581 1.63734 13.2718 0.767578 8.5394C1.63642 3.80699 5.78375 0.220703 10.7676 0.220703ZM10.7676 15.0095C12.6527 15.0091 14.4818 14.3688 15.9555 13.1934C17.4293 12.018 18.4604 10.3772 18.8802 8.5394C18.4589 6.7031 17.4271 5.06404 15.9535 3.8902C14.4799 2.71636 12.6516 2.07719 10.7676 2.07719C8.88357 2.07719 7.0553 2.71636 5.58168 3.8902C4.10806 5.06404 3.07626 6.7031 2.655 8.5394C3.07472 10.3772 4.10585 12.018 5.57962 13.1934C7.05338 14.3688 8.8825 15.0091 10.7676 15.0095ZM10.7676 12.6988C9.66445 12.6988 8.6065 12.2605 7.82647 11.4805C7.04645 10.7005 6.60823 9.64253 6.60823 8.5394C6.60823 7.43627 7.04645 6.37833 7.82647 5.5983C8.6065 4.81827 9.66445 4.38005 10.7676 4.38005C11.8707 4.38005 12.9287 4.81827 13.7087 5.5983C14.4887 6.37833 14.9269 7.43627 14.9269 8.5394C14.9269 9.64253 14.4887 10.7005 13.7087 11.4805C12.9287 12.2605 11.8707 12.6988 10.7676 12.6988ZM10.7676 10.8502C11.3804 10.8502 11.9682 10.6067 12.4015 10.1733C12.8349 9.74 13.0783 9.15225 13.0783 8.5394C13.0783 7.92655 12.8349 7.3388 12.4015 6.90545C11.9682 6.47211 11.3804 6.22865 10.7676 6.22865C10.1547 6.22865 9.56698 6.47211 9.13363 6.90545C8.70028 7.3388 8.45683 7.92655 8.45683 8.5394C8.45683 9.15225 8.70028 9.74 9.13363 10.1733C9.56698 10.6067 10.1547 10.8502 10.7676 10.8502Z" fill="#959595" />
                                                    </svg>
                                                </button>

                                            </td>
                                        </tr>
                                        {expandedRow === record.projectId && (
                                            <tr className="transition-transform duration-500 ease-in-out transform translate-y-0 animate-slideDown">
                                                <td colSpan={6}>
                                                    <table className="w-full">
                                                        <thead>
                                                            <tr className="bg-gray-100 shadow-sm text-[10px]">
                                                                <th className=" py-2  font-medium text-gray-700 px-4 text-start">Activity Id</th>
                                                                <th className=" py-2  font-medium text-gray-700 px-4 text-center">Sub-task Name</th>
                                                                <th className=" py-2  font-medium text-gray-700 px-4 text-start">ContractNumber</th>
                                                                <th className=" py-2  font-medium text-gray-700 px-4 text-center">Contract Name</th>
                                                                <th className=" py-2  font-medium text-gray-700 px-4 text-center">Start Date</th>
                                                                <th className=" py-2  font-medium text-gray-700 px-4 text-center">End Date</th>
                                                                {/* <th className=" py-2 text-xs font-medium text-gray-700 px-4 text-center">Contract End Date</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {activityContracts.length < 1 ? <div className='text-red-900  p-3 text-center text-sm font-light'>No activity Contracts found</div> :
                                                                activityContracts.map((field) => (
                                                                    <tr key={field.id}>
                                                                        <td className="px-4 py-2 text-xs text-center">
                                                                            {field.activityId}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-[11px] text-center">
                                                                            {field.subTaskName}
                                                                        </td>
                                                                        <td className="py-2 text-xs text-center relative ">
                                                                            {
                                                                                edit === field.id && canEdit ? (
                                                                                    <>
                                                                                        <div className='flex justify-between items-center px-2'>
                                                                                            <input
                                                                                                title='input'
                                                                                                className=" border-none bg-transparent outline-none rounded py-1 text-gray-800"
                                                                                                value={editVal}
                                                                                                onChange={(e) => {
                                                                                                    setEdit(field.id);
                                                                                                    findContract(e.target.value);
                                                                                                    setEditVal(e.target.value);
                                                                                                }}
                                                                                                placeholder='Type here'
                                                                                                onFocus={handleFocus}
                                                                                            // onBlur={handleBlur}
                                                                                            />
                                                                                            {loading1 ? <Spinner /> :
                                                                                                <div className='flex items-center gap-2'>
                                                                                                    <MdOutlineCancel className=' h-5 w-5 cursor-pointer text-red-800' onClick={() => setCanEdit(false)} />
                                                                                                    <IoCheckmarkDoneSharp className='cursor-pointer w-5 h-5 text-green-800' onClick={() => { UpdateActivity(field.id, editVal, field.contractName) }} />
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                        {
                                                                                            isFocused && (
                                                                                                <div className="absolute bg-white border rounded mt-1 w-5/6 max-h-40 overflow-y-auto shadow-lg z-10">
                                                                                                    {
                                                                                                        contractResult.length > 0 ? contractResult.map((item) => (
                                                                                                            <div className='py-2 border-b cursor-pointer' onClick={() => { setEditVal(item.contractNumber); setEditVal1(item.contractName); setIsFocused(false) }} key={item.id}>
                                                                                                                {item.contractNumber}
                                                                                                            </div>
                                                                                                        )) : <span className='text-xs text-gray-400 py-4'>not found</span>
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    </>

                                                                                ) : (

                                                                                    <div className='flex justify-between items-center px-2'>
                                                                                        <div>{field.contractNumber}</div>
                                                                                        <CiEdit className='cursor-pointer h-5 w-5 text-purple-700' onClick={() => { setEdit(field.id); setCanEdit(true); setEditVal(field.contractNumber) }} />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        </td>

                                                                        <td className="px-4 py-2 text-xs text-center">
                                                                            {/* <input
                                                                                title='input'
                                                                                className="w-full border-none bg-transparent outline-none rounded px-2 py-1 text-gray-800"
                                                                                value={field.contractName}
                                                                                onChange={(e) =>
                                                                                    handleCellChange(record.id, field as keyof MaintenanceRecord, e.target.value)
                                                                                }
                                                                            /> */}
                                                                            {
                                                                                edit1 === field.id && canEdit1 ? (
                                                                                    <>
                                                                                        <div className='flex justify-between items-center px-2'>
                                                                                            <input
                                                                                                title='input'
                                                                                                className=" border-none bg-transparent outline-none rounded py-1 text-gray-800"
                                                                                                value={editVal1}
                                                                                                placeholder='Type here'
                                                                                                onChange={(e) => {
                                                                                                    setEdit1(field.id);
                                                                                                    findContractName(e.target.value);
                                                                                                    setEditVal1(e.target.value);
                                                                                                }}
                                                                                                onFocus={handleFocus1}
                                                                                            // onBlur={handleBlur}
                                                                                            />
                                                                                            {loading1 ? <Spinner /> :
                                                                                                <div className='flex items-center gap-2'>
                                                                                                    <MdOutlineCancel title='Cancel' className=' h-5 w-5 cursor-pointer text-red-800' onClick={() => setCanEdit1(false)} />
                                                                                                    <IoCheckmarkDoneSharp title='Done' className='cursor-pointer w-5 h-5 text-green-800' onClick={() => { UpdateActivity(field.id, field.contractNumber, editVal1) }} />
                                                                                                </div>
                                                                                            }
                                                                                        </div>
                                                                                        {
                                                                                            isFocused1 && (
                                                                                                <div className="absolute bg-white border rounded mt-1 w-[250px] max-h-40 overflow-y-auto shadow-lg z-10">
                                                                                                    {
                                                                                                        contractNameResult.length > 0 ? contractNameResult.map((item) => (
                                                                                                            <div className='py-2 border-b cursor-pointer' onClick={() => { setEditVal(item.contractNumber); setEditVal1(item.contractName); setIsFocused1(false) }} key={item.id}>
                                                                                                                {item.contractName}
                                                                                                            </div>
                                                                                                        )) : <span className='text-xs text-gray-400 py-4'>not found</span>
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        }

                                                                                    </>

                                                                                ) : (

                                                                                    <div className='flex justify-between items-center px-2'>
                                                                                        <div>{field.contractName}</div>
                                                                                        <CiEdit title='Edit' className='cursor-pointer h-5 w-5 text-purple-700' onClick={() => { setEdit1(field.id); setCanEdit1(true); setEditVal1(field.contractName) }} />
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        
                                                                        </td>
                                                                        <td className="px-4 py-2 text-[10px] text-center">
                                                                            {formatTimestampToDate(field.activityStartDate)}
                                                                        </td>
                                                                        <td className="px-4 py-2 text-[10px] text-center">
                                                                            {formatTimestampToDate(field.activityEndDate)}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>

                                ))}
                            </tbody>
                        </table>
                        <div className='flex justify-between py-5'>
                            <div className='px-5 flex gap-3 items-center'>
                                <button disabled={firstId === 1} onClick={() => { if (firstId && firstId !== 1) { getPlanActivity(firstId, 10, "prev") } }} title='previous' className={`${firstId === 1 ? "cursor-not-allowed" : ""} border rounded-lg border-[#D0D5DD] text-sm font-medium px-3 py-2 shadow`}><span className={`${firstId === 1 ? "text-gray-300" : ""}`}>Previous</span> </button>
                                <button onClick={() => { if (lastId && lastId !== activities?.totalItems) { getPlanActivity(lastId, 10, "next") } }} title='next' className={`${lastId === activities?.totalItems ? "cursor-not-allowed" : ""} border rounded-lg border-[#D0D5DD] text-sm font-medium px-3 py-2 shadow`}><span className={`${lastId === activities?.totalItems ? "text-gray-300" : ""}`}>Next</span></button>
                                <div className='text-[#344054] text-sm font-medium'>Page <span>{Math.ceil(lastId / 10)}</span> of <span>{activities?.totalPages}</span></div>
                            </div>
                            <button onClick={handleAddMaterials}
                                className="bg-[#007A3D] text-white text-sm font font-semibold rounded-lg py-2 px-4"
                            >
                                Add Materials
                            </button>
                        </div>
                    </>
                )}
            {/* Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
                <DrawerOverlay />
                <DrawerContent borderTopLeftRadius={30}>
                    <DrawerCloseButton />
                    <DrawerHeader className='border-b border-gray-100 text-base'><span className='font-semibold text-sm'></span>Activities</DrawerHeader>
                    <p className='font-semibold text-sm border-b border-gray-100 py-4 px-6'>General data</p>

                    <DrawerBody>
                        {activityDetails && (
                            <div className='space-y-4 text-sm'>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Project ID</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.projectId}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Activity Status</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.activityStatus}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>WBS Code</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.wbsCode}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Asset/Area</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.assetArea}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Function ID</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.functionId}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Equipment</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.equipment}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Equipment Readiness</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.equipmentReadiness}</div>
                                </div>
                                <div className='flex items-center w-full'>
                                    <div className='w-1/2 text-[#5C5E64]'>Activity Name</div>
                                    <div className='font-semibold text-[#363636] w-1/2'>{activityDetails?.activityName}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Activity Start Date</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.activityStartDate}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Activity End Date</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.activityEndDate}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Materials On-Site Availability</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.materialsAvailability}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Purchase Order (PO)</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.purchaseOrder}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Deadline For PO</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.deadlineForPO}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Delivery Status</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.deliveryStatus}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Contract Status</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.contractStatus}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Contract Number</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.contractNumber}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Contract Name</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.contractName}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Contract Dev Status</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.contractDevStatus}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Contract End Date</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.contractEndDate}</div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='w-1/2 text-[#5C5E64]'>Contract Classification</div>
                                    <div className='font-semibold text-[#363636]'>{activityDetails?.contractClassification}</div>
                                </div>
                            </div>
                        )}
                    </DrawerBody>
                    {/* 
                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default DepartmentTable;
function toast(arg0: { status: string; description: string; position: string; }) {
    // throw new Error('Function not implemented.');
}

