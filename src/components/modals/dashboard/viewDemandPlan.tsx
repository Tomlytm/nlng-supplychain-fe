import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    useToast,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

import { useOnboarding } from "@/context/OnboardingContext";
import { useState } from "react";

import OnboardingServices from "@/services/onboarding_services/onboarding_services";
import Image from "next/image";
import { RxCross2, RxDividerVertical } from "react-icons/rx";
import Spreadsheet from "@/components/uploadADP/Spreadsheet";
import StepThree from "@/components/uploadADP/StepThree";
import StepOne from "@/components/uploadADP/StepOne";
type addEndpointModalProps = {
    isOpen: boolean;
    onClose: () => void;
    cycleYear: number | null;
    file: File | null;
    errors?: any[];
    download?: boolean;
    hasImport?: boolean;
    isActivity?: boolean;
};
export default function UploadAdp({ isOpen, onClose, cycleYear, file, errors, download, isActivity, hasImport }: addEndpointModalProps) {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [newFile, setNewFile] = useState<File | null>(null);
    const [templateResponse, setTemplateResponse] = useState<any>();

    const toast = useToast();
    const closeThis = () => {
        onClose();
        setNewFile(null)
    }

    return (
        <Modal isOpen={isOpen} onClose={closeThis} size={"full"}>
            <ModalOverlay />
            <ModalContent bg={step !== 1 ? "#fafafa" : "#05211340"}>
                {step != 1 ? (
                    <ModalHeader className="flex items-center justify-between w-full ">
                        <Image
                            src={"/images/logonew.svg"}
                            alt="logo"
                            width={200}
                            height={100}
                            className="w-[5%] "
                        />

                        <button
                            className="w-fit h-fit flex items-center gap-2 px-5 py-1 rounded-full border-[#757575] border text-[#757575] text-sm"
                            onClick={() => {
                                onClose();
                                setNewFile(null);
                                setStep(1)
                            }}
                        >
                            <RxCross2 /> Exit
                        </button>
                    </ModalHeader>
                ) : null}


                <ModalBody className="w-full h-full flex items-center justify-center ">

                    {step === 1 ? (
                        <Spreadsheet
                            download={download}
                            errors={errors}
                            setStep={setStep}
                            cycleYear={cycleYear}
                            hasImport={hasImport}
                            step={step}
                            file={newFile == null && file ? file : file && newFile !== null ? newFile : file}
                            updateResponse={(res) => setTemplateResponse(res)}
                            onClosee={closeThis}
                            isActivity={isActivity}
                        />
                    ) : null}
                    {step === 2 ? (
                        <StepOne
                            setStep={setStep}
                            step={step}
                            file={newFile}
                            setFile={setNewFile}
                        />
                    ) : null}
                    {step === 3 ? (
                        <StepThree
                            response={templateResponse}
                            setStep={setStep}
                            // file={file}
                            isActivity={isActivity}
                            onClosee={closeThis}
                        // setFile={setFile}
                        />
                    ) : null}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
