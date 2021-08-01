import { createContext, Dispatch, useReducer } from "react";
import { reducer, initialState, Action } from "./reducer";
import type { State } from "./reducer";

interface Context {
  state: State;
  dispatch: Dispatch<Action> | (() => void);
}

export const AppContext = createContext<Context>({
  state: initialState,
  dispatch: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
