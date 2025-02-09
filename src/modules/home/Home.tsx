import React from "react";
import {PhraseGrid, SearchBar} from "../../components";
import useSearchPhrases from "../../hooks/useSearchPhrases";
import {usePhrases} from "../../context/PhrasesContext";

const Home: React.FC = () => {
  const {state} = usePhrases();
  const {filteredPhrases, handleSearch} = useSearchPhrases(state.phrases);

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <PhraseGrid listPhrase={filteredPhrases} />
    </div>
  );
};

export default Home;
