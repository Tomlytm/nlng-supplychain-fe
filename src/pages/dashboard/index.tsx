import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Spinner,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import AreaChartComponent from "@/components/dashboard/AreaChartComponent";
import LineChartComponent from "@/components/dashboard/LineChartComponent";
import { useOnboarding } from "@/context/OnboardingContext";
import DemandPlanServices from "@/services/demand_plan_services";
import { RunCycleYear } from "@/models/onboarding.model";
import PageHeader from "@/components/PageHeader";

function getLastTenYears(fromYear = 2034) {
  const years = [];
  for (let i = 0; i < 10; i++) {
    years.push(fromYear - i);
  }
  return years;
};

const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useOnboarding();
  const [loading, setLoading] = useState<boolean>(false);
  const [year, setYear] = useState<number>(2023)
  const [isClient, setIsClient] = useState(false);

  const toast = useToast();
  useEffect(() => {
    // This will only run on the client
    setIsClient(true);
  }, []);
  console.log(user)
  async function onSubmit() {
    setLoading(true);
    try {
      const cycleData: RunCycleYear = {
        year
      };

      const loginres = await DemandPlanServices.RunCycleYear(cycleData);
      console.log(loginres);
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
      console.log(errorMessage)
      toast({
        status: "error",
        description: errorMessage,
        position: "bottom-right",
      });
      // setApiErrorMessage(errorMessage, "error");
      // return;
    }
  }
  return (
    <div className="space-y-5">
      <PageHeader title="Dashboard" />
      <div className="flex justify-between items-center">
        <div className=" capitalize text-[#5C5E64] font-bold text-[28px] ">
          {/* Welcome back, {user?.name} */}
          {isClient && user?.name ? `Welcome back, ${user.name}` : "Welcome back"}
        </div>
        <div>

          {isClient && user?.roles && user.roles[0].roleType === 'cp_focal' &&
            (

              <div onClick={onOpen} className="bg-[#006A20] text-white font-medium text-sm rounded-lg p-2 cursor-pointer flex gap-2 items-center">
                <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1.5V15.5M1 8.5H15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                Initialize cycle
              </div>
            )
          }

        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
        <ModalOverlay />
        <ModalContent className="rounded-lg">
          <ModalHeader className="bg-[#006A20] rounded-t-md font-medium text-base"><span className="text-base font-medium text-white">Initiate new demand planning cycle</span></ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <div className="text-[#5C5E64] my-3">Select year <span className="text-[#E45270]">*</span></div>
            <select value={year} onChange={(e: any) => setYear(Number(e.target.value))} className="w-full border rounded-lg py-3 px-2 text-[#B5B5C3] focus:outline-none cursor-pointer" title="year" name="year" id="">
              <option value="" className="text-[#B5B5C3]">Select year</option>
              {
                getLastTenYears().map((item, i) => (
                  <option value={item} key={i} className="text-[#B5B5C3]">{item}</option>
                ))
              }
            </select>
          </ModalBody>

          <ModalFooter>
            <div className="border mr-3 text-sm text-[#4F4F4F] font-medium cursor-pointer bg-white border-[#4F4F4F] py-2 px-5 rounded-lg" onClick={onClose}>
              No, Cancel
            </div>
            <div onClick={onSubmit} className="bg-[#006A20] text-white font-medium cursor-pointer text-sm py-2 px-5 rounded-lg">{loading ? <Spinner /> : 'Run workflow'}</div>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="grid grid-cols-4 gap-5">
        <div className="bg-white rounded-lg px-5 py-4">
          <div className="flex justify-between items-center mb-5 text-sm">
            <div className="flex gap-3 items-center ">
              <svg
                width="20"
                height="17"
                viewBox="0 0 20 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.102 12.957C5.898 12.65 3.198 10.663 1 7C3.4 3 6.4 1 10 1C13.6 1 16.6 3 19 7C18.7899 7.35087 18.5688 7.69504 18.337 8.032M13 14L15 16L19 12M8 7C8 7.53043 8.21071 8.03914 8.58579 8.41421C8.96086 8.78929 9.46957 9 10 9C10.5304 9 11.0391 8.78929 11.4142 8.41421C11.7893 8.03914 12 7.53043 12 7C12 6.46957 11.7893 5.96086 11.4142 5.58579C11.0391 5.21071 10.5304 5 10 5C9.46957 5 8.96086 5.21071 8.58579 5.58579C8.21071 5.96086 8 6.46957 8 7Z"
                  stroke="#4CBF73"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Approved
            </div>
            <div>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00786 9.72207C8.68314 9.72207 9.23056 9.17524 9.23056 8.50068C9.23056 7.82613 8.68314 7.2793 8.00786 7.2793C7.33258 7.2793 6.78516 7.82613 6.78516 8.50068C6.78516 9.17524 7.33258 9.72207 8.00786 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M13.7852 9.72207C14.4605 9.72207 15.0079 9.17524 15.0079 8.50068C15.0079 7.82613 14.4605 7.2793 13.7852 7.2793C13.1099 7.2793 12.5625 7.82613 12.5625 8.50068C12.5625 9.17524 13.1099 9.72207 13.7852 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M2.23052 9.72207C2.9058 9.72207 3.45322 9.17524 3.45322 8.50068C3.45322 7.82613 2.9058 7.2793 2.23052 7.2793C1.55524 7.2793 1.00781 7.82613 1.00781 8.50068C1.00781 9.17524 1.55524 9.72207 2.23052 9.72207Z"
                  fill="#363636"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex text-2xl text-[#363636] font-semibold">
              5,234
            </div>
            <div className="flex h-[22px] items-center border border-[#05C168] text-[#05C168] rounded-sm p-1 text-[10px]">
              <div className=" flex gap-1 items-center">
                28.4%
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.33366 6.66602L6.66699 1.33268"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66699 6.36133V1.33304H1.63871"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-5 py-4">
          <div className="flex justify-between items-center mb-5 text-sm">
            <div className="flex gap-3 items-center ">
              <svg
                width="14"
                height="21"
                viewBox="0 0 14 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 10.5C5.4087 10.5 3.88258 11.1321 2.75736 12.2574C1.63214 13.3826 1 14.9087 1 16.5V18.5C1 18.7652 1.10536 19.0196 1.29289 19.2071C1.48043 19.3946 1.73478 19.5 2 19.5H12C12.2652 19.5 12.5196 19.3946 12.7071 19.2071C12.8946 19.0196 13 18.7652 13 18.5V16.5C13 14.9087 12.3679 13.3826 11.2426 12.2574C10.1174 11.1321 8.5913 10.5 7 10.5ZM7 10.5C5.4087 10.5 3.88258 9.86786 2.75736 8.74264C1.63214 7.61742 1 6.0913 1 4.5V2.5C1 2.23478 1.10536 1.98043 1.29289 1.79289C1.48043 1.60536 1.73478 1.5 2 1.5H12C12.2652 1.5 12.5196 1.60536 12.7071 1.79289C12.8946 1.98043 13 2.23478 13 2.5V4.5C13 6.0913 12.3679 7.61742 11.2426 8.74264C10.1174 9.86786 8.5913 10.5 7 10.5Z"
                  stroke="#FFBF00"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              In review
            </div>
            <div>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00786 9.72207C8.68314 9.72207 9.23056 9.17524 9.23056 8.50068C9.23056 7.82613 8.68314 7.2793 8.00786 7.2793C7.33258 7.2793 6.78516 7.82613 6.78516 8.50068C6.78516 9.17524 7.33258 9.72207 8.00786 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M13.7852 9.72207C14.4605 9.72207 15.0079 9.17524 15.0079 8.50068C15.0079 7.82613 14.4605 7.2793 13.7852 7.2793C13.1099 7.2793 12.5625 7.82613 12.5625 8.50068C12.5625 9.17524 13.1099 9.72207 13.7852 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M2.23052 9.72207C2.9058 9.72207 3.45322 9.17524 3.45322 8.50068C3.45322 7.82613 2.9058 7.2793 2.23052 7.2793C1.55524 7.2793 1.00781 7.82613 1.00781 8.50068C1.00781 9.17524 1.55524 9.72207 2.23052 9.72207Z"
                  fill="#363636"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex text-2xl text-[#363636] font-semibold">
              1,244
            </div>
            <div className="flex h-[22px] items-center border border-[#05C168] text-[#05C168] rounded-sm p-1 text-[10px]">
              <div className="flex gap-1 items-center">
                28.4%
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.33366 6.66602L6.66699 1.33268"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66699 6.36133V1.33304H1.63871"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-5 py-4">
          <div className="flex justify-between items-center mb-5 text-sm">
            <div className="flex gap-3 items-center ">
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.69922 4.2002L16.2992 16.8002M1 10.5C1 11.6819 1.23279 12.8522 1.68508 13.9442C2.13738 15.0361 2.80031 16.0282 3.63604 16.864C4.47177 17.6997 5.46392 18.3626 6.55585 18.8149C7.64778 19.2672 8.8181 19.5 10 19.5C11.1819 19.5 12.3522 19.2672 13.4442 18.8149C14.5361 18.3626 15.5282 17.6997 16.364 16.864C17.1997 16.0282 17.8626 15.0361 18.3149 13.9442C18.7672 12.8522 19 11.6819 19 10.5C19 9.3181 18.7672 8.14778 18.3149 7.05585C17.8626 5.96392 17.1997 4.97177 16.364 4.13604C15.5282 3.30031 14.5361 2.63738 13.4442 2.18508C12.3522 1.73279 11.1819 1.5 10 1.5C8.8181 1.5 7.64778 1.73279 6.55585 2.18508C5.46392 2.63738 4.47177 3.30031 3.63604 4.13604C2.80031 4.97177 2.13738 5.96392 1.68508 7.05585C1.23279 8.14778 1 9.3181 1 10.5Z"
                  stroke="#F96363"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Flagged approval
            </div>
            <div>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00786 9.72207C8.68314 9.72207 9.23056 9.17524 9.23056 8.50068C9.23056 7.82613 8.68314 7.2793 8.00786 7.2793C7.33258 7.2793 6.78516 7.82613 6.78516 8.50068C6.78516 9.17524 7.33258 9.72207 8.00786 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M13.7852 9.72207C14.4605 9.72207 15.0079 9.17524 15.0079 8.50068C15.0079 7.82613 14.4605 7.2793 13.7852 7.2793C13.1099 7.2793 12.5625 7.82613 12.5625 8.50068C12.5625 9.17524 13.1099 9.72207 13.7852 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M2.23052 9.72207C2.9058 9.72207 3.45322 9.17524 3.45322 8.50068C3.45322 7.82613 2.9058 7.2793 2.23052 7.2793C1.55524 7.2793 1.00781 7.82613 1.00781 8.50068C1.00781 9.17524 1.55524 9.72207 2.23052 9.72207Z"
                  fill="#363636"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex text-2xl text-[#363636] font-semibold">
              2,230
            </div>
            <div className="flex h-[22px] items-center border border-[#05C168] text-[#05C168] rounded-sm p-1 text-[10px]">
              <div className="flex gap-1 items-center">
                28.4%
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.33366 6.66602L6.66699 1.33268"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66699 6.36133V1.33304H1.63871"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-5 py-4">
          <div className="flex justify-between items-center mb-5 text-sm">
            <div className="flex gap-3 items-center ">
              <svg
                width="16"
                height="21"
                viewBox="0 0 16 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 5.5H11M5 9.5H11M5 13.5H9M1 3.5C1 2.96957 1.21071 2.46086 1.58579 2.08579C1.96086 1.71071 2.46957 1.5 3 1.5H13C13.5304 1.5 14.0391 1.71071 14.4142 2.08579C14.7893 2.46086 15 2.96957 15 3.5V17.5C15 18.0304 14.7893 18.5391 14.4142 18.9142C14.0391 19.2893 13.5304 19.5 13 19.5H3C2.46957 19.5 1.96086 19.2893 1.58579 18.9142C1.21071 18.5391 1 18.0304 1 17.5V3.5Z"
                  stroke="#334155"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Drafts
            </div>
            <div>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00786 9.72207C8.68314 9.72207 9.23056 9.17524 9.23056 8.50068C9.23056 7.82613 8.68314 7.2793 8.00786 7.2793C7.33258 7.2793 6.78516 7.82613 6.78516 8.50068C6.78516 9.17524 7.33258 9.72207 8.00786 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M13.7852 9.72207C14.4605 9.72207 15.0079 9.17524 15.0079 8.50068C15.0079 7.82613 14.4605 7.2793 13.7852 7.2793C13.1099 7.2793 12.5625 7.82613 12.5625 8.50068C12.5625 9.17524 13.1099 9.72207 13.7852 9.72207Z"
                  fill="#363636"
                />
                <path
                  d="M2.23052 9.72207C2.9058 9.72207 3.45322 9.17524 3.45322 8.50068C3.45322 7.82613 2.9058 7.2793 2.23052 7.2793C1.55524 7.2793 1.00781 7.82613 1.00781 8.50068C1.00781 9.17524 1.55524 9.72207 2.23052 9.72207Z"
                  fill="#363636"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex text-2xl text-[#363636] font-semibold">
              234
            </div>
            <div className="flex h-[22px] items-center border border-[#05C168] text-[#05C168] rounded-sm p-1 text-[10px]">
              <div className="flex gap-1 items-center">
                28.4%
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.33366 6.66602L6.66699 1.33268"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66699 6.36133V1.33304H1.63871"
                    stroke="#14CA74"
                    stroke-width="0.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 ">
            {/* Left Column: Large Chart */}
            <div className="col-span-2 bg-white ">
              <h3 className="text-xs text-[#363636] font-semibold">
                Total Submitted
              </h3>
              <div className="flex mt-2 gap-2 items-center">
                <div className="flex  text-[#363636] font-semibold">234</div>
                <div className="flex h-[18px] bg-[#05C16833] items-center border border-[#05C168] text-[#05C168] rounded-sm p-1 text-[8px]">
                  <div className=" flex gap-1 items-center">
                    28.4%
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.33366 6.66602L6.66699 1.33268"
                        stroke="#14CA74"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.66699 6.36133V1.33304H1.63871"
                        stroke="#14CA74"
                        stroke-width="0.8"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <AreaChartComponent />
            </div>

            {/* Right Column: Two Smaller Charts */}
            <div className="grid  border-l ps-2">
              <div className="bg-white border-b">
                <h3 className="text-xs text-[#363636] font-semibold">
                  Total Approved
                </h3>
                <div className="flex mt-2 gap-2 items-center">
                  <div className="flex  text-[#363636] font-semibold">234</div>
                  <div className="flex h-[18px] bg-[#05C16833] items-center border border-[#05C168] text-[#05C168] rounded-sm p-1 text-[8px]">
                    <div className="flex gap-1 items-center">
                      28.4%
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33366 6.66602L6.66699 1.33268"
                          stroke="#14CA74"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66699 6.36133V1.33304H1.63871"
                          stroke="#14CA74"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <LineChartComponent
                  dataValues={[22, 33, 20, 33, 30, 33, 0, 5, 8, 24, 25, 5]}
                />
              </div>

              <div className="bg-white ">
                <h3 className="text-xs text-[#363636] font-semibold">
                  Total Drafts
                </h3>
                <div className="flex mt-2 gap-2 items-center">
                  <div className="flex  text-[#363636] font-semibold">234</div>
                  <div className="flex h-[18px] bg-[#05C16833] items-center border border-[#05C168] text-[#05C168] rounded-sm p-1 text-[8px]">
                    <div className=" flex gap-1 items-center">
                      28.4%
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.33366 6.66602L6.66699 1.33268"
                          stroke="#14CA74"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66699 6.36133V1.33304H1.63871"
                          stroke="#14CA74"
                          stroke-width="0.8"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <LineChartComponent
                  dataValues={[
                    13, 0, 6, 15, 0, 4, 0, 40, 34, 32, 10, 10, 5, 35, 10, 8, 13,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
function toast(arg0: { status: string; description: string; position: string; }) {
  // throw new Error("Function not implemented.");
}

