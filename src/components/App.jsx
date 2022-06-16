import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { fetchValutes } from "../toolkitRedux/valutesSlice";
import NavBar from "./NavBar";
import Converter from "./pages/Converter/Converter";
import Valutes from "./pages/Valutes/Valutes";
import "./styles.css";

const App = () => {
  console.log("APP");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchValutes());
  }, [dispatch]);

  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Converter />} />
        <Route path="/valutes" element={<Valutes />} />
      </Routes>
    </div>
  );
};

export default App;
