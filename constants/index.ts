type DataRow = {
  SN: string;
  Department: string;
  Unit: string;
  "Material No": string;
  "Material Description": string;
  UOM: string;
  "(Capex/Minor Capex/OPEX)": string;
  "(IAPS/Non-IAPS)": string;
  "Value Drivers": string;
  "Stock item (Yes/No)": string;
  "RoS (Month)": string;
  "Budget Unit Price ($)": string;
  "Target Quantity": string;
  Total: string;
};

// Example data
export const defaultData: DataRow[] = [
  {
    SN: "",
    Department: "",
    Unit: "",
    "Material No": "",
    "Material Description": "",
    UOM: "",
    "(Capex/Minor Capex/OPEX)": "",
    "(IAPS/Non-IAPS)": "",
    "Value Drivers": "",
    "Stock item (Yes/No)": "",
    "RoS (Month)": "",
    "Budget Unit Price ($)": "",
    "Target Quantity": "",
    Total: "",
  },
];
