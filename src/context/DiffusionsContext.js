import React, { createContext, useContext, useState } from 'react';

export const DiffusionsContext = createContext();

export const DiffusionsProvider = ({ children }) => {
  const [diffusionLists, setDiffusionLists] = useState([]);

  return (
    <DiffusionsContext.Provider value={{ diffusionLists, setDiffusionLists }}>
      {children}
    </DiffusionsContext.Provider>
  );
};

