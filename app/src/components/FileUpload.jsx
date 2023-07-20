import React, { useState } from "react";
import axios from "../components/Repeated/axios";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [files, setFiles] = useState([]);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("warrantyFile", selectedFile);

    try {
      const response = await axios.post("/upload", formData);
      setFileUrl(response.data.FileLocation);
      setFiles((prevFiles) => [...prevFiles, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileView = (location) => {
    window.open(location, "_blank");
  };

  const handleFileList = async () => {
    try {
      const response = await axios.get("/listFiles");
      setFiles(response.data.files);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleFileUpload}>Upload File</button>
      <br />
      <div>
        <button onClick={handleFileList}>List Files</button>
      </div>
      {fileName && (
        <div>
          <p>File Name: {fileName}</p>
          {fileUrl && (
            <a href={fileUrl} target="_blank" rel="noreferrer">
              View File
            </a>
          )}
        </div>
      )}
      {files.map((file, index) => (
        <div key={index}>
          <p>File Name: {file.name}</p>
          <button onClick={() => handleFileView(file.location)}>
            View File
          </button>
        </div>
      ))}

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default FileUpload;
