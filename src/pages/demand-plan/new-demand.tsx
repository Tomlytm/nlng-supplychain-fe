import React, { useState } from "react";
import { ChakraProvider, extendTheme, Radio, RadioGroup, Stack, Select, Button } from "@chakra-ui/react";

// Define the theme to customize the radio button color
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

const PlanForm: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Material");
    const [selectedYear, setSelectedYear] = useState<string>("");

    const handleContinue = () => {
        console.log("Selected Option:", selectedOption);
        console.log("Selected Year:", selectedYear);
    };

    return (
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
                            mb={14}
                        >
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                        </Select>
                    </div>

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
    );
};

export default PlanForm;
