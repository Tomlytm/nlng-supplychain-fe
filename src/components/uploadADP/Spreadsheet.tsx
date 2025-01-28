"use client";
import {
  SheetsDirective,
  SheetDirective,
  ColumnsDirective,
  RangesDirective,
  RangeDirective,
  RowsDirective,
  RowDirective,
  CellsDirective,
  CellDirective,
  ColumnDirective,
  UsedRangeModel,
  BeforeSaveEventArgs,
  SaveCompleteEventArgs,
  CellEditEventArgs,
} from "@syncfusion/ej2-react-spreadsheet";
import { SpreadsheetComponent } from "@syncfusion/ej2-react-spreadsheet";
import {
  DataManager,
  Query,
  UrlAdaptor,
  WebApiAdaptor,
} from "@syncfusion/ej2-data";
import { defaultData } from "../../../constants";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
// import { handleLastModified } from "@/helper_utils/helpers";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { getJWT } from "@/services/httpInstance/wrappedinstance";
// import ADPServices from "@/services/adp_services/adp_services";
import { useOnboarding } from "@/context/OnboardingContext";
import { Skeleton, Spinner, useToast, Tooltip, Box, Switch, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, ModalOverlay, Modal, ModalContent, ModalCloseButton, Icon, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@chakra-ui/react";
// import CustomWebApiAdaptor from "@/helper_utils/customApiAdaptor";
// import { IUploadError } from "@/models/adp.model";
import { BiError } from "react-icons/bi";
import DemandPlanServices from "@/services/demand_plan_services";
import { GrValidate } from "react-icons/gr";
type steponeProps = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  file: File | null;
  onClosee: () => void;
  cycleYear: number | null;
  errors?: any[] | any;
  download?: boolean;
  hasImport?: boolean;
  isActivity?: boolean;
  updateResponse: (item: string) => void;
};
type TooltipContentProps = {
  cellValue: string;
  rowIndex: number;
  columnIndex: number;
}
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
function TooltipContentComponent({ cellValue, rowIndex, columnIndex }: TooltipContentProps) {
  return (
    <div className="relative">
      <div>Value: ${cellValue}</div> <div>Row: ${rowIndex}, Column: ${columnIndex}</div>
    </div>
  )
}
function extractRowNumber(cellAddress: string) {
  const match = cellAddress.match(/\d+$/); // Matches digits at the end of the string
  return match ? parseInt(match[0], 10) : null; // Convert to integer, or return null if no match
}
export default function StepTwo({
  setStep,
  step,
  file,
  onClosee,
  cycleYear,
  errors,
  download,
  isActivity,
  hasImport,
  updateResponse
}: steponeProps) {
  // const { user } = useOnboarding();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const { year, product } = router.query;
  const [templateType, setTemplateType] = useState<string>("Inreview");
  const [checked, setChecked] = useState(false)
  const [filled, setFilled] = useState(false)
  const [disabled, setDisabled] = useState<boolean>(true);
  const [preclose, setPreclose] = useState<boolean>(false);
  const [showValidations, setShowValidations] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  // const [errors, setErrors] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mesc, setMesc] = useState<string>("");
  const [mescResult, setMescResult] = useState<any[]>([]);
  const [isMesc, setIsMesc] = useState<boolean>(false);
  const { setApiErrorMessage, user } = useOnboarding();
  const spreadsheetRef = useRef<SpreadsheetComponent | null>(null);
  const [tooltipContent, setTooltipContent] = useState<any | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(null);
  const [currentRow, setCurrentRow] = useState<any>(1);
  const [clicked, setClicked] = useState<any>()
  // console.log(user)
  const boldRight = { fontWeight: "bold", textAlign: "right" };
  const bold = { fontWeight: "bold" };
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "PUT",
    "Content-Type": "application/json",
    Authorization: getJWT(),
  };
  async function findMesc(keyword: string) {
    setLoading(true);
    try {

      const loginres = await DemandPlanServices.mescSearch(keyword);
      setMescResult(loginres.data);
      console.log(loginres.data)
      // actions.setSubmitting(false);
      // toast({
      //   status: "success",
      //   description: "Mesc Number fetched",
      //   position: "bottom-right",
      // });
      setLoading(false);

    } catch (error: any) {
      console.log(error);

      setLoading(false);
      const errorMessage = error?.response?.data?.data[0].Message;
      // console.log(errorMessage)
      toast({
        status: "error",
        description: errorMessage,
        position: "bottom-right",
      });
      // setApiErrorMessage(errorMessage, "error");
      // return;
    }
  }
  async function createDemandPlan(year: number, deptId: number, file: FormData) {
    setLoading(true);
    try {
      const planType = isActivity ? "Activities" : "Materials";
      const loginres = await DemandPlanServices.createDemandPlan(planType, templateType, year, deptId, file);
      if (templateType === "Draft") {
        router.push('/drafts')
      } else {
        updateResponse(loginres.data)
        handlesetNextStep();
        onClose();
      }
      toast({
        status: "success",
        description: "Demand plan draft created!",
        position: "bottom-right",
      });
      setLoading(false);

    } catch (error: any) {
      console.log(error);

      setLoading(false);
      // setErrors(error?.response?.data?.data)
      toast({
        status: "error",
        description: error?.response?.data?.message,
        position: "bottom-right",
      });
      // setApiErrorMessage(errorMessage, "error");
      // return;
    }
  }
  const uploadFile = async (

    file: File
  ) => {
    setLoading(true);
    if (file && cycleYear && user) {
      const formData = new FormData();
      formData.append("files", file as File);
      console.log(formData)
      createDemandPlan(cycleYear, user.department?.id, formData)
    }
  };
  function extractNumber(input: any) {
    const match = input.match(/([BFELGTO])\s?(\d+)/);
    if (match) {
      return parseInt(match[2], 10);
    }
    return null;
  }
  const handleMouseOver = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('e-cell')) {
      const cellIndex = target.getAttribute('data-cell-index');
      const [rowIndex, columnIndex] = cellIndex ? cellIndex.split(',').map(Number) : [0, 0];
      const cellValue = target.innerText;
      const extracted = extractNumber(target.ariaLabel)

      setTooltipContent(<TooltipContentComponent cellValue={cellValue} rowIndex={rowIndex} columnIndex={columnIndex} />);
      setTooltipPosition({ top: event.clientY + 10, left: event.clientX + 10 }); // Positioning tooltip slightly below and to the right of the mouse
    }
  };

  const handleToggleTooltip = () => {
    setChecked((prevChecked) => !prevChecked);
  };
  useEffect(() => {
    const spreadsheet = spreadsheetRef.current;
    if (spreadsheet) {
      if (checked) {
        spreadsheet.element.addEventListener('mouseover', handleMouseOver);
      } else {
        spreadsheet.element.removeEventListener('mouseover', handleMouseOver);
      }
    }

    return () => {
      if (spreadsheet) {
        spreadsheet.element.removeEventListener('mouseover', handleMouseOver);
      }
    };
  }, [checked]);



  const onCreated = () => {
    setIsInitialized(true);
    const spreadsheet = spreadsheetRef.current;
    if (spreadsheet) {
      spreadsheet.element.addEventListener('mouseover', handleMouseOver);
      // Apply styles to the specified range in the active sheet.
      spreadsheet.cellFormat(
        { fontWeight: "bold", textAlign: "center", verticalAlign: "middle" },
        "A1:Z1"
      );
      // console.log(file);
      spreadsheet.open({ file: file as File });
      setLoading(false);
    }
  };
  const handlesetNextStep = () => {
    const nextStep = step + 1;
    // localStorage.setItem("step", `${nextStep}`);
    setStep(3);
  };

  setTimeout(() => {
    setDisabled(false);
  }, 2000);
  const beforeSave = (args: BeforeSaveEventArgs): void => {
    args.needBlobData = true; // To trigger the saveComplete event.
    args.isFullPost = false; // Get the spreadsheet data as blob data in the saveComplete event.
  };
  const triggerSave = () => {
    if (spreadsheetRef.current) {
      spreadsheetRef.current.save({
        fileName: "modified.xlsx",
        saveType: "Xlsx", // Choose the desired format
      });
      setLoading(true);
    }
  };
  const downloadFile = (file: any) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "file.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Clean up the object URL
  };

  const saveComplete = (args: SaveCompleteEventArgs): void => {
    const file = new File([args.blobData], "modified.xlsx", {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    uploadFile(
      file
    );
  };
  const onDataBound = () => {
    const spreadsheet = spreadsheetRef.current;
  };
  const handleCellEdit = (args: CellEditEventArgs) => {
    // Reset mesc and clicked before starting to type
    setMesc("");
    setClicked("");
    setMescResult([]);
    const num = extractRowNumber(args.address);
    setCurrentRow(Number(num));

    console.log(args.address)
    const mescCol = isActivity ? "E" : "D"
    if (args.address.split("!")[1].includes(mescCol)) {
      // console.log(1)
      setIsMesc(true);
    } else {
      // console.log(2)
      setIsMesc(false);
    }
    setTimeout(() => {
      const editElement = document.querySelector('.e-spreadsheet-edit');

      if (editElement) {
        // Ensure the value or innerText is initially empty
        const target = editElement as HTMLElement;
        (target as HTMLInputElement).value = ''; // Clear input value
        target.innerText = ''; // Clear innerText

        // Add event listener for input
        editElement.addEventListener('input', (event) => {
          const target = event.target as HTMLElement;

          // Get the current value as you type (empty initially)
          const currentValue = (target as HTMLInputElement).value || target.innerText;
          setMesc(currentValue); // Update the `mesc` value


          console.log(`Current value as you type: ${currentValue}`);
        });
      }
    }, 0);
  };

  useEffect(() => {
    if (isMesc) {
      findMesc(mesc)
    }
  }, [mesc, isMesc])

  const handleCellSave = (args: any) => {
    // console.log('cel saveeee')
    // setMesc("");

    const spreadsheet = spreadsheetRef.current;
    const mescCol = isActivity ? "E" : "D"
    if (spreadsheet && args.address.split("!")[1].includes(mescCol)) {
      // Set the cell's value to `mesc` permanently
      if (filled) {
        spreadsheet.updateCell({ value: clicked }, args.address);
      } else {
        spreadsheet.updateCell({ value: mesc }, args.address);
      }
      // args.cancel = true;
    }
    setClicked("")
    setFilled(false)
  };

  const updateCellHandler = (item: any) => {
    setFilled(true)
    setClicked(item.materialNo)
    // console.log(item);
    let spreadsheet = spreadsheetRef.current;
    if (spreadsheet) {
      if (isActivity) {
        spreadsheet.updateCell({ value: item.materialNo }, `E${currentRow}`);
        spreadsheet.updateCell({ value: item.materialDescription }, `F${currentRow}`);
        spreadsheet.updateCell({ value: item.uom }, `G${currentRow}`);
        spreadsheet.updateCell({ value: item.capexOpex }, `H${currentRow}`);
        spreadsheet.updateCell({ value: item.iapsNonIaps }, `I${currentRow}`);
        // spreadsheet.updateCell({ value: "" }, `I${currentRow}`);
        spreadsheet.updateCell({ value: item.stockItem }, `K${currentRow}`);
      } else {
        spreadsheet.updateCell({ value: item.materialNo }, `D${currentRow}`);
        spreadsheet.updateCell({ value: item.materialDescription }, `E${currentRow}`);
        spreadsheet.updateCell({ value: item.uom }, `F${currentRow}`);
        spreadsheet.updateCell({ value: item.capexOpex }, `G${currentRow}`);
        spreadsheet.updateCell({ value: item.iapsNonIaps }, `H${currentRow}`);
        // spreadsheet.updateCell({ value: "" }, `I${currentRow}`);
        spreadsheet.updateCell({ value: item.stockItem }, `J${currentRow}`);
      }

      // Apply cell formatting (e.g., center align the cell values for a specific address range)
      spreadsheet.cellFormat({ textAlign: 'center' }, "B3:M3");
    }
  };
  useEffect(() => {
    // Select the spreadsheet edit element
    const editElement = document.querySelector('.e-spreadsheet-edit');

    if (editElement) {
      // Update the element's value or innerText based on the `mesc` state
      const editableElement = editElement as HTMLInputElement;
      if (clicked) {
        editableElement.value = clicked;
        editableElement.innerText = clicked;
      }

      const handleInput = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const currentValue = target.value || target.innerText;

        console.log(`Current value as you type: ${currentValue}`);
      };

      editElement.addEventListener('input', handleInput);

      return () => {
        editElement.removeEventListener('input', handleInput);
      };
    }
  }, [clicked]);
  const handlesetPrevStep = () => {
    const prevStep = step - 1;
    // localStorage.setItem("step", `${prevStep}`);
    setStep(2);
  };
  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        <div
          className={`${preclose ? "block" : "hidden"
            } w-full bg-error-bg transition-all ease-in-out duration-700 flex items-center justify-between px-5 py-2 mb-3 rounded-lg`}
        >
          <p className="text-error">
            Are you sure you want to close this Demand plan upload process?
          </p>
          <div className="flex items-center gap-3">
            <button
              className={`w-fit h-fit flex px-3 text-[#353535] py-1 items-center gap-2 rounded-full 
               bg-[#D5D5D5]
               
              `}
              onClick={() => setPreclose(false)}
            >
              Cancel
            </button>
            <button
              className={`w-fit h-fit flex px-3 py-1 bg-red-600 text-white items-center gap-2 rounded-full`}
              onClick={() => {
                if (
                  !router.pathname.includes('cp_demand_plans') &&
                  !router.pathname.includes('demand-plan')
                ) {
                  router.replace(router.pathname, undefined, { shallow: true });
                }
                onClosee();

                // handlesetPrevStep();
              }}
            >
              Close
            </button>
          </div>
        </div>

        <div className="flex w-full justify-between text-white bg-[#052113] rounded-t-xl p-3">
          <div className="flex gap-2 items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="10" fill="#F5F5F5" />
              <g clipPath="url(#clip0_129_1435)">
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
            <div className="">
              <p className="font-[500]">{file?.name}</p>

            </div>
          </div>

          <div className="flex items-center  gap-2 w-fit">

            {download ? (
              <div className="flex justify-end items-center gap-3 ">
                <button
                  className={`w-fit h-fit flex px-3 py-1 items-center gap-2 rounded-full ${!isInitialized ? "bg-[#D5D5D5]" : "bg-primary"
                    }`}
                  disabled={!isInitialized}
                  onClick={() => {
                    downloadFile(file);
                  }}
                > {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.375 10.9238H13.375L9.375 14.9238L5.375 10.9238H8.375V6.92383H10.375V10.9238ZM12.375 2.92383H2.375V18.9238H16.375V6.92383H12.375V2.92383ZM0.375 1.91583C0.375 1.36783 0.822 0.923828 1.374 0.923828H13.375L18.375 5.92383V19.9168C18.3759 20.0482 18.351 20.1784 18.3016 20.3C18.2522 20.4217 18.1793 20.5325 18.0871 20.626C17.9949 20.7195 17.8851 20.7939 17.7642 20.845C17.6432 20.8961 17.5133 20.9229 17.382 20.9238H1.368C1.10538 20.922 0.854017 20.8169 0.668218 20.6313C0.482418 20.4457 0.377095 20.1944 0.375 19.9318V1.91583Z" fill="#D5D5D5" />
                    </svg>
                    Download
                  </>
                )}

                </button>
                <RxCross2
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setPreclose(true);
                  }}
                />
              </div>
            ) : (
              <div className="flex justify-end items-center gap-3 ">
                {hasImport && (
                  <button
                    className={`w-fit h-fit flex px-3 py-1 items-center gap-2 rounded-full ${!file ? "bg-[#D5D5D5]" : "bg-primary"
                      }`}
                    onClick={handlesetPrevStep}
                  >
                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.375 14.4238V16.4238C1.375 16.9543 1.58571 17.463 1.96079 17.838C2.33586 18.2131 2.84457 18.4238 3.375 18.4238H15.375C15.9054 18.4238 16.4141 18.2131 16.7892 17.838C17.1643 17.463 17.375 16.9543 17.375 16.4238V14.4238M4.375 6.42383L9.375 1.42383M9.375 1.42383L14.375 6.42383M9.375 1.42383V13.4238" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                    import
                  </button>
                )}
                <button
                  className={`w-fit h-fit flex px-3 py-1 items-center gap-2 rounded-full ${!isInitialized ? "bg-[#D5D5D5]" : "bg-primary"
                    }`}
                  disabled={!isInitialized}
                  onClick={() => {
                    setTemplateType("Draft");
                    triggerSave();
                  }}
                > {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.375 10.9238H13.375L9.375 14.9238L5.375 10.9238H8.375V6.92383H10.375V10.9238ZM12.375 2.92383H2.375V18.9238H16.375V6.92383H12.375V2.92383ZM0.375 1.91583C0.375 1.36783 0.822 0.923828 1.374 0.923828H13.375L18.375 5.92383V19.9168C18.3759 20.0482 18.351 20.1784 18.3016 20.3C18.2522 20.4217 18.1793 20.5325 18.0871 20.626C17.9949 20.7195 17.8851 20.7939 17.7642 20.845C17.6432 20.8961 17.5133 20.9229 17.382 20.9238H1.368C1.10538 20.922 0.854017 20.8169 0.668218 20.6313C0.482418 20.4457 0.377095 20.1944 0.375 19.9318V1.91583Z" fill="#D5D5D5" />
                    </svg>

                    Save as draft
                  </>
                )}

                </button>
                <button
                  className={`w-fit h-fit flex px-3 py-1 items-center gap-2 rounded-full ${!isInitialized ? "bg-[#D5D5D5]" : "bg-primary"
                    }`}
                  disabled={!isInitialized}
                  onClick={() => {
                    setTemplateType("Inreview");
                    onOpen();
                  }}
                >
                  {/* {loading ? (
                  <Spinner />
                ) : ( */}
                  <>
                    <MdCheck />
                    Submit
                  </>
                  {/* )} */}
                </button>
                <RxCross2
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setPreclose(true);
                  }}
                />
              </div>)}
          </div>
        </div>
        <div className="flex ">
          <div
            className={`${showValidations ? " w-[70%]" : "w-full"
              }  ease-in-out duration-700`}
          >
            <Tooltip isOpen={!!tooltipContent && !!checked} label={tooltipContent} placement="top" hasArrow>
              <Box position="absolute" top={tooltipPosition?.top} left={tooltipPosition?.left}>
                <div className="tooltip-placeholder" />
                <span className="text-white absolute right-0">x</span>
              </Box>
            </Tooltip>
            <SpreadsheetComponent
              openUrl="https://services.syncfusion.com/react/production/api/spreadsheet/open"
              saveUrl="https://services.syncfusion.com/react/production/api/spreadsheet/save"
              ref={spreadsheetRef}
              created={onCreated}
              dataBound={onDataBound}
              beforeCellSave={handleCellEdit}
              key={data.length}
              beforeSave={beforeSave}
              saveComplete={saveComplete}
              cellEdit={handleCellEdit}
              allowSave={true}
              cellSave={handleCellSave}
              allowInsert
              allowAutoFill
              allowEditing
              allowDelete

            >
              <SheetsDirective>
                <SheetDirective name={file?.name}>
                  <RangesDirective>
                    <RangeDirective dataSource={defaultData}></RangeDirective>
                  </RangesDirective>
                  <RowsDirective>
                    <RowDirective index={30}>
                      <CellsDirective>
                        <CellDirective
                          index={4}
                          value="Total Amount:"
                        //   style={boldRight}
                        ></CellDirective>
                        <CellDirective
                          formula="=SUM(F2:F30)"
                        //   style={bold}
                        ></CellDirective>
                      </CellsDirective>
                    </RowDirective>
                  </RowsDirective>
                  <ColumnsDirective>
                    <ColumnDirective width={40}></ColumnDirective>
                    <ColumnDirective width={150}></ColumnDirective>
                    <ColumnDirective width={50}></ColumnDirective>
                    <ColumnDirective width={130}></ColumnDirective>
                    <ColumnDirective width={180}></ColumnDirective>
                    <ColumnDirective width={80}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                    <ColumnDirective width={120}></ColumnDirective>
                  </ColumnsDirective>
                </SheetDirective>
              </SheetsDirective>
            </SpreadsheetComponent>
          </div>
          <div className={`${showValidations ? "w-[30%]" : "w-[3%]"} ease-in-out text-[#353535] duration-700 flex bg-white p-5 flex-col gap-5`}>

            <div className=" text-[#353535] flex items-center justify-between">
              <p
                className={`ease-in-out duration-700 flex items-center font-semibold gap-2 ${showValidations
                  ? "block text-ellipsis overflow-hidden text-nowrap w-[60%]"
                  : "hidden "
                  } `}
              >
                <GrValidate />
                Custom Panel
              </p>
              {showValidations ? (
                <ChevronRightIcon
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setShowValidations(false);
                  }}
                />
              ) : (
                <ChevronLeftIcon
                  className="text-2xl cursor-pointer"
                  onClick={() => {
                    setShowValidations(true);
                  }}
                />
              )}
            </div>
            <div className="overflow-y-auto max-h-[70vh] space-y-5">
              {/* Accordion for Mesc Suggestions */}
              {isMesc && (
                <Accordion allowToggle index={mescResult?.length > 1 ? [0] : []} >
                  <AccordionItem>
                    <h2>
                      <AccordionButton className="text-[#353535] flex items-center justify-between bg-gray">
                        <p className={`ease-in-out duration-700 flex items-center font-semibold gap-2 ${showValidations ? "block" : "hidden"}`}>
                          {/* <GrValidate /> */}
                          Mesc Suggestions
                          <span className="text-xs bg-gray-100 p-1 rounded-full">{mescResult?.length}</span>
                        </p>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <p className="mb-2 text-xs text-gray-500 font-medium">
                        {mescResult?.length} match{mescResult?.length > 1 ? "es" : ""} found
                      </p>
                      <div className="overflow-y-auto max-h-[300px] bg-gray-100 rounded-lg p-2">
                        {mescResult?.map((item, i) => (
                          <div
                            key={i}
                            className={`text-xs mb-2 cursor-pointer p-2 ${item.materialNo === clicked ? "bg-green-500 text-white" : "bg-white"}`}
                            onClick={() => updateCellHandler(item)}
                          >
                            {item.materialNo}
                          </div>
                        ))}
                      </div>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              )}

              {/* Accordion for Validation Errors */}
              {!hasImport && (
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton className="text-[#353535] flex items-center justify-between">
                      <p className={`ease-in-out duration-700 flex items-center font-semibold gap-2 text-red-900 ${showValidations ? "block" : "hidden"}`}>
                        {user?.roles[0].roleType === "cp_focal" ? "Potential Flagged Delay" : "Validation Error"}
                        {errors?.length > 0 && (<span className="p-2 text-xs text-red-800 bg-red-100 rounded-full font-medium">
                          {errors?.length}
                        </span>)}
                      </p>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} >
                    <span className="mb-2 text-xs text-gray-500 font-medium">
                      {errors?.length} error{errors?.length > 1 ? "s" : ""} found

                    </span>
                    {errors?.map((item: any, index: number) => (
                      <div className="flex gap-2 p-2 text-sm" key={index}>
                        <BiError className="text-red-600 mt-2" />
                        <div className="flex flex-col">
                          <p className={`ease-in-out font-[500] duration-700 ${showValidations ? "" : "hidden"}`}>
                            {item.Message}
                          </p>
                          <div className="flex items-center gap-2">
                            {/* <p className={`ease-in-out duration-500 ${showValidations ? "" : "hidden"}`}>column: {item.ColumnName}</p> */}
                            <p className={`ease-in-out duration-700 ${showValidations ? "" : "hidden"}`}>row: {item.Row}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              )}

              {/* Switch for Tooltip */}
              <div className={`ease-in-out duration-700 ${showValidations ? "block" : "hidden"}`}>
                <Switch defaultChecked={checked} checked={checked} colorScheme="green" size={'sm'} onChange={handleToggleTooltip}>
                  {!checked ? `enable` : `disable`} tooltip
                </Switch>
              </div>
            </div>
          </div>
        </div>
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
              onClick={onClose}
              className="bg-white border w-full cursor-pointer text-center text-sm border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
            >
              No, cancel
            </div>
            <div
              onClick={() => {
                triggerSave();
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

function useUserProvider(): { user: any; } {
  throw new Error("Function not implemented.");
}
