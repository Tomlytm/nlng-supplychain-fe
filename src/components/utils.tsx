import { Spinner } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, createContext, useContext, useEffect } from "react";
import { FaChevronRight } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdSearch } from "react-icons/md";
// import { createContext } from "vm";

type ButtonProps = {
  type?: string;
  text: string;
  onClick: (e: any) => void;
  className?: string;
  Type?: "button" | "reset" | "submit";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode | React.ReactNode[] | null;
};
export function Button({
  type,
  text,
  onClick,
  className,
  Type,
  loading,
  disabled,
  icon,
}: ButtonProps) {
  return (
    <button
      className={`${
        type === "fit" ? "w-fit" : "w-full"
      } px-4 py-2 text-center ease-in-out duration-500 text-sm flex items-center gap-2 ${
        disabled === true
          ? "bg-light-grey text-dark-grey"
          : "bg-primary hover:bg-primaryFade flex items-center justify-center hover:text-primary hover:border-primary hover:border text-white"
      }  rounded-lg ${className} `}
      onClick={onClick}
      type={Type}
      disabled={disabled !== undefined ? disabled : false}
    >
      {icon && icon}
      {loading ? <Spinner size={"sm"} /> : text}
    </button>
  );
}
type InputProps = {
  type?: string;
  placeholder: string;
  secondaryElement?: boolean;
  field: any;
  onBlur?: () => void;
};
export function Input({
  type,
  placeholder,
  secondaryElement,
  field,
  onBlur,
}: InputProps) {
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);

  return (
    <div className="w-full border border-light-grey  rounded flex items-center justify-between p-2">
      <input
        type={
          secondaryElement && show
            ? "text"
            : secondaryElement && !show
            ? "password"
            : type
        }
        {...field}
        placeholder={placeholder}
        className="bg-transparent w-[90%] outline-none border-none"
        onBlur={onBlur}
      />
      {secondaryElement && (
        <>
          {show ? (
            <HiEyeOff onClick={handleClick} cursor="pointer" />
          ) : (
            <HiEye onClick={handleClick} cursor="pointer" />
          )}
        </>
      )}
    </div>
  );
}
export type BreadCrumbItems = {
  breadCrumbText: string;
  breadCrumbPath: string;
};

interface BreadProps {
  breadCrumbItems?: BreadCrumbItems[];
  breadCrumbActiveItem: string;
}

export function BreadCrumbs({
  breadCrumbItems,
  breadCrumbActiveItem,
}: BreadProps) {
  const router = useRouter();
  return (
    <div className="md:flex hidden mb-3 px-5 gap-2 items-center">
      <p
        className="text-mid-grey font-semibold"
        onClick={() => {
          router.push("/api_discovery");
        }}
      >
        Home
      </p>
      {breadCrumbItems?.map((item, index) => (
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            router.push(item.breadCrumbPath);
          }}
          key={index}
        >
          <FaChevronRight className="text-sm" />
          <p className="text-mid-grey text-sm font-semibold">
            {item.breadCrumbText}
          </p>
        </div>
      ))}
      <FaChevronRight className="text-sm" />
      <p className="text-black text-sm font-semibold">{breadCrumbActiveItem}</p>
    </div>
  );
}

