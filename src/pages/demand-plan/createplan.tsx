import UploadAdp from "@/components/modals/dashboard/uploadAdp";
// import { Button } from "@/components/utils";
import Image from "next/image";
import { useEffect } from "react";

import React, { useState } from "react";
import { ChakraProvider, extendTheme, Radio, RadioGroup, Stack, Select, Button, useDisclosure } from "@chakra-ui/react";
import DepartmentTable from "@/components/DepartmentTable";
import PageHeader from "@/components/PageHeader";
import DemandPlanServices from "@/services/demand_plan_services";
import ViewDemandPlan from "@/components/modals/dashboard/viewDemandPlan";
import Back from "@/components/Back";
import { useRouter } from "next/router";


const theme = extendTheme({
  components: {
    Radio: {
      baseStyle: {
        control: {
          _checked: {
            bg: "#7C9AFE",
            borderColor: "#7C9AFE",
            // color: "white",
          },
        },
      },
    },
  },
});
const generateYears = (count: number) => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < count; i++) {
    years.push(currentYear - i); // Push each year into the array
  }

  return years; // Return the array of years
};
export default function DashboardMain() {
  // useEffect(() => {
  //   onOpen();
  // }, [onOpen])
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen1, onOpen: onOPen1, onClose: onClose1 } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState<string>("Material");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [cycleYear, setCycleYear] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [download, setDownload] = useState<boolean>(false);
  const handleContinue = () => {
    onOpen();
  };

  async function getCycleYear() {
    setLoading(true);
    try {
      const loginres = await DemandPlanServices.getCycleYear();
      console.log(loginres);
      setCycleYear(loginres?.data?.year);
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
  
  async function getPlanTemplate(download: boolean) {
    setLoading(true);
    try {
      const res = await DemandPlanServices.getActivityPlanTemplate(download);
      //   console.log(res?.data?.data);
      // actions.setSubmitting(false);
      if (res) {
        setFile(res)
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
  const handleAddMaterials = () => {
    console.log('add mat')
    onOPen1()
  }
  useEffect(() => {
    getPlanTemplate(false);
    getCycleYear();
  }, [])
  return (
    <div className="">

      <ChakraProvider theme={theme}>
        <div className="">
          <PageHeader title={`Demand Plans - ${cycleYear}  (PMN)`} />
          
          <Back onBack={()=> router.push('/demand-plan')}/>
          <div className="w-full bg-white p-6 rounded-t-3xl shadow-md">
            <h2 className="text-xl font-medium mb-6 text-[#474A57]">What do you want to plan?</h2>

            {/* Radio Group for Activities/Material */}
            <RadioGroup
              onChange={setSelectedOption}
              value={selectedOption}
            >
              <Stack direction="row" spacing={4} mb={6}>
                <Radio value="Activities" size={'lg'}> <span className="text-[#656565] text-base">Activities</span></Radio>
                <Radio value="Material" size={'lg'}> <span className="text-[#656565] text-base">Material</span></Radio>
              </Stack>
            </RadioGroup>

            {selectedOption === "Material" && (
              <div className="w-1/2">

                {/* Chakra UI Select for Year Dropdown */}
                <label className="block text-sm text-gray-700 mb-2 font-semibold">
                  Select year
                </label>
                <Select
                  placeholder="Select year"
                  className="w-1/2 text-[#B5B5C3] border-gray-900 border"
                  size={'lg'}
                  fontSize={14}
                  // border={3}

                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  focusBorderColor="#7C9AFE"
                  mb={6}
                >
                  {generateYears(15).map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>)}
            {
              selectedOption === "Activities" && (
                <div className="mb-3">
                  <h1 className="text-xl mb-4 text-[#474A57] font-medium">Activities for your department</h1>
                  <DepartmentTable handleAddMaterials={handleAddMaterials} />
                </div>

              )
            }
            {selectedOption === "Material" && (
              <div className="flex justify-end">
                <button
                  className="bg-[#007A3D] text-white text-sm font font-semibold rounded-lg py-2 px-4"
                  onClick={handleContinue}
                // colorScheme="#007A3D"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>

      </ChakraProvider>
      <UploadAdp cycleYear={cycleYear} isOpen={isOpen} onClose={onClose} />
      
      <ViewDemandPlan isActivity errors={[]} file={file} cycleYear={2025} isOpen={isOpen1} onClose={onClose1} />
    </div>
  );
}
function toast(arg0: { status: string; description: string; position: string; }) {
  // throw new Error("Function not implemented.");
}

