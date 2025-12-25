import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "../components/Modal";
import { API_URL } from "../queries/types";

export const DeleteConfirmationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  filePath: string[];
  itemType: "file" | "folder";
}> = ({ open, onClose, filePath, itemType }) => {
  const path = filePath.join("/") || "/";
  const queryClient = useQueryClient();
  const closeDeleteModal = () => {};
  const confirmDelete = () => {
    const formData = new FormData();
    formData.append("path", path);
    formData.append("type", itemType);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL + "/delete", true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["files"] });
        onClose();
      } else {
        alert("Failed to delete: " + xhr.responseText);
        onClose();
      }
    };

    xhr.onerror = function () {
      alert("Failed to delete - network error");
      onClose();
    };

    xhr.send(formData);
  };

  return (
    <Modal open={open} title="🗑️ Delete Item" onClose={onClose}>
      <div className="folder-form">
        <p className="delete-warning">⚠️ This action cannot be undone!</p>
        <p className="file-info">Are you sure you want to delete:</p>
        <p className="delete-item-name" id="deleteItemName"></p>
        <input type="hidden" id="deleteItemPath" />
        <input type="hidden" id="deleteItemType" />
        <button className="delete-btn-confirm" onClick={confirmDelete}>
          Delete
        </button>
        <button className="delete-btn-cancel" onClick={closeDeleteModal}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
