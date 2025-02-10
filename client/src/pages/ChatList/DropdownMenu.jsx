import { useState, forwardRef, useImperativeHandle } from "react";
import "./DropdownMenu.css";
import { IoMdSearch } from "react-icons/io";
import PropTypes from "prop-types";
import { allUsers } from "../../assets/chats";

const DropdownMenu = forwardRef(function DropdownMenu(props, ref) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState(allUsers);

  useImperativeHandle(ref, () => ({
    close: props.onClose,
  }));

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      setUsers(
        allUsers.filter((user) =>
          user.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setUsers(allUsers);
    }
  };

  return (
    <div className="dropdown-menu">
      <div className="dropdown-search">
        <IoMdSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search name or number"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul>
        <li>New group</li>

        {users.map((user) => (
          <li key={user.id}>
            <div className="user-item">
              <div className="avatar">
                <img
                  src={user.avatar}
                  alt={user.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "default_avatar.png";
                  }}
                />
              </div>
              <div className="user-info">
                <h4>{user.name}</h4>
                <p>{user.message}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

DropdownMenu.displayName = "DropdownMenu";
DropdownMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DropdownMenu;
