import NavBar from "./components/NavBar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import ResultsPage from "./pages/ResultsPage";
import DisplayVisPage from "./pages/DisplayVisPage";
import Vis3 from "./pages/Vis3";



function App() {
  return (
    <div>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/test" element={<DisplayVisPage><div>hello</div></DisplayVisPage>} />
      </Routes>
    </div>
  );
}

export default App;
