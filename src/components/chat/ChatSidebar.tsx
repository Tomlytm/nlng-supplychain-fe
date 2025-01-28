import React, { useState } from "react";

export default function ChatSidebar() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    "Demand planning 2025": true,
    "Demand planning 2024": false,
  });

  const [selectedTab, setSelectedTab] = useState<string>("PMN");

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-64 bg-white h-[90vh] py-4 rounded-tl-xl border-r">
      <h2 className="font-semibold mb-4 border-b px-6 py-5">Chats</h2>
      <div className="space-y-6 px-6">
        {/* Demand Planning 2025 */}
        <div>
          <h3
            className="font-medium cursor-pointer flex gap-3 items-center"
            onClick={() => toggleSection("Demand planning 2025")}
          >
              <span className={` text-sm  transition-all ${openSections["Demand planning 2025"] ? "rotate-180" : ""}`}>
              <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.295 0L3 2.2869L0.705 0L0 0.704032L3 3.7L6 0.704032L5.295 0Z" fill="#6A7480" />
              </svg>
            </span>
            Demand planning 2025
          </h3>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openSections["Demand planning 2025"] ? "max-h-40" : "max-h-0"
              }`}
          >
            <ul className="mt-2 space-y-2">
              <li
                onClick={() => handleTabClick("PMN")}
                className={`text-sm cursor-pointer py-2 px-3 rounded-md ${selectedTab === "PMN"
                    ? "bg-[#006A20] text-white"
                    : "bg-transparent hover:bg-gray-100"
                  }`}
              >
                PMN
              </li>
              <li
                onClick={() => handleTabClick("PMT")}
                className={`text-sm cursor-pointer py-2 px-3 rounded-md ${selectedTab === "PMT"
                    ? "bg-[#006A20] text-white"
                    : "bg-transparent hover:bg-gray-100"
                  }`}
              >
                PMT
              </li>
              <li
                onClick={() => handleTabClick("PMN2")}
                className={`text-sm cursor-pointer py-2 px-3 rounded-md ${selectedTab === "PMN2"
                    ? "bg-[#006A20] text-white"
                    : "bg-transparent hover:bg-gray-100"
                  }`}
              >
                PMN2
              </li>
            </ul>
          </div>
        </div>

        {/* Demand Planning 2024 */}
        <div>
          <h3
            className="font-medium cursor-pointer flex gap-3 items-center"
            onClick={() => toggleSection("Demand planning 2024")}
          >
            <span className={` text-sm  transition-all ${openSections["Demand planning 2024"] ? "rotate-180" : ""}`}>
              <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.295 0L3 2.2869L0.705 0L0 0.704032L3 3.7L6 0.704032L5.295 0Z" fill="#6A7480" />
              </svg>
            </span>
              Demand planning 2024
          </h3>
          <div
            className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openSections["Demand planning 2024"] ? "max-h-40" : "max-h-0"
              }`}
          >
            <ul className="mt-2 space-y-2">
              <li
                onClick={() => handleTabClick("PMN_2024")}
                className={`text-sm cursor-pointer py-2 px-3 rounded-md ${selectedTab === "PMN_2024"
                    ? "bg-[#006A20] text-white"
                    : "bg-transparent hover:bg-gray-100"
                  }`}
              >
                PMN
              </li>
              <li
                onClick={() => handleTabClick("PMT_2024")}
                className={`text-sm cursor-pointer py-2 px-3 rounded-md ${selectedTab === "PMT_2024"
                    ? "bg-[#006A20] text-white"
                    : "bg-transparent hover:bg-gray-100"
                  }`}
              >
                PMT
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
