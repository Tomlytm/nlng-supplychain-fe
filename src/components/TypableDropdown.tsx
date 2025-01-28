import {
    Box,
    Input,
    Menu,
    MenuItem,
    MenuList,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  type MaintenanceRecord = {
    id: string;
    contractNumber: string;
  };
  
  interface TypableDropdownProps {
    field: { contractNumber: string };
    record: { id: string };
    handleCellChange: (
      id: string,
      fieldKey: keyof MaintenanceRecord,
      value: string
    ) => void;
    options: string[];
  }
  
  const TypableDropdown: React.FC<TypableDropdownProps> = ({
    field,
    record,
    handleCellChange,
    options,
  }) => {
    const [inputValue, setInputValue] = useState<string>(field.contractNumber);
    const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
  
      // Filter options based on input
      if (value.trim() === "") {
        setFilteredOptions([]);
        setMenuOpen(false);
      } else {
        const filtered = options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredOptions(filtered);
        setMenuOpen(filtered.length > 0);
      }
  
      handleCellChange(record.id, "contractNumber", value);
    };
  
    const handleOptionSelect = (value: string) => {
      setInputValue(value);
      handleCellChange(record.id, "contractNumber", value);
      setMenuOpen(false); // Close dropdown after selection
    };
  
    return (
      <Box position="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type to search or select"
          autoComplete="off"
          className="border-none bg-transparent outline-none rounded py-1 text-gray-800"
        />
        {menuOpen && (
          <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
            <MenuList>
              {filteredOptions.map((option, index) => (
                <MenuItem key={index} onClick={() => handleOptionSelect(option)}>
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        )}
      </Box>
    );
  };
  
  export default TypableDropdown;
  