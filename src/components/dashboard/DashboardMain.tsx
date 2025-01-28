import UploadAdp from "@/components/modals/dashboard/uploadAdp";
// import { Button } from "@/components/utils";
import Image from "next/image";
import { useEffect } from "react";

import React, { useState } from "react";
import { ChakraProvider, extendTheme, Radio, RadioGroup, Stack, Select, Button } from "@chakra-ui/react";
import DepartmentTable from "../DepartmentTable";
type dashprops = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

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
export default function DashboardMain({ onOpen, isOpen, onClose }: dashprops) {
  // useEffect(() => {
  //   onOpen();
  // }, [onOpen])
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<string>("Material");
  const [selectedYear, setSelectedYear] = useState<string>("");

  const handleContinue = () => {
    console.log("Selected Option:", selectedOption);
    console.log("Selected Year:", selectedYear);
    onOpen();
  };
  const generateYears = (count: number) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < count; i++) {
      years.push(currentYear - i); // Push each year into the array
    }

    return years; // Return the array of years
  };
  return (
    <div className="">

      <ChakraProvider theme={theme}>
        <div className="">
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
            <div className="w-1/2">

              {/* Chakra UI Select for Year Dropdown */}
              <label className="block text-sm text-gray-700 mb-2 font-semibold">
                Select year
              </label>
              <Select
                placeholder="Select year"
                className="w-1/2 text-[#B5B5C3]"
                size={'lg'}
                fontSize={14}
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
            </div>
            {
              selectedYear && (
                <div className="mb-12">
                  <h1 className="text-xl mb-4 text-[#474A57]">Activities for your department</h1>
                  {/* <DepartmentTable /> */}
                </div>

              )
            }
            {/* Continue Button */}
            <div className="flex justify-end">
              <button
                className="bg-[#007A3D] text-white text-sm font font-semibold rounded-lg py-2 px-4"
                onClick={handleContinue}
              // colorScheme="#007A3D"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

      </ChakraProvider>
      <UploadAdp cycleYear={2025} isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