export function SearchBar() {
  return (
    <div className="w-fit p-2 flex border-light-grey border-[1px] border-[#D5D5D5] bg-white rounded-2xl flex items-center gap-2">
      <MdSearch />
      <input
        className="border-none outline-none w-full bg-transparent"
        placeholder="search"
      />
    </div>
  );
}
type EmptyStateProps = {
  heading: string;
  subText: string;
  buttonText: string;
  icon?: React.ReactNode | React.ReactNode[];
  onClick: () => void;
};
export function EmptyState({
  heading,
  subText,
  buttonText,
  icon,
  onClick,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <div className="w-fit h-fit p-2 rounded-full bg-white shadow-md">
        <svg
          width="54"
          height="53"
          viewBox="0 0 54 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_14_697)">
            <path
              d="M10 21V45H38V21H10ZM10 17H38V13H10V17ZM40 49H8C7.46957 49 6.96086 48.7893 6.58579 48.4142C6.21071 48.0391 6 47.5304 6 47V11C6 10.4696 6.21071 9.96086 6.58579 9.58579C6.96086 9.21071 7.46957 9 8 9H40C40.5304 9 41.0391 9.21071 41.4142 9.58579C41.7893 9.96086 42 10.4696 42 11V47C42 47.5304 41.7893 48.0391 41.4142 48.4142C41.0391 48.7893 40.5304 49 40 49ZM14 25H22V33H14V25ZM14 37H34V41H14V37ZM26 27H34V31H26V27Z"
              fill="#959595"
            />
          </g>
          <rect
            x="32.5"
            y="1.5"
            width="19.2231"
            height="19.5447"
            rx="9.61156"
            fill="#F5F5F5"
          />
          <rect
            x="32.5"
            y="1.5"
            width="19.2231"
            height="19.5447"
            rx="9.61156"
            stroke="white"
            strokeWidth="3"
          />
          <path
            d="M42.1116 16.5447C41.2564 16.5414 40.5206 16.331 39.9042 15.9134C39.291 15.4957 38.8187 14.8909 38.4873 14.0987C38.1591 13.3066 37.9967 12.3537 38 11.2401C38 10.1297 38.1641 9.18348 38.4922 8.40128C38.8237 7.61908 39.296 7.02415 39.9091 6.61648C40.5256 6.20549 41.2598 6 42.1116 6C42.9634 6 43.6958 6.20549 44.309 6.61648C44.9255 7.02746 45.3994 7.62405 45.7309 8.40625C46.0623 9.18513 46.2264 10.1297 46.2231 11.2401C46.2231 12.357 46.0573 13.3116 45.7259 14.1037C45.3978 14.8958 44.9271 15.5007 44.314 15.9183C43.7008 16.3359 42.9667 16.5447 42.1116 16.5447ZM42.1116 14.7599C42.6949 14.7599 43.1606 14.4666 43.5086 13.88C43.8566 13.2933 44.0289 12.4134 44.0256 11.2401C44.0256 10.4678 43.9461 9.82481 43.787 9.31108C43.6312 8.79735 43.4091 8.41122 43.1208 8.1527C42.8358 7.89418 42.4993 7.76492 42.1116 7.76492C41.5315 7.76492 41.0675 8.05492 40.7195 8.63494C40.3715 9.21496 40.1958 10.0833 40.1925 11.2401C40.1925 12.0223 40.2704 12.6752 40.4262 13.1989C40.5853 13.7192 40.809 14.1103 41.0974 14.3722C41.3857 14.6307 41.7238 14.7599 42.1116 14.7599Z"
            fill="#0085C8"
          />
          <defs>
            <clipPath id="clip0_14_697">
              <rect
                width="48"
                height="48"
                fill="white"
                transform="translate(0 5)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="text-xl font-bold">{heading}</p>
      <p className=" text-mid-grey">{subText}</p>
      <Button
        type="fit"
        text={buttonText}
        onClick={onClick}
        className="font-semibold"
        icon={icon ? icon : null}
      />
    </div>
  );
}

export function Loader() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Image src={"/gifs/loader.gif"} alt="loader" width={50} height={50} />
    </div>
  );
}

type ProgressProps = {
  trailBg: string;
  pathBg: string;
  value: string;
  height: string;
};
export function ProgressBar({ trailBg, pathBg, value, height }: ProgressProps) {
  return (
    <div
      className={`w-full rounded-full`}
      style={{ height, background: trailBg }}
    >
      <div
        className={`rounded-full  bg-${pathBg} h-full`}
        style={{
          width: `${value}%`,
        }}
      ></div>
    </div>
  );
}

export function toTitleCase(input: string, space?: boolean): string {
  // Step 1: Remove underscores
  const noUnderscores = input?.replace(/_/g, " ");

  // Step 2: Convert to title case
  const titleCase = noUnderscores
    ?.toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  // Step 3: Remove spaces
  if (space) {
    const noSpaces = titleCase.replace(/ /g, "");
    return noSpaces;
  }
  return titleCase;
}

