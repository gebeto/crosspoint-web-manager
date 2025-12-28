import React from "react";
import "./UploadModal.css";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "@/components/Modal/Modal";
import { API_URL } from "@/queries/types";
import { ProgressBar } from "@/components/ProgressBar/ProgressBar";

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
      API_URL + "/api/upload?path=" + encodeURIComponent(currentPath),
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

    setUploadStatus("uploading");
    xhr.send(formData);
  };

  return (
    <Modal open={open} onClose={onClose} title="📤 Upload file">
      <div className="upload-form">
        <p className="input-label">
          Select a file to upload to{" "}
          <strong id="uploadPathDisplay">{currentPath}</strong>
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
        {uploadStatus !== "initial" && (
          <ProgressBar
            progress={progress}
            color={uploadStatus === "error" ? "error" : "success"}
          >
            {
              {
                initial: undefined,
                uploading: `Uploading: ${progress}%`,
                completed: "Upload complete!",
                error: uploadError,
              }[uploadStatus]
            }
          </ProgressBar>
        )}
      </div>
    </Modal>
  );
};
