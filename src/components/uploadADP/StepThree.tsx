import { useToast, useDisclosure } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/router";

type StepThreeProps = {
  setStep: Dispatch<SetStateAction<number>>;
  onClosee: () => void;
  response: {
    failedValidation: number;
    passedValidation: number;
    id: number;
  };
  isActivity?: boolean;
};

export default function StepThree({ setStep, onClosee, response, isActivity }: StepThreeProps) {
  const toast = useToast();
  const router = useRouter();

  return (
    <>
      <div className="rounded-xl shadow-md bg-white w-[50%] p-5 flex-col flex gap-5">
        <div className="mx-auto">
          <img className="w-[112px] h-[112px]" src="/gifs/success.gif" alt="success" />
        </div>
        <p className="text-[#5C5E64] text-2xl text-center">{response?.passedValidation === 0 ? "No plan submitted" : "submitted successfully!"}</p>
        {response && (
          <p className="text-[#5C5E64] text-center">
            {response.passedValidation}/
            {response.passedValidation + response.failedValidation || 0} submitted
          </p>
        )}
        <div className="flex justify-around py-9">
          <div
            // onClick={handleViewValidationErrors}
            onClick={() =>{setStep(1); router.push({ pathname: "/drafts", query: { id: response.id, type: isActivity ? "Activities": "Materials" } })}}
            className="p-3 rounded-lg cursor-pointer text-sm bg-[#FFF2F4] text-[#E60000]"
          >
            View validation errors
          </div>
          <div
            onClick={() => {
              router.push("/demand-plan");
              onClosee()
              setStep(1);

            }}
            className="p-3 rounded-lg cursor-pointer text-sm bg-[#E1FFF0] text-[#007A3D]"
          >
            View submitted Plans
          </div>
        </div>
      </div>
    </>
  );
}
