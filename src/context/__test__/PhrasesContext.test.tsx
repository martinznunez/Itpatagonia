import "@testing-library/jest-dom";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { PhrasesProvider, usePhrases } from "../PhrasesContext";
import { vi } from "vitest";
import { Phrase } from "../../types";
import { getSessionStorage, saveSessionStorage } from "../../utils/storage/sessionStorage";

vi.mock("../../utils/storage/sessionStorage", () => ({
  getSessionStorage: vi.fn(),
  saveSessionStorage: vi.fn(),
}));

describe("PhrasesContext", () => {
  const mockPhrases: Phrase[] = [
    { id: "1", value: "phrase 1" },
    { id: "2", value: "phrase 2" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getSessionStorage).mockReturnValue(mockPhrases);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("PhrasesProvider provides state and dispatch correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PhrasesProvider>{children}</PhrasesProvider>
    );
    const { result } = renderHook(() => usePhrases(), { wrapper });
    expect(result.current.state.phrases).toEqual(mockPhrases);
    expect(typeof result.current.dispatch).toBe("function");
  });

  test("usePhrases throws an error when used outside of PhrasesProvider", () => {
    expect(() => {
      renderHook(() => usePhrases());
    }).toThrow("usePhrases must be used within a PhrasesProvider");
  });

  test("reducer handles ADD_PHRASE action correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PhrasesProvider>{children}</PhrasesProvider>
    );

    const { result } = renderHook(() => usePhrases(), { wrapper });
    act(() => {
      result.current.dispatch({
        type: "ADD_PHRASE",
        payload: { id: "3", value: "phrase 3" },
      });
    });
    expect(result.current.state.phrases).toEqual([
      ...mockPhrases,
      { id: "3", value: "phrase 3" },
    ]);

    expect(saveSessionStorage).toHaveBeenCalledWith("phrases", [
      ...mockPhrases,
      { id: "3", value: "phrase 3" },
    ]);
  });

  test("reducer handles DELETE_PHRASE action correctly", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <PhrasesProvider>{children}</PhrasesProvider>
    );

    const { result } = renderHook(() => usePhrases(), { wrapper });

    act(() => {
      result.current.dispatch({
        type: "DELETE_PHRASE",
        payload: "1", 
      });
    });

    expect(result.current.state.phrases).toEqual([
      { id: "2", value: "phrase 2" },
    ]);

    expect(saveSessionStorage).toHaveBeenCalledWith("phrases", [
      { id: "2", value: "phrase 2" },
    ]);
  });
});