import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Faucet from "./components/Faucet";
import Balance from "./components/Balance";
import Trasnfer from "./components/Trasnfer";
import Dashboard from "./components/Dashboard";
import UserProvider from "./UserProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/home" element={<Home />} />
            <Route path="/faucet" element={<Faucet />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/transfer" element={<Trasnfer />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
