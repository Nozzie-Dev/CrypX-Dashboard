import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import LiveMarket from "./components/LiveMarket";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <StatCards/>
        <LiveMarket/>
      </div>
      
    </div>
  );
};

export default App;
