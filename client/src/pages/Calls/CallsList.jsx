import { BsFillTelephonePlusFill } from "react-icons/bs";
import Header from "../../components/Header/Header";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import DropdownMenu from "../ChatList/DropdownMenu";
import "./CallsList.css";
import CallItem from "../../components/CallItem/CallItem";
import { recentCalls } from "../../assets/chats";
import FavoriteList from "../../components/CallItem/FavoriteList";

const initialFavorites = [];

const CallsList = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const [callHistory, setCallHistory] = useState(recentCalls);
  const [favorites, setFavorites] = useState(initialFavorites);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddFavoriteClick = () => {
    setIsAddingFavorite(true);
  };

  const handleCancelAddFavorite = () => {
    setIsAddingFavorite(false);
  };

  const handleSaveFavorite = (newFavorite) => {
    //  New favorite (e.g., from an input field or dropdown)
    setFavorites([...favorites, newFavorite]);
    setIsAddingFavorite(false);
    //  Persist to localStorage or your backend
  };

  const filteredCallHistory = callHistory.filter((call) => {
    const name = call.name || call.contactName || call.number || "";
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="calls-list">
      <div className="wrapper">
        <Header
          title={"Calls"}
          icon1={BsFillTelephonePlusFill}
          onIcon2Click={toggleDropdown}
        />
        {dropdownVisible && (
          <DropdownMenu
            ref={dropdownRef}
            onClose={() => setDropdownVisible(false)}
          />
        )}
        <div className="scroll">
          <SearchBar
            placeholder="Search or start a new call"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <button
            className="add-favorite-button"
            onClick={handleAddFavoriteClick}
          >
            Add Favorite
          </button>

          {isAddingFavorite && (
            // Render a modal/input field here to select a contact to add

            <div className="add-favorite-modal">
              <input type="text" placeholder="Enter name or number" />
              <button onClick={handleSaveFavorite}>Save</button>
              <button onClick={handleCancelAddFavorite}>Cancel</button>
            </div>
          )}

          <FavoriteList favorites={favorites} />

          <div className="section-title">Recent</div>
          <ul className="call-list">
            {filteredCallHistory.map((call) => (
              <CallItem key={call.id} call={call} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CallsList;
