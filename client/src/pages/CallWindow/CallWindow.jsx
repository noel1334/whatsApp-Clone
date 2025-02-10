import "./CallWindow.css";
import Header from "../../components/Header/Header";
import CallHeader from "../../components/CallHeader/CallHeader";
import { BiPhone, BiX } from "react-icons/bi";
import img from "../../assets/noavatar.jpeg";
import { BsCameraVideoFill, BsChatFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CallWindow = () => {
  const user = {
    name: "Vashi",
    avatar: img,
  };

  const navigate = useNavigate();

  const handleIcon1Click = () => {
    navigate("/chats");
  };

  return (
    <div className="call-window">
      <Header title={"Call info"} icon2={BiX} onIcon1Click={handleIcon1Click} />
      <div>
        <CallHeader
          userName={user?.name}
          userAvatar={user?.avatar}
          icon1={BsChatFill}
          icon2={BsCameraVideoFill}
          icon3={BiPhone}
        />
      </div>
    </div>
  );
};

export default CallWindow;
