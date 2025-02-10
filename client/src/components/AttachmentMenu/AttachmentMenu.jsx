import { useState, useRef, useEffect } from "react";
import "./AttachmentMenu.css";
import {
  AiOutlineFileImage,
  AiOutlineCamera,
  AiOutlineFileText,
  AiOutlineUser,
  AiOutlineEdit,
} from "react-icons/ai";
import { BiPoll } from "react-icons/bi";

const AttachmentMenu = ({ isOpen, onClose, onFileSelect, openCameraModal }) => {
  const menuRef = useRef(null);
  const fileInputRef = useRef(null); // Create a ref for file input

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleAttachmentClick = (type) => {
    onClose(); // Close the menu after selecting an option
    switch (type) {
      case "photo":
        // Programmatically trigger the file input
        fileInputRef.current.click();
        break;
      case "camera":
        openCameraModal();
        break;
      case "document":
        //Open file for documents
        openDocument();
        break;
      case "contact":
        console.log("Open contact list");
        break;
      case "poll":
        console.log("Open poll creation");
        break;
      case "drawing":
        console.log("Open drawing tool");
        break;
      default:
        break;
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelect(files);
    }
  };
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Do something with the video stream, like displaying it in a video element
      console.log("Camera stream:", stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };
  const openDocument = async () => {
    try {
      fileInputRef.current.click();
    } catch (error) {
      console.error("Error accessing files:", error);
    }
  };
  return (
    <div className={`attachment-menu ${isOpen ? "open" : ""}`} ref={menuRef}>
      <input
        type="file"
        style={{ display: "none" }}
        multiple
        accept="image/*, video/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <ul className="attachment-list">
        <li onClick={() => handleAttachmentClick("photo")}>
          <AiOutlineFileImage className="attachment-icon" />
          <span>Photos & videos</span>
        </li>
        <li onClick={() => handleAttachmentClick("camera")}>
          <AiOutlineCamera className="attachment-icon" />
          <span>Camera</span>
        </li>
        <li onClick={() => handleAttachmentClick("document")}>
          <AiOutlineFileText className="attachment-icon" />
          <span>Document</span>
        </li>
        <li onClick={() => handleAttachmentClick("contact")}>
          <AiOutlineUser className="attachment-icon" />
          <span>Contact</span>
        </li>
        <li onClick={() => handleAttachmentClick("poll")}>
          <BiPoll className="attachment-icon" />
          <span>Poll</span>
        </li>
        <li onClick={() => handleAttachmentClick("drawing")}>
          <AiOutlineEdit className="attachment-icon" />
          <span>Drawing</span>
        </li>
      </ul>
    </div>
  );
};

export default AttachmentMenu;
