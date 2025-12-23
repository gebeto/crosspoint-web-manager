export const NewFolderModal = () => {
  const closeFolderModal = () => {};
  const createFolder = () => {};

  return (
    <div className="modal-overlay" id="folderModal">
      <div className="modal">
        <button className="modal-close" onClick={closeFolderModal}>
          &times;
        </button>
        <h3>📁 New Folder</h3>
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
      </div>
    </div>
  );
};
