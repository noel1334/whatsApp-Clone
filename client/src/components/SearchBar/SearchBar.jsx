import "./SearchBar.css";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ placeholder }) => {
  return (
    <div className="search-bar">
      <IoMdSearch className="search-icon" />
      <input type="text" placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;
