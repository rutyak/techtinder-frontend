import ChatPanel from "../chatpanel/ChatPanel";
import Sidebar from "../sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="flex items-center">
      <Sidebar />
      <ChatPanel />
    </div>
  );
}

export default Dashboard;
