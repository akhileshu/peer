import React, { createContext, useContext, useState } from "react";
import { Option } from "./types";

type DropdownContextType = {
  // selectedOptions: (Option[] | undefined)[]; // initially its empty array []
  selectedOptions: Option[][] | []; // initially its empty array []
  setSelectedOptions: React.Dispatch<React.SetStateAction<Option[][]>>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("useDropdownContext must be used within DropdownProvider");
  }
  return context;
};

//creates a new context every time it is instantiated
//for shared state, a single provider is sufficient for component tree
export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Option[][] | []>([]);

  return (
    <DropdownContext.Provider value={{ selectedOptions, setSelectedOptions }}>
      {children}
    </DropdownContext.Provider>
  );
};
