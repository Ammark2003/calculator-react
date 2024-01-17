import React from "react";
import { ACTIONS } from "../App";

const Operation = ({ evaluate, dispatch, operation }) => {
  return (
    <button
      onClick={() => {
        let result = evaluate();
        dispatch({
          type: ACTIONS.CHOOSE_OPERATION,
          payload: { operation, result },
        });
      }}
    >
      {operation}
    </button>
  );
};

export default Operation;
