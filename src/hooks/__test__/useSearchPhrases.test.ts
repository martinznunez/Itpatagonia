import { renderHook, act } from "@testing-library/react";
import useSearchPhrases from "../useSearchPhrases";
import { vi } from "vitest";
import { Phrase } from "../../types";

describe("useSearchPhrases Hook", () => {
  const mockPhrases: Phrase[] = [
    { id: "1", value: "phrase 1" },
    { id: "2", value: "phrase 2" },
    { id: "3", value: "phrase 3" },
  ];

  beforeEach(() => {
    vi.useFakeTimers(); 
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("filters phrases correctly based on search term", () => {
    const { result } = renderHook(() => useSearchPhrases(mockPhrases));
    expect(result.current.searchTerm).toBe("");
    expect(result.current.filteredPhrases).toEqual(mockPhrases);
      
    act(() => {
      result.current.handleSearch("phrase 1");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.searchTerm).toBe("phrase 1");
    expect(result.current.filteredPhrases).toEqual([
      { id: "1", value: "phrase 1" },
    ]);
  });

  test("clears previous timeout when search term changes quickly", () => {
    const { result } = renderHook(() => useSearchPhrases(mockPhrases));

    act(() => {
      result.current.handleSearch("phrase 2");
    });

    act(() => {
      vi.advanceTimersByTime(200);
    });

    act(() => {
      result.current.handleSearch("phrase 3");
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current.searchTerm).toBe("phrase 3");
    expect(result.current.filteredPhrases).toEqual([
      { id: "3", value: "phrase 3" },
    ]);
  });

  test("clears timeout when component unmounts", () => {
    const { result, unmount } = renderHook(() => useSearchPhrases(mockPhrases));

    act(() => {
      result.current.handleSearch("phrase 3");
    });

    unmount();

    expect(() => {
      vi.advanceTimersByTime(300);
    }).not.toThrow();
  });
});