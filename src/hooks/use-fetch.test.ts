import { useFetch } from "../hooks/use-fetch";
import { renderHook, waitFor } from "@testing-library/react";
import { expect, describe, beforeEach, it, afterAll, vi } from "vitest";

describe("useFetch custom hook", () => {
    //Spy on the global fetch function
    const fetchSpy = vi.spyOn(global, "fetch");
  
    //Run after all the tests
    afterAll(() => {
      fetchSpy.mockRestore();
    });
  
    beforeEach(() => {
      fetchSpy.mockClear();
    });
  
    it("sets loading to true while waiting response", async () => {
      // Arrange
      interface SearchResponse {
        results: { title: string }[];
      }
      // Mock the return value of the global fetch function
      const testResponse: SearchResponse = {
        results: [{ title: "Star Wars" }],
      };
      const mockResolveValue = {
        ok: true,
        json: () => new Promise((resolve) => resolve(testResponse)),
      };
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchSpy.mockReturnValue(mockResolveValue as any);
  
      // Action
      const { result } = renderHook(() => useFetch<SearchResponse>("test-uri"));
  
      // Assert on initial values
      expect(result.current.statusloading).toBeTruthy();
  
      // Assert on the times called and arguments given to fetch
      expect(fetchSpy).toHaveBeenCalledOnce();
      expect(fetchSpy).toHaveBeenCalledWith("test-uri");
  
      // Assert response handling
      await waitFor(
        () => {
          expect(result.current.statusloading).toBeFalsy();
          expect(result.current.data).toHaveProperty("results");
          expect(result.current.data?.results).toHaveLength(1);
        },
        {
          timeout: 100,
        }
      );
    });
  });