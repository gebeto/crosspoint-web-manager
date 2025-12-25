import { useQuery } from "@tanstack/react-query";
import { API_URL, asyncWait, type FileItem } from "./types";

const dummyData: Record<string, FileItem[]> = {
  "/": [
    {
      name: "book.epub",
      size: 2953653,
      isDirectory: false,
      isEpub: true,
    },
    {
      name: "Wallpapers",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "sleep",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "nested-1",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "empty-folder",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
    {
      name: "some_test_ebook.epub",
      size: 1658321,
      isDirectory: false,
      isEpub: true,
    },
    {
      name: "some_another ebook for test.epub",
      size: 3050316,
      isDirectory: false,
      isEpub: true,
    },
    {
      name: "test.bmp",
      size: 3050316,
      isDirectory: false,
      isEpub: false,
    },
  ],
  "/nested-1": [
    {
      name: "nested-2",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
  ],
  "/nested-1/nested-2": [
    {
      name: "nested-3",
      size: 0,
      isDirectory: true,
      isEpub: false,
    },
  ],
  "/empty-folder": [],
};

export const useFilesList = (path: string) => {
  return useQuery({
    queryKey: ["files", path],
    staleTime: 0,
    gcTime: 0,
    queryFn: async () => {
      if (API_URL !== null) {
        const response = await fetch(
          `${API_URL}/api/files?path=${encodeURIComponent(path)}`
        ).then((res) => res.json() as Promise<FileItem[]>);
        return response;
      }

      await asyncWait(500);
      return dummyData[path] || [];
    },
  });
};
