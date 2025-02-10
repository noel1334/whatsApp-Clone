import { useState } from "react";
import "./Sidebar.css";
import {
  FaBars,
  FaCommentDots,
  FaPhone,
  FaRegStar,
  FaCog,
  FaCamera,
  FaArchive,
  FaRobot,
} from "react-icons/fa";

import profileImg from "../../assets/noavatar.jpeg";
import SidebarItem from "./SidebarItem";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      {/* Toggle Button */}
      <div className="toggle-button" onClick={() => setIsExpanded(!isExpanded)}>
        <FaBars />
      </div>
      {/* Top Section */}
      <div className="top-section">
        <NavLink to="/chats" className="links">
          <SidebarItem icon={<FaCommentDots />} text="Chats" unread={8} />
        </NavLink>
        <NavLink to="/calls" className="links">
          <SidebarItem icon={<FaPhone />} text="Calls" unread={4} />
        </NavLink>
        <NavLink to="/status" className="links">
          <SidebarItem icon={<FaCamera />} text="Status" dotIndicator={true} />
        </NavLink>
      </div>
      <hr className="sidebar-divider" />
      <div className="meta-ai-section">
        <a href="" className="links">
          <SidebarItem icon={<FaRobot />} text="Meta AI" />
        </a>
      </div>
      {/* Bottom Section */}
      <div className="bottom-section">
        <a href="" className="links">
          <SidebarItem icon={<FaRegStar />} text="Starred messages" />
        </a>
        <a href="" className="links">
          <SidebarItem icon={<FaArchive />} text="Archived chats" />
        </a>
      </div>
      <hr className="sidebar-divider" />
      {/* End Section */}
      <div className="end-section">
        <SidebarItem icon={<FaCog />} text="Settings" />
        <SidebarItem text="Profile" profileImg={profileImg} />{" "}
      </div>
    </div>
  );
};

export default Sidebar;
