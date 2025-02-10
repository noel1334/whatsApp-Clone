import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faPhoneSlash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "./CallItem.css";
import { Link } from "react-router-dom";

const CallItem = ({ call }) => {
  let icon;
  let description;
  let descriptionClass = "";

  if (call.type === "outgoing") {
    icon = call.isVideo ? faVideo : faPhone;
    description = "Outgoing";
  } else if (call.type === "incoming") {
    icon = call.isVideo ? faVideo : faPhone;
    description = "Incoming";
  } else if (call.type === "missed") {
    icon = faPhoneSlash;
    description = "Missed";
    descriptionClass = "missed-call";
  } else {
    icon = faPhone;
    description = "";
  }

  const name = call.name || call.contactName || call.number;

  return (
    <li key={call.id} className="call-item">
      <Link className="call-item-content" to={`/calls/${call.id}`}>
        <div className="avatar">
          <img
            src={call.avatar}
            alt={name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "default_avatar.png";
            }}
          />
        </div>
        <div className="call-info">
          <div className="name-and-status">
            <h4>{name}</h4>
            <div className="call-type">
              <FontAwesomeIcon icon={icon} />
              <span className={descriptionClass}>{description}</span>
            </div>
          </div>
        </div>
        <span className="call-time">{call.date}</span>
      </Link>
    </li>
  );
};

export default CallItem;
