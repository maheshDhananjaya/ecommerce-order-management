import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orders from "./pages/Orders";
import AddOrder from "./pages/AddOrder";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/add" element={<AddOrder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
