import { Routes, Route, Navigate } from "react-router-dom";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/events" />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
}

export default App;