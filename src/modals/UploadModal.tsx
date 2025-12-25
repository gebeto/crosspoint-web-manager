import React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "../components/Modal";
import { API_URL } from "../queries/types";

export const UploadModal: React.FC<{
  open: boolean;
  onClose: () => void;
  path: string[];
}> = ({ open, onClose, path }) => {
  const queryClient = useQueryClient();
  const currentPath = path.join("/") || "/";
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [uploadAllowed, setUploadAllowed] = React.useState(false);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = React.useState<
    "initial" | "uploading" | "completed" | "error"
  >("initial");
  const [progress, setProgress] = React.useState(0);

  const validateFile = () => {
    const fileInput = fileInputRef.current;
    if (!fileInput) return;

    // const uploadBtn = document.getElementById("uploadBtn");
    const file = fileInput.files?.[0];
    // uploadBtn.disabled = !file;
    setUploadAllowed(!!file);
  };

  const uploadFile = () => {
    const fileInput = fileInputRef.current;
    if (!fileInput) return;

    const file = fileInput.files?.[0];

    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploadAllowed(false);

    const xhr = new XMLHttpRequest();
    // Include path as query parameter since multipart form data doesn't make
    // form fields available until after file upload completes
    xhr.open(
      "POST",
      API_URL + "/upload?path=" + encodeURIComponent(currentPath),
      true
    );

    xhr.upload.onprogress = function (e) {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded / e.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        setUploadStatus("completed");
        setTimeout(function () {
          queryClient.invalidateQueries({ queryKey: ["files"] });
          onClose();
        }, 1000);
      } else {
        setUploadStatus("error");
        setUploadError("Upload failed: " + xhr.responseText);
        setUploadAllowed(true);
      }
    };

    xhr.onerror = function () {
      setUploadError("Upload failed - network error");
      setUploadAllowed(true);
    };

    xhr.send(formData);
  };

  return (
    <Modal open={open} onClose={onClose} title="📤 Upload file">
      <div className="upload-form">
        <p className="file-info">
          Select a file to upload to <strong id="uploadPathDisplay"></strong>
        </p>
        <input
          ref={fileInputRef}
          type="file"
          id="fileInput"
          onChange={validateFile}
        />
        <button
          id="uploadBtn"
          className="upload-btn"
          onClick={uploadFile}
          disabled={!uploadAllowed}
        >
          Upload
        </button>
        <div
          id="progress-container"
          style={{ display: uploadStatus === "initial" ? undefined : "block" }}
        >
          <div id="progress-bar">
            <div
              id="progress-fill"
              style={{
                width: progress + "%",
                backgroundColor:
                  {
                    error: "#e74c3c",
                    initial: undefined,
                    uploading: undefined,
                    completed: undefined,
                  }[uploadStatus] || undefined,
              }}
            />
          </div>
          {uploadStatus === "uploading" && (
            <div id="progress-text">Uploading: {progress}%</div>
          )}
          {uploadStatus === "completed" && (
            <div id="progress-text">Upload complete!</div>
          )}
          {uploadStatus === "error" && (
            <div id="progress-text">{uploadError}</div>
          )}
        </div>
      </div>
    </Modal>
  );
};
