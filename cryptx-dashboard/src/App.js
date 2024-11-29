import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCards from "./components/StatCards";
import LiveMarket from "./components/LiveMarket";
import Transactions from "./components/Transactions";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <StatCards/>
        <LiveMarket/>
        <Transactions/>
      </div>
      
    </div>
  );
};

export default App;
