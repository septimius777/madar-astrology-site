import { Routes, Route } from "react-router-dom";
// import RootPage from "./pages/RootPage";
// import HomePage from "./pages/HomePage";
import MedarPage from "./pages/MedarPage";
import SolarSystem from "./pages/SolarSystem";
// import SolarPage from "./pages/SolarPage";
// import Home from "./pages/Home";
export default function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<RootPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/solarPage" element={<SolarPage />} />
      <Route path="/homepage" element={<HomePage />} /> */}
      <Route path="/medarpage" element={<MedarPage />} />
      <Route path="/solarsystem" element={<SolarSystem />} />
    </Routes>
  );
}