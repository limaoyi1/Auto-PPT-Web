import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/home";
import AutoPaper from "@/pages/auto-paper";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auto-paper" element={<AutoPaper />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
