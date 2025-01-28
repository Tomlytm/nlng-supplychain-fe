import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button
} from "@chakra-ui/react";

function Example() {
  return (
    <Popover placement="top" offset={[0, -270]}>
      <PopoverTrigger>
        <svg
          className="cursor-pointer"
          width="21"
          height="18"
          viewBox="0 0 21 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.52148 17.0212L2.82148 13.1212C0.497485 9.68421 1.39548 5.24921 4.92148 2.74721C8.44748 0.246207 13.5115 0.451206 16.7665 3.22721C20.0215 6.00421 20.4615 10.4932 17.7955 13.7282C15.1295 16.9632 10.1805 17.9432 6.22148 16.0212L1.52148 17.0212Z"
            stroke="#959595"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent w={'550px'} padding={5} mr={'80px'} className="shadow-sm">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader className="text-gray-800 text-base font-semibold border-b">
          Potential delay flagged for DM_PMN
          <p className="text-xs text-[#5C5E64] font-normal">8126860173</p>
        </PopoverHeader>
        <PopoverBody className="space-y-3 py-4">
          {/* Message Bubble */}
          <p className="text-[#1C1C1EB8] text-[10px] text-center">Start conversation</p>
          <div className="bg-[#FAFAFA] flex ms-auto justify-end w-4/5 text-xs rounded-lg p-4 mb-11 text-gray-700 shadow-sm">
          <div>
             <p>
              Hello FP, System flagged some item because the lead time is greater than RoS, let&apos;s discuss how best to move forward.
            </p>
            <p className="text-[10px] text-gray-500 block mt-2 text-right">
              Sent - 7:51 PM 21/12/2024
            </p>
          </div>
           
          </div>

          {/* Repeated Messages */}
          <div className="grid grid-cols-2 gap-4 pt-10">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 text-gray-600 text-xs shadow-sm hover:shadow-md cursor-pointer"
                >
                  Hello FP, System flagged this item because the{" "}
                  <span className="text-blue-500">lead time</span> is greater
                  than RoS, let&apos;s discuss how best to move forward.
                </div>
              ))}
          </div>

        </PopoverBody>
        <div className="w-full flex gap-2">
            <input
              type="text"
              placeholder="Write a comment"
              className="flex-1 border rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button colorScheme="green" className="rounded-lg">
              Send
            </Button>
          </div>
      </PopoverContent>
    </Popover>
  );
}

export default Example;
