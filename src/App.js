import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/home";
import AutoPaper from "@/pages/auto-ppt";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auto-ppt" element={<AutoPaper />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
