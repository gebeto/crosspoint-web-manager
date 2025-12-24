import { useQuery } from "@tanstack/react-query";

const getApiUrl = () => {
  const url = new URL(window.location.href);
  if (url.protocol === "http:" && url.hostname !== "localhost") {
    return "";
  }
  return url.searchParams.get("api_url") ?? null;
};
export const API_URL = getApiUrl();

export type UnknownFile = {
  name: string;
  size: number;
  isDirectory: false;
  isEpub: false;
};

export type EpubFile = {
  name: string;
  size: number;
  isDirectory: false;
  isEpub: true;
};

export type Directory = {
  name: string;
  size: 0;
  isDirectory: true;
  isEpub: false;
};

export type FileItem = EpubFile | Directory | UnknownFile;

const asyncWait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
      if (path === "/empty-folder") {
        return [] as FileItem[];
      }
      if (path === "/nested-1") {
        return [
          {
            name: "nested-2",
            size: 0,
            isDirectory: true,
            isEpub: false,
          },
        ] as FileItem[];
      }
      if (path === "/nested-1/nested-2") {
        return [
          {
            name: "nested-3",
            size: 0,
            isDirectory: true,
            isEpub: false,
          },
        ] as FileItem[];
      }
      if (path === "/nested-1/nested-2/nested-3") {
        return [] as FileItem[];
      }
      if (path === "/")
        return [
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
        ] satisfies FileItem[];
      return [] as FileItem[];
    },
  });
};
