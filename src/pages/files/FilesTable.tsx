import React from "react";
import { useFilesList } from "@/queries/filesList.query";
import type { FileItem } from "@/queries/types";

import UnknownFileSvgPath from "@/icons/unknown-file.svg";
import FolderSvgPath from "@/icons/folder-2.svg";
import ImageSvgPath from "@/icons/image.svg";
import EpubSvgPath from "@/icons/epub.png";
import TrashSvgPath from "@/icons/trash.svg";
import HomeSvgPath from "@/icons/home.svg";

// function escapeHtml(unsafe: string) {
//   return unsafe
//     .replaceAll("&", "&amp;")
//     .replaceAll("<", "&lt;")
//     .replaceAll(">", "&gt;")
//     .replaceAll('"', "&quot;")
//     .replaceAll("'", "&#039;");
// }

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(2)).toLocaleString() +
    " " +
    sizes[i]
  );
}

const FileTableRow: React.FC<{
  file: FileItem;
  pushPath: (folder: string) => void;
  onDelete: (file: FileItem) => void;
  onEdit: (file: FileItem) => void;
}> = ({ file, pushPath, onDelete, onEdit }) => {
  const fileExtension = file.name.split(".").pop()?.toUpperCase() ?? "";

  if (file.isEpub) {
    return (
      <tr className="epub-file">
        <td className="file-title">
          <span className="file-icon">
            <img src={EpubSvgPath} width="20px" />
          </span>
          {file.name}
        </td>
        <td>
          <span className="badge epub-badge">EPUB</span>
        </td>
        <td className="file-size-col">{formatFileSize(file.size)}</td>
        <td className="actions-col">
          <button
            className="delete-btn"
            title="Edit"
            onClick={() => onEdit(file)}
          >
            ✏️
          </button>
          <button
            className="delete-btn"
            title="Delete file"
            onClick={() => onDelete(file)}
          >
            <img src={TrashSvgPath} width="20px" />
          </button>
        </td>
      </tr>
    );
  }

  if (file.isDirectory) {
    return (
      <tr className="folder-row" onClick={() => pushPath(file.name)}>
        <td className="file-title">
          <span className="file-icon">
            <img src={FolderSvgPath} width="20px" />
          </span>
          <span
            // href="/files?path=%2Fsleep"
            // onClick={() => pushPath(file.name)}
            className="folder-link"
            // onClick={() => onDelete(file)}
          >
            {file.name}
          </span>
        </td>
        <td>
          <span className="badge folder-badge">FOLDER</span>
        </td>
        <td>-</td>
        <td className="actions-col">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(file);
            }}
            className="delete-btn"
            // onClick={openDeleteModal("sleep", "/sleep", true)}
            title="Delete folder"
          >
            <img src={TrashSvgPath} width="20px" />
          </button>
        </td>
      </tr>
    );
  }

  if (!file.isDirectory && !file.isEpub) {
    return (
      <tr className="">
        <td className="file-title">
          <span className="file-icon">
            {["BMP", "PNG"].includes(fileExtension) ? (
              <img src={ImageSvgPath} width="20px" />
            ) : (
              <img src={UnknownFileSvgPath} width="20px" />
            )}
          </span>
          {file.name}
        </td>
        <td>
          <span className="badge">{fileExtension}</span>
        </td>
        <td className="file-size-col">{formatFileSize(file.size)}</td>
        <td className="actions-col">
          <button
            className="delete-btn"
            // onclick="openDeleteModal('Unknown-1.bmp', '/Wallpapers/Unknown-1.bmp', false)"
            onClick={() => onDelete(file)}
            title="Delete file"
          >
            <img src={TrashSvgPath} width="20px" />
          </button>
        </td>
      </tr>
    );
  }
};

const FilesContent: React.FC<{
  files: FileItem[];
  pushPath: (folder: string) => void;
  onDelete: (file: FileItem) => void;
  onEdit: (file: FileItem) => void;
}> = ({ files, pushPath, onDelete, onEdit }) => {
  if (files.length === 0) {
    return <div className="no-files">This folder is empty</div>;
  }

  return (
    <table className="file-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Size</th>
          <th className="actions-col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <FileTableRow
            key={file.name}
            file={file}
            pushPath={pushPath}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export const FilesTable: React.FC<{
  path: string[];
  setPath: (newPath: string[]) => void;
  onDelete: (file: FileItem) => void;
  onEdit: (file: FileItem) => void;
}> = ({ setPath, path, onDelete, ...props }) => {
  const popPath = () => {
    setPath(path.slice(0, path.length - 1));
  };
  const { data: files = [], isLoading } = useFilesList(path);
  const sortedFiles = React.useMemo(() => {
    return [...files].sort((a, b) => {
      // Directories first, then epub files, then other files, alphabetically within each group
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      if (a.isEpub && !b.isEpub) return -1;
      if (!a.isEpub && b.isEpub) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [files]);

  const folderStats = React.useMemo(() => {
    const stats = {
      foldersCount: 0,
      totalSize: 0,
    };
    files.forEach((file) => {
      if (file.isDirectory) stats.foldersCount++;
      stats.totalSize += file.size;
    });
    return stats;
  }, [files]);

  return (
    <div className="card">
      <div className="breadcrumb-inline" id="directory-breadcrumbs">
        <button
          disabled={path.length <= 1}
          onClick={popPath}
          style={{ marginRight: 10 }}
        >
          ⬅️
        </button>
        {path.map((segment, index) => {
          return (
            <React.Fragment key={index}>
              {index > 0 && <span className="sep">/</span>}
              {index < path.length - 1 ? (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setPath(path.slice(0, index + 1));
                  }}
                >
                  {segment || <img src={HomeSvgPath} width="20px" />}
                </a>
              ) : (
                <span className="current">
                  {segment || <img src={HomeSvgPath} width="20px" />}
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="contents-header">
        <h2 className="contents-title">Contents</h2>
        <span className="summary-inline" id="folder-summary">
          {folderStats.foldersCount} folders,{" "}
          {files.length - folderStats.foldersCount} files,{" "}
          {formatFileSize(folderStats.totalSize)}
        </span>
      </div>

      <div id="file-table">
        {isLoading ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : (
          <FilesContent
            onDelete={onDelete}
            onEdit={props.onEdit}
            files={sortedFiles}
            pushPath={(folder) => {
              setPath([...path, folder]);
            }}
          />
        )}
      </div>
    </div>
  );
};
