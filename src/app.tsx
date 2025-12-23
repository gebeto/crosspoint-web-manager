import { useState } from "preact/hooks";

export function App() {
  const openUploadModal = () => {};
  const openFolderModal = () => {};
  const closeUploadModal = () => {};
  const uploadFile = () => {};
  const validateFile = () => {};
  const closeFolderModal = () => {};
  const createFolder = () => {};
  const closeDeleteModal = () => {};
  const confirmDelete = () => {};

  return (
    <>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/files">File Manager</a>
      </div>

      <div className="page-header">
        <div className="page-header-left">
          <h1>📁 File Manager</h1>
          <div className="breadcrumb-inline" id="directory-breadcrumbs"></div>
        </div>

        <div className="action-buttons">
          <button
            className="action-btn upload-action-btn"
            onClick={openUploadModal}
          >
            📤 Upload
          </button>
          <button
            className="action-btn folder-action-btn"
            onClick={openFolderModal}
          >
            📁 New Folder
          </button>
        </div>
      </div>

      <div className="card">
        <div className="contents-header">
          <h2 className="contents-title">Contents</h2>
          <span className="summary-inline" id="folder-summary"></span>
        </div>

        <div id="file-table">
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        </div>
      </div>

      <div className="card">
        <p style="text-align: center; color: #95a5a6; margin: 0">
          CrossPoint E-Reader • Open Source
        </p>
      </div>

      {/* <!-- Upload Modal --> */}
      <div className="modal-overlay" id="uploadModal">
        <div className="modal">
          <button className="modal-close" onClick={closeUploadModal}>
            &times;
          </button>
          <h3>📤 Upload file</h3>
          <div className="upload-form">
            <p className="file-info">
              Select a file to upload to{" "}
              <strong id="uploadPathDisplay"></strong>
            </p>
            <input type="file" id="fileInput" onChange={validateFile} />
            <button
              id="uploadBtn"
              className="upload-btn"
              onClick={uploadFile}
              disabled
            >
              Upload
            </button>
            <div id="progress-container">
              <div id="progress-bar">
                <div id="progress-fill"></div>
              </div>
              <div id="progress-text"></div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- New Folder Modal --> */}
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

      {/* <!-- Delete Confirmation Modal --> */}
      <div className="modal-overlay" id="deleteModal">
        <div className="modal">
          <button className="modal-close" onClick={closeDeleteModal}>
            &times;
          </button>
          <h3>🗑️ Delete Item</h3>
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
        </div>
      </div>
    </>
  );
}
