import React, { createContext, useContext, useState } from 'react';

export const SelectedDiffusionListContext = createContext();

export const SelectedDiffusionListProvider = ({ children }) => {
  const [selectedDiffusionList, setSelectedDiffusionList] = useState([]);

  return (
    <SelectedDiffusionListContext.Provider value={{ selectedDiffusionList, setSelectedDiffusionList }}>
      {children}
    </SelectedDiffusionListContext.Provider>
  );
};
