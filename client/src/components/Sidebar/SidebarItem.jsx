const SidebarItem = ({ icon, text, unread, dotIndicator, profileImg }) => {
  return (
    <div className="sidebar-item">
      {profileImg ? (
        <img src={profileImg} alt="Profile" className="profile-img" />
      ) : (
        <div className="icon">{icon}</div>
      )}
      <span className="text">{text}</span>
      {unread && <span className="unread-badge">{unread}</span>}
      {dotIndicator && <span className="dot-indicator"></span>}
    </div>
  );
};

export default SidebarItem;
