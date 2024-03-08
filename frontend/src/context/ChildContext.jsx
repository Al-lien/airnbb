// react
import { createContext, useMemo, useReducer } from "react";

// proptypes
import PropTypes from "prop-types";

export const childrenReducer = (state, action) => {
  switch (action.type) {
    case "SET_CHILDREN":
      return {
        children: action.payload,
      };
    case "CREATE_CHILDREN":
      return {
        children: [action.payload, ...state.children],
      };
    case "DELETE_CHILDREN":
      return {
        children: state.children.filter(
          (child) => child._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const ChildContext = createContext();

export function ChildContextProvider({ children }) {
  const [state, dispatch] = useReducer(childrenReducer, {
    children: null,
  });

  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <ChildContext.Provider value={contextValue}>
      {children}
    </ChildContext.Provider>
  );
}

ChildContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
