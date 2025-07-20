import ChatPanel from "../chatpanel/ChatPanel";
import FeedCard from "../feedcard/FeedCard";
import Sidebar from "../sidebar/Sidebar";

function Dashboard() {
  return (
    <div className="flex items-center">
      {/* <Sidebar /> */}
      <ChatPanel />

      <div className="flex-1">
        <FeedCard />
      </div>
    </div>
  );
}

export default Dashboard;
