import "./ChatHeader.css";

const ChatHeader = ({
  userName,
  userAvatar,
  icon1: Icon1,
  icon2: Icon2,
  icon3: Icon3,
}) => {
  return (
    <div className="chat-header">
      <div className="user-info">
        <div className="user-avatar">
          <img src={userAvatar} alt="User Avatar" />
        </div>
        <div className="user-details">
          <h3>{userName}</h3>
        </div>
      </div>
      <div className="header-icons">
        {Icon1 && <Icon1 className="icon" />}
        {Icon2 && <Icon2 className="icon" />}
        {Icon3 && <Icon3 className="icon" />}
      </div>
    </div>
  );
};

export default ChatHeader;
