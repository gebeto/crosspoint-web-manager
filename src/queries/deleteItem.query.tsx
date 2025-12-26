import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "./types";

export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { path: string; type: "file" | "folder" }) => {
      const formData = new FormData();
      formData.append("path", data.path);
      formData.append("type", data.type);

      try {
        const response = await fetch(API_URL + "/api/delete", {
          method: "POST",
          body: formData,
        });
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["files"] });
        }
      } catch (err) {
        alert("Failed to delete - network error");
        throw err;
      }
    },
  });
};
