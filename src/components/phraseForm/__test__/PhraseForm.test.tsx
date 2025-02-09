import "@testing-library/jest-dom";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import PhraseForm from "../PhraseForm";
import { vi } from "vitest";

const handleAddPhrase = vi.fn();
describe("PhraseCard", () => {
 
  test("calls handleAddPhrase when the form is submitted", async () => {
    render(<PhraseForm handleAddPhrase={handleAddPhrase} />);
    const input = screen.getByPlaceholderText(/agregar una frase/i);
    await userEvent.type(input, "phrase mock");

    expect(input).toHaveValue("phrase mock");
    const button = screen.getByRole("button", {name: /agregar/i});
    await userEvent.click(button);
    
    expect(handleAddPhrase).toHaveBeenCalledWith("phrase mock");
    expect(handleAddPhrase).toHaveBeenCalledTimes(1);
  });

  test("does not call handleAddPhrase when the input is empty", async () => {
    const handleAddPhrase = vi.fn(); 
    render(<PhraseForm handleAddPhrase={handleAddPhrase} />);
    const input = screen.getByPlaceholderText(/agregar una frase/i);

    await userEvent.clear(input);
    expect(input).toHaveValue("");
    const button = screen.getByRole("button", {name: /agregar/i});
    await userEvent.click(button);
 
    expect(handleAddPhrase).not.toHaveBeenCalled();
  });
});
