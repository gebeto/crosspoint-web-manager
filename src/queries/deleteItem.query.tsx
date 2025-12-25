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
      } catch {
        alert("Failed to delete - network error");
        return;
      }

      // const xhr = new XMLHttpRequest();
      // xhr.open("POST", API_URL + "/delete", true);

      // xhr.onload = function () {
      //   if (xhr.status === 200) {
      //     queryClient.invalidateQueries({ queryKey: ["files"] });
      //     onClose();
      //   } else {
      //     alert("Failed to delete: " + xhr.responseText);
      //     onClose();
      //   }
      // };

      // xhr.onerror = function () {
      //   alert("Failed to delete - network error");
      //   onClose();
      // };

      // xhr.send(formData);
    },
  });
};
