import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import ChatList from "./pages/ChatList/ChatList";
import ChatWindow from "./pages/ChatWindow/ChatWindow";
import StatusPage from "./pages/Status/StatusPage";
import StatusWindow from "./pages/StatusWindow/StatusWindow";
import CallsList from "./pages/Calls/CallsList";
import CallWindow from "./pages/CallWindow/CallWindow";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "chats",
        element: <ChatList />, // Always in the center
      },
      {
        path: "chats/:chatId",
        element: <ChatWindow />, // Only appears in the right panel
      },
      {
        path: "status",
        element: <StatusPage />, // Always in the center
      },
      {
        path: "status/:statusId",
        element: <StatusWindow />, // Only appears in the right panel
      },
      {
        path: "calls",
        element: <CallsList />,
      },
      {
        path: "calls/:callId",
        element: <CallWindow />, // Only appears in the right panel
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
