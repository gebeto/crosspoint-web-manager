import React from "react";
import { Modal } from "../components/Modal";
import type { FileItem } from "@/queries/types";
import { useMoveItemMutation } from "@/queries/moveItem.query";

export const EditItemModal: React.FC<{
  open: boolean;
  onClose: () => void;
  path: string[];
  file: FileItem;
}> = ({ open, onClose, path, file }) => {
  const moveMutation = useMoveItemMutation();
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const editItem = async () => {
    if (!nameInputRef.current) return;

    const newName = nameInputRef.current.value.trim();

    if (!newName) {
      alert("Please enter a name!");
      return;
    }

    if (file.isDirectory) {
      // Validate folder name (no special characters except underscore and hyphen)
      const validName = /^[а-яА-Яa-zA-Z0-9_-]+$/.test(newName);
      if (!validName) {
        alert(
          "Folder name can only contain letters, numbers, underscores, and hyphens."
        );
        return;
      }
    }

    await moveMutation.mutateAsync({
      path: [...path, file.name].join("/"),
      newPath: [...path, newName].join("/"),
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="✏️ Edit">
      <div className="folder-form">
        <p className="file-info">Edit</p>
        <input
          ref={nameInputRef}
          defaultValue={file.name}
          autoFocus
          type="text"
          className="folder-input"
          placeholder="Name"
        />
        <button className="folder-btn" onClick={editItem}>
          Save
        </button>
      </div>
    </Modal>
  );
};
