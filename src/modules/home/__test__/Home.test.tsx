import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Home"; 
import { usePhrases } from "../../../context/PhrasesContext";
import useSearchPhrases from "../../../hooks/useSearchPhrases";
import { vi } from "vitest"; 

vi.mock("../../../context/PhrasesContext", () => ({
  usePhrases: vi.fn(),
}));

vi.mock("../../../hooks/useSearchPhrases", () => ({
  default: vi.fn(),
}));

describe("Home Component", () => {
  const mockPhrases = [
    { id: "1", value: "phrase 1" },
    { id: "2", value: "phrase 2" },
    { id: "3", value: "phrase 3" },
  ];

  beforeEach(() => {
    (usePhrases as jest.Mock).mockReturnValue({
      state: { phrases: mockPhrases },
    });

    (useSearchPhrases as jest.Mock).mockReturnValue({
      filteredPhrases: mockPhrases,
      handleSearch: vi.fn(),
    });
  });

  test("renders SearchBar and PhraseGrid correctly",  () => {
      render(<Home />);
      expect(screen.getByText("phrase 1")).toBeInTheDocument();
      expect(screen.getByText("phrase 2")).toBeInTheDocument();
      expect(screen.getByText("phrase 3")).toBeInTheDocument(); 
  });
});