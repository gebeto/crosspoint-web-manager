import React from "react";
import "./DeleteConfirmationModal.css";
import { Modal } from "@/components/Modal/Modal";
import { useDeleteItemMutation } from "@/queries/deleteItem.query";
import type { FileItem } from "@/queries/types";

export const DeleteConfirmationModal: React.FC<{
  open: boolean;
  onClose: () => void;
  path: string[];
  file: FileItem;
}> = ({ open, onClose, ...props }) => {
  const deleteMutation = useDeleteItemMutation();
  const confirmDelete = () => {
    deleteMutation
      .mutateAsync({
        path: [...props.path, props.file.name].join("/"),
        type: props.file.isDirectory ? "folder" : "file",
      })
      .then(() => {
        onClose();
      });
  };

  return (
    <Modal open={open} title="🗑️ Delete Item" onClose={onClose}>
      <div className="folder-form">
        <p className="delete-warning">⚠️ This action cannot be undone!</p>
        <p className="input-label">Are you sure you want to delete:</p>
        <p className="delete-item-name">{props.file.name}</p>
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
