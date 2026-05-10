import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CreateTrip from "./pages/CreateTrip";
import MyTrips from "./pages/MyTrips";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditTrip from "./pages/EditTrip";
import TripItinerary from "./pages/TripItinerary";
import CitySearch from "./pages/CitySearch";
import BudgetBreakdown from "./pages/BudgetBreakdown";
import PackingChecklist from "./pages/PackingChecklist";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/create-trip" element={<CreateTrip />} />

        <Route path="/my-trips" element={<MyTrips />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/edit-trip" element={<EditTrip />} />

        <Route path="/trip-itinerary" element={<TripItinerary />} />

        <Route path="/city-search" element={<CitySearch />} />

        <Route path="/budget-breakdown/:id" element={<BudgetBreakdown />} />

        <Route path="/packing-checklist/:id" element={<PackingChecklist />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;