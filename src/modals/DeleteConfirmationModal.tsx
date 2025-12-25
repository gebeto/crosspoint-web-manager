import React from "react";
import { Modal } from "../components/Modal";
import { useDeleteItemMutation } from "../queries/deleteItem.query";

export const DeleteConfirmationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  filePath: string[];
  itemType: "file" | "folder";
}> = ({ open, onClose, filePath, itemType }) => {
  const path = filePath.join("/") || "/";
  const deleteMutation = useDeleteItemMutation();
  const confirmDelete = () => {
    deleteMutation.mutateAsync({ path, type: itemType }).then(() => {
      onClose();
    });
  };

  return (
    <Modal open={open} title="🗑️ Delete Item" onClose={onClose}>
      <div className="folder-form">
        <p className="delete-warning">⚠️ This action cannot be undone!</p>
        <p className="file-info">Are you sure you want to delete:</p>
        <p className="delete-item-name" id="deleteItemName"></p>
        <input type="hidden" id="deleteItemPath" />
        <input type="hidden" id="deleteItemType" />
        <button
          className="delete-btn-confirm"
          disabled={deleteMutation.isPending}
          onClick={confirmDelete}
        >
          Delete
        </button>
        <button className="delete-btn-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};
