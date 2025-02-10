import "./ChatList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { BsPencilSquare, BsThreeDotsVertical } from "react-icons/bs";
import { chats } from "../../assets/chats";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useRef, useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import { Link } from "react-router-dom";

const ChatList = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="chat-list">
      <div className="wrapper">
        <Header
          title={"Chats"}
          icon1={BsPencilSquare}
          icon2={BsThreeDotsVertical}
          onIcon2Click={toggleDropdown}
        />
        {dropdownVisible && (
          <DropdownMenu
            ref={dropdownRef}
            onClose={() => setDropdownVisible(false)}
          />
        )}
        <div className="scroll">
          <SearchBar placeholder="Search or start a new chat" />
          <ul className="chat-list-items">
            {chats.map((chat) => (
              <li key={chat._id}>
                <Link className="chat-item" to={`/chats/${chat._id}`}>
                  <div className="avatar">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "default_avatar.png";
                      }}
                    />
                  </div>
                  <div className="chat-info">
                    <div className="name-and-status">
                      <h4>{chat.name}</h4>
                      <div className="status-icon">
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    </div>
                    <p>{chat.message}</p>
                  </div>
                  <span className="chat-time">{chat.time}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
