import '@testing-library/jest-dom';
import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import PhraseCard from "../PhraseCard";

const mockPhrase = {
  id: "1",
  value: "test",
};

describe("PhraseCard", async () => {
  test("renders the phrase correctly", () => {
    render(<PhraseCard phrase={mockPhrase} onDelete={vi.fn()} />);
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  test("calls onDelete when the delete button is clicked", async () => {
    const mockDelete = vi.fn();
    render(<PhraseCard phrase={mockPhrase} onDelete={mockDelete} />);
    const deleteButton = screen.getByLabelText("Delete phrase");
    await userEvent.click(deleteButton);

    expect(mockDelete).toHaveBeenCalledWith("1");
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});
