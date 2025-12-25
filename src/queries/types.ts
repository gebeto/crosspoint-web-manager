export const asyncWait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getApiUrl = () => {
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
