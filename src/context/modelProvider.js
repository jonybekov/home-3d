import React, { createContext, useRef, useState } from "react";

export const ModelContext = createContext();

export default function ModelProvider({ children }) {
  const modelRef = useRef();
  const [model, setModel] = useState();

  return (
    <ModelContext.Provider value={{ modelRef, model, setModel }}>
      {children}
    </ModelContext.Provider>
  );
}
