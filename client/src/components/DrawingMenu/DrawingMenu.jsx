import React, { useState, useRef, useEffect } from "react";
import "./DrawingMenu.css";
import DrawingCanvas from "./DrawingCanvas"; //Import DrawingCanvas
import { IoPencilOutline } from "react-icons/io5"; //Example pencil icon

const DrawingMenu = ({ isOpen, onClose, onDrawingSelected }) => {
  const menuRef = useRef(null);
  const [isDrawingCanvasOpen, setIsDrawingCanvasOpen] = useState(false);

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

  const handleDrawingCanvasOpen = () => {
    setIsDrawingCanvasOpen(true);
    onClose();
  };

  const handleDrawingCanvasClose = () => {
    setIsDrawingCanvasOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="drawing-menu" ref={menuRef}>
      <ul>
        <li>
          <button onClick={handleDrawingCanvasOpen}>
            <IoPencilOutline /> Start Drawing
          </button>
        </li>
        {/* Add other drawing options here (e.g., insert shapes, etc.) */}
      </ul>
      {isDrawingCanvasOpen && (
        <DrawingCanvas onClose={handleDrawingCanvasClose} />
      )}
    </div>
  );
};

export default DrawingMenu;
