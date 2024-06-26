import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Workspace from "./pages/Workspace";
import Transaction from "./pages/Transaction";
import Profile from "./pages/Profile";
import Inventory from "./pages/Inventory";
import StockHistory from "./pages/StockHistory";
import Dashboard from "./pages/Dashboard";
import Accounting from "./pages/Accounting";
import WorkspaceHistory from "./pages/WorkspaceHistory";
import StockDashboard from "./pages/StockDashboard";
import LeftOverPage from "./pages/LeftOverPage";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 w-screen h-screen">
      <Routes>
        <Route path="/" element={ authUser ? <Home/> : <Navigate to='login' />} />
        <Route path="/dashboard/accounting" element={authUser ? <Dashboard/> : <Navigate to='login' />} />
        <Route path="/dashboard/stock" element={authUser ? <StockDashboard/> : <Navigate to='login' />} />
        <Route path="/accountment" element={authUser ? <Accounting/> : <Navigate to='login' />} />
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />
        <Route path="/workspace/:workspace_id" element={authUser ? <Workspace /> : <Navigate to='/login' />} />
        <Route path="/transaction/:transaction_id" element={authUser ? <Transaction /> : <Navigate to='/login' />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to='/login' />} />
        <Route path="/inventory" element={authUser ? <Inventory /> : <Navigate to='/login' />} />
        <Route path="/history/stock" element={authUser ? <StockHistory /> : <Navigate to='/login' />} />
        <Route path="/history/workspace" element={authUser ? <WorkspaceHistory /> : <Navigate to='/login' />} />
        <Route path="/product/updateLeftOver" element={authUser ? <LeftOverPage /> : <Navigate to='/login' />} />
        
      </Routes>
      <Toaster toastOptions={{
        duration: 2000
      }} />
    </div>
  );
};

export default App;
