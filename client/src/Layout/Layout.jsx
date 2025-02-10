import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import ChatList from "../pages/ChatList/ChatList";
import StatusPage from "../pages/Status/StatusPage";
import ChatBlank from "../pages/ChatWindow/ChatBlank";
import StatusBlank from "../pages/StatusWindow/StatusBlank";
import "./Layout.css";
import CallsList from "../pages/Calls/CallsList";
import CallBlank from "../pages/Calls/CallBlank";

// Route Configuration (Scalable)
const routeConfig = {
  chats: { center: <ChatList />, blank: <ChatBlank /> },
  status: { center: <StatusPage />, blank: <StatusBlank /> },
  calls: { center: <CallsList />, blank: <CallBlank /> },
};

const Layout = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const mainRoute = pathSegments[0];
  const hasDetailView = pathSegments.length > 1;

  const currentRoute = routeConfig[mainRoute] || {};

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="center-panel">{currentRoute.center || null}</div>
      {/* Dynamically render right panel */}
      <div className="right-panel">
        {hasDetailView ? <Outlet /> : currentRoute.blank || null}
      </div>
    </div>
  );
};

export default Layout;
