import React from "react";
import {useState} from "react";

interface PhraseFormProps {
  handleAddPhrase: (phrase: string) => void;
}

const PhraseForm: React.FC<PhraseFormProps> = ({handleAddPhrase}) => {
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      handleAddPhrase(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Agregar una frase"
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Agregar
      </button>
    </form>
  );
};

export default PhraseForm;
