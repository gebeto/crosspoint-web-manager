import React from "react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";
import { FilesTable } from "./FilesTable";
import { NewFolderModal } from "./NewFolderModal";
import { UploadModal } from "./UploadModal";

import UploadSvgPath from "./icons/upload.png";
import NewFolderSvgPath from "./icons/new-folder.png";
import FolderSvgPath from "./icons/folder-2.svg";
import type { FileItem } from "./queries";

export function App() {
  const [path, setPath] = React.useState([""]);
  const [deleteFile, setDeleteFile] = React.useState<FileItem | null>(null);

  const [newFolderModalOpen, setNewFolderModalOpen] = React.useState(false);
  const [uploadModalOpen, setUploadModalOpen] = React.useState(false);

  const openUploadModal = () => setUploadModalOpen(true);
  const openFolderModal = () => setNewFolderModalOpen(true);

  return (
    <>
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-header-title">
            <img src={FolderSvgPath} width="32px" /> File Manager
          </h1>
        </div>

        <div className="action-buttons">
          <button
            className="action-btn upload-action-btn"
            onClick={openUploadModal}
          >
            <img src={UploadSvgPath} width="20px" /> Upload
          </button>
          <button
            className="action-btn folder-action-btn"
            onClick={openFolderModal}
          >
            <img src={NewFolderSvgPath} width="20px" /> New Folder
          </button>
        </div>
      </div>

      <FilesTable
        path={path}
        setPath={setPath}
        onDelete={(file: FileItem) => setDeleteFile(file)}
      />

      <div className="card">
        <p style={{ textAlign: "center", color: "#95a5a6", margin: 0 }}>
          <a
            href="https://github.com/daveallie/crosspoint-reader"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            CrossPoint E-Reader
          </a>{" "}
          • Open Source
        </p>
      </div>

      {uploadModalOpen && (
        <UploadModal
          open={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          path={path}
        />
      )}
      {newFolderModalOpen && (
        <NewFolderModal
          open={newFolderModalOpen}
          onClose={() => setNewFolderModalOpen(false)}
          path={path}
        />
      )}
      {!!deleteFile && (
        <DeleteConfirmationModal
          open={!!deleteFile}
          onClose={() => setDeleteFile(null)}
          filePath={deleteFile ? [...path, deleteFile.name] : []}
          itemType="file"
        />
      )}
    </>
  );
}
