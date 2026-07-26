import { Routes, Route } from "react-router-dom";
import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import MedarPage from "./pages/MedarPage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/medarpage" element={<MedarPage />} />
    </Routes>
  );
}