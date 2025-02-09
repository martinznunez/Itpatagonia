import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PhraseGrid from "../PhraseGrid";
import { PhrasesProvider, usePhrases } from "../../../context/PhrasesContext";
import React from "react";
import userEvent from "@testing-library/user-event";

vi.mock("../../../context/PhrasesContext", () => ({
  PhrasesProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>, 
  usePhrases: vi.fn(), 
}));

describe("PhraseGrid Component", () => {
  const mockDispatch = vi.fn();

  const mockPhrases = [
    { id: "1", value: "Hello World" },
    { id: "2", value: "Vitest is awesome" },
  ];

  beforeEach(() => {
    (usePhrases as vi.Mock).mockReturnValue({
      state: { phrases: mockPhrases },
      dispatch: mockDispatch,
    });
  });

  test("renders phrases correctly", () => {
    render(
      <PhrasesProvider>
        <PhraseGrid listPhrase={mockPhrases} />
      </PhrasesProvider>
    );

    mockPhrases.forEach(({ value }) => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  test("calls dispatch when deleting a phrase", async() => {
    render(
      <PhrasesProvider>
        <PhraseGrid listPhrase={mockPhrases} />
      </PhrasesProvider>
    );

    const deleteButtons = screen.getAllByRole("button", { name: /delete/i });
  
    await userEvent.click(deleteButtons[0]);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "DELETE_PHRASE",
      payload: "1",
    });
  });
});