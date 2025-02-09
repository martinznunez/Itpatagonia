import React from "react";
import PhraseCard from "../phraseCard/PhraseCard";
import {Phrase} from "../../types";
import {usePhrases} from "../../context/PhrasesContext";

interface PhraseGridProps {
  listPhrase: Phrase[];
}

const PhraseGrid: React.FC<PhraseGridProps> = ({listPhrase}) => {
  const {dispatch} = usePhrases();

  const onDelete = (phraseId: string) => dispatch({type: "DELETE_PHRASE", payload: phraseId});

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {listPhrase?.map((phrase) => (
        <PhraseCard onDelete={onDelete} key={phrase.id} phrase={phrase} />
      ))}
    </div>
  );
};

export default PhraseGrid;
