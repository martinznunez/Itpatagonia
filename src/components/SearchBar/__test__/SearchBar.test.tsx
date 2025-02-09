import "@testing-library/jest-dom"; 
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../SearchBar"; 

describe("SearchBar Component", () => {
  const mockHandleSearch = vi.fn();
  beforeEach(() => {
    mockHandleSearch.mockClear();
  });

  test("renders the search input correctly", () => {
    render(<SearchBar handleSearch={mockHandleSearch} />);
    const inputElement = screen.getByPlaceholderText("Buscar frase...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  test("calls handleSearch when typing in the input", () => {
    render(<SearchBar handleSearch={mockHandleSearch} />);
    const inputElement = screen.getByPlaceholderText("Buscar frase...");
    fireEvent.change(inputElement, { target: { value: "Hola" } });
    expect(mockHandleSearch).toHaveBeenCalledTimes(1); 
    expect(mockHandleSearch).toHaveBeenCalledWith("Hola"); 
  });

  test("calls handleSearch multiple times when typing multiple characters", () => {
    render(<SearchBar handleSearch={mockHandleSearch} />);
    const inputElement = screen.getByPlaceholderText("Buscar frase...");
    fireEvent.change(inputElement, { target: { value: "Ho" } });
    fireEvent.change(inputElement, { target: { value: "LA" } });
    expect(mockHandleSearch).toHaveBeenCalledTimes(2);
    expect(mockHandleSearch).toHaveBeenNthCalledWith(1, "Ho"); 
    expect(mockHandleSearch).toHaveBeenNthCalledWith(2, "LA"); 
   
  });
});