//  THE COMPOUND COMPONENT PATTERN is the advanced react pattern used to create this table component. Below are the steps followed.

interface TableTypes {
  children?: React.ReactNode;
  data?: any[];
  render?: any;
  // For extra styling
  className?: string;
}

// 1. Create parent component
export function Table({ children, className }: TableTypes) {
  return (
    <div className={`rounded-lg border overflow-scroll ${className}`}>
      <table className={`min-w-full`}>{children}</table>
    </div>
  );
}

// 2. Creation of child components to render table header and body.
function Header({ children }: TableTypes) {
  return (
    <thead className="bg-resources-bg text-light-grey rounded-lg">
      <tr className="text-left text-sm">{children}</tr>
    </thead>
  );
}

function Heading({ children, className }: TableTypes) {
  return (
    <th className={`px-6 py-2 whitespace-nowrap ${className}`}>{children}</th>
  );
}

function Body({ data, render }: TableTypes) {
  if (data && data?.length < 1)
    return (
      <tbody>
        <tr>
          <td colSpan={data?.length} className="text-center py-4 text-dark-txt">
            Data not avalaible!
          </td>
        </tr>
      </tbody>
    );

  return <tbody>{data?.map(render)}</tbody>;
}

// 3. Child components added as properties to the parent component.
Table.Header = Header;
Table.Heading = Heading;
Table.Body = Body;

type paginationProps = {
  pageCount: number;
  onPageClick: (page: number) => void;
  inc?: boolean;
};
export default function GlobalPagination({
  pageCount = 10,
  onPageClick,
  inc,
}: paginationProps) {
  const [activePage, setActivePage] = useState<number>(inc ? 1 : 0);

  const handlePageClick = (page: number) => {
    if (page != activePage) {
      setActivePage(page);
      onPageClick(page);
    }
  };
  const handleNext = () => {
    setActivePage((prevPage) => {
      const nextPage = prevPage <= pageCount - 1 ? prevPage + 1 : prevPage;
      if (nextPage !== prevPage) {
        onPageClick(nextPage);
      }
      return nextPage;
    });
  };
  const handlePrev = () => {
    if (activePage > 0) {
      const prevPage = activePage - 1;
      console.log(prevPage, "going bsck");
      setActivePage(prevPage);
      onPageClick(prevPage);
    }
  };

  useEffect(() => {
    console.log(activePage);
  }, [activePage]);

  return (
    <div
      className="flex gap-2 items-center"
      style={{
        width: "fit-content",
      }}
    >
      <div
        className="tex-sm text-[#959595]"
        // style={{ cursor: "pointer" }}
        // onClick={() => handlePrev()}
      >
        <p className="mb-0">Page</p>
      </div>
      <select
        name="page"
        id="page"
        onChange={(e) => {
          handlePageClick(parseInt(e.target.value));
        }}
        className={`px-3 p-2 rounded-lg border   text-sm font-semibold w-fit h-fit`}
      >
        {Array.from({ length: pageCount }, (_, index) => {
          const newIndex = inc ? index + 1 : index;
          return (
            <option
              key={newIndex} // Key should be unique, so using newIndex + 1
              value={index + 1}
            >
              {index + 1}
            </option>
          );
        })}
      </select>
      <div
        className="tex-sm text-[#959595]"
        // style={{ cursor: "pointer" }}
        // onClick={() => handlePrev()}
      >
        <p className="mb-0">of {pageCount}</p>
      </div>
      <div
        className="px-3 py-1 rounded-lg text-secondary text-sm font-semibold w-fit h-fit"
        style={{ cursor: "pointer" }}
        onClick={() => handleNext()}
      >
        <p className="mb-0">Next</p>
      </div>
    </div>
  );
}

export type Base64<imageType extends string> =
  `data:image/${imageType};base64,${string}`;

export function dataURLtoFile(dataurl: any, filename: string) {
  if (!dataurl) return;
  if (!filename) return;
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
