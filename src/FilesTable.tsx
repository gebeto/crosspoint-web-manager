import React from "react";
import { useFilesList } from "./queries";
import type { FileItem } from "./queries";

import UnknownFileSvgPath from "./icons/unknown-file.svg";
import FolderSvgPath from "./icons/folder-2.svg";
import ImageSvgPath from "./icons/image.svg";
import EpubSvgPath from "./icons/epub.png";
import TrashSvgPath from "./icons/trash.svg";
import HomeSvgPath from "./icons/home.svg";

const FileItem: React.FC<{
  file: FileItem;
  pushPath: (folder: string) => void;
}> = ({ file, pushPath }) => {
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
        <td>2.91 MB</td>
        <td className="actions-col">
          <button
            className="delete-btn"
            // onClick={openDeleteModal(
            //   "Antykrykhkist_Pro_nevrazlyve_u_realnomu_zhytti.epub",
            //   "/Antykrykhkist_Pro_nevrazlyve_u_realnomu_zhytti.epub",
            //   false
            // )}
            title="Delete file"
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
        <td>1.1 MB</td>
        <td className="actions-col">
          <button
            className="delete-btn"
            // onclick="openDeleteModal('Unknown-1.bmp', '/Wallpapers/Unknown-1.bmp', false)"
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
}> = ({ files, pushPath }) => {
  if (files.length === 0) {
    return <div className="no-files">This folder is empty</div>;
  }

  return (
    <table className="file-table">
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Size</th>
        <th className="actions-col">Actions</th>
      </tr>
      {files.map((file) => (
        <FileItem key={file.name} file={file} pushPath={pushPath} />
      ))}
    </table>
  );
};

export const FilesTable: React.FC<{
  path: string[];
  setPath: (newPath: string[]) => void;
}> = ({ setPath, path }) => {
  const popPath = () => {
    setPath(path.slice(0, path.length - 1));
  };
  const pathStr = path.join("/") || "/";
  const { data: files = [], isLoading } = useFilesList(pathStr);
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
        <span className="summary-inline" id="folder-summary"></span>
      </div>

      <div id="file-table">
        {isLoading ? (
          <div className="loader-container">
            <span className="loader"></span>
          </div>
        ) : (
          <FilesContent
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
