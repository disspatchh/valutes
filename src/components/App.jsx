import { Route, Routes } from "react-router-dom";
import Converter from "./pages/Converter/Converter";
import Valutes from "./pages/Valutes/Valutes";
import "./styles.css";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Converter />} />
        <Route path="/valutes" element={<Valutes />} />
      </Routes>
    </div>
  );
};

export default App;
