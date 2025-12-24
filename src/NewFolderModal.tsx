import React from "react";
import { Modal } from "./Modal";
import { useQueryClient } from "@tanstack/react-query";
import { API_URL } from "./queries";

export const NewFolderModal: React.FC<{
  open: boolean;
  onClose: () => void;
  path: string[];
}> = ({ open, onClose: _onClose, path }) => {
  const queryClient = useQueryClient();
  const currentPath = path.join("/") || "/";
  const inputRef = React.useRef<HTMLInputElement>(null);
  const onClose = () => {
    _onClose();
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const createFolder = () => {
    if (!inputRef.current) return;

    const folderName = inputRef.current.value.trim();

    if (!folderName) {
      alert("Please enter a folder name!");
      return;
    }

    // Validate folder name (no special characters except underscore and hyphen)
    const validName = /^[a-zA-Z0-9_-]+$/.test(folderName);
    if (!validName) {
      alert(
        "Folder name can only contain letters, numbers, underscores, and hyphens."
      );
      return;
    }

    const formData = new FormData();
    formData.append("name", folderName);
    formData.append("path", currentPath);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", API_URL + "/mkdir", true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["files"] });
        onClose();
      } else {
        alert("Failed to create folder: " + xhr.responseText);
      }
    };

    xhr.onerror = function () {
      alert("Failed to create folder - network error");
    };

    xhr.send(formData);
  };

  return (
    <Modal open={open} onClose={onClose} title="📁 New Folder">
      <div className="folder-form">
        <p className="file-info">
          Create a new folder in <strong id="folderPathDisplay"></strong>
        </p>
        <input
          ref={inputRef}
          type="text"
          id="folderName"
          className="folder-input"
          placeholder="Folder name..."
        />
        <button className="folder-btn" onClick={createFolder}>
          Create Folder
        </button>
      </div>
    </Modal>
  );
};
