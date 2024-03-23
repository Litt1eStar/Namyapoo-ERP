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

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 w-screen h-screen">
      <Routes>
        <Route path="/" element={ authUser ? <Home/> : <Navigate to='login' />} />
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />
        <Route path="/workspace/:workspace_id" element={authUser ? <Workspace /> : <Navigate to='/login' />} />
        <Route path="/transaction/:transaction_id" element={authUser ? <Transaction /> : <Navigate to='/login' />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to='/login' />} />
        <Route path="/inventory" element={authUser ? <Inventory /> : <Navigate to='/login' />} />

      </Routes>
      <Toaster toastOptions={{
        duration: 2000
      }} />
    </div>
  );
};

export default App;
