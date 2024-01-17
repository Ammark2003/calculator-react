import React, { useReducer, useState } from "react";
import "./App.css";
import Digit from "./components/Digit";
import Operation from "./components/Operation";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      return {
        ...state,
        previousOperand: String(payload.result),
        currentOperand: "",
        operation: payload.operation,
      };

    case ACTIONS.EVALUATE:
      return {
        ...state,
        previousOperand: "",
        currentOperand: String(payload.result),
        operation: "",
      };

    case ACTIONS.CLEAR:
      return {
        ...state,
        previousOperand: "",
        currentOperand: "",
        operation: "",
      };

    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
}

const App = () => {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    { currentOperand: "", previousOperand: "", operation: "" }
  );

  const evaluate = () => {
    let result = 0;
    const prev = Number(previousOperand);
    const curr = Number(currentOperand);

    if (previousOperand == "") {
      return currentOperand;
    }

    if (operation == "+") {
      result = prev + curr;
    } else if (operation == "-") {
      result = prev - curr;
    } else if (operation == "*") {
      result = prev * curr;
    } else if (operation == "÷") {
      result = prev / curr;
    }

    return result;
  };

  return (
    <div className="calculator-grid">
      <div className="display">
        <div className="previous-operand">
          {previousOperand} {operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <Operation operation="÷" dispatch={dispatch} evaluate={evaluate} />
      <Digit digit="1" dispatch={dispatch} />
      <Digit digit="2" dispatch={dispatch} />
      <Digit digit="3" dispatch={dispatch} />
      <Operation operation="*" dispatch={dispatch} evaluate={evaluate} />
      <Digit digit="4" dispatch={dispatch} />
      <Digit digit="5" dispatch={dispatch} />
      <Digit digit="6" dispatch={dispatch} />
      <Operation operation="+" dispatch={dispatch} evaluate={evaluate} />
      <Digit digit="7" dispatch={dispatch} />
      <Digit digit="8" dispatch={dispatch} />
      <Digit digit="9" dispatch={dispatch} />
      <Operation operation="-" dispatch={dispatch} evaluate={evaluate} />
      <Digit digit="." dispatch={dispatch} />
      <Digit digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => {
          const result = evaluate();
          dispatch({
            type: ACTIONS.EVALUATE,
            payload: { result },
          });
        }}
      >
        =
      </button>
    </div>
  );
};

export default App;
