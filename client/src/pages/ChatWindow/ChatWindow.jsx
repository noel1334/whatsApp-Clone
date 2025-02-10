import React, { useState, useRef, useEffect } from "react";
import "./ChatWindow.css";
import {
  BsCameraVideoFill,
  BsSearch,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { BiSmile, BiPaperclip } from "react-icons/bi";
import { IoMic, IoSend } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai"; // Import the check icon
import img from "../../assets/noavatar.jpeg";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import AttachmentMenu from "../../components/AttachmentMenu/AttachmentMenu";
import CameraModal from "../../components/AttachmentMenu/CameraModal";

const ChatWindow = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    { text: "What?", time: "10:54 PM", type: "received" },
    { text: "How far?", time: "1:10 PM", type: "sent", delivered: true },
    { text: "Haba", time: "3:54 PM", type: "received" },
    {
      text: "Vashi . Status\nLearn how to stay alone all this love aren't real💔💔💔💔",
      time: "10:02 PM",
      type: "received",
      isStatus: true,
    },
    { text: "Hmmmm 👌👌👌", time: "10:02 PM", type: "received" },
    { text: "Hey dear", time: "12:43 PM", type: "sent", delivered: true },
    {
      text: "I miss your sweet voice",
      time: "1:41 PM",
      type: "sent",
      delivered: true,
    },
    { text: "Yes", time: "3:56 PM", type: "sent", delivered: true },
    { text: "Village girl", time: "11:26 AM", type: "sent", delivered: true },
    { text: "😂\n😂", time: "1:13 PM", type: "received" },
  ]);
  const user = {
    name: "Vashi",
    avatar: img,
  };
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);

  const handleInputChange = (e) => {
    setMessageText(e.target.value);

    const textarea = e.target;
    textarea.style.height = "10px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };

  const handleSendMessage = () => {
    if (messageText.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMessage = {
        text: messageText,
        time: currentTime,
        type: "sent",
        delivered: true,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageText("");
    }
  };

  const renderDateSeparators = () => {
    const dateSeparators = [];
    let currentDate = null;

    messages.forEach((message, index) => {
      const messageDate = new Date().toLocaleDateString();

      if (messageDate !== currentDate) {
        dateSeparators.push(
          <div key={`date-${index}`} className="date-separator">
            <span>{messageDate}</span>
          </div>
        );
        currentDate = messageDate;
      }
    });

    return dateSeparators;
  };

  const toggleAttachmentMenu = () => {
    setIsAttachmentMenuOpen(!isAttachmentMenuOpen);
  };

  const handleFileSelect = (file) => {
    // Implement logic to handle the selected file
    console.log("Selected file:", file);
    // You might want to send the file as a message or perform other actions
  };

  const openCameraModal = () => {
    setIsCameraModalOpen(true);
    toggleAttachmentMenu();
  };

  const closeCameraModal = () => {
    setIsCameraModalOpen(false);
  };

  return (
    <div className="chat-window">
      <ChatHeader
        userName={user?.name}
        userAvatar={user?.avatar}
        icon1={BsCameraVideoFill}
        icon2={BsFillTelephoneFill}
        icon3={BsSearch}
      />
      <div className="chat-messages">
        {renderDateSeparators()}
        {messages.map((message, index) => (
          <React.Fragment key={index}>
            {message.isStatus && (
              <div className={`message received status-message`}>
                <p>{message.text}</p>
                <span>{message.time}</span>
              </div>
            )}
            {!message.isStatus && (
              <div className={`message ${message.type}`}>
                <p>{message.text}</p>
                <span>
                  {message.time}
                  {message.type === "sent" && message.delivered && (
                    <AiOutlineCheck className="check-icon" />
                  )}
                </span>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="chat-input">
        <div className="input-icons">
          <BiSmile className="icon" />
          <BiPaperclip className="icon" onClick={toggleAttachmentMenu} />
          <AttachmentMenu
            isOpen={isAttachmentMenuOpen}
            onClose={() => setIsAttachmentMenuOpen(false)}
            onFileSelect={handleFileSelect}
            openCameraModal={openCameraModal}
          />
        </div>
        <textarea
          placeholder="Type a message"
          value={messageText}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        {messageText ? (
          <IoSend className="icon send-icon" onClick={handleSendMessage} />
        ) : (
          <IoMic className="icon" />
        )}
      </div>
      {isCameraModalOpen && <CameraModal onClose={closeCameraModal} />}
    </div>
  );
};

export default ChatWindow;
