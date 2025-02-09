import {useState, useEffect} from "react";
import {Phrase} from "../types";

const useSearchPhrases = (phrases: Phrase[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredPhrases, setFilteredPhrases] = useState<Phrase[]>(phrases);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const results = phrases.filter((phrase) =>
        phrase.value.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredPhrases(results);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, phrases]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return {
    searchTerm,
    filteredPhrases,
    handleSearch,
  };
};

export default useSearchPhrases;
