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
  const currentPath = path.join("/") || "/";
  const moveMutation = useMoveItemMutation();
  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const pathInputRef = React.useRef<HTMLInputElement>(null);
  const editItem = async () => {
    if (!nameInputRef.current) return;
    if (!pathInputRef.current) return;

    const newName = nameInputRef.current.value.trim();

    if (!newName) {
      alert("Please enter a name!");
      return;
    }

    const newPath = pathInputRef.current.value.trim();

    if (!newPath || !newPath.startsWith("/")) {
      alert("Please enter correct path!");
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
      newPath: newPath.endsWith("/")
        ? newPath + newName
        : [newPath, newName].join("/"),
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="✏️ Edit">
      <div className="folder-form">
        <label htmlFor="path-input" className="file-info">
          Path
        </label>
        <input
          ref={pathInputRef}
          defaultValue={currentPath}
          type="text"
          id="path-input"
          className="folder-input"
          placeholder="Path"
        />

        <label htmlFor="name-input" className="file-info">
          Name
        </label>
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
