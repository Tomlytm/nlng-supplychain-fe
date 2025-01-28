import { useToast, Input, Modal, ModalOverlay, ModalContent, Spinner, useDisclosure } from "@chakra-ui/react";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import { RxDividerVertical } from "react-icons/rx";
import { MdCancel } from "react-icons/md";
import { Button } from "@/components/utils";
// import { handleLastModified } from "@/helper_utils/helpers";
type steponeProps = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};
export default function StepOne({
  setStep,
  step,
  file,
  setFile,
}: steponeProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        console.log(acceptedFiles[0])
        setFile(acceptedFiles[0]);
        setError(null);
        setDisabled(false);
      }
      if (fileRejections.length > 0) {
        setError("Only .csv, .xls or .xlsx files are supported.");
        setDisabled(true);
        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    },
    []
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".xls"], // MIME type for .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ], // MIME type for .xlsx
    },
  });
  const handleBrowseClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    document.getElementById("fileInput")?.click();
  };

  const generateYears = (count: number) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < count; i++) {
      years.push(currentYear - i); // Push each year into the array
    }

    return years; // Return the array of years
  };
  const handlesetNextStep = () => {
    // const nextStep = step + 1;
    // localStorage.setItem("step", `${nextStep}`);
    setStep(1);
  };
  return (
    <div className="rounded-xl bg-white w-[50%] p-5 flex-col flex gap-5">
      <p className="text-2xl font-semibold text-[#052113]">Import Demand Plan</p>
      <p className="  text-[#052113]">
        Import your file to repopulate plan
      </p>
      <div
        className="w-full rounded-lg border-dashed border p-5 border-secondary flex flex-col items-center justify-center"
        {...getRootProps()}
      >
        <Input
          type="file"
          id="fileInput"
          display="none"
          {...(getInputProps() as any)}
        />
        {isDragActive ? (
          <div className="h-[200px]  w-full bg-[#FAFAFACC]"></div>
        ) : !file && !isDragActive ? (
          <div
            className="flex flex-col h-[200px] gap-3 items-center"
            onClick={handleBrowseClick}
          >
            {" "}
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_129_1279)">
                <path
                  d="M32 33.5627L43.3147 44.8747L39.5413 48.648L34.6667 43.7734V58.6667H29.3333V43.768L24.4587 48.648L20.6853 44.8747L32 33.5627ZM32 5.33337C36.5786 5.33359 40.9975 7.01634 44.4165 10.0617C47.8355 13.107 50.0162 17.3026 50.544 21.8507C53.862 22.7556 56.7566 24.7977 58.7218 27.6201C60.6869 30.4426 61.5977 33.8659 61.295 37.2917C60.9922 40.7176 59.4952 43.9281 57.0655 46.3622C54.6358 48.7963 51.428 50.2991 48.0027 50.608V45.2374C49.2298 45.0621 50.4097 44.6442 51.4736 44.008C52.5374 43.3717 53.4639 42.53 54.1988 41.5318C54.9338 40.5336 55.4626 39.399 55.7543 38.1943C56.046 36.9895 56.0948 35.7387 55.8979 34.5149C55.701 33.2911 55.2622 32.1187 54.6072 31.0663C53.9523 30.0139 53.0942 29.1025 52.0832 28.3853C51.0722 27.6681 49.9284 27.1595 48.7187 26.8891C47.509 26.6188 46.2575 26.5921 45.0373 26.8107C45.455 24.8664 45.4324 22.8533 44.9712 20.9188C44.5101 18.9844 43.6221 17.1776 42.3723 15.6308C41.1224 14.084 39.5424 12.8363 37.7479 11.9792C35.9535 11.1221 33.99 10.6773 32.0013 10.6773C30.0127 10.6773 28.0492 11.1221 26.2547 11.9792C24.4603 12.8363 22.8803 14.084 21.6304 15.6308C20.3806 17.1776 19.4926 18.9844 19.0314 20.9188C18.5703 22.8533 18.5477 24.8664 18.9653 26.8107C16.5324 26.3538 14.0176 26.8821 11.9742 28.2794C9.93085 29.6767 8.52621 31.8285 8.06933 34.2614C7.61245 36.6943 8.14076 39.2091 9.53803 41.2525C10.9353 43.2959 13.0871 44.7005 15.52 45.1574L16 45.2374V50.608C12.5745 50.2996 9.36641 48.7971 6.93636 46.3632C4.5063 43.9293 3.00887 40.7189 2.7058 37.2929C2.40272 33.867 3.31328 30.4435 5.27832 27.6208C7.24336 24.7981 10.1379 22.7557 13.456 21.8507C13.9832 17.3024 16.1637 13.1065 19.5829 10.061C23.002 7.01556 27.4212 5.33301 32 5.33337Z"
                  fill="#0085C8"
                />
              </g>
              <defs>
                <clipPath id="clip0_129_1279">
                  <rect width="64" height="64" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <p className="">Drag / Drop or click to add file here </p>
            <p className="text-[#757575]">Accepts excel file(.xls or .csv)</p>
          </div>
        ) : (
          <div className="flex flex-col h-[200px] w-full gap-3 items-center">
            <div className="border w-full flex rounded-lg p-3 items-center justify-between">
              <div className="flex items-center  gap-2 w-fit">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="40" height="40" rx="10" fill="#F5F5F5" />
                  <g clip-path="url(#clip0_129_1435)">
                    <path
                      d="M10.859 10.877L23.429 9.08197C23.5 9.07179 23.5723 9.07699 23.641 9.0972C23.7098 9.11741 23.7734 9.15216 23.8275 9.1991C23.8817 9.24605 23.9251 9.30408 23.9549 9.36928C23.9846 9.43447 24 9.5053 24 9.57697V30.423C24 30.4945 23.9846 30.5653 23.9549 30.6304C23.9252 30.6955 23.8819 30.7535 23.8279 30.8004C23.7738 30.8473 23.7103 30.8821 23.6417 30.9024C23.5731 30.9227 23.5009 30.928 23.43 30.918L10.858 29.123C10.6196 29.089 10.4015 28.9702 10.2437 28.7883C10.0859 28.6065 9.99903 28.3738 9.99902 28.133V11.867C9.99903 11.6262 10.0859 11.3935 10.2437 11.2116C10.4015 11.0297 10.6196 10.9109 10.858 10.877H10.859ZM12 12.735V27.265L22 28.694V11.306L12 12.735ZM25 27H28V13H25V11H29C29.2652 11 29.5196 11.1053 29.7071 11.2929C29.8947 11.4804 30 11.7348 30 12V28C30 28.2652 29.8947 28.5195 29.7071 28.7071C29.5196 28.8946 29.2652 29 29 29H25V27ZM18.2 20L21 24H18.6L17 21.714L15.4 24H13L15.8 20L13 16H15.4L17 18.286L18.6 16H21L18.2 20Z"
                      fill="#007A3D"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_129_1435">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(8 8)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <div className="flex flex-col">
                  <p className="font-[500]">{file?.name}</p>
                  <p className="font-[500] text-xs text-[#757575]">
                    {/* last updated {handleLastModified(file as File)} */}
                  </p>
                </div>
              </div>
              <MdCancel
                onClick={() => setFile(null)}
                className="cursor-pointer text-xl text-[#757575]"
              />
            </div>
          </div>
        )}
        {error && (
          <p className="bg-error-bg text-error p-2 rounded-lg w-full text-center">
            {error}
          </p>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          type="fit"
          text="Import"
          onClick={() => {
            onOpen();
          }}
          loading={loading}
          disabled={disabled}
          className="font-semibold"
        />
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="p-6 rounded-lg shadow-lg">
          <div className="flex gap-3">
            <div className="bg-[#F5F5F5] rounded-lg"><svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.0007 39.6673C31.2223 39.6673 34.139 38.3615 36.2502 36.2502C38.3615 34.139 39.6673 31.2223 39.6673 28.0007C39.6673 24.779 38.3615 21.8624 36.2502 19.7511C34.139 17.6398 31.2223 16.334 28.0007 16.334C24.779 16.334 21.8624 17.6398 19.7511 19.7511C17.6398 21.8624 16.334 24.779 16.334 28.0007C16.334 31.2223 17.6398 34.139 19.7511 36.2502C21.8624 38.3615 24.779 39.6673 28.0007 39.6673Z" fill="#F5F5F5" stroke="#4F4F4F" stroke-width="2" stroke-linejoin="round" />
              <path d="M23.334 28L26.834 31.5L33.834 24.5" stroke="#4F4F4F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-[#5C5E64]">Ready to import file?</p>
              <p className=" text-[#B5B5C3] font-light">
                Importing this will override the previous plan with this updated plan?</p>
            </div>
          </div>
          {/* <ModalHeader className="text-lg font-semibold text-center">Sure you want to submit?</ModalHeader> */}
          {/* <ModalBody className="text-center text-gray-600">
                  Are you sure you want to submit?
                </ModalBody> */}
          <div className="flex justify-between py-4 gap-4">
            <div
              onClick={onClose}
              className="bg-white border w-full cursor-pointer text-center text-sm border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              No, cancel
            </div>
            <div
              onClick={() => {
                // triggerSave();

                handlesetNextStep();
              }}
              className="bg-[#5C5E64] flex justify-center gap-3 cursor-pointer w-full text-white px-4 py-2 text-center text-sm rounded-lg hover:bg-gray-700"
            >
              {loading && (
                <Spinner />)}
              Yes, confirm
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
