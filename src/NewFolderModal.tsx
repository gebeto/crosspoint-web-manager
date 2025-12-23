import { Modal } from "./Modal";

export const NewFolderModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const createFolder = () => {};

  return (
    <Modal open={open} onClose={onClose} title="📁 New Folder">
      <div className="folder-form">
        <p className="file-info">
          Create a new folder in <strong id="folderPathDisplay"></strong>
        </p>
        <input
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
