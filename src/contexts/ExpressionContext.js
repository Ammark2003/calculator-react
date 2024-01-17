import React, { createContext, useState } from "react";

const ExpressionContext = createContext();

export const ExpressionProvider = ({ children }) => {
  const [prevOperand, setPrevOperand] = useState(0);
  const [currOperand, setCurrOperand] = useState(0);

  return (
    <ExpressionContext.Provider value={{}}>
      {children}
    </ExpressionContext.Provider>
  );
};
