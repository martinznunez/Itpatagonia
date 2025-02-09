import type React from "react";
import { createContext, useContext, useReducer, type ReactNode } from "react";
import { Phrase } from "../types";
import { getSessionStorage, saveSessionStorage } from "../utils/storage/sessionStorage";
interface State {
  phrases: Phrase[];
}

type Action =
  | { type: "ADD_PHRASE"; payload: Phrase }
  | { type: "DELETE_PHRASE"; payload: string };

export interface PhrasesContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const PhrasesContext = createContext<PhrasesContextType | undefined>(undefined);

const updateSessionStorage = (phrases: Phrase[]) => {
  saveSessionStorage("phrases", phrases);
};

function phrasesReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_PHRASE": {
      const updatedState = { ...state, phrases: [...state.phrases, action.payload] };
      updateSessionStorage(updatedState.phrases);
      return updatedState;
    }
    case "DELETE_PHRASE": {
      const updatedState = {
        ...state,
        phrases: state.phrases.filter((phrase) => phrase.id !== action.payload),
      };
      updateSessionStorage(updatedState.phrases);
      return updatedState;
    }
    default:
      return state;
  }
}

export const PhrasesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: State = {
    phrases: getSessionStorage("phrases") || [],
  };
  const [state, dispatch] = useReducer(phrasesReducer, initialState);

  return <PhrasesContext.Provider value={{ state, dispatch }}>{children}</PhrasesContext.Provider>;
};

export const usePhrases = (): PhrasesContextType => {
  const context = useContext(PhrasesContext);
  if (context === undefined) {
    throw new Error("usePhrases must be used within a PhrasesProvider");
  }
  return context;
};
