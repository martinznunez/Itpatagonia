import React from "react";
import {FaTrash} from "react-icons/fa";
import type {Phrase} from "../../types";

interface PhraseCardProps {
  phrase: Phrase;
  onDelete: (phrase: string) => void;
}

const PhraseCard: React.FC<PhraseCardProps> = ({phrase, onDelete}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative min-h-[150px] flex flex-col justify-between">
      <p className="text-lg mb-4 text-gray-800">{phrase.value}</p>
      <button
        onClick={() => onDelete(phrase.id)}
        className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        aria-label="Delete phrase"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PhraseCard;
