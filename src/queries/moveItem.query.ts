import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "./types";

export const useMoveItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { path: string; newPath: string }) => {
      const formData = new FormData();
      formData.append("path", data.path);
      formData.append("new_path", data.newPath);

      try {
        const response = await fetch(API_URL + "/api/move", {
          method: "POST",
          body: formData,
        });
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["files"] });
        }
      } catch (err) {
        alert("Failed to rename - network error");
        throw err;
      }
    },
  });
};
