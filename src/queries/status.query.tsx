import { useQuery } from "@tanstack/react-query";
import { API_URL, asyncWait } from "./types";
import type { DeviceStatus } from "./types";

const dummyData: DeviceStatus = {
  version: "0.0.0-dev",
  ip: "0.0.0.0",
  mode: "STA",
  rssi: 99,
  freeHeap: 123456,
  uptime: 10,
};

export const useStatusQuery = () => {
  return useQuery({
    queryKey: ["status"],
    staleTime: 0,
    gcTime: 0,
    queryFn: async () => {
      if (API_URL !== null) {
        const response = await fetch(`${API_URL}/api/status`).then(
          (res) => res.json() as Promise<DeviceStatus>
        );
        return response;
      }

      await asyncWait(500);
      return dummyData;
    },
  });
};
