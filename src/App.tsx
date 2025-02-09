import React from "react";
import {PhraseForm} from "./components";
import {Home} from "./modules";
import {usePhrases} from "./context/PhrasesContext";

const App: React.FC = () => {
  const {dispatch} = usePhrases();

  const handleAddPhrase = (phrase: string) => {
    const newPhrase = {
      id: Date.now().toString(),
      value: phrase,
    };
    dispatch({type: "ADD_PHRASE", payload: newPhrase});
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Aplicación de Frases</h1>
      <PhraseForm handleAddPhrase={handleAddPhrase} />
      <Home />
    </div>
  );
};

export default App;
