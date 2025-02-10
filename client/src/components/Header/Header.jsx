import "./Header.css";

const Header = ({
  title,
  icon1: Icon1,
  icon2: Icon2,
  onIcon2Click,
  onIcon1Click,
}) => {
  return (
    <div className="chat-list-header">
      <h2>{title}</h2>
      <div className="header-icons">
        {Icon1 && <Icon1 className="header-icon" onClick={onIcon2Click} />}
        {Icon2 && <Icon2 className="header-icon" onClick={onIcon1Click} />}
      </div>
    </div>
  );
};

export default Header;
